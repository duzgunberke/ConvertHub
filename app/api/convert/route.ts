// app/api/convert/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { converterRegistry } from '@/lib/converter-registry';
import { ConversionRequest, ConversionResponse } from '@/types/converter';

/**
 * @swagger
 * /convert:
 *   post:
 *     tags: [Conversion]
 *     summary: Convert text using specified converter
 *     description: Converts input text using the specified converter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConversionRequest'
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

/**
 * @swagger
 * /convert:
 *   get:
 *     tags: [Conversion]
 *     summary: Get all converters and statistics
 *     description: Returns a list of all available converters with usage statistics
 *     responses:
 *       200:
 *         description: List of converters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     stats:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         categories:
 *                           type: integer
 *                         byCategory:
 *                           type: object
 *                     converters:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ConverterInfo'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
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