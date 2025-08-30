// models/converter.ts
export interface Converter {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
  converters: Converter[];
}

export const categories: Category[] = [
  {
    id: "text-encoding",
    name: "Text & Encoding",
    icon: "📝",
    description: "Base64, URL, HTML, text transformations",
    count: 10,
    converters: [
      {
        id: "base64-encode",
        name: "Base64 Encode",
        description: "Encode text to Base64 format",
        category: "text-encoding",
        tags: ["base64", "encode", "text"],
        featured: true
      },
      {
        id: "base64-decode",
        name: "Base64 Decode",
        description: "Decode Base64 to text",
        category: "text-encoding",
        tags: ["base64", "decode", "text"]
      },
      {
        id: "url-encode",
        name: "URL Encode",
        description: "Encode text for URL usage",
        category: "text-encoding",
        tags: ["url", "encode", "web"]
      },
      {
        id: "url-decode",
        name: "URL Decode",
        description: "Decode URL encoded text",
        category: "text-encoding",
        tags: ["url", "decode", "web"]
      },
      {
        id: "html-encode",
        name: "HTML Encode",
        description: "Encode special HTML characters",
        category: "text-encoding",
        tags: ["html", "encode", "web"]
      },
      {
        id: "html-decode",
        name: "HTML Decode",
        description: "Decode HTML entities",
        category: "text-encoding",
        tags: ["html", "decode", "web"]
      },
      {
        id: "text-uppercase",
        name: "Text Uppercase",
        description: "Convert text to uppercase",
        category: "text-encoding",
        tags: ["text", "uppercase", "case"]
      },
      {
        id: "text-lowercase",
        name: "Text Lowercase",
        description: "Convert text to lowercase",
        category: "text-encoding",
        tags: ["text", "lowercase", "case"]
      },
      {
        id: "text-capitalize",
        name: "Text Capitalize",
        description: "Capitalize first letter of each word",
        category: "text-encoding",
        tags: ["text", "capitalize", "case"]
      },
      {
        id: "text-reverse",
        name: "Text Reverse",
        description: "Reverse text characters",
        category: "text-encoding",
        tags: ["text", "reverse"]
      }
    ]
  },
  {
    id: "cryptography",
    name: "Cryptography",
    icon: "🔐",
    description: "Hash functions, HMAC, crypto operations",
    count: 5,
    converters: [
      {
        id: "hash-md5",
        name: "MD5 Hash",
        description: "Generate MD5 hash",
        category: "cryptography",
        tags: ["hash", "md5", "crypto"],
        featured: true
      },
      {
        id: "hash-sha1",
        name: "SHA1 Hash",
        description: "Generate SHA1 hash",
        category: "cryptography",
        tags: ["hash", "sha1", "crypto"]
      },
      {
        id: "hash-sha256",
        name: "SHA256 Hash",
        description: "Generate SHA256 hash",
        category: "cryptography",
        tags: ["hash", "sha256", "crypto"]
      },
      {
        id: "hash-sha512",
        name: "SHA512 Hash",
        description: "Generate SHA512 hash",
        category: "cryptography",
        tags: ["hash", "sha512", "crypto"]
      },
      {
        id: "hmac-sha256",
        name: "HMAC-SHA256",
        description: "Generate HMAC with secret key",
        category: "cryptography",
        tags: ["hmac", "hash", "crypto"]
      }
    ]
  },
  {
    id: "numbers-math",
    name: "Numbers & Math",
    icon: "🔢",
    description: "Base conversions, number operations",
    count: 4,
    converters: [
      {
        id: "decimal-to-binary",
        name: "Decimal to Binary",
        description: "Convert decimal numbers to binary",
        category: "numbers-math",
        tags: ["decimal", "binary", "conversion"],
        featured: true
      },
      {
        id: "binary-to-decimal",
        name: "Binary to Decimal",
        description: "Convert binary numbers to decimal",
        category: "numbers-math",
        tags: ["binary", "decimal", "conversion"]
      },
      {
        id: "decimal-to-hex",
        name: "Decimal to Hex",
        description: "Convert decimal numbers to hexadecimal",
        category: "numbers-math",
        tags: ["decimal", "hex", "conversion"]
      },
      {
        id: "hex-to-decimal",
        name: "Hex to Decimal",
        description: "Convert hexadecimal to decimal",
        category: "numbers-math",
        tags: ["hex", "decimal", "conversion"]
      }
    ]
  },
  {
    id: "colors-design",
    name: "Colors & Design",
    icon: "🎨",
    description: "Color space conversions",
    count: 2,
    converters: [
      {
        id: "hex-to-rgb",
        name: "Hex to RGB",
        description: "Convert hex colors to RGB",
        category: "colors-design",
        tags: ["color", "hex", "rgb"],
        featured: true
      },
      {
        id: "rgb-to-hex",
        name: "RGB to Hex",
        description: "Convert RGB colors to hex",
        category: "colors-design",
        tags: ["color", "rgb", "hex"]
      }
    ]
  },
  {
    id: "time-date",
    name: "Time & Date",
    icon: "⏰",
    description: "Timestamp and date conversions",
    count: 2,
    converters: [
      {
        id: "timestamp-to-date",
        name: "Timestamp to Date",
        description: "Convert Unix timestamp to date",
        category: "time-date",
        tags: ["timestamp", "date", "unix"],
        featured: true
      },
      {
        id: "date-to-timestamp",
        name: "Date to Timestamp",
        description: "Convert date to Unix timestamp",
        category: "time-date",
        tags: ["date", "timestamp", "unix"]
      }
    ]
  },
  {
    id: "data-formats",
    name: "Data Formats",
    icon: "📄",
    description: "JSON, XML, YAML formatting",
    count: 2,
    converters: [
      {
        id: "json-format",
        name: "JSON Formatter",
        description: "Format and validate JSON",
        category: "data-formats",
        tags: ["json", "format", "validate"],
        featured: true
      },
      {
        id: "json-minify",
        name: "JSON Minifier",
        description: "Minify JSON by removing whitespace",
        category: "data-formats",
        tags: ["json", "minify", "compress"]
      }
    ]
  },
  {
    id: "generators",
    name: "Generators",
    icon: "🎲",
    description: "UUID, password, text generators",
    count: 3,
    converters: [
      {
        id: "uuid-generate",
        name: "UUID Generator",
        description: "Generate unique identifiers",
        category: "generators",
        tags: ["uuid", "generate", "unique"],
        featured: true
      },
      {
        id: "password-generate",
        name: "Password Generator",
        description: "Generate secure passwords",
        category: "generators",
        tags: ["password", "generate", "secure"]
      },
      {
        id: "lorem-generate",
        name: "Lorem Ipsum Generator",
        description: "Generate placeholder text",
        category: "generators",
        tags: ["lorem", "ipsum", "placeholder"]
      }
    ]
  }
];