yarn dev
# Next.js Converter API Yapısı

## Klasör Yapısı
```
app/
├── api/
│   ├── convert/
│   │   ├── text/
│   │   │   ├── encoding/
│   │   │   │   ├── base64/route.ts
│   │   │   │   ├── base32/route.ts
│   │   │   │   ├── base58/route.ts
│   │   │   │   ├── ascii85/route.ts
│   │   │   │   ├── uuencode/route.ts
│   │   │   │   ├── url/route.ts
│   │   │   │   ├── html/route.ts
│   │   │   │   ├── xml/route.ts
│   │   │   │   └── unicode/route.ts
│   │   │   ├── transform/
│   │   │   │   ├── case/route.ts
│   │   │   │   ├── reverse/route.ts
│   │   │   │   ├── sort/route.ts
│   │   │   │   ├── remove/route.ts
│   │   │   │   └── replace/route.ts
│   │   │   ├── cipher/
│   │   │   │   ├── caesar/route.ts
│   │   │   │   ├── rot13/route.ts
│   │   │   │   ├── atbash/route.ts
│   │   │   │   ├── morse/route.ts
│   │   │   │   ├── binary-text/route.ts
│   │   │   │   └── vigenere/route.ts
│   │   │   └── analysis/
│   │   │       ├── count/route.ts
│   │   │       ├── hash-identify/route.ts
│   │   │       └── entropy/route.ts
│   │   ├── hash/
│   │   │   ├── cryptographic/
│   │   │   │   ├── md5/route.ts
│   │   │   │   ├── sha1/route.ts
│   │   │   │   ├── sha224/route.ts
│   │   │   │   ├── sha256/route.ts
│   │   │   │   ├── sha384/route.ts
│   │   │   │   ├── sha512/route.ts
│   │   │   │   ├── sha3/route.ts
│   │   │   │   ├── blake2/route.ts
│   │   │   │   ├── whirlpool/route.ts
│   │   │   │   └── ripemd160/route.ts
│   │   │   ├── hmac/
│   │   │   │   ├── hmac-md5/route.ts
│   │   │   │   ├── hmac-sha1/route.ts
│   │   │   │   ├── hmac-sha256/route.ts
│   │   │   │   └── hmac-sha512/route.ts
│   │   │   └── checksum/
│   │   │       ├── crc16/route.ts
│   │   │       ├── crc32/route.ts
│   │   │       ├── adler32/route.ts
│   │   │       └── fletcher/route.ts
│   │   ├── number/
│   │   │   ├── base/
│   │   │   │   ├── binary/route.ts
│   │   │   │   ├── octal/route.ts
│   │   │   │   ├── decimal/route.ts
│   │   │   │   ├── hex/route.ts
│   │   │   │   ├── base36/route.ts
│   │   │   │   └── base62/route.ts
│   │   │   ├── operations/
│   │   │   │   ├── arithmetic/route.ts
│   │   │   │   ├── bitwise/route.ts
│   │   │   │   └── convert-units/route.ts
│   │   │   └── encoding/
│   │   │       ├── ieee754/route.ts
│   │   │       ├── scientific/route.ts
│   │   │       └── fraction/route.ts
│   │   ├── format/
│   │   │   ├── data/
│   │   │   │   ├── json/route.ts
│   │   │   │   ├── yaml/route.ts
│   │   │   │   ├── toml/route.ts
│   │   │   │   ├── ini/route.ts
│   │   │   │   ├── csv/route.ts
│   │   │   │   ├── tsv/route.ts
│   │   │   │   └── xml/route.ts
│   │   │   ├── web/
│   │   │   │   ├── jwt/route.ts
│   │   │   │   ├── cookie/route.ts
│   │   │   │   ├── user-agent/route.ts
│   │   │   │   └── sql/route.ts
│   │   │   └── code/
│   │   │       ├── minify/route.ts
│   │   │       ├── beautify/route.ts
│   │   │       └── obfuscate/route.ts
│   │   ├── color/
│   │   │   ├── convert/
│   │   │   │   ├── hex-rgb/route.ts
│   │   │   │   ├── rgb-hsl/route.ts
│   │   │   │   ├── hsl-hsv/route.ts
│   │   │   │   ├── cmyk/route.ts
│   │   │   │   └── lab/route.ts
│   │   │   ├── generate/
│   │   │   │   ├── palette/route.ts
│   │   │   │   ├── gradient/route.ts
│   │   │   │   └── random/route.ts
│   │   │   └── analysis/
│   │   │       ├── contrast/route.ts
│   │   │       └── blindness/route.ts
│   │   ├── time/
│   │   │   ├── convert/
│   │   │   │   ├── timestamp/route.ts
│   │   │   │   ├── timezone/route.ts
│   │   │   │   ├── format/route.ts
│   │   │   │   └── duration/route.ts
│   │   │   └── calculate/
│   │   │       ├── diff/route.ts
│   │   │       ├── add/route.ts
│   │   │       └── business-days/route.ts
│   │   ├── crypto/
│   │   │   ├── symmetric/
│   │   │   │   ├── aes/route.ts
│   │   │   │   ├── des/route.ts
│   │   │   │   └── blowfish/route.ts
│   │   │   ├── asymmetric/
│   │   │   │   ├── rsa/route.ts
│   │   │   │   └── ecc/route.ts
│   │   │   └── modern/
│   │   │       ├── bcrypt/route.ts
│   │   │       ├── scrypt/route.ts
│   │   │       └── pbkdf2/route.ts
│   │   ├── image/
│   │   │   ├── encode/
│   │   │   │   ├── base64/route.ts
│   │   │   │   └── data-uri/route.ts
│   │   │   ├── generate/
│   │   │   │   ├── qr/route.ts
│   │   │   │   ├── barcode/route.ts
│   │   │   │   ├── avatar/route.ts
│   │   │   │   └── placeholder/route.ts
│   │   │   └── analyze/
│   │   │       ├── metadata/route.ts
│   │   │       └── colors/route.ts
│   │   ├── file/
│   │   │   ├── convert/
│   │   │   │   ├── pdf/route.ts
│   │   │   │   ├── image/route.ts
│   │   │   │   └── document/route.ts
│   │   │   ├── compress/
│   │   │   │   ├── zip/route.ts
│   │   │   │   ├── gzip/route.ts
│   │   │   │   └── brotli/route.ts
│   │   │   └── analyze/
│   │   │       ├── mime/route.ts
│   │   │       ├── size/route.ts
│   │   │       └── signature/route.ts
│   │   ├── network/
│   │   │   ├── ip/
│   │   │   │   ├── validate/route.ts
│   │   │   │   ├── subnet/route.ts
│   │   │   │   ├── geolocation/route.ts
│   │   │   │   └── cidr/route.ts
│   │   │   ├── domain/
│   │   │   │   ├── punycode/route.ts
│   │   │   │   ├── subdomain/route.ts
│   │   │   │   └── whois/route.ts
│   │   │   └── protocol/
│   │   │       ├── http/route.ts
│   │   │       ├── websocket/route.ts
│   │   │       └── email/route.ts
│   │   └── generate/
│   │       ├── id/
│   │       │   ├── uuid/route.ts
│   │       │   ├── nanoid/route.ts
│   │       │   ├── cuid/route.ts
│   │       │   └── snowflake/route.ts
│   │       ├── password/
│   │       │   ├── secure/route.ts
│   │       │   ├── memorable/route.ts
│   │       │   └── pattern/route.ts
│   │       ├── data/
│   │       │   ├── fake/route.ts
│   │       │   ├── lorem/route.ts
│   │       │   └── json-schema/route.ts
│   │       └── crypto/
│   │           ├── keypair/route.ts
│   │           ├── certificate/route.ts
│   │           └── signature/route.ts
│   └── health/route.ts
├── lib/
│   ├── converters/
│   │   ├── textConverters.ts
│   │   ├── hashConverters.ts
│   │   ├── numberConverters.ts
│   │   └── formatConverters.ts
│   ├── validators/
│   │   └── inputValidator.ts
│   └── utils/
│       └── apiResponse.ts
└── types/
		└── converter.ts
```

## Ana API Endpoint'leri

### 1. Text Conversions
- `POST /api/convert/text/base64` - Base64 encode/decode
- `POST /api/convert/text/url` - URL encode/decode  
- `POST /api/convert/text/html` - HTML entity encode/decode
- `POST /api/convert/text/case` - Case transformations

### 2. Hash Functions
- `POST /api/convert/hash/md5` - MD5 hash
- `POST /api/convert/hash/sha1` - SHA-1 hash
- `POST /api/convert/hash/sha256` - SHA-256 hash
- `POST /api/convert/hash/sha512` - SHA-512 hash

### 3. Number Systems
- `POST /api/convert/number/binary` - Binary conversions
- `POST /api/convert/number/hex` - Hexadecimal conversions
- `POST /api/convert/number/decimal` - Decimal conversions

### 4. Format Operations
- `POST /api/convert/format/json` - JSON pretty/minify
- `POST /api/convert/format/jwt` - JWT decode

### 5. Generators
- `POST /api/convert/generate/qr` - QR code generation
- `POST /api/convert/generate/uuid` - UUID generation

## Request/Response Format

### Request Format:
```json
{
	"input": "string to convert",
	"operation": "encode|decode|hash|format",
	"options": {
		"charset": "utf-8",
		"format": "pretty"
	}
}
```

### Response Format:
```json
{
	"success": true,
	"data": {
		"result": "converted string",
		"metadata": {
			"inputLength": 123,
			"outputLength": 456,
			"algorithm": "base64",
			"timestamp": "2025-01-15T10:30:00Z"
		}
	},
	"error": null
}
```

### Error Response:
```json
{
	"success": false,
	"data": null,
	"error": {
		"code": "INVALID_INPUT",
		"message": "Input string is not valid",
		"details": "Expected valid JSON format"
	}
}
```

## Rate Limiting & Validation

- Input size limits (max 10MB per request)
- Rate limiting: 1000 requests/hour per IP
- Input validation for each converter type
- Sanitization for XSS prevention

## Özellikler

### Desteklenen Dönüşümler (200+ Fonksiyon):

#### 🔤 Text Operations (40+ fonksiyon)
**Encoding/Decoding:**
- Base64, Base32, Base58, ASCII85, UUEncode
- URL encode/decode, HTML/XML entities
- Unicode normalization, Punycode
- Percent encoding, MIME encoding

**Text Transformations:**
- Case conversions (upper, lower, title, camel, snake, kebab)
- Reverse, sort lines, remove duplicates
- Find & replace (regex support)
- Character/word/line counting
- Text diff comparison

**Ciphers & Encoding:**
- Caesar cipher, ROT13/ROT47, Atbash
- Morse code, Binary-to-text
- Vigenère cipher, Simple substitution
- Text entropy analysis, Hash identification

#### 🔐 Cryptographic Functions (35+ fonksiyon)
**Hash Functions:**
- MD5, SHA-1, SHA-224, SHA-256, SHA-384, SHA-512
- SHA3 (224/256/384/512), BLAKE2b/2s
- Whirlpool, RIPEMD-160, Tiger
- CRC16/32, Adler-32, Fletcher checksum

**HMAC Variants:**
- HMAC-MD5, HMAC-SHA1/256/512
- PBKDF2, bcrypt, scrypt

**Modern Crypto:**
- AES (128/192/256), DES/3DES
- RSA encrypt/decrypt, ECC operations
- Digital signatures, Key generation

#### 🔢 Number Systems (25+ fonksiyon)
**Base Conversions:**
- Binary ↔ Decimal ↔ Hexadecimal ↔ Octal
- Base36, Base62 encoding
- Roman numerals ↔ Arabic
- Scientific notation, Engineering notation

**Number Operations:**
- Bitwise operations (AND, OR, XOR, shift)
- IEEE 754 float analysis
- Fraction ↔ Decimal conversion
- Unit conversions (length, weight, temp, etc.)

#### 🎨 Color Operations (20+ fonksiyon)
**Color Space Conversions:**
- HEX ↔ RGB ↔ HSL ↔ HSV ↔ CMYK ↔ LAB
- Color palette generation
- Gradient generation
- Random color generation

**Color Analysis:**
- Contrast ratio calculation
- Color blindness simulation
- Dominant color extraction
- Color harmony analysis

#### ⏰ Time & Date (15+ fonksiyon)
**Conversions:**
- Unix timestamp ↔ Human readable
- Timezone conversions
- Date format transformations
- Duration calculations

**Operations:**
- Date arithmetic (add/subtract)
- Business day calculations
- Time zone detection
- Relative time formatting

#### 📄 Format Operations (30+ fonksiyon)
**Data Formats:**
- JSON ↔ YAML ↔ TOML ↔ INI ↔ XML
- CSV ↔ TSV ↔ Excel conversion
- Configuration file conversions
- Schema validation

**Web Formats:**
- JWT decode/encode/verify
- Cookie parsing/creation
- User-Agent parsing
- SQL formatting & validation

**Code Operations:**
- JavaScript/CSS/HTML minify/beautify
- Code obfuscation
- Syntax highlighting
- Comment removal

#### 🖼️ Image & Media (20+ fonksiyon)
**Image Operations:**
- Base64 image encode/decode
- Data URI generation
- Image metadata extraction
- Dominant color analysis

**Generation:**
- QR codes (various formats)
- Barcodes (EAN, UPC, Code128)
- Avatar generation
- Placeholder images

#### 📁 File Operations (15+ fonksiyon)
**Compression:**
- ZIP/GZIP/Brotli compression
- File size analysis
- MIME type detection
- File signature verification

#### 🌐 Network Operations (20+ fonksiyon)
**IP & Domain:**
- IP address validation/analysis
- Subnet calculations, CIDR operations
- Domain validation, Punycode conversion
- Geolocation lookup

**Protocol Operations:**
- HTTP header parsing
- Email validation/parsing
- WebSocket frame analysis
- Network port scanning info

#### 🎲 Generators (25+ fonksiyon)
**ID Generation:**
- UUID (v1, v4, v5), NanoID, CUID
- Snowflake IDs, Short IDs
- Database ID generators

**Password & Security:**
- Secure password generation
- Memorable password generation
- API key generation
- Certificate generation

**Data Generation:**
- Lorem ipsum text
- Fake data generation
- JSON schema generation
- Random data creation

#### 🧮 Advanced Analysis (10+ fonksiyon)
- Text sentiment analysis
- Language detection
- Regular expression testing
- Data pattern recognition

### API Özellikleri:
- RESTful design
- Comprehensive error handling
- Input validation
- Response caching headers
- CORS support
- OpenAPI/Swagger documentation
- Request/response logging
- Performance metrics

## Sonraki Adımlar:
1. Core converter functions yazalım
2. API route handlers oluşturalım  
3. Validation ve error handling ekleyelim
4. Client-side API integration yapalım
