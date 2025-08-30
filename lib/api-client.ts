// lib/api-client.ts
'use client';

import { useState, useCallback } from 'react';
import { ConversionRequest, ConversionResponse, ConverterConfig } from '@/types/converter';

export class ConverterAPIClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  async convert(request: ConversionRequest): Promise<ConversionResponse> {
    const response = await fetch(`${this.baseUrl}/convert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async convertWithId(converterId: string, input: string, options?: Record<string, any>): Promise<ConversionResponse> {
    const response = await fetch(`${this.baseUrl}/convert/${converterId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input, options }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getConverters(): Promise<{ success: boolean; data: { stats: any; converters: ConverterConfig[] } }> {
    const response = await fetch(`${this.baseUrl}/convert`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getConverter(converterId: string): Promise<{ success: boolean; data: ConverterConfig }> {
    const response = await fetch(`${this.baseUrl}/convert/${converterId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getCategories(): Promise<{ success: boolean; data: any[] }> {
    const response = await fetch(`${this.baseUrl}/categories`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async search(query: string): Promise<{ success: boolean; data: ConverterConfig[] }> {
    const response = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Batch conversion for multiple inputs
  async batchConvert(requests: ConversionRequest[]): Promise<ConversionResponse[]> {
    const results = await Promise.allSettled(
      requests.map(request => this.convert(request))
    );

    return results.map(result => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          success: false,
          error: result.reason.message || 'Conversion failed',
          metadata: {
            inputLength: 0,
            outputLength: 0,
            processingTime: 0,
            converterId: 'unknown'
          }
        };
      }
    });
  }

  // Health check
  async healthCheck(): Promise<{ success: boolean; status: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
      });

      if (!response.ok) {
        return { success: false, status: 'unhealthy' };
      }

      return { success: true, status: 'healthy' };
    } catch (error) {
      return { success: false, status: 'unreachable' };
    }
  }
}

// Singleton instance
export const apiClient = new ConverterAPIClient();

// React Hook for API calls
export function useConverter() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convert = useCallback(async (request: ConversionRequest): Promise<ConversionResponse | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.convert(request);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const convertWithId = useCallback(async (
    converterId: string, 
    input: string, 
    options?: Record<string, any>
  ): Promise<ConversionResponse | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.convertWithId(converterId, input, options);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Conversion failed';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const batchConvert = useCallback(async (requests: ConversionRequest[]): Promise<ConversionResponse[] | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await apiClient.batchConvert(requests);
      return results;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Batch conversion failed';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    convert,
    convertWithId,
    batchConvert,
    loading,
    error,
    clearError: () => setError(null),
  };
}

// Hook for converter metadata
export function useConverterMeta() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getConverters = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.getConverters();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get converters';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const searchConverters = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiClient.search(query);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getConverters,
    searchConverters,
    loading,
    error,
  };
}