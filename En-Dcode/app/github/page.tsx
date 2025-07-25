import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Github, Star, GitFork, Download, Code, Bug, Heart } from "lucide-react"
import Link from "next/link"

export default function GitHubPage() {
  const techStack = ["Next.js 15", "React 18", "TypeScript", "Tailwind CSS", "shadcn/ui", "Lucide Icons"]

  const features = [
    "🔄 Dual-mode encoding/decoding",
    "🤖 Auto-detection with confidence scoring",
    "🌐 RESTful API endpoints",
    "📱 Responsive design",
    "🔒 Client-side processing",
    "⚡ Real-time processing",
    "📋 Copy to clipboard",
    "🎨 Modern UI with dark mode support",
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tool
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Github className="w-8 h-8" />
            EnDcode Repository
          </h1>
          <p className="text-muted-foreground mt-2">by OmHackz - Open source universal text encoder/decoder</p>
        </div>
      </div>

      {/* Repository Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            EnDcode - Universal Text Encoder/Decoder
          </CardTitle>
          <CardDescription>
            by OmHackz - A comprehensive, client-side tool for encoding and decoding text in multiple formats
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              Open Source
            </Badge>
            <Badge variant="secondary">MIT License</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Next.js</Badge>
          </div>

          <p className="text-muted-foreground">
            This project is a modern, full-featured text encoding and decoding tool built with Next.js and React. It
            supports 40+ encoding formats with automatic detection capabilities and provides both a web interface and
            RESTful API.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="https://github.com/OmHackz-dev/EnDcode" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/OmHackz-dev/EnDcode/archive/main.zip"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4 mr-2" />
                Download ZIP
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="https://github.com/OmHackz-dev/EnDcode/fork" target="_blank" rel="noopener noreferrer">
                <GitFork className="w-4 h-4 mr-2" />
                Fork Repository
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>✨ Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card>
        <CardHeader>
          <CardTitle>🛠️ Tech Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <Badge key={index} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Installation */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Quick Start</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. Clone the repository</h3>
            <div className="bg-muted p-3 rounded-lg text-sm font-mono">
              git clone https://github.com/OmHackz-dev/EnDcode.git
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. Install dependencies</h3>
            <div className="bg-muted p-3 rounded-lg text-sm font-mono">
              cd EnDcode
              <br />
              npm install
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. Run development server</h3>
            <div className="bg-muted p-3 rounded-lg text-sm font-mono">npm run dev</div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">4. Open in browser</h3>
            <div className="bg-muted p-3 rounded-lg text-sm font-mono">http://localhost:3000</div>
          </div>
        </CardContent>
      </Card>

      {/* API Documentation */}
      <Card>
        <CardHeader>
          <CardTitle>📡 API Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The project includes a RESTful API for programmatic access to encoding/decoding functionality.
          </p>

          <div>
            <h3 className="font-semibold mb-2">Endpoint</h3>
            <div className="bg-muted p-3 rounded-lg text-sm font-mono">GET /api/encode-decode</div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Supported Operations</h3>
            <ul className="text-sm space-y-1 ml-4">
              <li>• Encode plain text to various formats</li>
              <li>• Decode encoded text back to plain text</li>
              <li>• Support for 40+ encoding types</li>
              <li>• JSON response format</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Contributing */}
      <Card>
        <CardHeader>
          <CardTitle>🤝 Contributing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Contributions are welcome! Here's how you can help improve this project:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bug className="w-4 h-4" />
                <h3 className="font-semibold">Report Issues</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Found a bug or have a feature request? Open an issue on GitHub.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4" />
                <h3 className="font-semibold">Submit PRs</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Fork the repo, make your changes, and submit a pull request.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4" />
                <h3 className="font-semibold">Add Features</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Add new encoding types, improve UI, or enhance functionality.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4" />
                <h3 className="font-semibold">Star the Repo</h3>
              </div>
              <p className="text-sm text-muted-foreground">Show your support by starring the repository on GitHub.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* License */}
      <Card>
        <CardHeader>
          <CardTitle>📄 License</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            This project is licensed under the MIT License - see the LICENSE file for details.
          </p>
          <div className="bg-muted p-4 rounded-lg text-sm">
            <p className="font-semibold mb-2">MIT License</p>
            <p className="text-muted-foreground">
              Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
              associated documentation files (the "Software"), to deal in the Software without restriction, including
              without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
              copies of the Software...
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Links */}
      <Card>
        <CardHeader>
          <CardTitle>🔗 Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Link href="/">
              <Button variant="default">
                <Code className="w-4 h-4 mr-2" />
                Use the Tool
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline">About</Button>
            </Link>
            <Button variant="outline" asChild>
              <a href="https://github.com/OmHackz-dev/EnDcode" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub Repository
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
