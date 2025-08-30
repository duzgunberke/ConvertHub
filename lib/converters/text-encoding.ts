// lib/converters/text-encoding.ts
import { BaseConverter } from '@/types/converter';

export class Base64EncodeConverter extends BaseConverter {
  id = 'base64-encode';
  name = 'Base64 Encode';
  description = 'Encode text to Base64 format';
  category = 'text-encoding';
  tags = ['base64', 'encode', 'text'];

  async convert(input: string): Promise<string> {
    try {
      return Buffer.from(input, 'utf8').toString('base64');
    } catch (error) {
      throw new Error('Failed to encode to Base64');
    }
  }
}

export class Base64DecodeConverter extends BaseConverter {
  id = 'base64-decode';
  name = 'Base64 Decode';
  description = 'Decode Base64 to text';
  category = 'text-encoding';
  tags = ['base64', 'decode', 'text'];

  validate(input: string): { valid: boolean; error?: string } {
    const baseValidation = super.validate(input);
    if (!baseValidation.valid) return baseValidation;

    // Check if input is valid base64
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(input.replace(/\s/g, ''))) {
      return { valid: false, error: 'Invalid Base64 format' };
    }

    return { valid: true };
  }

  async convert(input: string): Promise<string> {
    try {
      return Buffer.from(input, 'base64').toString('utf8');
    } catch (error) {
      throw new Error('Invalid Base64 input');
    }
  }
}

export class URLEncodeConverter extends BaseConverter {
  id = 'url-encode';
  name = 'URL Encode';
  description = 'Encode text for URL usage';
  category = 'text-encoding';
  tags = ['url', 'encode', 'web'];

  async convert(input: string): Promise<string> {
    return encodeURIComponent(input);
  }
}

export class URLDecodeConverter extends BaseConverter {
  id = 'url-decode';
  name = 'URL Decode';
  description = 'Decode URL encoded text';
  category = 'text-encoding';
  tags = ['url', 'decode', 'web'];

  async convert(input: string): Promise<string> {
    try {
      return decodeURIComponent(input);
    } catch (error) {
      throw new Error('Invalid URL encoded input');
    }
  }
}

export class HTMLEncodeConverter extends BaseConverter {
  id = 'html-encode';
  name = 'HTML Encode';
  description = 'Encode special HTML characters';
  category = 'text-encoding';
  tags = ['html', 'encode', 'web'];

  async convert(input: string): Promise<string> {
    const htmlEntities: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };

    return input.replace(/[&<>"'/]/g, (match) => htmlEntities[match]);
  }
}

export class HTMLDecodeConverter extends BaseConverter {
  id = 'html-decode';
  name = 'HTML Decode';
  description = 'Decode HTML entities';
  category = 'text-encoding';
  tags = ['html', 'decode', 'web'];

  async convert(input: string): Promise<string> {
    const htmlEntities: { [key: string]: string } = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#x27;': "'",
      '&#x2F;': '/',
      '&apos;': "'",
    };

    return input.replace(/&(?:amp|lt|gt|quot|#x27|#x2F|apos);/g, (match) => 
      htmlEntities[match] || match
    );
  }
}