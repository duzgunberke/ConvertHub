// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { converterRegistry } from '@/lib/converter-registry';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query || query.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Search query is required'
      }, { status: 400 });
    }

    const results = converterRegistry.search(query.trim());
    
    const searchResults = results.map(converter => ({
      id: converter.id,
      name: converter.name,
      description: converter.description,
      category: converter.category,
      tags: converter.tags,
    }));

    return NextResponse.json({
      success: true,
      data: searchResults,
      meta: {
        query: query.trim(),
        resultCount: searchResults.length,
      }
    });
    
  } catch (error) {
    console.error('Search API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Search failed'
    }, { status: 500 });
  }
}