// app/api/convert/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { converterRegistry } from '@/lib/converter-registry';
import { ConversionRequest, ConversionResponse } from '@/types/converter';

export async function POST(request: NextRequest) {
  try {
    const body: ConversionRequest = await request.json();
    
    // Validate request
    if (!body.input || !body.converterId) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: input and converterId'
      }, { status: 400 });
    }

    // Get converter
    const converter = converterRegistry.get(body.converterId);
    if (!converter) {
      return NextResponse.json({
        success: false,
        error: `Converter '${body.converterId}' not found`
      }, { status: 404 });
    }

    // Process conversion
    const result = await converter.process(body);
    
    // Return result with appropriate status
    const status = result.success ? 200 : 400;
    return NextResponse.json(result, { status });
    
  } catch (error) {
    console.error('Conversion API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      metadata: {
        inputLength: 0,
        outputLength: 0,
        processingTime: 0,
        converterId: 'unknown'
      }
    } as ConversionResponse, { status: 500 });
  }
}

export async function GET() {
  try {
    const stats = converterRegistry.getStats();
    const converters = converterRegistry.getAll().map(converter => ({
      id: converter.id,
      name: converter.name,
      description: converter.description,
      category: converter.category,
      tags: converter.tags,
    }));

    return NextResponse.json({
      success: true,
      data: {
        stats,
        converters,
      }
    });
  } catch (error) {
    console.error('Get converters API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to get converters'
    }, { status: 500 });
  }
}