import dynamic from 'next/dynamic';

const TreeUploader = dynamic(() => import('./TreeUploader'), { ssr: false });

export const metadata = { title: 'Upload Tree - GreenGain' };

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <TreeUploader />
    </main>
  );
}
