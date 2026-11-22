import Link from 'next/link';
import { supabase } from '../../lib/supabase';
import './style.css';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Checkout() {
  const { data } = supabase ? await supabase.from('events').select('title,ticket_url').eq('published', true).gte('starts_at', new Date().toISOString()).not('ticket_url', 'is', null).neq('ticket_url', '').order('starts_at').limit(1) : { data: null };
  const event = data?.[0];
  return <main className="checkout-page"><header><Link href="/" className="checkout-back">← НАЗАД НА САЙТ</Link><span className="checkout-logo">ЦЕНЗУРА</span></header>{event?.ticket_url ? <><div className="checkout-title"><span>ПОКУПКА БИЛЕТА</span><h1>{event.title}</h1><p>Оплата и оформление билета проходят на стороне MuzaTicket.</p></div><iframe className="checkout-frame" src={event.ticket_url} title={`Покупка билета: ${event.title}`} referrerPolicy="strict-origin-when-cross-origin" allow="payment *; clipboard-write"/><a className="checkout-fallback" href={event.ticket_url} target="_blank" rel="noreferrer">Если форма не загрузилась, открыть MuzaTicket ↗</a></> : <div className="checkout-empty"><h1>Продажа билетов пока не открыта</h1><p>Следи за анонсами концертов в Telegram.</p><a href="https://t.me/censorship_pp" target="_blank" rel="noreferrer">ОТКРЫТЬ TELEGRAM ↗</a></div>}</main>;
}
