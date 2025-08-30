// lib/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ConvertHub API',
    version: '1.0.0',
    description: 'A powerful API for text and data conversion tools',
    contact: {
      name: 'ConvertHub Support',
      url: 'https://converthub.dev/support',
      email: 'support@converthub.dev'
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT'
    }
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'production' 
        ? 'https://your-domain.vercel.app/api' 
        : 'http://localhost:3000/api',
      description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server'
    }
  ],
  tags: [
    {
      name: 'Conversion',
      description: 'Text and data conversion operations'
    },
    {
      name: 'Categories',
      description: 'Converter category management'
    },
    {
      name: 'Search',
      description: 'Search and discovery'
    }
  ],
  components: {
    schemas: {
      ConversionRequest: {
        type: 'object',
        required: ['input', 'converterId'],
        properties: {
          input: {
            type: 'string',
            description: 'The input text to be converted',
            example: 'Hello World!'
          },
          converterId: {
            type: 'string',
            description: 'The ID of the converter to use',
            example: 'base64-encode'
          },
          options: {
            type: 'object',
            description: 'Optional converter-specific options',
            additionalProperties: true,
            example: { indent: 2 }
          }
        }
      },
      ConversionResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Whether the conversion was successful'
          },
          output: {
            type: 'string',
            description: 'The converted output (present when successful)',
            example: 'SGVsbG8gV29ybGQh'
          },
          error: {
            type: 'string',
            description: 'Error message (present when failed)'
          },
          metadata: {
            type: 'object',
            properties: {
              inputLength: {
                type: 'integer',
                description: 'Length of input text'
              },
              outputLength: {
                type: 'integer',
                description: 'Length of output text'
              },
              processingTime: {
                type: 'integer',
                description: 'Processing time in milliseconds'
              },
              converterId: {
                type: 'string',
                description: 'ID of the converter used'
              }
            }
          }
        }
      },
      ConverterInfo: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Unique converter identifier'
          },
          name: {
            type: 'string',
            description: 'Human-readable converter name'
          },
          description: {
            type: 'string',
            description: 'Description of what the converter does'
          },
          category: {
            type: 'string',
            description: 'Category the converter belongs to'
          },
          tags: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Tags associated with the converter'
          }
        }
      },
      Category: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Category identifier'
          },
          name: {
            type: 'string',
            description: 'Category display name'
          },
          converters: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/ConverterInfo'
            }
          },
          count: {
            type: 'integer',
            description: 'Number of converters in this category'
          }
        }
      },
      ApiResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Whether the request was successful'
          },
          data: {
            type: 'object',
            description: 'Response data (present when successful)'
          },
          error: {
            type: 'string',
            description: 'Error message (present when failed)'
          }
        }
      }
    },
    responses: {
      Success: {
        description: 'Successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ApiResponse'
            }
          }
        }
      },
      BadRequest: {
        description: 'Bad request - Invalid input',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: false
                },
                error: {
                  type: 'string',
                  example: 'Missing required field: input'
                }
              }
            }
          }
        }
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: false
                },
                error: {
                  type: 'string',
                  example: 'Converter not found'
                }
              }
            }
          }
        }
      },
      InternalServerError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                success: {
                  type: 'boolean',
                  example: false
                },
                error: {
                  type: 'string',
                  example: 'Internal server error'
                }
              }
            }
          }
        }
      }
    }
  }
};

const options = {
  definition: swaggerDefinition,
  apis: ['./app/api/**/*.ts'], // Path to the API docs
};

export const swaggerSpec = swaggerJSDoc(options);