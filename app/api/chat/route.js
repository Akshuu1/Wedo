import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Initialize Groq client (using OpenAI SDK for compatibility)
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

const SYSTEM_PROMPT = `You are Sole, the AI assistant for the WEDO agency. 
Your tone should be professional, slightly cinematic, concise, and helpful. 
Use formatting like bolding for keywords to make your responses easy to read. 
Do not use emojis excessively, keep it sleek.

Here is the knowledge base about WEDO you must use to answer questions:

- **Services**: We offer 4 core services: Website Design (Fast, beautiful, conversion-ready), Brand Identity (Logos, typography, palettes), UI/UX Design (Intuitive interfaces), and Social Media (Strategies and management).
- **Pricing**: Pricing is transparent, no hidden fees. Website Design starts from ₹15,000. Brand Identity starts from ₹10,000. UI/UX Design starts from ₹12,000. Social Media is custom monthly packages.
- **Process**: 01 -> BRIEF (Understand vision), 02 -> DESIGN (Craft concepts), 03 -> BUILD (Develop), 04 -> LAUNCH (Deploy). Most projects delivered within 1-3 weeks.
- **About WEDO**: A small, focused creative studio obsessed with making businesses look incredible online. No bloated agency overhead or confusing jargon.
- **Contact**: Email is hello@wedo.com. Location is New Delhi, India. Users can also use the Contact page on the website. We respond within 24 hours.
- **Tech Stack**: Next.js, React, Framer Motion, Figma, Three.js, GSAP.

If a user asks a general conversation question, respond politely but guide them back to how WEDO can help them. If a user asks a question outside of your knowledge, politely state you don't have that information and suggest they contact the team.`;

export async function POST(request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      console.error('CRITICAL: GROQ_API_KEY is missing from environment variables.');
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      );
    }

    console.log('Sole Chat API: Processing request via Groq...');
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Prepend the system prompt
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(msg => ({
        role: msg.isBot ? 'assistant' : 'user',
        content: msg.text
      }))
    ];

    const response = await openai.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 250,
    });

    const aiMessage = response.choices[0].message.content;
    console.log('Sole Chat API: Successfully generated response via Groq.');

    return NextResponse.json({ text: aiMessage });

  } catch (error) {
    console.error('Sole Chat API Error Details:', {
      name: error.name,
      message: error.message,
      status: error.status,
      code: error.code
    });
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    );
  }
}
