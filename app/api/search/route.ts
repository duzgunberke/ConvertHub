// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { converterRegistry } from '@/lib/converter-registry';

/**
 * @swagger
 * /search:
 *   get:
 *     tags: [Search]
 *     summary: Search converters
 *     description: Search for converters by name, description, or tags
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query
 *         example: base64
 *     responses:
 *       200:
 *         description: Search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ConverterInfo'
 *                 meta:
 *                   type: object
 *                   properties:
 *                     query:
 *                       type: string
 *                     resultCount:
 *                       type: integer
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
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