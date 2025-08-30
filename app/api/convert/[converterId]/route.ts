// app/api/convert/[converterId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { converterRegistry } from '@/lib/converter-registry';
import { ConversionRequest } from '@/types/converter';

interface RouteContext {
  params: {
    converterId: string;
  };
}

/**
 * @swagger
 * /convert/{converterId}:
 *   post:
 *     tags: [Conversion]
 *     summary: Convert using specific converter by ID
 *     description: Convert input text using a specific converter
 *     parameters:
 *       - in: path
 *         name: converterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The converter ID
 *         example: base64-encode
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [input]
 *             properties:
 *               input:
 *                 type: string
 *                 description: Text to convert
 *                 example: "Hello World!"
 *               options:
 *                 type: object
 *                 description: Converter-specific options
 *                 example: {"indent": 2}
 *     responses:
 *       200:
 *         description: Successful conversion
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConversionResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

export async function POST(
  request: NextRequest, 
  context: RouteContext
) {
  try {
    const { converterId } = context.params;
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
    console.error(`Conversion API error for ${context.params.converterId}:`, error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

/**
 * @swagger
 * /convert/{converterId}:
 *   get:
 *     tags: [Conversion]
 *     summary: Get converter information by ID
 *     description: Get detailed information about a specific converter
 *     parameters:
 *       - in: path
 *         name: converterId
 *         required: true
 *         schema:
 *           type: string
 *         description: The converter ID
 *         example: base64-encode
 *     responses:
 *       200:
 *         description: Converter information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ConverterInfo'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export async function GET(
  request: NextRequest, 
  context: RouteContext
) {
  try {
    const { converterId } = context.params;
    
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
    console.error(`Get converter API error for ${context.params.converterId}:`, error);
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}