// models/converter.ts - Updated with new categories
export interface Converter {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  featured?: boolean;
  inputType?: 'text' | 'generator' | 'number' | 'options' | 'file' | 'multiline' | 'json' | 'regex' | 'color';
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
    description: "Base64, URL, HTML, Unicode transformations",
    count: 12,
    converters: [
      {
        id: "base64-encode",
        name: "Base64 Encode",
        description: "Encode text to Base64 format",
        category: "text-encoding",
        tags: ["base64", "encode", "text"],
        featured: true,
        inputType: "text"
      },
      {
        id: "base64-decode",
        name: "Base64 Decode",
        description: "Decode Base64 to text",
        category: "text-encoding",
        tags: ["base64", "decode", "text"],
        inputType: "text"
      },
      {
        id: "url-encode",
        name: "URL Encode",
        description: "Encode text for URL usage",
        category: "text-encoding",
        tags: ["url", "encode", "web"],
        inputType: "text"
      },
      {
        id: "url-decode",
        name: "URL Decode",
        description: "Decode URL encoded text",
        category: "text-encoding",
        tags: ["url", "decode", "web"],
        inputType: "text"
      },
      {
        id: "html-encode",
        name: "HTML Encode",
        description: "Encode special HTML characters",
        category: "text-encoding",
        tags: ["html", "encode", "web"],
        inputType: "text"
      },
      {
        id: "html-decode",
        name: "HTML Decode",
        description: "Decode HTML entities",
        category: "text-encoding",
        tags: ["html", "decode", "web"],
        inputType: "text"
      },
      {
        id: "text-uppercase",
        name: "Text Uppercase",
        description: "Convert text to uppercase",
        category: "text-encoding",
        tags: ["text", "uppercase", "case"],
        inputType: "text"
      },
      {
        id: "text-lowercase",
        name: "Text Lowercase",
        description: "Convert text to lowercase",
        category: "text-encoding",
        tags: ["text", "lowercase", "case"],
        inputType: "text"
      },
      {
        id: "text-capitalize",
        name: "Text Capitalize",
        description: "Capitalize first letter of each word",
        category: "text-encoding",
        tags: ["text", "capitalize", "case"],
        inputType: "text"
      },
      {
        id: "text-reverse",
        name: "Text Reverse",
        description: "Reverse text characters",
        category: "text-encoding",
        tags: ["text", "reverse"],
        inputType: "text"
      },
      {
        id: "unicode-to-ascii",
        name: "Unicode to ASCII",
        description: "Convert Unicode to ASCII escape sequences",
        category: "text-encoding",
        tags: ["unicode", "ascii", "escape"],
        inputType: "text",
        featured: true
      },
      {
        id: "ascii-to-unicode",
        name: "ASCII to Unicode",
        description: "Convert ASCII escape sequences to Unicode",
        category: "text-encoding",
        tags: ["ascii", "unicode", "unescape"],
        inputType: "text"
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
        featured: true,
        inputType: "text"
      },
      {
        id: "hash-sha1",
        name: "SHA1 Hash",
        description: "Generate SHA1 hash",
        category: "cryptography",
        tags: ["hash", "sha1", "crypto"],
        inputType: "text"
      },
      {
        id: "hash-sha256",
        name: "SHA256 Hash",
        description: "Generate SHA256 hash",
        category: "cryptography",
        tags: ["hash", "sha256", "crypto"],
        inputType: "text"
      },
      {
        id: "hash-sha512",
        name: "SHA512 Hash",
        description: "Generate SHA512 hash",
        category: "cryptography",
        tags: ["hash", "sha512", "crypto"],
        inputType: "text"
      },
      {
        id: "hmac-sha256",
        name: "HMAC-SHA256",
        description: "Generate HMAC with secret key",
        category: "cryptography",
        tags: ["hmac", "hash", "crypto"],
        inputType: "multiline"
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
        featured: true,
        inputType: "text"
      },
      {
        id: "binary-to-decimal",
        name: "Binary to Decimal",
        description: "Convert binary numbers to decimal",
        category: "numbers-math",
        tags: ["binary", "decimal", "conversion"],
        inputType: "text"
      },
      {
        id: "decimal-to-hex",
        name: "Decimal to Hex",
        description: "Convert decimal numbers to hexadecimal",
        category: "numbers-math",
        tags: ["decimal", "hex", "conversion"],
        inputType: "text"
      },
      {
        id: "hex-to-decimal",
        name: "Hex to Decimal",
        description: "Convert hexadecimal to decimal",
        category: "numbers-math",
        tags: ["hex", "decimal", "conversion"],
        inputType: "text"
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
        featured: true,
        inputType: "color"
      },
      {
        id: "rgb-to-hex",
        name: "RGB to Hex",
        description: "Convert RGB colors to hex",
        category: "colors-design",
        tags: ["color", "rgb", "hex"],
        inputType: "text"
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
        featured: true,
        inputType: "text"
      },
      {
        id: "date-to-timestamp",
        name: "Date to Timestamp",
        description: "Convert date to Unix timestamp",
        category: "time-date",
        tags: ["date", "timestamp", "unix"],
        inputType: "text"
      }
    ]
  },
  {
    id: "data-formats",
    name: "Data Formats",
    icon: "📄",
    description: "JSON, CSV, XML, YAML formatting",
    count: 6,
    converters: [
      {
        id: "json-format",
        name: "JSON Formatter",
        description: "Format and validate JSON",
        category: "data-formats",
        tags: ["json", "format", "validate"],
        featured: true,
        inputType: "json"
      },
      {
        id: "json-minify",
        name: "JSON Minifier",
        description: "Minify JSON by removing whitespace",
        category: "data-formats",
        tags: ["json", "minify", "compress"],
        inputType: "json"
      },
      {
        id: "csv-to-json",
        name: "CSV to JSON",
        description: "Convert CSV data to JSON format",
        category: "data-formats",
        tags: ["csv", "json", "convert"],
        inputType: "options",
        featured: true
      },
      {
        id: "json-to-csv",
        name: "JSON to CSV",
        description: "Convert JSON array to CSV format",
        category: "data-formats",
        tags: ["json", "csv", "convert"],
        inputType: "options"
      }
    ]
  },
  {
    id: "css-tools",
    name: "CSS Tools",
    icon: "🎨",
    description: "CSS formatting and optimization",
    count: 2,
    converters: [
      {
        id: "css-minify",
        name: "CSS Minifier",
        description: "Minify CSS by removing whitespace",
        category: "css-tools",
        tags: ["css", "minify", "compress"],
        inputType: "multiline",
        featured: true
      },
      {
        id: "css-format",
        name: "CSS Formatter",
        description: "Format and beautify CSS code",
        category: "css-tools",
        tags: ["css", "format", "beautify"],
        inputType: "options"
      }
    ]
  },
  {
    id: "database-tools",
    name: "Database Tools",
    icon: "🗄️",
    description: "SQL formatting and validation",
    count: 1,
    converters: [
      {
        id: "sql-format",
        name: "SQL Formatter",
        description: "Format and beautify SQL queries",
        category: "database-tools",
        tags: ["sql", "format", "database"],
        inputType: "options",
        featured: true
      }
    ]
  },
  {
    id: "regex-tools",
    name: "RegEx Tools",
    icon: "🔍",
    description: "Regular expression testing and tools",
    count: 1,
    converters: [
      {
        id: "regex-test",
        name: "RegEx Tester",
        description: "Test regular expressions against text",
        category: "regex-tools",
        tags: ["regex", "test", "pattern"],
        inputType: "options",
        featured: true
      }
    ]
  },
  {
    id: "generators",
    name: "Generators",
    icon: "🎲",
    description: "UUID, password, QR code generators",
    count: 4,
    converters: [
      {
        id: "uuid-generate",
        name: "UUID Generator",
        description: "Generate unique identifiers",
        category: "generators",
        tags: ["uuid", "generate", "unique"],
        featured: true,
        inputType: "generator"
      },
      {
        id: "password-generate",
        name: "Password Generator",
        description: "Generate secure passwords",
        category: "generators",
        tags: ["password", "generate", "secure"],
        inputType: "generator",
        featured: true
      },
      {
        id: "lorem-generate",
        name: "Lorem Ipsum Generator",
        description: "Generate placeholder text",
        category: "generators",
        tags: ["lorem", "ipsum", "placeholder"],
        inputType: "generator"
      },
      {
        id: "qr-generate",
        name: "QR Code Generator",
        description: "Generate QR codes from text",
        category: "generators",
        tags: ["qr", "qrcode", "generate"],
        inputType: "options",
        featured: true
      }
    ]
  }
];