// lib/converter-registry.ts
import { BaseConverter } from '@/types/converter';

// Text Encoding Converters
import {
  Base64EncodeConverter,
  Base64DecodeConverter,
  URLEncodeConverter,
  URLDecodeConverter,
  HTMLEncodeConverter,
  HTMLDecodeConverter,
} from './converters/text-encoding';

// Cryptography Converters
import {
  MD5HashConverter,
  SHA1HashConverter,
  SHA256HashConverter,
  SHA512HashConverter,
  HMACGeneratorConverter,
  BCryptHashConverter,
} from './converters/cryptography';

// Data Format Converters
import {
  JSONFormatterConverter,
  JSONMinifyConverter,
  YAMLToJSONConverter,
  JSONToYAMLConverter,
  XMLFormatterConverter,
} from './converters/data-formats';

export class ConverterRegistry {
  private static instance: ConverterRegistry;
  private converters: Map<string, BaseConverter> = new Map();

  private constructor() {
    this.registerDefaultConverters();
  }

  static getInstance(): ConverterRegistry {
    if (!ConverterRegistry.instance) {
      ConverterRegistry.instance = new ConverterRegistry();
    }
    return ConverterRegistry.instance;
  }

  private registerDefaultConverters() {
    // Text Encoding
    this.register(new Base64EncodeConverter());
    this.register(new Base64DecodeConverter());
    this.register(new URLEncodeConverter());
    this.register(new URLDecodeConverter());
    this.register(new HTMLEncodeConverter());
    this.register(new HTMLDecodeConverter());

    // Cryptography
    this.register(new MD5HashConverter());
    this.register(new SHA1HashConverter());
    this.register(new SHA256HashConverter());
    this.register(new SHA512HashConverter());
    this.register(new HMACGeneratorConverter());
    this.register(new BCryptHashConverter());

    // Data Formats
    this.register(new JSONFormatterConverter());
    this.register(new JSONMinifyConverter());
    this.register(new YAMLToJSONConverter());
    this.register(new JSONToYAMLConverter());
    this.register(new XMLFormatterConverter());
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