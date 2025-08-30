'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import 'swagger-ui-react/swagger-ui.css';

// Dynamically import SwaggerUI to avoid SSR issues
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading API documentation...</p>
      </div>
    </div>
  )
});

export default function DocsPage() {
  const [spec, setSpec] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadApiSpec = async () => {
      try {
        const response = await fetch('/api/docs');
        
        if (!response.ok) {
          throw new Error(`Failed to load API spec: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (isMounted) {
          setSpec(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load API spec:', err);
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load API specification');
          setLoading(false);
        }
      }
    };

    loadApiSpec();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gradient-primary mb-2">
              ConvertHub API Documentation
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete API reference for ConvertHub conversion services
            </p>
          </div>
          
          <div className="bg-card rounded-lg border border-border p-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading API documentation...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gradient-primary mb-2">
              ConvertHub API Documentation
            </h1>
            <p className="text-lg text-muted-foreground">
              Complete API reference for ConvertHub conversion services
            </p>
          </div>
          
          <Alert className="max-w-2xl">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient-primary mb-2">
            ConvertHub API Documentation
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete API reference for ConvertHub conversion services
          </p>
        </div>
        
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          {spec && (
            <SwaggerUI 
              spec={spec}
              docExpansion="list"
              defaultModelsExpandDepth={2}
              defaultModelRendering="model"
              tryItOutEnabled={true}
              filter={true}
              showCommonExtensions={true}
              showExtensions={true}
              supportedSubmitMethods={['get', 'post', 'put', 'delete', 'patch']}
              persistAuthorization={true}
              displayOperationId={false}
              displayRequestDuration={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}