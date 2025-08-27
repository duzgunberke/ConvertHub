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
    description: "Base64, URL, HTML, ciphers, transformations",
    count: 40,
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
      }
    ]
  },
  {
    id: "cryptography",
    name: "Cryptography",
    icon: "🔐",
    description: "All hash types, HMAC, modern crypto",
    count: 35,
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
        id: "hmac-generator",
        name: "HMAC Generator",
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
    description: "Base conversions, bitwise, calculations",
    count: 25,
    converters: [
      {
        id: "decimal-to-binary",
        name: "Decimal to Binary",
        description: "Convert decimal numbers to binary",
        category: "numbers-math",
        tags: ["decimal", "binary", "conversion"]
      },
      {
        id: "hex-to-decimal",
        name: "Hex to Decimal",
        description: "Convert hexadecimal to decimal",
        category: "numbers-math",
        tags: ["hex", "decimal", "conversion"]
      },
      {
        id: "binary-calculator",
        name: "Binary Calculator",
        description: "Perform binary arithmetic operations",
        category: "numbers-math",
        tags: ["binary", "calculator", "math"]
      }
    ]
  },
  {
    id: "colors-design",
    name: "Colors & Design",
    icon: "🎨",
    description: "Color spaces, palette generation",
    count: 20,
    converters: [
      {
        id: "hex-to-rgb",
        name: "Hex to RGB",
        description: "Convert hex colors to RGB",
        category: "colors-design",
        tags: ["color", "hex", "rgb"]
      },
      {
        id: "rgb-to-hsl",
        name: "RGB to HSL",
        description: "Convert RGB to HSL color space",
        category: "colors-design",
        tags: ["color", "rgb", "hsl"]
      },
      {
        id: "color-palette",
        name: "Color Palette Generator",
        description: "Generate harmonious color palettes",
        category: "colors-design",
        tags: ["color", "palette", "design"]
      }
    ]
  },
  {
    id: "time-date",
    name: "Time & Date",
    icon: "⏰",
    description: "Timestamps, timezone conversions",
    count: 15,
    converters: [
      {
        id: "timestamp-converter",
        name: "Timestamp Converter",
        description: "Convert between timestamps and dates",
        category: "time-date",
        tags: ["timestamp", "date", "time"]
      },
      {
        id: "timezone-converter",
        name: "Timezone Converter",
        description: "Convert times between timezones",
        category: "time-date",
        tags: ["timezone", "time", "convert"]
      }
    ]
  },
  {
    id: "data-formats",
    name: "Data Formats",
    icon: "📄",
    description: "JSON/YAML/XML, web formats, code minify",
    count: 30,
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
        id: "yaml-to-json",
        name: "YAML to JSON",
        description: "Convert YAML to JSON format",
        category: "data-formats",
        tags: ["yaml", "json", "convert"]
      },
      {
        id: "xml-format",
        name: "XML Formatter",
        description: "Format and validate XML",
        category: "data-formats",
        tags: ["xml", "format", "validate"]
      },
      {
        id: "css-minifier",
        name: "CSS Minifier",
        description: "Minify CSS code",
        category: "data-formats",
        tags: ["css", "minify", "optimize"]
      }
    ]
  },
  {
    id: "images-media",
    name: "Images & Media",
    icon: "🖼️",
    description: "QR codes, barcodes, Base64 images",
    count: 20,
    converters: [
      {
        id: "qr-generator",
        name: "QR Code Generator",
        description: "Generate QR codes from text",
        category: "images-media",
        tags: ["qr", "code", "generate"]
      },
      {
        id: "image-to-base64",
        name: "Image to Base64",
        description: "Convert images to Base64 strings",
        category: "images-media",
        tags: ["image", "base64", "convert"]
      }
    ]
  },
  {
    id: "network-web",
    name: "Network & Web",
    icon: "🌐",
    description: "IP analysis, domain validation",
    count: 20,
    converters: [
      {
        id: "ip-lookup",
        name: "IP Address Lookup",
        description: "Get information about IP addresses",
        category: "network-web",
        tags: ["ip", "lookup", "network"]
      },
      {
        id: "domain-validator",
        name: "Domain Validator",
        description: "Validate domain names",
        category: "network-web",
        tags: ["domain", "validate", "web"]
      }
    ]
  },
  {
    id: "generators",
    name: "Generators",
    icon: "🎲",
    description: "UUIDs, passwords, fake data",
    count: 25,
    converters: [
      {
        id: "uuid-generator",
        name: "UUID Generator",
        description: "Generate unique identifiers",
        category: "generators",
        tags: ["uuid", "generate", "unique"]
      },
      {
        id: "password-generator",
        name: "Password Generator",
        description: "Generate secure passwords",
        category: "generators",
        tags: ["password", "generate", "secure"]
      },
      {
        id: "lorem-generator",
        name: "Lorem Ipsum Generator",
        description: "Generate placeholder text",
        category: "generators",
        tags: ["lorem", "text", "placeholder"]
      }
    ]
  }
];