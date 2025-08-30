# ConvertHub - Professional Developer Tools

<div align="center">

![ConvertHub Logo](https://via.placeholder.com/200x80/4F46E5/FFFFFF?text=ConvertHub)

**A powerful, modern platform for text conversion, encoding, hashing and data transformation**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://converthub.vercel.app) • [API Documentation](#api-documentation) • [Contributing](#contributing)

</div>

## 🚀 Features

### Current Tools (25+ Converters)

#### 📝 Text & Encoding
- **Base64** - Encode/decode text to Base64 format
- **URL Encoding** - Encode/decode URLs for web usage
- **HTML Entities** - Encode/decode special HTML characters
- **Text Transformations** - Uppercase, lowercase, capitalize, reverse

#### 🔐 Cryptography
- **Hash Functions** - MD5, SHA1, SHA256, SHA512
- **HMAC** - Generate HMAC with secret keys
- **Secure Hashing** - Professional-grade cryptographic operations

#### 🔢 Numbers & Math
- **Base Conversions** - Decimal ↔ Binary ↔ Hexadecimal
- **Number Systems** - Convert between different numeral systems

#### 🎨 Colors & Design
- **Color Conversions** - Hex ↔ RGB transformations
- **Design Tools** - Color format conversions for developers

#### ⏰ Time & Date
- **Timestamp Conversions** - Unix timestamp ↔ Human readable dates
- **Date Formatting** - Multiple date format support

#### 📄 Data Formats
- **JSON Tools** - Format, validate, and minify JSON
- **Data Parsing** - Structure and validate data formats

#### 🎲 Generators
- **UUID Generator** - Generate unique identifiers (v4)
- **Password Generator** - Create secure passwords
- **Lorem Ipsum** - Generate placeholder text

### 🎯 Core Features

- **🚀 Fast & Responsive** - Built with Next.js 15 and optimized performance
- **🎨 Modern UI** - Beautiful glassmorphism design with premium animations
- **📱 Mobile First** - Fully responsive across all devices
- **⚡ Real-time Processing** - Instant conversion with live feedback
- **📋 Smart Copy** - One-click copy to clipboard
- **📁 File Upload** - Support for text file uploads (up to 10MB)
- **🔍 Smart Search** - Find converters by name, description, or tags
- **📊 Detailed Metadata** - Processing time, character counts, and more
- **🌙 Dark Theme** - Professional dark mode interface
- **🔧 Developer Friendly** - REST API for programmatic access

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/converthub.git
cd converthub

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

## 🏗️ Project Structure

```
converthub/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── categories/    # Category endpoints
│   │   ├── convert/       # Conversion endpoints
│   │   └── search/        # Search endpoints
│   ├── globals.css        # Global styles & design system
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main converter interface
├── components/            # React components
│   ├── convert/          # Conversion-specific components
│   └── ui/               # Reusable UI components
├── lib/                  # Core libraries
│   ├── converters/       # Converter implementations
│   ├── converter-registry.ts # Converter management
│   └── api-client.ts     # API client & hooks
├── models/               # Data models
├── types/                # TypeScript definitions
└── public/               # Static assets
```

## 🔧 Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icons
- **Sonner** - Toast notifications

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Node.js Crypto** - Built-in cryptographic operations
- **TypeScript** - End-to-end type safety

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

## 📡 API Documentation

ConvertHub provides a comprehensive REST API for programmatic access:

### Base URL
```
https://yourdomain.com/api
```

### Key Endpoints

```bash
# Convert text
POST /api/convert
POST /api/convert/{converterId}

# Get converters
GET /api/convert
GET /api/convert/{converterId}

# Categories and search
GET /api/categories
GET /api/search?q={query}
```

### Example Usage

```javascript
// Convert to Base64
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

[View Complete API Documentation →](./API.md)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Deploy to Vercel
npm i -g vercel
vercel --prod
```

### Other Platforms
- **Netlify** - `npm run build && npm run export`
- **Docker** - Dockerfile included
- **Traditional Hosting** - Static export supported

## 🛠️ Potential Enhancements

### High Priority
- [ ] **More Converters**
  - CSS/SCSS/LESS transformations
  - SQL formatters and validators
  - Regular expression testing
  - Unicode/ASCII converters
  - QR code generation

- [ ] **File Format Support**
  - CSV ↔ JSON ↔ XML conversions
  - YAML ↔ TOML ↔ INI
  - Image format conversions
  - PDF text extraction

- [ ] **Advanced Features**
  - Batch processing multiple inputs
  - Conversion history and favorites
  - Custom converter plugins
  - Template/preset management

### Medium Priority
- [ ] **Developer Experience**
  - CLI tool for terminal usage
  - Browser extension
  - VS Code extension
  - Desktop app (Electron)

- [ ] **Collaboration Features**
  - User accounts and profiles
  - Shared converter collections
  - Team workspaces
  - Public converter gallery

### Nice to Have
- [ ] **Analytics & Insights**
  - Usage analytics dashboard
  - Performance monitoring
  - Conversion statistics
  - Popular tools tracking

- [ ] **Enterprise Features**
  - API rate limiting and keys
  - Custom branding
  - SSO integration
  - Audit logs

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-converter`)
3. Make your changes
4. Add tests if applicable
5. Commit changes (`git commit -m 'Add amazing converter'`)
6. Push to branch (`git push origin feature/amazing-converter`)
7. Open a Pull Request

### Adding New Converters

```typescript
// lib/converters/my-converter.ts
export class MyConverter extends BaseConverter {
  id = 'my-converter';
  name = 'My Converter';
  description = 'Does something amazing';
  category = 'text-encoding';
  tags = ['custom', 'transform'];

  async convert(input: string): Promise<string> {
    // Your conversion logic here
    return input.toUpperCase();
  }
}
```

### Guidelines
- Follow TypeScript best practices
- Add proper error handling
- Include validation where needed
- Write clear documentation
- Test your converters thoroughly

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- [Lucide](https://lucide.dev/) - Beautiful icons


<div align="center">

**Made with ❤️ for developers, by developers**

[⭐ Star this repo](https://github.com/duzgunberke/converthub)

</div>