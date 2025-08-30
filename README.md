# ConvertHub API Documentation

## Overview

ConvertHub provides a powerful REST API for text and data conversion operations. The API is built with Next.js and supports various encoding, cryptography, and data format conversions.

## Base URL

```
https://yourdomain.com/api
```

## Endpoints

### 1. Convert Text

**POST** `/api/convert`

Convert text using any supported converter.

#### Request Body
```json
{
  "input": "Hello World",
  "converterId": "base64-encode",
  "options": {
    "indent": 2
  }
}
```

#### Response
```json
{
  "success": true,
  "output": "SGVsbG8gV29ybGQ=",
  "metadata": {
    "inputLength": 11,
    "outputLength": 16,
    "processingTime": 2,
    "converterId": "base64-encode"
  }
}
```

### 2. Convert with Specific Converter

**POST** `/api/convert/{converterId}`

Convert text using a specific converter ID.

#### URL Parameters
- `converterId` - The ID of the converter to use

#### Request Body
```json
{
  "input": "Hello World",
  "options": {
    "algorithm": "sha256"
  }
}
```

### 3. Get All Converters

**GET** `/api/convert`

Get a list of all available converters.

#### Response
```json
{
  "success": true,
  "data": {
    "stats": {
      "total": 15,
      "categories": 3,
      "byCategory": {
        "text-encoding": 6,
        "cryptography": 6,
        "data-formats": 3
      }
    },
    "converters": [
      {
        "id": "base64-encode",
        "name": "Base64 Encode",
        "description": "Encode text to Base64 format",
        "category": "text-encoding",
        "tags": ["base64", "encode", "text"]
      }
    ]
  }
}
```

### 4. Get Specific Converter

**GET** `/api/convert/{converterId}`

Get information about a specific converter.

#### Response
```json
{
  "success": true,
  "data": {
    "id": "base64-encode",
    "name": "Base64 Encode",
    "description": "Encode text to Base64 format",
    "category": "text-encoding",
    "tags": ["base64", "encode", "text"]
  }
}
```

### 5. Get Categories

**GET** `/api/categories`

Get all converter categories with their converters.

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "text-encoding",
      "name": "Text & Encoding",
      "converters": [...],
      "count": 6
    }
  ]
}
```

### 6. Search Converters

**GET** `/api/search?q={query}`

Search for converters by name, description, or tags.

#### Query Parameters
- `q` - Search query string

#### Response
```json
{
  "success": true,
  "data": [
    {
      "id": "base64-encode",
      "name": "Base64 Encode",
      "description": "Encode text to Base64 format",
      "category": "text-encoding",
      "tags": ["base64", "encode", "text"]
    }
  ],
  "meta": {
    "query": "base64",
    "resultCount": 2
  }
}
```

## Supported Converters

### Text Encoding
- `base64-encode` - Base64 Encode
- `base64-decode` - Base64 Decode
- `url-encode` - URL Encode
- `url-decode` - URL Decode
- `html-encode` - HTML Encode
- `html-decode` - HTML Decode

### Cryptography
- `hash-md5` - MD5 Hash
- `hash-sha1` - SHA1 Hash
- `hash-sha256` - SHA256 Hash
- `hash-sha512` - SHA512 Hash
- `hmac-generator` - HMAC Generator
- `bcrypt-hash` - BCrypt Hash

### Data Formats
- `json-format` - JSON Formatter
- `json-minify` - JSON Minifier
- `yaml-to-json` - YAML to JSON
- `json-to-yaml` - JSON to YAML
- `xml-format` - XML Formatter

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error description",
  "metadata": {
    "inputLength": 0,
    "outputLength": 0,
    "processingTime": 0,
    "converterId": "unknown"
  }
}
```

## Rate Limiting

- 100 requests per minute per IP
- Larger inputs (>1MB) have lower rate limits
- Premium users get higher limits

## Authentication

Currently, the API is open and doesn't require authentication. In production, consider implementing:

- API Keys
- JWT tokens
- Rate limiting by user

## Examples

### Using cURL

```bash
# Convert to Base64
curl -X POST https://yourdomain.com/api/convert \
  -H "Content-Type: application/json" \
  -d '{"input": "Hello World", "converterId": "base64-encode"}'

# Get all converters
curl https://yourdomain.com/api/convert

# Search converters
curl "https://yourdomain.com/api/search?q=base64"
```

### Using JavaScript

```javascript
// Convert text
const response = await fetch('/api/convert', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    input: 'Hello World',
    converterId: 'base64-encode'
  })
});

const result = await response.json();
console.log(result.output); // SGVsbG8gV29ybGQ=
```

### Using Python

```python
import requests

# Convert text
response = requests.post('https://yourdomain.com/api/convert', json={
    'input': 'Hello World',
    'converterId': 'base64-encode'
})

result = response.json()
print(result['output'])  # SGVsbG8gV29ybGQ=
```

## Status Codes

- `200` - Success
- `400` - Bad Request (invalid input)
- `404` - Not Found (converter not found)
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error