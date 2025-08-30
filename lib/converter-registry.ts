// lib/converter-registry.ts
import { BaseConverter } from '@/types/converter';

// Import all converters
import {
  // Text & Encoding
  Base64EncodeConverter,
  Base64DecodeConverter,
  URLEncodeConverter,
  URLDecodeConverter,
  HTMLEncodeConverter,
  HTMLDecodeConverter,
  TextUppercaseConverter,
  TextLowercaseConverter,
  TextCapitalizeConverter,
  TextReverseConverter,

  // Cryptography
  MD5HashConverter,
  SHA1HashConverter,
  SHA256HashConverter,
  SHA512HashConverter,
  HMACConverter,

  // Numbers & Math
  DecimalToBinaryConverter,
  BinaryToDecimalConverter,
  DecimalToHexConverter,
  HexToDecimalConverter,

  // Colors & Design
  HexToRGBConverter,
  RGBToHexConverter,

  // Time & Date
  TimestampToDateConverter,
  DateToTimestampConverter,

  // Data Formats
  JSONFormatterConverter,
  JSONMinifyConverter,

  // Generators
  UUIDGeneratorConverter,
  PasswordGeneratorConverter,
  LoremGeneratorConverter,
} from './converters/all-converters';

export class ConverterRegistry {
  private static instance: ConverterRegistry;
  private converters: Map<string, BaseConverter> = new Map();

  private constructor() {
    this.registerAllConverters();
  }

  static getInstance(): ConverterRegistry {
    if (!ConverterRegistry.instance) {
      ConverterRegistry.instance = new ConverterRegistry();
    }
    return ConverterRegistry.instance;
  }

  private registerAllConverters() {
    const converters = [
      // Text & Encoding
      new Base64EncodeConverter(),
      new Base64DecodeConverter(),
      new URLEncodeConverter(),
      new URLDecodeConverter(),
      new HTMLEncodeConverter(),
      new HTMLDecodeConverter(),
      new TextUppercaseConverter(),
      new TextLowercaseConverter(),
      new TextCapitalizeConverter(),
      new TextReverseConverter(),

      // Cryptography
      new MD5HashConverter(),
      new SHA1HashConverter(),
      new SHA256HashConverter(),
      new SHA512HashConverter(),
      new HMACConverter(),

      // Numbers & Math
      new DecimalToBinaryConverter(),
      new BinaryToDecimalConverter(),
      new DecimalToHexConverter(),
      new HexToDecimalConverter(),

      // Colors & Design
      new HexToRGBConverter(),
      new RGBToHexConverter(),

      // Time & Date
      new TimestampToDateConverter(),
      new DateToTimestampConverter(),

      // Data Formats
      new JSONFormatterConverter(),
      new JSONMinifyConverter(),

      // Generators
      new UUIDGeneratorConverter(),
      new PasswordGeneratorConverter(),
      new LoremGeneratorConverter(),
    ];

    converters.forEach(converter => this.register(converter));
  }

  register(converter: BaseConverter): void {
    this.converters.set(converter.id, converter);
  }

  get(converterId: string): BaseConverter | undefined {
    return this.converters.get(converterId);
  }

  getAll(): BaseConverter[] {
    return Array.from(this.converters.values());
  }

  getByCategory(category: string): BaseConverter[] {
    return this.getAll().filter(converter => converter.category === category);
  }

  search(query: string): BaseConverter[] {
    const lowerQuery = query.toLowerCase();
    return this.getAll().filter(converter => 
      converter.name.toLowerCase().includes(lowerQuery) ||
      converter.description.toLowerCase().includes(lowerQuery) ||
      converter.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  getCategories(): string[] {
    const categories = new Set<string>();
    this.getAll().forEach(converter => categories.add(converter.category));
    return Array.from(categories);
  }

  exists(converterId: string): boolean {
    return this.converters.has(converterId);
  }

  remove(converterId: string): boolean {
    return this.converters.delete(converterId);
  }

  clear(): void {
    this.converters.clear();
  }

  getStats() {
    const all = this.getAll();
    const categoryStats: Record<string, number> = {};
    
    all.forEach(converter => {
      categoryStats[converter.category] = (categoryStats[converter.category] || 0) + 1;
    });

    return {
      total: all.length,
      categories: Object.keys(categoryStats).length,
      byCategory: categoryStats,
    };
  }
}

// Singleton instance
export const converterRegistry = ConverterRegistry.getInstance();