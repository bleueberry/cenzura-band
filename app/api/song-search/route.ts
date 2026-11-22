import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get('q')?.trim();
  if (!query || query.length < 2) return NextResponse.json({ results: [] });
  if (query.length > 120) return NextResponse.json({ error: 'Запрос слишком длинный.' }, { status: 400 });
  try {
    const url = new URL('https://itunes.apple.com/search');
    url.search = new URLSearchParams({ term: query, entity: 'song', media: 'music', country: 'ru', limit: '12' }).toString();
    const response = await fetch(url, { next: { revalidate: 300 } });
    if (!response.ok) return NextResponse.json({ error: 'Поиск временно недоступен.' }, { status: 502 });
    const data = await response.json();
    return NextResponse.json({ results: (data.results ?? []).map((track: Record<string, unknown>) => ({ id: track.trackId, title: track.trackName, artist: track.artistName, album: track.collectionName, url: track.trackViewUrl, preview: track.previewUrl, artwork: track.artworkUrl100 })) });
  } catch { return NextResponse.json({ error: 'Не удалось выполнить поиск.' }, { status: 502 }); }
}
