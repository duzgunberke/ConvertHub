// types/converter.ts

export interface ConversionRequest {
  input: string;
  converterId: string;
  options?: Record<string, any>;
}

export interface ConversionResponse {
  success: boolean;
  output?: string;
  error?: string;
  metadata?: {
    inputLength: number;
    outputLength: number;
    processingTime: number;
    converterId: string;
  };
}

export interface ConverterConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  featured?: boolean;
  inputValidation?: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  outputFormat?: string;
  examples?: {
    input: string;
    output: string;
  }[];
}

export abstract class BaseConverter {
  abstract id: string;
  abstract name: string;
  abstract description: string;
  abstract category: string;
  abstract tags: string[];

  abstract convert(input: string, options?: Record<string, any>): Promise<string>;
  
  validate(input: string): { valid: boolean; error?: string } {
    if (!input || input.trim().length === 0) {
      return { valid: false, error: "Input is required" };
    }
    return { valid: true };
  }

  async process(request: ConversionRequest): Promise<ConversionResponse> {
    const startTime = Date.now();
    
    try {
      const validation = this.validate(request.input);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error,
        };
      }

      const output = await this.convert(request.input, request.options);
      const processingTime = Date.now() - startTime;

      return {
        success: true,
        output,
        metadata: {
          inputLength: request.input.length,
          outputLength: output.length,
          processingTime,
          converterId: this.id,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Conversion failed",
        metadata: {
          inputLength: request.input.length,
          outputLength: 0,
          processingTime: Date.now() - startTime,
          converterId: this.id,
        },
      };
    }
  }
}