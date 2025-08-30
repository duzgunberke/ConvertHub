// lib/converters/cryptography.ts
import { BaseConverter } from '@/types/converter';
import crypto from 'crypto';

export class MD5HashConverter extends BaseConverter {
  id = 'hash-md5';
  name = 'MD5 Hash';
  description = 'Generate MD5 hash';
  category = 'cryptography';
  tags = ['hash', 'md5', 'crypto'];

  async convert(input: string): Promise<string> {
    return crypto.createHash('md5').update(input).digest('hex');
  }
}

export class SHA1HashConverter extends BaseConverter {
  id = 'hash-sha1';
  name = 'SHA1 Hash';
  description = 'Generate SHA1 hash';
  category = 'cryptography';
  tags = ['hash', 'sha1', 'crypto'];

  async convert(input: string): Promise<string> {
    return crypto.createHash('sha1').update(input).digest('hex');
  }
}

export class SHA256HashConverter extends BaseConverter {
  id = 'hash-sha256';
  name = 'SHA256 Hash';
  description = 'Generate SHA256 hash';
  category = 'cryptography';
  tags = ['hash', 'sha256', 'crypto'];

  async convert(input: string): Promise<string> {
    return crypto.createHash('sha256').update(input).digest('hex');
  }
}

export class SHA512HashConverter extends BaseConverter {
  id = 'hash-sha512';
  name = 'SHA512 Hash';
  description = 'Generate SHA512 hash';
  category = 'cryptography';
  tags = ['hash', 'sha512', 'crypto'];

  async convert(input: string): Promise<string> {
    return crypto.createHash('sha512').update(input).digest('hex');
  }
}

export class HMACGeneratorConverter extends BaseConverter {
  id = 'hmac-generator';
  name = 'HMAC Generator';
  description = 'Generate HMAC with secret key';
  category = 'cryptography';
  tags = ['hmac', 'hash', 'crypto'];

  validate(input: string): { valid: boolean; error?: string } {
    const baseValidation = super.validate(input);
    if (!baseValidation.valid) return baseValidation;

    // HMAC requires both input and secret key
    const lines = input.split('\n');
    if (lines.length < 2) {
      return { 
        valid: false, 
        error: 'HMAC requires input and secret key separated by newline. Format:\nYour text\nYour secret key' 
      };
    }

    return { valid: true };
  }

  async convert(input: string, options?: { algorithm?: string }): Promise<string> {
    const lines = input.split('\n');
    const text = lines[0];
    const secretKey = lines[1];
    const algorithm = options?.algorithm || 'sha256';

    if (!text || !secretKey) {
      throw new Error('Both text and secret key are required');
    }

    return crypto.createHmac(algorithm, secretKey).update(text).digest('hex');
  }
}

export class BCryptHashConverter extends BaseConverter {
  id = 'bcrypt-hash';
  name = 'BCrypt Hash';
  description = 'Generate BCrypt hash for passwords';
  category = 'cryptography';
  tags = ['bcrypt', 'hash', 'password'];

  async convert(input: string, options?: { rounds?: number }): Promise<string> {
    try {
      const bcrypt = await import('bcryptjs');
      const saltRounds = options?.rounds || 12;
      
      return bcrypt.default.hash(input, saltRounds);
    } catch (error) {
      throw new Error('BCrypt library not available. Please install bcryptjs package.');
    }
  }
}