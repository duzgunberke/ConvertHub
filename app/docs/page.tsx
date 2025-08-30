import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';

export default async function DocsPage() {
  // Read the README.md file
  const readmePath = path.join(process.cwd(), 'README.md');
  const markdown = fs.readFileSync(readmePath, 'utf8');

  return (
    <main className="prose prose-invert mx-auto max-w-4xl py-8">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </main>
  );
}
