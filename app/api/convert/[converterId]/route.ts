// app/api/convert/[converterId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { converterRegistry } from '@/lib/converter-registry';
import { ConversionRequest } from '@/types/converter';

export async function POST(
  request: NextRequest, 
  { params }: { params: { converterId: string } }
) {
  try {
    const { converterId } = params;
    const body = await request.json();
    
    // Validate request
    if (!body.input) {
      return NextResponse.json({
        success: false,
        error: 'Missing required field: input'
      }, { status: 400 });
    }

    // Get converter
    const converter = converterRegistry.get(converterId);
    if (!converter) {
      return NextResponse.json({
        success: false,
        error: `Converter '${converterId}' not found`
      }, { status: 404 });
    }

    // Create conversion request
    const conversionRequest: ConversionRequest = {
      input: body.input,
      converterId,
      options: body.options,
    };

    // Process conversion
    const result = await converter.process(conversionRequest);
    
    // Return result with appropriate status
    const status = result.success ? 200 : 400;
    return NextResponse.json(result, { status });
    
  } catch (error) {
    console.error(`Conversion API error for ${params.converterId}:`, error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest, 
  { params }: { params: { converterId: string } }
) {
  try {
    const { converterId } = params;
    
    // Get converter
    const converter = converterRegistry.get(converterId);
    if (!converter) {
      return NextResponse.json({
        success: false,
        error: `Converter '${converterId}' not found`
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: converter.id,
        name: converter.name,
        description: converter.description,
        category: converter.category,
        tags: converter.tags,
      }
    });
    
  } catch (error) {
    console.error(`Get converter API error for ${params.converterId}:`, error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}