'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Code2, Github } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 right-4 z-50 flex gap-2">
      
      <Button
        variant="outline"
        size="sm"
        className="glass shadow-lg"
        onClick={() => window.open('https://github.com/duzgunberke/converthub', '_blank')}
      >
        <Github className="h-4 w-4 mr-2" />
        GitHub
        <Badge variant="secondary" className="ml-2 text-xs">
          Open Source
        </Badge>
      </Button>
    </nav>
  );
}