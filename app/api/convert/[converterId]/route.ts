// app/api/convert/[converterId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { converterRegistry } from '@/lib/converter-registry';
import { ConversionRequest } from '@/types/converter';

export async function POST(
  request: NextRequest, 
  context: { params: Promise<{ converterId: string }> }
) {
  try {
    const { converterId } = await context.params;
    const body = await request.json();
    
    // Get converter first to check its type
    const converter = converterRegistry.get(converterId);
    if (!converter) {
      return NextResponse.json({
        success: false,
        error: `Converter '${converterId}' not found`
      }, { status: 404 });
    }

    // For generators, input is not required
    const isGenerator = converter.inputType === 'generator';
    
    // Validate request based on converter type
    if (!isGenerator && (!body.input || body.input.trim().length === 0)) {
      return NextResponse.json({
        success: false,
        error: 'Missing required field: input'
      }, { status: 400 });
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
    const params = await context.params;
    console.error(`Conversion API error for ${params.converterId}:`, error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET(
  request: NextRequest, 
  context: { params: Promise<{ converterId: string }> }
) {
  try {
    const { converterId } = await context.params;
    
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
    const params = await context.params;
    console.error(`Get converter API error for ${params.converterId}:`, error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}