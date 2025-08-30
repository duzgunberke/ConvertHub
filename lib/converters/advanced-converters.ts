// lib/converters/advanced-converters.ts
import { BaseConverter } from '@/types/converter';
import * as crypto from 'crypto';

// ================ CSS/SCSS/LESS CONVERTERS ================

export class CSSMinifierConverter extends BaseConverter {
  id = 'css-minify';
  name = 'CSS Minifier';
  description = 'Minify CSS by removing whitespace and comments';
  category = 'css-tools';
  tags = ['css', 'minify', 'compress'];
  inputType = 'multiline' as const;
  inputPlaceholder = 'Enter your CSS code here...';
  inputLabel = 'CSS Input';
  outputLabel = 'Minified CSS';

  async convert(input: string): Promise<string> {
    return input
      // Remove comments
      .replace(/\/\*[\s\S]*?\*\//g, '')
      // Remove unnecessary whitespace
      .replace(/\s+/g, ' ')
      // Remove whitespace around special characters
      .replace(/\s*([{}:;,>+~])\s*/g, '$1')
      // Remove trailing semicolon before }
      .replace(/;}/g, '}')
      // Remove leading/trailing whitespace
      .trim();
  }
}

export class CSSFormatterConverter extends BaseConverter {
  id = 'css-format';
  name = 'CSS Formatter';
  description = 'Format and beautify CSS code';
  category = 'css-tools';
  tags = ['css', 'format', 'beautify'];
  inputType = 'multiline' as const;
  inputPlaceholder = 'Enter your minified CSS here...';
  inputLabel = 'CSS Input';
  outputLabel = 'Formatted CSS';
  
  inputFields = [
    {
      name: 'indentSize',
      label: 'Indent Size',
      type: 'range' as const,
      defaultValue: 2,
      min: 2,
      max: 8,
      description: 'Number of spaces for indentation'
    }
  ];

  async convert(input: string, options?: Record<string, any>): Promise<string> {
    const indentSize = options?.indentSize || 2;
    const indent = ' '.repeat(indentSize);
    let formatted = '';
    let depth = 0;

    // Basic CSS formatting
    const tokens = input.split(/([{}:;])/);
    
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i].trim();
      
      if (!token) continue;
      
      if (token === '{') {
        formatted += ' {\n';
        depth++;
      } else if (token === '}') {
        depth--;
        formatted += '\n' + indent.repeat(depth) + '}\n';
      } else if (token === ';') {
        formatted += ';\n' + indent.repeat(depth);
      } else if (token === ':') {
        formatted += ': ';
      } else {
        if (!formatted.endsWith(' ') && !formatted.endsWith('\n')) {
          formatted += ' ';
        }
        formatted += token;
      }
    }

    return formatted.trim();
  }
}

// ================ SQL FORMATTER ================

export class SQLFormatterConverter extends BaseConverter {
  id = 'sql-format';
  name = 'SQL Formatter';
  description = 'Format and beautify SQL queries';
  category = 'database-tools';
  tags = ['sql', 'format', 'database'];
  inputType = 'multiline' as const;
  inputPlaceholder = 'Enter your SQL query here...';
  inputLabel = 'SQL Input';
  outputLabel = 'Formatted SQL';

  inputFields = [
    {
      name: 'uppercase',
      label: 'Uppercase Keywords',
      type: 'checkbox' as const,
      defaultValue: true,
      description: 'Convert SQL keywords to uppercase'
    }
  ];

  async convert(input: string, options?: Record<string, any>): Promise<string> {
    const uppercase = options?.uppercase !== false;
    
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER',
      'ON', 'AND', 'OR', 'NOT', 'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL',
      'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE',
      'ALTER', 'DROP', 'INDEX', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES',
      'GROUP', 'BY', 'HAVING', 'ORDER', 'ASC', 'DESC', 'LIMIT', 'OFFSET',
      'UNION', 'ALL', 'DISTINCT', 'AS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'
    ];

    let formatted = input;

    if (uppercase) {
      keywords.forEach(keyword => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
        formatted = formatted.replace(regex, keyword.toUpperCase());
      });
    }

    // Basic formatting
    formatted = formatted
      .replace(/\s+/g, ' ')
      .replace(/,\s*/g, ',\n  ')
      .replace(/\bFROM\b/gi, '\nFROM')
      .replace(/\bWHERE\b/gi, '\nWHERE')
      .replace(/\bJOIN\b/gi, '\nJOIN')
      .replace(/\bORDER\s+BY\b/gi, '\nORDER BY')
      .replace(/\bGROUP\s+BY\b/gi, '\nGROUP BY')
      .replace(/\bHAVING\b/gi, '\nHAVING')
      .trim();

    return formatted;
  }
}

// ================ REGEX TESTER ================

export class RegexTesterConverter extends BaseConverter {
  id = 'regex-test';
  name = 'RegEx Tester';
  description = 'Test regular expressions against text';
  category = 'regex-tools';
  tags = ['regex', 'test', 'pattern'];
  inputType = 'options' as const;
  inputLabel = 'Text to Test';
  outputLabel = 'Test Results';

  inputFields = [
    {
      name: 'pattern',
      label: 'Regular Expression',
      type: 'text' as const,
      placeholder: '^[a-zA-Z0-9]+$',
      required: true,
      description: 'Enter your regex pattern'
    },
    {
      name: 'flags',
      label: 'Flags',
      type: 'text' as const,
      placeholder: 'gi',
      defaultValue: 'g',
      description: 'Regex flags (g, i, m, s, u, y)'
    },
    {
      name: 'showMatches',
      label: 'Show Matches',
      type: 'checkbox' as const,
      defaultValue: true,
      description: 'Highlight and list all matches'
    }
  ];

  async convert(input: string, options?: Record<string, any>): Promise<string> {
    const pattern = options?.pattern;
    const flags = options?.flags || 'g';
    const showMatches = options?.showMatches !== false;

    if (!pattern) {
      throw new Error('Regular expression pattern is required');
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matches = Array.from(input.matchAll(regex));
      
      let result = `Pattern: ${pattern}\nFlags: ${flags}\nTest String Length: ${input.length}\n\n`;
      
      if (matches.length === 0) {
        result += '❌ No matches found\n';
      } else {
        result += `✅ Found ${matches.length} match(es)\n\n`;
        
        if (showMatches) {
          result += 'Matches:\n';
          matches.forEach((match, index) => {
            result += `${index + 1}. "${match[0]}" at position ${match.index}\n`;
            if (match.length > 1) {
              result += '   Groups: ' + match.slice(1).map((g, i) => `$${i+1}="${g}"`).join(', ') + '\n';
            }
          });
          
          result += '\nText with highlights:\n';
          let highlightedText = input;
          let offset = 0;
          matches.forEach(match => {
            const start = match.index! + offset;
            const end = start + match[0].length;
            highlightedText = highlightedText.slice(0, start) + 
                            `[MATCH: ${match[0]}]` + 
                            highlightedText.slice(end);
            offset += `[MATCH: ]`.length;
          });
          result += highlightedText;
        }
      }
      
      return result;
    } catch (error) {
      throw new Error(`Invalid regular expression: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// ================ QR CODE GENERATOR ================

export class QRCodeGeneratorConverter extends BaseConverter {
  id = 'qr-generate';
  name = 'QR Code Generator';
  description = 'Generate QR codes from text';
  category = 'generators';
  tags = ['qr', 'qrcode', 'generate'];
  inputType = 'options' as const;
  inputLabel = 'Text for QR Code';
  outputLabel = 'QR Code';
  outputType = 'qr' as const;

  inputFields = [
    {
      name: 'size',
      label: 'Size',
      type: 'range' as const,
      defaultValue: 200,
      min: 100,
      max: 500,
      description: 'QR code size in pixels'
    },
    {
      name: 'errorLevel',
      label: 'Error Correction',
      type: 'select' as const,
      defaultValue: 'M',
      options: [
        { label: 'Low (L)', value: 'L' },
        { label: 'Medium (M)', value: 'M' },
        { label: 'Quartile (Q)', value: 'Q' },
        { label: 'High (H)', value: 'H' }
      ],
      description: 'Error correction level'
    }
  ];

  async convert(input: string, options?: Record<string, any>): Promise<string> {
    const text = encodeURIComponent(input || 'Hello World');
    const size = options?.size || 200;
    const errorLevel = options?.errorLevel || 'M';
    
    // Using Google Charts API for QR generation (free service)
    const qrUrl = `https://chart.googleapis.com/chart?chs=${size}x${size}&cht=qr&chl=${text}&choe=UTF-8&chld=${errorLevel}|0`;
    
    return qrUrl;
  }
}

// ================ UNICODE/ASCII CONVERTERS ================

export class UnicodeToAsciiConverter extends BaseConverter {
  id = 'unicode-to-ascii';
  name = 'Unicode to ASCII';
  description = 'Convert Unicode characters to ASCII escape sequences';
  category = 'text-encoding';
  tags = ['unicode', 'ascii', 'escape'];
  inputType = 'text' as const;

  async convert(input: string): Promise<string> {
    return input.split('').map(char => {
      const code = char.charCodeAt(0);
      if (code > 127) {
        return `\\u${code.toString(16).padStart(4, '0')}`;
      }
      return char;
    }).join('');
  }
}

export class AsciiToUnicodeConverter extends BaseConverter {
  id = 'ascii-to-unicode';
  name = 'ASCII to Unicode';
  description = 'Convert ASCII escape sequences to Unicode characters';
  category = 'text-encoding';
  tags = ['ascii', 'unicode', 'unescape'];
  inputType = 'text' as const;

  async convert(input: string): Promise<string> {
    return input.replace(/\\u([0-9a-fA-F]{4})/g, (match, code) => {
      return String.fromCharCode(parseInt(code, 16));
    });
  }
}

// ================ DATA FORMAT CONVERTERS ================

export class CSVToJSONConverter extends BaseConverter {
  id = 'csv-to-json';
  name = 'CSV to JSON';
  description = 'Convert CSV data to JSON format';
  category = 'data-formats';
  tags = ['csv', 'json', 'convert'];
  inputType = 'multiline' as const;
  inputPlaceholder = 'name,age,city\nJohn,30,New York\nJane,25,Los Angeles';
  
  inputFields = [
    {
      name: 'delimiter',
      label: 'Delimiter',
      type: 'select' as const,
      defaultValue: ',',
      options: [
        { label: 'Comma (,)', value: ',' },
        { label: 'Semicolon (;)', value: ';' },
        { label: 'Tab', value: '\t' },
        { label: 'Pipe (|)', value: '|' }
      ]
    },
    {
      name: 'hasHeader',
      label: 'First Row is Header',
      type: 'checkbox' as const,
      defaultValue: true
    }
  ];

  async convert(input: string, options?: Record<string, any>): Promise<string> {
    const delimiter = options?.delimiter || ',';
    const hasHeader = options?.hasHeader !== false;
    
    const lines = input.trim().split('\n');
    if (lines.length === 0) return '[]';
    
    const headers = hasHeader ? 
      lines[0].split(delimiter).map(h => h.trim()) : 
      lines[0].split(delimiter).map((_, i) => `column${i + 1}`);
    
    const dataLines = hasHeader ? lines.slice(1) : lines;
    
    const result = dataLines.map(line => {
      const values = line.split(delimiter).map(v => v.trim());
      const obj: Record<string, string> = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });
    
    return JSON.stringify(result, null, 2);
  }
}

export class JSONToCSVConverter extends BaseConverter {
  id = 'json-to-csv';
  name = 'JSON to CSV';
  description = 'Convert JSON array to CSV format';
  category = 'data-formats';
  tags = ['json', 'csv', 'convert'];
  inputType = 'multiline' as const;
  inputPlaceholder = '[{"name":"John","age":30},{"name":"Jane","age":25}]';
  
  inputFields = [
    {
      name: 'delimiter',
      label: 'Delimiter',
      type: 'select' as const,
      defaultValue: ',',
      options: [
        { label: 'Comma (,)', value: ',' },
        { label: 'Semicolon (;)', value: ';' },
        { label: 'Tab', value: '\t' },
        { label: 'Pipe (|)', value: '|' }
      ]
    }
  ];

  validate(input: string) {
    const base = super.validate(input);
    if (!base.valid) return base;
    
    try {
      const data = JSON.parse(input);
      if (!Array.isArray(data)) {
        return { valid: false, error: 'Input must be a JSON array' };
      }
      return { valid: true };
    } catch {
      return { valid: false, error: 'Invalid JSON format' };
    }
  }

  async convert(input: string, options?: Record<string, any>): Promise<string> {
    const delimiter = options?.delimiter || ',';
    const data = JSON.parse(input);
    
    if (data.length === 0) return '';
    
    // Get all unique keys from all objects
    const allKeys = new Set<string>();
    data.forEach((item: any) => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => allKeys.add(key));
      }
    });
    
    const headers = Array.from(allKeys);
    let csv = headers.join(delimiter) + '\n';
    
    data.forEach((item: any) => {
      const row = headers.map(header => {
        const value = item[header] || '';
        // Escape values containing delimiter or quotes
        if (typeof value === 'string' && (value.includes(delimiter) || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csv += row.join(delimiter) + '\n';
    });
    
    return csv.trim();
  }
}

// ================ ENHANCED GENERATORS ================

export class PasswordGeneratorConverter extends BaseConverter {
  id = 'password-generate';
  name = 'Password Generator';
  description = 'Generate secure passwords with custom options';
  category = 'generators';
  tags = ['password', 'generate', 'secure'];
  inputType = 'generator' as const;
  outputLabel = 'Generated Password';

  inputFields = [
    {
      name: 'length',
      label: 'Length',
      type: 'range' as const,
      defaultValue: 16,
      min: 4,
      max: 128,
      description: 'Password length'
    },
    {
      name: 'includeUppercase',
      label: 'Include Uppercase (A-Z)',
      type: 'checkbox' as const,
      defaultValue: true
    },
    {
      name: 'includeLowercase',
      label: 'Include Lowercase (a-z)',
      type: 'checkbox' as const,
      defaultValue: true
    },
    {
      name: 'includeNumbers',
      label: 'Include Numbers (0-9)',
      type: 'checkbox' as const,
      defaultValue: true
    },
    {
      name: 'includeSymbols',
      label: 'Include Symbols (!@#$%^&*)',
      type: 'checkbox' as const,
      defaultValue: true
    },
    {
      name: 'excludeSimilar',
      label: 'Exclude Similar Characters (0,O,l,I)',
      type: 'checkbox' as const,
      defaultValue: false
    }
  ];

  async convert(input?: string, options?: Record<string, any>): Promise<string> {
    const length = options?.length || 16;
    const includeUppercase = options?.includeUppercase !== false;
    const includeLowercase = options?.includeLowercase !== false;
    const includeNumbers = options?.includeNumbers !== false;
    const includeSymbols = options?.includeSymbols !== false;
    const excludeSimilar = options?.excludeSimilar || false;

    let chars = '';
    
    if (includeUppercase) chars += excludeSimilar ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) chars += excludeSimilar ? 'abcdefghijkmnopqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += excludeSimilar ? '23456789' : '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      throw new Error('At least one character type must be selected');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, chars.length);
      password += chars[randomIndex];
    }

    return password;
  }
}