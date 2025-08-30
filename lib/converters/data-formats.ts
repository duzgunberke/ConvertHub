// lib/converters/data-formats.ts
import { BaseConverter } from '@/types/converter';
import yaml from 'js-yaml';

export class JSONFormatterConverter extends BaseConverter {
  id = 'json-format';
  name = 'JSON Formatter';
  description = 'Format and validate JSON';
  category = 'data-formats';
  tags = ['json', 'format', 'validate'];

  validate(input: string): { valid: boolean; error?: string } {
    const baseValidation = super.validate(input);
    if (!baseValidation.valid) return baseValidation;

    try {
      JSON.parse(input);
      return { valid: true };
    } catch (error) {
      return { valid: false, error: 'Invalid JSON format' };
    }
  }

  async convert(input: string, options?: { indent?: number; sortKeys?: boolean }): Promise<string> {
    try {
      const parsed = JSON.parse(input);
      const indent = options?.indent || 2;
      
      if (options?.sortKeys) {
        const sortObject = (obj: any): any => {
          if (Array.isArray(obj)) {
            return obj.map(sortObject);
          } else if (obj !== null && typeof obj === 'object') {
            const sortedObj: any = {};
            Object.keys(obj).sort().forEach(key => {
              sortedObj[key] = sortObject(obj[key]);
            });
            return sortedObj;
          }
          return obj;
        };
        
        return JSON.stringify(sortObject(parsed), null, indent);
      }
      
      return JSON.stringify(parsed, null, indent);
    } catch (error) {
      throw new Error('Invalid JSON input');
    }
  }
}

export class JSONMinifyConverter extends BaseConverter {
  id = 'json-minify';
  name = 'JSON Minifier';
  description = 'Minify JSON by removing whitespace';
  category = 'data-formats';
  tags = ['json', 'minify', 'compress'];

  validate(input: string): { valid: boolean; error?: string } {
    const baseValidation = super.validate(input);
    if (!baseValidation.valid) return baseValidation;

    try {
      JSON.parse(input);
      return { valid: true };
    } catch (error) {
      return { valid: false, error: 'Invalid JSON format' };
    }
  }

  async convert(input: string): Promise<string> {
    try {
      const parsed = JSON.parse(input);
      return JSON.stringify(parsed);
    } catch (error) {
      throw new Error('Invalid JSON input');
    }
  }
}

export class YAMLToJSONConverter extends BaseConverter {
  id = 'yaml-to-json';
  name = 'YAML to JSON';
  description = 'Convert YAML to JSON format';
  category = 'data-formats';
  tags = ['yaml', 'json', 'convert'];

  validate(input: string): { valid: boolean; error?: string } {
    const baseValidation = super.validate(input);
    if (!baseValidation.valid) return baseValidation;

    try {
      yaml.load(input);
      return { valid: true };
    } catch (error) {
      return { valid: false, error: 'Invalid YAML format' };
    }
  }

  async convert(input: string, options?: { indent?: number }): Promise<string> {
    try {
      const parsed = yaml.load(input);
      const indent = options?.indent || 2;
      return JSON.stringify(parsed, null, indent);
    } catch (error) {
      throw new Error('Invalid YAML input');
    }
  }
}

export class JSONToYAMLConverter extends BaseConverter {
  id = 'json-to-yaml';
  name = 'JSON to YAML';
  description = 'Convert JSON to YAML format';
  category = 'data-formats';
  tags = ['json', 'yaml', 'convert'];

  validate(input: string): { valid: boolean; error?: string } {
    const baseValidation = super.validate(input);
    if (!baseValidation.valid) return baseValidation;

    try {
      JSON.parse(input);
      return { valid: true };
    } catch (error) {
      return { valid: false, error: 'Invalid JSON format' };
    }
  }

  async convert(input: string, options?: { indent?: number }): Promise<string> {
    try {
      const parsed = JSON.parse(input);
      const indent = options?.indent || 2;
      return yaml.dump(parsed, { indent });
    } catch (error) {
      throw new Error('Invalid JSON input');
    }
  }
}

export class XMLFormatterConverter extends BaseConverter {
  id = 'xml-format';
  name = 'XML Formatter';
  description = 'Format and validate XML';
  category = 'data-formats';
  tags = ['xml', 'format', 'validate'];

  async convert(input: string, options?: { indent?: string }): Promise<string> {
    const indent = options?.indent || '  ';
    
    // Simple XML formatter - in production, use a proper XML library
    let formatted = '';
    let indentLevel = 0;
    const tokens = input.match(/<\/?[^>]+>|[^<]+/g) || [];
    
    for (const token of tokens) {
      const trimmed = token.trim();
      if (!trimmed) continue;
      
      if (trimmed.startsWith('</')) {
        indentLevel--;
        formatted += indent.repeat(Math.max(0, indentLevel)) + trimmed + '\n';
      } else if (trimmed.startsWith('<') && !trimmed.endsWith('/>')) {
        formatted += indent.repeat(indentLevel) + trimmed + '\n';
        indentLevel++;
      } else if (trimmed.startsWith('<') && trimmed.endsWith('/>')) {
        formatted += indent.repeat(indentLevel) + trimmed + '\n';
      } else {
        formatted += indent.repeat(indentLevel) + trimmed + '\n';
      }
    }
    
    return formatted.trim();
  }
}