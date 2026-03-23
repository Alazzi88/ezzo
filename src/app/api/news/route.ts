import { NextResponse } from 'next/server';

const API_KEY = process.env.NEWS_API_KEY!;

async function translateText(text: string): Promise<string> {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return text;
    const data = await res.json();
    // Response: [[['translated','original',...]], ...]
    return (data[0] as [string][]).map(chunk => chunk[0]).join('');
  } catch {
    return text;
  }
}

async function translateArticles(articles: Record<string, unknown>[]) {
  return Promise.all(
    articles.map(async (a) => {
      const [title, description] = await Promise.all([
        translateText(a.title as string),
        a.description ? translateText(a.description as string) : Promise.resolve(null),
      ]);
      return { ...a, title, description };
    })
  );
}

export async function GET() {
  try {
    // Try Arabic first
    const arRes = await fetch(
      `https://newsapi.org/v2/top-headlines?category=business&language=ar&pageSize=12&apiKey=${API_KEY}`,
      { next: { revalidate: 900 } }
    );

    if (arRes.ok) {
      const arData = await arRes.json();
      const valid = (arData.articles || []).filter(
        (a: Record<string, unknown>) => a.title && a.title !== '[Removed]' && a.url
      );
      if (valid.length >= 3) {
        return NextResponse.json({ articles: valid });
      }
    }

    // Fall back to English + translate
    const enRes = await fetch(
      `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=12&apiKey=${API_KEY}`,
      { next: { revalidate: 900 } }
    );

    if (!enRes.ok) throw new Error(`NewsAPI error: ${enRes.status}`);

    const enData = await enRes.json();
    const valid = (enData.articles || []).filter(
      (a: Record<string, unknown>) => a.title && a.title !== '[Removed]' && a.url
    );

    const translated = await translateArticles(valid);
    return NextResponse.json({ articles: translated });

  } catch (err) {
    console.error('News fetch error:', err);
    return NextResponse.json({ articles: [] }, { status: 200 });
  }
}
