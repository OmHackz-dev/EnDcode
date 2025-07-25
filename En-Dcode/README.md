# EnDcode - Universal Text Encoder/Decoder

<div align="center">

![EnDcode Logo](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/favicon-SweuAOxv5Ra4PoxbroMS6yN4XHoEo4.png)

**A comprehensive, client-side tool for encoding and decoding text in 40+ formats**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-en--dcode.vercel.app-blue?style=for-the-badge)](https://en-dcode.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-OmHackz--dev%2FEnDcode-black?style=for-the-badge&logo=github)](https://github.com/OmHackz-dev/EnDcode)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

*Created by [OmHackz](https://github.com/OmHackz-dev)*

</div>

## 🚀 Features

- **40+ Encoding Formats** - Support for Base64, Hex, Binary, Classical Ciphers, and more
- **Auto-Detection** - Automatically identifies encoding types with confidence scoring
- **Dual Mode** - Both encode plain text and decode encoded text
- **RESTful API** - Programmatic access to all encoding/decoding functions
- **Client-Side Processing** - All operations happen in your browser for privacy
- **Real-Time Processing** - Instant encoding/decoding as you type
- **Modern UI** - Clean, responsive design with dark mode support
- **Copy to Clipboard** - Easy copying of results

## 🌐 Live Demo

Try EnDcode now: **[en-dcode.vercel.app](https://en-dcode.vercel.app)**

## 📋 Supported Formats

### Base Encodings
- Base64, Base64 URL, Base32, Base58, ASCII85

### Number Systems
- Hexadecimal, Binary, Octal, Decimal

### Text Encodings
- URL Encoding, HTML Entities, Quoted Printable

### Classical Ciphers
- ROT13, ROT18, ROT47, Caesar Cipher, Atbash

### Case Transformations
- UPPER CASE, lower case, Title Case, camelCase, PascalCase
- snake_case, kebab-case, CONSTANT_CASE, dot.case, sWaP cAsE

### Programming Formats
- ASCII Codes, Unicode Escape

### Visual Encodings
- Morse Code, Braille

### Esoteric Languages
- Brainfuck, Ook!

### Utility Formats
- Reverse, 1337 Speak, Pig Latin, Rail Fence, Unix Timestamp, ISO8601, Hex Color, Run Length

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/OmHackz-dev/EnDcode.git
   cd EnDcode
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 📡 API Usage

EnDcode provides a RESTful API for programmatic access to all encoding/decoding functions.

### Base URL
\`\`\`
https://en-dcode.vercel.app/api
\`\`\`

### Endpoint
\`\`\`
GET /encode-decode
\`\`\`

### Parameters
- \`text\` (required) - The text to encode/decode
- \`operation\` (required) - Either "encode" or "decode"
- \`type\` (required) - The encoding format

### Example Request
\`\`\`bash
curl "https://en-dcode.vercel.app/api/encode-decode?text=Hello%20World&operation=encode&type=base64"
\`\`\`

### Example Response
\`\`\`json
{
  "success": true,
  "operation": "encode",
  "type": "base64",
  "input": "Hello World",
  "output": "SGVsbG8gV29ybGQ=",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
\`\`\`

For complete API documentation, visit: [en-dcode.vercel.app/api-docs](https://en-dcode.vercel.app/api-docs)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (\`git checkout -b feature/amazing-feature\`)
3. **Commit your changes** (\`git commit -m 'Add amazing feature'\`)
4. **Push to the branch** (\`git push origin feature/amazing-feature\`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure responsive design
- Add proper error handling
- Include tests for new features
- Update documentation as needed

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please open an issue on GitHub:

[**Open an Issue**](https://github.com/OmHackz-dev/EnDcode/issues/new)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com/)

## 📊 Project Stats

- **40+ Encoding Formats** supported
- **Client-Side Processing** for privacy
- **RESTful API** for developers
- **Open Source** under MIT License
- **Modern Tech Stack** with TypeScript

---

<div align="center">

**Made with ❤️ by [OmHackz](https://github.com/OmHackz-dev)**

[Live Demo](https://en-dcode.vercel.app) • [API Docs](https://en-dcode.vercel.app/api-docs) • [GitHub](https://github.com/OmHackz-dev/EnDcode)

</div>
\`\`\`
