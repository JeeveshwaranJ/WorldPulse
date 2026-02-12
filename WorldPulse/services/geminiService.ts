
import { GoogleGenAI, Type } from "@google/genai";
import { Article, NewsCategory, TrendingTopic } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  private mapCategory(raw: string): NewsCategory {
    const cats = Object.values(NewsCategory);
    const match = cats.find(c => c.toLowerCase() === raw.trim().toLowerCase());
    return match || NewsCategory.WORLD;
  }

  async fetchTrendingTopics(): Promise<TrendingTopic[]> {
    const model = "gemini-3-flash-preview";
    const prompt = `Identify 6 major global trending news topics from the last 24 hours. 
    Categories must be exactly one of: ${Object.values(NewsCategory).join(', ')}.
    Include estimated global interest volume and momentum percentage.`;

    try {
      const response = await this.ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                topic: { type: Type.STRING },
                category: { type: Type.STRING },
                volume: { type: Type.STRING },
                change: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["topic", "category", "volume", "change", "description"]
            }
          }
        }
      });

      const data = JSON.parse(response.text || '[]');
      return data.map((t: any, i: number) => ({
        ...t,
        id: `trend-${Date.now()}-${i}`,
        category: this.mapCategory(t.category),
        timestamp: new Date().toISOString()
      }));
    } catch (e) {
      console.error("Trend fetch error:", e);
      return [];
    }
  }

  async generateArticle(topic: string, category: NewsCategory): Promise<Article> {
    const prompt = `Write a production-grade, long-form investigative news article about: "${topic}".
    Category: ${category}. Target Length: 1000 words.
    Tone: Authoritative, neutral, human-like journalism.
    Structure: Markdown with ## headers. Include Intro, Background, Key Analysis, Global Impact, and Conclusion.
    Featured: Determine if this story is globally significant (featured: true) or a standard brief (featured: false).
    
    SEO INSTRUCTIONS:
    1. Meta Description: Create a high-density, keyword-rich summary (155-165 characters) that serves as a click-worthy meta tag.
    2. Image Alt Text: Provide a highly descriptive, narrative-based alt text for the featured image that describes the scene and includes primary keywords for maximum accessibility and SEO ranking.
    3. Keywords: Generate a list of 8-10 highly relevant SEO keywords.`;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are the Lead Editor and SEO Architect for WorldPulse. 
        Your mission is to produce 100% original, verified intelligence reports. 
        Editorial standards follow the BBC/Reuters style guide: neutral, factual, and deeply analytical.
        You must ensure all metadata is optimized for search visibility and accessibility.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            subheadline: { type: Type.STRING },
            excerpt: { type: Type.STRING, description: "A high-impact summary for the card view." },
            content: { type: Type.STRING },
            featured: { type: Type.BOOLEAN },
            pullQuote: { type: Type.STRING },
            imagePrompt: { type: Type.STRING, description: "A detailed prompt for generating a relevant editorial image." },
            imageAlt: { type: Type.STRING, description: "Detailed narrative alt text for SEO and accessibility." },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            meta: {
              type: Type.OBJECT,
              properties: {
                description: { type: Type.STRING, description: "The 160-character SEO meta description." },
                keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            faqs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  answer: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const data = JSON.parse(response.text || '{}');
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const imageUrl = await this.generateImage(data.imagePrompt || data.title);

    return {
      id: `art-${Date.now()}`,
      title: data.title,
      subheadline: data.subheadline,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      category,
      image: imageUrl,
      imageAlt: data.imageAlt || `Editorial image for ${data.title}`,
      author: "AI Editorial Desk",
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: data.tags || [],
      readTime: `${Math.ceil(data.content.split(' ').length / 225)} min read`,
      faqs: data.faqs || [],
      featured: !!data.featured,
      pullQuote: data.pullQuote,
      meta: {
        description: data.meta?.description || data.excerpt || '',
        keywords: data.meta?.keywords || [],
        canonical: `https://worldpulse.news/article/${slug}`
      }
    };
  }

  async generateImage(prompt: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: `Professional photojournalism, high detail, cinematic editorial style, realistic: ${prompt}` }] },
        config: { imageConfig: { aspectRatio: "16:9" } }
      });
      const imgPart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      return imgPart ? `data:image/png;base64,${imgPart.inlineData.data}` : `https://picsum.photos/seed/${encodeURIComponent(prompt)}/1200/675`;
    } catch {
      return `https://picsum.photos/seed/${encodeURIComponent(prompt)}/1200/675`;
    }
  }
}

export const geminiService = new GeminiService();
