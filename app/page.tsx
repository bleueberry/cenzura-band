const members = [
  { role: 'ВОКАЛ', name: 'Фронтмен', sign: '01' },
  { role: 'ГИТАРА', name: 'Гитарист', sign: '02' },
  { role: 'БАС', name: 'Бас-гитарист', sign: '03' },
  { role: 'БАРАБАНЫ', name: 'Ударник', sign: '04' },
];

export default function Home() {
  return <main>
    <header className="nav"><a className="wordmark" href="#top">ЦЕНЗУРА<span>®</span></a><nav><a href="#live">КОНЦЕРТЫ</a><a href="#band">ГРУППА</a><a href="https://t.me/censorship_pp" target="_blank">TELEGRAM ↗</a></nav><a className="nav-ticket" href="#live">БИЛЕТЫ <span>↗</span></a></header>
    <section className="hero" id="top"><div className="hero-grain"/><div className="hero-top"><span>МУЗЫКАЛЬНАЯ ГРУППА</span><span>МОСКВА · 2026</span></div><div className="sigil">✳</div><div className="hero-title"><span className="overline">— ЗВУК БЕЗ РАЗРЕШЕНИЯ —</span><h1>ЦЕНЗУРА</h1><p>ГРОМЧЕ, ЧЕМ ТИШИНА.</p></div><div className="hero-bottom"><span>НЕЗАВИСИМАЯ ГРУППА<br/>ИЗ МОСКВЫ</span><a href="#live" className="round-link">↓</a><span>СЛУШАЙ НА<br/>СВОЙ СТРАХ</span></div></section>
    <section className="ticker"><div>ЖИВЫЕ КОНЦЕРТЫ <b>✳</b> ГРОМКИЙ ЗВУК <b>✳</b> ЦЕНЗУРА <b>✳</b> ЖИВЫЕ КОНЦЕРТЫ <b>✳</b> ГРОМКИЙ ЗВУК <b>✳</b> ЦЕНЗУРА <b>✳</b></div></section>
    <section className="live section" id="live"><div className="section-label"><span>01 / БЛИЖАЙШИЙ КОНЦЕРТ</span><span>ВХОД ОТКРЫТ</span></div><div className="event"><div className="date"><strong>—</strong><span>СКОРО</span><small>2026</small></div><div className="event-info"><p className="eyebrow">ЖИВОЕ ВЫСТУПЛЕНИЕ · МОСКВА</p><h2>Следи за анонсом</h2><p>Новая дата и место появятся здесь и в нашем Telegram.</p><a className="button button-outline" href="https://t.me/censorship_pp" target="_blank">ПОДПИСАТЬСЯ НА АНОНСЫ <span>↗</span></a></div><div className="event-mark">Ц.</div></div><p className="note">БИЛЕТЫ ПОЯВЯТСЯ ПОСЛЕ АНОНСА КОНЦЕРТА</p></section>
    <section className="band section" id="band"><div className="section-label"><span>02 / СОСТАВ</span><span>ЧЕТЫРЕ ЧЕЛОВЕКА · ОДИН ШУМ</span></div><div className="band-heading"><h2>ТЕ, КТО<br/><i>ЗА ШУМОМ.</i></h2><p>Мы — Цензура.<br/>Остальное услышишь сам.</p></div><div className="members">{members.map((m) => <article className="member" key={m.sign}><div className="portrait"><span className="portrait-symbol">✳</span><span className="member-number">{m.sign} / 04</span></div><p>{m.role}</p><h3>{m.name}</h3></article>)}</div></section>
    <section className="cta"><span>НЕ ПРОПУСТИ СЛЕДУЮЩИЙ ШУМ</span><h2>БУДЬ<br/><i>БЛИЖЕ.</i></h2><a href="https://t.me/censorship_pp" target="_blank" className="button">НАШ TELEGRAM <span>↗</span></a></section>
    <footer><a className="wordmark" href="#top">ЦЕНЗУРА<span>®</span></a><span>© 2026 · НЕЗАВИСИМЫЙ ЗВУК</span><a href="https://t.me/censorship_pp" target="_blank">TELEGRAM ↗</a></footer>
  </main>;
}
