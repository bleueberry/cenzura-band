const members = [
  { role: 'ВОКАЛ', name: 'Вокалист I' }, { role: 'ВОКАЛ', name: 'Вокалист II' },
  { role: 'ГИТАРА', name: 'Гитарист I' }, { role: 'ГИТАРА', name: 'Гитарист II' },
  { role: 'ГИТАРА', name: 'Гитарист III' }, { role: 'БАС', name: 'Бас-гитарист' },
  { role: 'БАРАБАНЫ', name: 'Ударник' }, { role: 'МУЗЫКАЛЬНЫЙ РУКОВОДИТЕЛЬ', name: 'Муз. руководитель' },
];

export default async function Home() {
  const { data: upcoming } = supabase ? await supabase.from('events').select('*').eq('published', true).gte('starts_at', new Date().toISOString()).order('starts_at').limit(1) : { data: null };
  const nextEvent = upcoming?.[0];
  return <main>
    <header className="nav"><a className="wordmark" href="#top">ЦЕНЗУРА</a><nav><a href="#live">КОНЦЕРТЫ</a><a href="#band">СОСТАВ</a></nav><a className="nav-ticket" href="https://t.me/censorship_pp" target="_blank">TELEGRAM ↗</a></header>
    <section className="cover" id="top"><div className="cover-noise"/><div className="wire wire-a"/><div className="wire wire-b"/><div className="wire wire-c"/><div className="cover-caption"><span>МУЗЫКАЛЬНАЯ ГРУППА</span><span>АЛЕКСЕЕВКА · 2026</span></div><div className="cover-core"><span className="cover-overline">STREET COVER</span><div className="thorn thorn-top"/><h1>ЦЕНЗУРА</h1><div className="thorn thorn-bottom"/><span className="cover-subtitle">МУЗЫКАЛЬНАЯ ГРУППА</span></div><a className="cover-scroll" href="#live">ЛИСТАЙ ВНИЗ <span>↓</span></a></section>
    <section className="manifesto"><span className="manifesto-line"/><p>ГРОМЧЕ,<br/><i>ЧЕМ ТИШИНА.</i></p><span className="manifesto-meta">АЛЕКСЕЕВКА · БЕЛГОРОДСКАЯ ОБЛАСТЬ</span></section>
    <section className="live section" id="live"><div className="section-label"><span>01 — БЛИЖАЙШИЙ КОНЦЕРТ</span><span>{nextEvent ? 'СКОРО УВИДИМСЯ' : 'АНОНС СКОРО'}</span></div><div className="event"><div className="date"><strong>{nextEvent ? new Date(nextEvent.starts_at).toLocaleDateString('ru-RU', { day: '2-digit' }) : '—'}</strong><span>{nextEvent ? new Date(nextEvent.starts_at).toLocaleDateString('ru-RU', { month: 'long' }).toUpperCase() : 'СКОРО'}</span><small>{nextEvent ? new Date(nextEvent.starts_at).getFullYear() : '2026'}</small></div><div className="event-info"><p className="eyebrow">ЖИВОЕ ВЫСТУПЛЕНИЕ · {nextEvent?.city?.toUpperCase() ?? 'АЛЕКСЕЕВКА'}</p><h2>{nextEvent?.title ?? 'Увидимся у сцены.'}</h2><p>{nextEvent ? [nextEvent.venue, nextEvent.description].filter(Boolean).join(' · ') : 'Следи за датой и местом в нашем Telegram.'}</p>{nextEvent?.ticket_url ? <a className="button button-outline" href="/checkout">КУПИТЬ БИЛЕТ <span>↗</span></a> : <a className="button button-outline" href="https://t.me/censorship_pp" target="_blank" rel="noreferrer">ВСЕ АНОНСЫ В TELEGRAM <span>↗</span></a>}</div><div className="event-mark">Ц</div></div></section>
    <section className="band section" id="band"><div className="section-label"><span>02 — СОСТАВ</span><span>ВОСЕМЬ ЧЕЛОВЕК · ОДИН ШУМ</span></div><div className="band-heading"><h2>ЛЮДИ<br/><i>ЗА ШУМОМ.</i></h2><p>Два голоса.<br/>Три гитары.<br/>Один общий звук.</p></div><div className="members">{members.map((m, i) => <article className="member" key={m.name}><div className={`portrait portrait-${i + 1}`}><span className="portrait-light"/></div><p>{m.role}</p><h3>{m.name}</h3></article>)}</div></section>
    <section className="telegram"><div className="telegram-wire"/><span>ОСТАВАЙСЯ НА СВЯЗИ</span><h2>СЛЕДУЮЩИЙ<br/><i>ШУМ — ТАМ.</i></h2><a href="https://t.me/censorship_pp" target="_blank" className="button">ОТКРЫТЬ TELEGRAM <span>↗</span></a></section>
    <footer><a className="wordmark" href="#top">ЦЕНЗУРА</a><span>© 2026 · АЛЕКСЕЕВКА</span><a href="https://t.me/censorship_pp" target="_blank">TELEGRAM ↗</a></footer>
  </main>;
}
import { supabase } from '../lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

