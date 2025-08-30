// lib/converters/all-converters.ts - Updated existing converters
import { BaseConverter } from '@/types/converter';
import crypto from 'crypto';

// ================ TEXT & ENCODING ================

export class Base64EncodeConverter extends BaseConverter {
  id = 'base64-encode';
  name = 'Base64 Encode';
  description = 'Encode text to Base64 format';
  category = 'text-encoding';
  tags = ['base64', 'encode', 'text'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    return Buffer.from(input || '', 'utf8').toString('base64');
  }
}

export class Base64DecodeConverter extends BaseConverter {
  id = 'base64-decode';
  name = 'Base64 Decode';
  description = 'Decode Base64 to text';
  category = 'text-encoding';
  tags = ['base64', 'decode', 'text'];
  inputType = 'text' as const;

  validate(input?: string) {
    const base = super.validate(input);
    if (!base.valid) return base;
    
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test((input || '').replace(/\s/g, ''))) {
      return { valid: false, error: 'Invalid Base64 format' };
    }
    return { valid: true };
  }

  async convert(input?: string): Promise<string> {
    return Buffer.from(input || '', 'base64').toString('utf8');
  }
}

export class URLEncodeConverter extends BaseConverter {
  id = 'url-encode';
  name = 'URL Encode';
  description = 'Encode text for URL usage';
  category = 'text-encoding';
  tags = ['url', 'encode', 'web'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    return encodeURIComponent(input || '');
  }
}

export class URLDecodeConverter extends BaseConverter {
  id = 'url-decode';
  name = 'URL Decode';
  description = 'Decode URL encoded text';
  category = 'text-encoding';
  tags = ['url', 'decode', 'web'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    return decodeURIComponent(input || '');
  }
}

export class HTMLEncodeConverter extends BaseConverter {
  id = 'html-encode';
  name = 'HTML Encode';
  description = 'Encode special HTML characters';
  category = 'text-encoding';
  tags = ['html', 'encode', 'web'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    const entities: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;',
    };
    return (input || '').replace(/[&<>"'/]/g, (match) => entities[match]);
  }
}

export class HTMLDecodeConverter extends BaseConverter {
  id = 'html-decode';
  name = 'HTML Decode';
  description = 'Decode HTML entities';
  category = 'text-encoding';
  tags = ['html', 'decode', 'web'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    const entities: { [key: string]: string } = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#x27;': "'",
      '&#x2F;': '/',
      '&apos;': "'",
    };
    return (input || '').replace(/&(?:amp|lt|gt|quot|#x27|#x2F|apos);/g, (match) => entities[match] || match);
  }
}

export class TextUppercaseConverter extends BaseConverter {
  id = 'text-uppercase';
  name = 'Text Uppercase';
  description = 'Convert text to uppercase';
  category = 'text-encoding';
  tags = ['text', 'uppercase', 'case'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    return (input || '').toUpperCase();
  }
}

export class TextLowercaseConverter extends BaseConverter {
  id = 'text-lowercase';
  name = 'Text Lowercase';
  description = 'Convert text to lowercase';
  category = 'text-encoding';
  tags = ['text', 'lowercase', 'case'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    return (input || '').toLowerCase();
  }
}

export class TextCapitalizeConverter extends BaseConverter {
  id = 'text-capitalize';
  name = 'Text Capitalize';
  description = 'Capitalize first letter of each word';
  category = 'text-encoding';
  tags = ['text', 'capitalize', 'case'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    return (input || '').replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }
}

export class TextReverseConverter extends BaseConverter {
  id = 'text-reverse';
  name = 'Text Reverse';
  description = 'Reverse text characters';
  category = 'text-encoding';
  tags = ['text', 'reverse'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    return (input || '').split('').reverse().join('');
  }
}

// ================ CRYPTOGRAPHY ================

export class MD5HashConverter extends BaseConverter {
  id = 'hash-md5';
  name = 'MD5 Hash';
  description = 'Generate MD5 hash';
  category = 'cryptography';
  tags = ['hash', 'md5', 'crypto'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    return crypto.createHash('md5').update(input || '').digest('hex');
  }
}

export class SHA1HashConverter extends BaseConverter {
  id = 'hash-sha1';
  name = 'SHA1 Hash';
  description = 'Generate SHA1 hash';
  category = 'cryptography';
  tags = ['hash', 'sha1', 'crypto'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    return crypto.createHash('sha1').update(input || '').digest('hex');
  }
}

export class SHA256HashConverter extends BaseConverter {
  id = 'hash-sha256';
  name = 'SHA256 Hash';
  description = 'Generate SHA256 hash';
  category = 'cryptography';
  tags = ['hash', 'sha256', 'crypto'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    return crypto.createHash('sha256').update(input || '').digest('hex');
  }
}

export class SHA512HashConverter extends BaseConverter {
  id = 'hash-sha512';
  name = 'SHA512 Hash';
  description = 'Generate SHA512 hash';
  category = 'cryptography';
  tags = ['hash', 'sha512', 'crypto'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    return crypto.createHash('sha512').update(input || '').digest('hex');
  }
}

export class HMACConverter extends BaseConverter {
  id = 'hmac-sha256';
  name = 'HMAC-SHA256';
  description = 'Generate HMAC with secret key (input|key on separate lines)';
  category = 'cryptography';
  tags = ['hmac', 'hash', 'crypto'];
  inputType = 'multiline' as const;

  validate(input?: string) {
    const base = super.validate(input);
    if (!base.valid) return base;
    
    const lines = (input || '').split('\n');
    if (lines.length < 2) {
      return { valid: false, error: 'Format: text on first line, secret key on second line' };
    }
    return { valid: true };
  }

  async convert(input?: string): Promise<string> {
    const lines = (input || '').split('\n');
    const text = lines[0];
    const key = lines[1];
    return crypto.createHmac('sha256', key).update(text).digest('hex');
  }
}

// ================ NUMBERS & MATH ================

export class DecimalToBinaryConverter extends BaseConverter {
  id = 'decimal-to-binary';
  name = 'Decimal to Binary';
  description = 'Convert decimal numbers to binary';
  category = 'numbers-math';
  tags = ['decimal', 'binary', 'conversion'];
  inputType = 'text' as const;

  validate(input?: string) {
    const base = super.validate(input);
    if (!base.valid) return base;
    
    if (!/^\d+$/.test((input || '').trim())) {
      return { valid: false, error: 'Input must be a valid decimal number' };
    }
    return { valid: true };
  }

  async convert(input?: string): Promise<string> {
    return parseInt((input || '').trim()).toString(2);
  }
}

export class BinaryToDecimalConverter extends BaseConverter {
  id = 'binary-to-decimal';
  name = 'Binary to Decimal';
  description = 'Convert binary numbers to decimal';
  category = 'numbers-math';
  tags = ['binary', 'decimal', 'conversion'];
  inputType = 'text' as const;

  validate(input?: string) {
    const base = super.validate(input);
    if (!base.valid) return base;
    
    if (!/^[01]+$/.test((input || '').trim())) {
      return { valid: false, error: 'Input must contain only 0s and 1s' };
    }
    return { valid: true };
  }

  async convert(input?: string): Promise<string> {
    return parseInt((input || '').trim(), 2).toString();
  }
}

export class DecimalToHexConverter extends BaseConverter {
  id = 'decimal-to-hex';
  name = 'Decimal to Hex';
  description = 'Convert decimal numbers to hexadecimal';
  category = 'numbers-math';
  tags = ['decimal', 'hex', 'conversion'];
  inputType = 'text' as const;

  validate(input?: string) {
    const base = super.validate(input);
    if (!base.valid) return base;
    
    if (!/^\d+$/.test((input || '').trim())) {
      return { valid: false, error: 'Input must be a valid decimal number' };
    }
    return { valid: true };
  }

  async convert(input?: string): Promise<string> {
    return parseInt((input || '').trim()).toString(16).toUpperCase();
  }
}

export class HexToDecimalConverter extends BaseConverter {
  id = 'hex-to-decimal';
  name = 'Hex to Decimal';
  description = 'Convert hexadecimal to decimal';
  category = 'numbers-math';
  tags = ['hex', 'decimal', 'conversion'];
  inputType = 'text' as const;

  validate(input?: string) {
    const base = super.validate(input);
    if (!base.valid) return base;
    
    if (!/^[0-9A-Fa-f]+$/.test((input || '').trim())) {
      return { valid: false, error: 'Input must be valid hexadecimal (0-9, A-F)' };
    }
    return { valid: true };
  }

  async convert(input?: string): Promise<string> {
    return parseInt((input || '').trim(), 16).toString();
  }
}

// ================ COLORS & DESIGN ================

export class HexToRGBConverter extends BaseConverter {
  id = 'hex-to-rgb';
  name = 'Hex to RGB';
  description = 'Convert hex colors to RGB';
  category = 'colors-design';
  tags = ['color', 'hex', 'rgb'];
  inputType = 'text' as const;

  validate(input?: string) {
    const base = super.validate(input);
    if (!base.valid) return base;
    
    const hex = (input || '').trim().replace('#', '');
    if (!/^[0-9A-Fa-f]{6}$/.test(hex) && !/^[0-9A-Fa-f]{3}$/.test(hex)) {
      return { valid: false, error: 'Invalid hex color format (use #RRGGBB or #RGB)' };
    }
    return { valid: true };
  }

  async convert(input?: string): Promise<string> {
    let hex = (input || '').trim().replace('#', '');
    
    if (hex.length === 3) {
      hex = hex.split('').map(h => h + h).join('');
    }
    
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    return `rgb(${r}, ${g}, ${b})`;
  }
}

export class RGBToHexConverter extends BaseConverter {
  id = 'rgb-to-hex';
  name = 'RGB to Hex';
  description = 'Convert RGB colors to hex';
  category = 'colors-design';
  tags = ['color', 'rgb', 'hex'];
  inputType = 'text' as const;

  validate(input?: string) {
    const base = super.validate(input);
    if (!base.valid) return base;
    
    const rgbRegex = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;
    if (!rgbRegex.test((input || '').trim())) {
      return { valid: false, error: 'Invalid RGB format (use rgb(r, g, b))' };
    }
    return { valid: true };
  }

  async convert(input?: string): Promise<string> {
    const match = (input || '').match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i);
    if (!match) throw new Error('Invalid RGB format');
    
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    
    const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
}

// ================ TIME & DATE ================

export class TimestampToDateConverter extends BaseConverter {
  id = 'timestamp-to-date';
  name = 'Timestamp to Date';
  description = 'Convert Unix timestamp to human readable date';
  category = 'time-date';
  tags = ['timestamp', 'date', 'unix'];
  inputType = 'text' as const;

  validate(input?: string) {
    const base = super.validate(input);
    if (!base.valid) return base;
    
    if (!/^\d+$/.test((input || '').trim())) {
      return { valid: false, error: 'Input must be a valid Unix timestamp' };
    }
    return { valid: true };
  }

  async convert(input?: string): Promise<string> {
    const timestamp = parseInt((input || '').trim());
    const date = new Date(timestamp * 1000);
    return date.toISOString() + '\n' + date.toLocaleString();
  }
}

export class DateToTimestampConverter extends BaseConverter {
  id = 'date-to-timestamp';
  name = 'Date to Timestamp';
  description = 'Convert date to Unix timestamp';
  category = 'time-date';
  tags = ['date', 'timestamp', 'unix'];
  inputType = 'text' as const;

  async convert(input?: string): Promise<string> {
    const date = new Date((input || '').trim());
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    return Math.floor(date.getTime() / 1000).toString();
  }
}

// ================ DATA FORMATS ================

export class JSONFormatterConverter extends BaseConverter {
  id = 'json-format';
  name = 'JSON Formatter';
  description = 'Format and validate JSON';
  category = 'data-formats';
  tags = ['json', 'format', 'validate'];
  inputType = 'json' as const;

  validate(input?: string) {
    const base = super.validate(input);
    if (!base.valid) return base;
    
    try {
      JSON.parse(input || '');
      return { valid: true };
    } catch (error) {
      return { valid: false, error: 'Invalid JSON format' };
    }
  }

  async convert(input?: string, options?: { indent?: number }): Promise<string> {
    const parsed = JSON.parse(input || '');
    const indent = options?.indent || 2;
    return JSON.stringify(parsed, null, indent);
  }
}

export class JSONMinifyConverter extends BaseConverter {
  id = 'json-minify';
  name = 'JSON Minifier';
  description = 'Minify JSON by removing whitespace';
  category = 'data-formats';
  tags = ['json', 'minify', 'compress'];
  inputType = 'json' as const;

  validate(input?: string) {
    const base = super.validate(input);
    if (!base.valid) return base;
    
    try {
      JSON.parse(input || '');
      return { valid: true };
    } catch (error) {
      return { valid: false, error: 'Invalid JSON format' };
    }
  }

  async convert(input?: string): Promise<string> {
    const parsed = JSON.parse(input || '');
    return JSON.stringify(parsed);
  }
}

// ================ GENERATORS ================

export class UUIDGeneratorConverter extends BaseConverter {
  id = 'uuid-generate';
  name = 'UUID Generator';
  description = 'Generate UUID v4 (ignores input)';
  category = 'generators';
  tags = ['uuid', 'generate', 'unique'];
  inputType = 'generator' as const;

  async convert(input?: string): Promise<string> {
    return crypto.randomUUID();
  }
}

export class LoremGeneratorConverter extends BaseConverter {
  id = 'lorem-generate';
  name = 'Lorem Ipsum Generator';
  description = 'Generate Lorem Ipsum text';
  category = 'generators';
  tags = ['lorem', 'ipsum', 'placeholder'];
  inputType = 'generator' as const;
  
  inputFields = [
    {
      name: 'wordCount',
      label: 'Word Count',
      type: 'range' as const,
      defaultValue: 50,
      min: 10,
      max: 500,
      description: 'Number of words to generate'
    }
  ];

  async convert(input?: string, options?: Record<string, any>): Promise<string> {
    const wordCount = options?.wordCount || 50;
    const words = [
      'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
      'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
      'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
      'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
      'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
      'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
      'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
      'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ];

    let result = [];
    for (let i = 0; i < wordCount; i++) {
      result.push(words[i % words.length]);
    }

    return result.join(' ') + '.';
  }
}