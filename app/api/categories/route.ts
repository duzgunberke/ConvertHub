// app/api/categories/route.ts
import { NextResponse } from 'next/server';
import { converterRegistry } from '@/lib/converter-registry';

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: Get all converter categories
 *     description: Returns a list of all converter categories with their converters
 *     responses:
 *       200:
 *         description: List of categories
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
 *                     $ref: '#/components/schemas/Category'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export async function GET() {
  try {
    const categories = converterRegistry.getCategories();
    const categoriesWithConverters = categories.map(category => {
      const converters = converterRegistry.getByCategory(category);
      
      return {
        id: category,
        name: category.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' & '),
        converters: converters.map(converter => ({
          id: converter.id,
          name: converter.name,
          description: converter.description,
          tags: converter.tags,
        })),
        count: converters.length,
      };
    });

    return NextResponse.json({
      success: true,
      data: categoriesWithConverters
    });
    
  } catch (error) {
    console.error('Get categories API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to get categories'
    }, { status: 500 });
  }
}