# EnDcode

**Universal Text Encoder/Decoder**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black)](https://nextjs.org)

A modern, full-featured, client-side tool for encoding and decoding text in multiple formats—featuring automatic detection, real-time processing, and both web UI and RESTful API interfaces.

---

## 🚀 Features

* 🔄 Dual-mode encoding and decoding
* 🤖 Auto-detection of encoding with confidence scoring
* 🌐 RESTful API endpoints for programmatic use
* ⚡ Real-time, client-side processing
* 📱 Responsive design with dark mode support
* 📋 Copy to clipboard with a single click

## 🛠 Tech Stack

* **Framework:** Next.js 13
* **Language:** TypeScript
* **UI:** React 18, Tailwind CSS, shadcn/ui, Lucide Icons
* **Hosting:** Vercel (recommended)

## 📥 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/OmHackz-dev/EnDcode.git
   cd EnDcode
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open in your browser**

   Navigate to `http://localhost:3000` to start using EnDcode.

## 🧩 Usage

* Select an encoding format (e.g., Base64, URL, Hex, HTML Entities, etc.)
* Paste or type your input in the left pane
* EnDcode will automatically detect or use the selected mode
* View the result in the right pane in real-time
* Click the copy icon to copy the output to your clipboard

## 🔗 API Documentation

The RESTful API allows programmatic access to the encoding/decoding engine.

**Endpoint**

```
GET /api/encode-decode
```

**Query Parameters**

| Parameter | Type   | Description                                                              |
| --------- | ------ | ------------------------------------------------------------------------ |
| `mode`    | string | Encoding or decoding format (e.g., `base64`, `url`). Supports 40+ types. |
| `input`   | string | Plain text or encoded string to process.                                 |

**Response**

```json
{
  "mode": "base64",
  "input": "Hello, World!",
  "output": "SGVsbG8sIFdvcmxkIQ==",
  "confidence": 0.98
}
```

## 🤝 Contributing

Contributions are welcome! Here’s how you can help:

* **Report Issues:** Open issues for bugs or feature requests.
* **Submit PRs:** Fork the repo, make changes, and submit a pull request.
* **Add Features:** Implement new encoding types or UI enhancements.
* **Star the Repo:** Show your support by starring the project on GitHub.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

**Quick Links**

* [Use the Tool](https://en-dcode.omhackz.dev)
* [GitHub Repository](https://github.com/OmHackz-dev/EnDcode)
* [About](https://github.com/OmHackz-dev/EnDcode#readme)

---

*Built with 🚀 and ❤️ by OmHackz*
