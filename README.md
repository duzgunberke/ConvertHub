# 🚀 ConvertHub API Documentation

---

## 🌐 Base URL

```txt
https://converthub.vercel.app/api
# or for local development:
http://localhost:3000/api
```

---

## 📝 Overview

ConvertHub API provides powerful text and data conversion operations. The API supports various converter types including text encoders, cryptographic hashers, generators, and advanced tools.

---

## 🔒 Authentication

Currently, the API is open and doesn't require authentication. All endpoints are publicly accessible.

---

## 🚦 Rate Limiting

- **100 requests per minute per IP address**
- Larger inputs (>1MB) may have lower rate limits
- No authentication required for current version

---

# 🛠️ Endpoints

---

## 1️⃣ Convert Text

### POST `/convert`

Convert text using any supported converter.

#### Request Body

```json
{
  "input": "Hello World",           // Optional for generators
  "converterId": "base64-encode",   // Required
  "options": {                      // Optional
    "indent": 2,
    "uppercase": true
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

#### Example cURL

```bash
curl -X POST http://localhost:3000/api/convert \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Hello World",
    "converterId": "base64-encode"
  }'
```

---

## 2️⃣ Convert with Specific Converter

### POST `/convert/{converterId}`

Convert using a specific converter ID.

#### URL Parameters

- `converterId` (string) - The ID of the converter to use

#### Request Body

```json
{
  "input": "Hello World",    // Optional for generators
  "options": {               // Optional
    "length": 16,
    "includeSymbols": true
  }
}
```

#### Example - UUID Generator

```bash
curl -X POST http://localhost:3000/api/convert/uuid-generate \
  -H "Content-Type: application/json" \
  -d '{}'
```

#### Example - Password Generator

```bash
curl -X POST http://localhost:3000/api/convert/password-generate \
  -H "Content-Type: application/json" \
  -d '{
    "options": {
      "length": 20,
      "includeSymbols": true,
      "includeNumbers": true,
      "excludeSimilar": true
    }
  }'
```

#### Example - Base64 Encode

```bash
curl -X POST http://localhost:3000/api/convert/base64-encode \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Hello World"
  }'
```

---

## 3️⃣ Get All Converters

### GET `/convert`

Get a list of all available converters with statistics.

#### Response

```json
{
  "success": true,
  "data": {
    "stats": {
      "total": 37,
      "categories": 10,
      "byCategory": {
        "text-encoding": 12,
        "cryptography": 5,
        "generators": 4
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

#### Example

```bash
curl http://localhost:3000/api/convert
```

---

## 4️⃣ Get Specific Converter

### GET `/convert/{converterId}`

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

#### Example

```bash
curl http://localhost:3000/api/convert/base64-encode
```

---

## 5️⃣ Get Categories

### GET `/categories`

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
      "count": 12
    },
    {
      "id": "generators",
      "name": "Generators", 
      "converters": [...],
      "count": 4
    }
  ]
}
```

#### Example

```bash
curl http://localhost:3000/api/categories
```

---

## 6️⃣ Search Converters

### GET `/search?q={query}`

Search for converters by name, description, or tags.

#### Query Parameters

- `q` (string) - Search query

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

#### Example

```bash
curl "http://localhost:3000/api/search?q=base64"
```

---

# 🧩 Converter Types & Examples

## ✏️ Text Encoding Converters

- **Base64 Encode**
  ```bash
  curl -X POST http://localhost:3000/api/convert/base64-encode \
    -H "Content-Type: application/json" \
    -d '{"input": "Hello World"}'
  ```
- **URL Encode**
  ```bash
  curl -X POST http://localhost:3000/api/convert/url-encode \
    -H "Content-Type: application/json" \
    -d '{"input": "Hello World & Special Characters!"}'
  ```
- **HTML Encode**
  ```bash
  curl -X POST http://localhost:3000/api/convert/html-encode \
    -H "Content-Type: application/json" \
    -d '{"input": "<script>alert(\"test\")</script>"}'
  ```

---

## 🔐 Cryptography Converters

- **SHA256 Hash**
  ```bash
  curl -X POST http://localhost:3000/api/convert/hash-sha256 \
    -H "Content-Type: application/json" \
    -d '{"input": "Hello World"}'
  ```
- **HMAC-SHA256**
  ```bash
  curl -X POST http://localhost:3000/api/convert/hmac-sha256 \
    -H "Content-Type: application/json" \
    -d '{"input": "Hello World\nmysecretkey"}'
  ```

---

## ⚡ Generator Converters

- **UUID Generator**
  ```bash
  curl -X POST http://localhost:3000/api/convert/uuid-generate \
    -H "Content-Type: application/json" \
    -d '{}'
  ```
- **Password Generator**
  ```bash
  curl -X POST http://localhost:3000/api/convert/password-generate \
    -H "Content-Type: application/json" \
    -d '{
      "options": {
        "length": 16,
        "includeUppercase": true,
        "includeLowercase": true, 
        "includeNumbers": true,
        "includeSymbols": true,
        "excludeSimilar": false
      }
    }'
  ```
- **QR Code Generator**
  ```bash
  curl -X POST http://localhost:3000/api/convert/qr-generate \
    -H "Content-Type: application/json" \
    -d '{
      "input": "Hello World",
      "options": {
        "size": 200,
        "errorLevel": "M"
      }
    }'
  ```
- **Lorem Ipsum Generator**
  ```bash
  curl -X POST http://localhost:3000/api/convert/lorem-generate \
    -H "Content-Type: application/json" \
    -d '{
      "options": {
        "wordCount": 50
      }
    }'
  ```

---

## 🛠️ Advanced Tools

- **RegEx Tester**
  ```bash
  curl -X POST http://localhost:3000/api/convert/regex-test \
    -H "Content-Type: application/json" \
    -d '{
      "input": "test@example.com\ninvalid-email\nuser@domain.org",
      "options": {
        "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        "flags": "gm",
        "showMatches": true
      }
    }'
  ```
- **SQL Formatter**
  ```bash
  curl -X POST http://localhost:3000/api/convert/sql-format \
    -H "Content-Type: application/json" \
    -d '{
      "input": "select * from users where active=1 order by name",
      "options": {
        "uppercase": true
      }
    }'
  ```
- **CSS Minifier**
  ```bash
  curl -X POST http://localhost:3000/api/convert/css-minify \
    -H "Content-Type: application/json" \
    -d '{
      "input": ".container {\n  display: flex;\n  justify-content: center;\n}"
    }'
  ```
- **CSV to JSON**
  ```bash
  curl -X POST http://localhost:3000/api/convert/csv-to-json \
    -H "Content-Type: application/json" \
    -d '{
      "input": "name,age,city\nJohn,30,New York\nJane,25,Los Angeles",
      "options": {
        "delimiter": ",",
        "hasHeader": true
      }
    }'
  ```

---

# 💻 Programming Language Examples

## JavaScript/Node.js

```javascript
// Using fetch API
async function convertToBase64(text) {
  const response = await fetch('http://localhost:3000/api/convert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: text,
      converterId: 'base64-encode'
    })
  });
  
  const result = await response.json();
  return result.success ? result.output : null;
}

// Generate Password
async function generatePassword(length = 16) {
  const response = await fetch('http://localhost:3000/api/convert/password-generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      options: {
        length,
        includeSymbols: true,
        excludeSimilar: true
      }
    })
  });
  
  const result = await response.json();
  return result.success ? result.output : null;
}

// Usage
convertToBase64('Hello World').then(console.log);
generatePassword(20).then(console.log);
```

## Python

```python
import requests
import json

# Base URL
BASE_URL = "http://localhost:3000/api"

def convert_text(text, converter_id, options=None):
    """Convert text using specified converter"""
    url = f"{BASE_URL}/convert"
    payload = {
        "input": text,
        "converterId": converter_id
    }
    if options:
        payload["options"] = options
    
    response = requests.post(url, json=payload)
    result = response.json()
    
    return result.get('output') if result.get('success') else None

def generate_password(length=16, include_symbols=True):
    """Generate secure password"""
    url = f"{BASE_URL}/convert/password-generate"
    payload = {
        "options": {
            "length": length,
            "includeSymbols": include_symbols,
            "excludeSimilar": True
        }
    }
    
    response = requests.post(url, json=payload)
    result = response.json()
    
    return result.get('output') if result.get('success') else None

def get_all_converters():
    """Get list of all available converters"""
    response = requests.get(f"{BASE_URL}/convert")
    return response.json()

# Usage examples
print(convert_text("Hello World", "base64-encode"))
print(generate_password(20))
print(convert_text("Hello World", "hash-sha256"))

# Search converters
search_response = requests.get(f"{BASE_URL}/search?q=hash")
print(search_response.json())
```

## PHP

```php
<?php
class ConvertHubAPI {
    private $baseUrl;
    
    public function __construct($baseUrl = 'http://localhost:3000/api') {
        $this->baseUrl = $baseUrl;
    }
    
    public function convert($input, $converterId, $options = null) {
        $url = $this->baseUrl . '/convert';
        $data = [
            'input' => $input,
            'converterId' => $converterId
        ];
        
        if ($options) {
            $data['options'] = $options;
        }
        
        $response = $this->makeRequest($url, $data);
        return $response['success'] ? $response['output'] : null;
    }
    
    public function generatePassword($length = 16, $includeSymbols = true) {
        $url = $this->baseUrl . '/convert/password-generate';
        $data = [
            'options' => [
                'length' => $length,
                'includeSymbols' => $includeSymbols,
                'excludeSimilar' => true
            ]
        ];
        
        $response = $this->makeRequest($url, $data);
        return $response['success'] ? $response['output'] : null;
    }
    
    private function makeRequest($url, $data) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);
        
        $response = curl_exec($ch);
        curl_close($ch);
        
        return json_decode($response, true);
    }
}

// Usage
$api = new ConvertHubAPI();
echo $api->convert('Hello World', 'base64-encode') . "\n";
echo $api->generatePassword(20) . "\n";
?>
```

---

# ⚠️ Error Handling

## Error Response Format

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

## HTTP Status Codes

- **200** - Success
- **400** - Bad Request (validation error, missing required fields)
- **404** - Not Found (converter not found)
- **500** - Internal Server Error

## Common Errors

### Missing Input for Text Converters

```json
{
  "success": false,
  "error": "Missing required field: input"
}
```

### Invalid Converter ID

```json
{
  "success": false,
  "error": "Converter 'invalid-id' not found"
}
```

### Validation Error

```json
{
  "success": false,
  "error": "Invalid Base64 format"
}
```

---

# 📋 Complete Converter List

## Text & Encoding (12)
- `base64-encode` / `base64-decode`
- `url-encode` / `url-decode`  
- `html-encode` / `html-decode`
- `text-uppercase` / `text-lowercase` / `text-capitalize` / `text-reverse`
- `unicode-to-ascii` / `ascii-to-unicode`

## Cryptography (5)
- `hash-md5` / `hash-sha1` / `hash-sha256` / `hash-sha512`
- `hmac-sha256`

## Numbers & Math (4)
- `decimal-to-binary` / `binary-to-decimal`
- `decimal-to-hex` / `hex-to-decimal`

## Colors & Design (2)
- `hex-to-rgb` / `rgb-to-hex`

## Time & Date (2)
- `timestamp-to-date` / `date-to-timestamp`

## Data Formats (4)
- `json-format` / `json-minify`
- `csv-to-json` / `json-to-csv`

## CSS Tools (2)
- `css-minify` / `css-format`

## Database Tools (1)
- `sql-format`

## RegEx Tools (1) 
- `regex-test`

## Generators (4)
- `uuid-generate` / `password-generate`
- `lorem-generate` / `qr-generate`

---

# 💡 Tips & Best Practices

1. **Always check the `success` field** in responses before using output
2. **Handle errors gracefully** - validate inputs client-side when possible
3. **Use specific converter endpoints** (`/convert/{id}`) for better performance  
4. **For generators**, don't send input field - only options
5. **For regex testing**, escape backslashes in JSON (`\\` for `\`)
6. **QR codes return image URLs** - fetch the URL to display the image
7. **Large inputs** may take longer - implement timeout handling

---