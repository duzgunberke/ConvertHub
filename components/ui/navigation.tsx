'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Home, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 right-4 z-50 flex gap-2">
      <Link href="/">
        <Button
          variant={pathname === '/' ? 'default' : 'outline'}
          size="sm"
          className="glass shadow-lg"
        >
          <Home className="h-4 w-4 mr-2" />
          Convert
        </Button>
      </Link>
      
      <Link href="/docs">
        <Button
          variant={pathname === '/docs' ? 'default' : 'outline'}
          size="sm"
          className="glass shadow-lg"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          API Docs
          <Badge variant="secondary" className="ml-2 text-xs">
            OpenAPI
          </Badge>
        </Button>
      </Link>
      
      <Button
        variant="outline"
        size="sm"
        className="glass shadow-lg"
        onClick={() => window.open('https://github.com/your-username/converthub', '_blank')}
      >
        <Code2 className="h-4 w-4 mr-2" />
        GitHub
      </Button>
    </nav>
  );
}