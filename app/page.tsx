import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/lesson/1');
  return null;
}