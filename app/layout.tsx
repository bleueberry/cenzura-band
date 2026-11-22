import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ЦЕНЗУРА — музыкальная группа',
  description: 'Анонсы концертов, билеты и музыка группы «Цензура».',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
