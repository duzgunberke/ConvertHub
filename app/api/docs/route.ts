// app/api/docs/route.ts
import { NextResponse } from 'next/server';
import { swaggerSpec } from '@/lib/swagger';

/**
 * @swagger
 * /docs:
 *   get:
 *     tags: [Documentation]
 *     summary: Get API specification
 *     description: Returns the OpenAPI specification for this API
 *     responses:
 *       200:
 *         description: API specification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET() {
  return NextResponse.json(swaggerSpec);
}