import { NextResponse } from 'next/server';

const API_KEY = process.env.NEWS_API_KEY!;

export async function GET() {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=12&apiKey=${API_KEY}`,
      { next: { revalidate: 900 } } // cache 15 min
    );

    if (!res.ok) {
      throw new Error(`NewsAPI error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('News fetch error:', err);
    return NextResponse.json({ articles: [] }, { status: 200 });
  }
}
