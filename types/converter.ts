// types/converter.ts - Enhanced version

export interface ConversionRequest {
  input?: string;  // Made optional for generators
  converterId: string;
  options?: Record<string, any>;
  files?: File[];  // For file-based converters
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

// New converter input types
export type ConverterInputType = 
  | 'text'           // Default text input
  | 'generator'      // No input needed, just generate
  | 'number'         // Number input
  | 'options'        // Form with options
  | 'file'           // File upload
  | 'multiline'      // Large text area
  | 'json'           // JSON specific input
  | 'regex'          // Regex tester
  | 'color';         // Color picker

// Input field configuration
export interface InputField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'checkbox' | 'range' | 'color' | 'file';
  placeholder?: string;
  defaultValue?: any;
  options?: Array<{ label: string; value: any }>;
  min?: number;
  max?: number;
  required?: boolean;
  description?: string;
}

export interface ConverterConfig {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  featured?: boolean;
  inputType: ConverterInputType;
  
  // Input configuration
  inputFields?: InputField[];
  inputPlaceholder?: string;
  inputLabel?: string;
  
  // Output configuration
  outputType?: 'text' | 'json' | 'qr' | 'image';
  outputLabel?: string;
  
  // UI hints
  allowFileUpload?: boolean;
  maxFileSize?: number;
  acceptedFileTypes?: string[];
  showInputCounter?: boolean;
  showOutputCounter?: boolean;
  
  inputValidation?: {
    required: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
  
  examples?: Array<{
    name: string;
    input?: string;
    options?: Record<string, any>;
    output: string;
    description?: string;
  }>;
}

export abstract class BaseConverter {
  abstract id: string;
  abstract name: string;
  abstract description: string;
  abstract category: string;
  abstract tags: string[];
  inputType: ConverterInputType = 'text'; // Default to text

  // Input configuration
  inputFields?: InputField[];
  inputPlaceholder?: string;
  inputLabel?: string;
  
  // Output configuration
  outputType?: 'text' | 'json' | 'qr' | 'image' = 'text';
  outputLabel?: string;
  
  // UI configuration
  allowFileUpload?: boolean = false;
  maxFileSize?: number = 10 * 1024 * 1024; // 10MB
  acceptedFileTypes?: string[] = ['.txt', '.json', '.csv'];
  showInputCounter?: boolean = true;
  showOutputCounter?: boolean = true;

  abstract convert(input?: string, options?: Record<string, any>): Promise<string>;
  
  validate(input?: string, options?: Record<string, any>): { valid: boolean; error?: string } {
    // For generators, input is not required
    if (this.inputType === 'generator') {
      return { valid: true };
    }
    
    if (!input || input.trim().length === 0) {
      return { valid: false, error: "Input is required" };
    }
    return { valid: true };
  }

  async process(request: ConversionRequest): Promise<ConversionResponse> {
    const startTime = Date.now();
    
    try {
      const validation = this.validate(request.input, request.options);
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
          inputLength: request.input?.length || 0,
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
          inputLength: request.input?.length || 0,
          outputLength: 0,
          processingTime: Date.now() - startTime,
          converterId: this.id,
        },
      };
    }
  }
}