import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return NextResponse.json({ error: 'Предложения пока не подключены. Попробуйте позже.' }, { status: 503 });
  let body: { title?: string; artist?: string; url?: string; note?: string; name?: string; website?: string };
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Некорректный запрос.' }, { status: 400 }); }
  if (body.website) return NextResponse.json({ ok: true });
  const title = body.title?.trim().slice(0, 160); const artist = body.artist?.trim().slice(0, 160);
  if (!title || !artist) return NextResponse.json({ error: 'Укажите название песни и исполнителя.' }, { status: 400 });
  const url = body.url?.trim().slice(0, 500) ?? '';
  if (url && (!url.startsWith('https://') || !['itunes.apple.com', 'music.apple.com', 'open.spotify.com', 'youtube.com', 'music.youtube.com', 'youtu.be', 'music.yandex.ru'].some(host => { try { return new URL(url).hostname === host || new URL(url).hostname.endsWith(`.${host}`); } catch { return false; } }))) return NextResponse.json({ error: 'Ссылка должна вести на Apple Music, Spotify, YouTube или Яндекс Музыку.' }, { status: 400 });
  const note = body.note?.trim().slice(0, 500) ?? '';
  const name = body.name?.trim().slice(0, 80) ?? '';
  const lines = ['🎵 Новое предложение песни', `Название: ${title}`, `Исполнитель: ${artist}`, ...(url ? [`Ссылка: ${url}`] : []), ...(note ? [`Комментарий: ${note}`] : []), ...(name ? [`От: ${name}`] : [])];
  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ chat_id: chatId, text: lines.join('\n'), link_preview_options: { is_disabled: true } }) });
    const result = await response.json();
    if (!response.ok || !result.ok) return NextResponse.json({ error: 'Не удалось отправить предложение в Telegram.' }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: 'Telegram временно недоступен.' }, { status: 502 }); }
}
