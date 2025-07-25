"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Code, Copy, ExternalLink, Zap, Shield, Globe } from "lucide-react"
import Link from "next/link"

export default function ApiDocsPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const supportedFormats = [
    "base64",
    "base64url",
    "base32",
    "base58",
    "ascii85",
    "hex",
    "binary",
    "octal",
    "decimal",
    "url",
    "html",
    "quoted_printable",
    "rot13",
    "rot18",
    "rot47",
    "caesar",
    "atbash",
    "upper_case",
    "lower_case",
    "title_case",
    "camel_case",
    "pascal_case",
    "snake_case",
    "kebab_case",
    "constant_case",
    "dot_case",
    "swap_case",
    "ascii",
    "unicode",
    "morse",
    "braille",
    "brainfuck",
    "ook",
    "reverse",
    "leetspeak",
    "pig_latin",
    "rail_fence",
    "unix_timestamp",
    "iso8601",
    "hex_color",
    "run_length",
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tool
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            EnDcode API Documentation
          </h1>
          <p className="text-xl text-muted-foreground mt-2">by OmHackz</p>
          <p className="text-muted-foreground mt-1">RESTful API for encoding and decoding text in 40+ formats</p>
        </div>
      </div>

      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            API Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The EnDcode API provides programmatic access to our comprehensive text encoding and decoding service.
            Transform text between 40+ different formats including Base64, Hexadecimal, Binary, Classical Ciphers, Case
            Transformations, and more.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Zap className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-semibold">Fast & Reliable</h3>
                <p className="text-sm text-muted-foreground">Lightning-fast processing</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Shield className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="font-semibold">Secure</h3>
                <p className="text-sm text-muted-foreground">No data logging or storage</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 border rounded-lg">
              <Code className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="font-semibold">40+ Formats</h3>
                <p className="text-sm text-muted-foreground">Comprehensive format support</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Base URL */}
      <Card>
        <CardHeader>
          <CardTitle>Base URL</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm flex items-center justify-between">
            <span>https://en-dcode.vercel.app/api</span>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard("https://en-dcode.vercel.app/api")}>
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Authentication */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Currently, the EnDcode API is open and does not require authentication. However, we recommend implementing
            rate limiting on your end to prevent abuse.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> Authentication may be required in future versions for enhanced security and usage
              tracking.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <Card>
        <CardHeader>
          <CardTitle>Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Encode/Decode Endpoint */}
            <div className="border rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="default">GET</Badge>
                <code className="text-lg font-mono">/encode-decode</code>
              </div>

              <p className="text-muted-foreground mb-4">Encode or decode text using the specified format.</p>

              <h4 className="font-semibold mb-2">Query Parameters</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 bg-muted rounded">
                  <code className="font-semibold">text</code>
                  <Badge variant="destructive" className="w-fit">
                    Required
                  </Badge>
                  <span className="text-sm">string</span>
                  <span className="text-sm text-muted-foreground">The text to encode/decode</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 bg-muted rounded">
                  <code className="font-semibold">operation</code>
                  <Badge variant="destructive" className="w-fit">
                    Required
                  </Badge>
                  <span className="text-sm">string</span>
                  <span className="text-sm text-muted-foreground">Either "encode" or "decode"</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 p-3 bg-muted rounded">
                  <code className="font-semibold">type</code>
                  <Badge variant="destructive" className="w-fit">
                    Required
                  </Badge>
                  <span className="text-sm">string</span>
                  <span className="text-sm text-muted-foreground">The encoding format (see supported formats)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Request Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="curl" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="php">PHP</TabsTrigger>
            </TabsList>

            <TabsContent value="curl" className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Encode Text to Base64</h4>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-transparent"
                    onClick={() =>
                      copyToClipboard(
                        `curl -X GET "https://en-dcode.vercel.app/api/encode-decode?text=Hello%20World&operation=encode&type=base64"`,
                      )
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <pre>{`curl -X GET "https://en-dcode.vercel.app/api/encode-decode?text=Hello%20World&operation=encode&type=base64"`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Decode Base64 Text</h4>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-transparent"
                    onClick={() =>
                      copyToClipboard(
                        `curl -X GET "https://en-dcode.vercel.app/api/encode-decode?text=SGVsbG8gV29ybGQ%3D&operation=decode&type=base64"`,
                      )
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <pre>{`curl -X GET "https://en-dcode.vercel.app/api/encode-decode?text=SGVsbG8gV29ybGQ%3D&operation=decode&type=base64"`}</pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="javascript" className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Using Fetch API</h4>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-transparent"
                    onClick={() =>
                      copyToClipboard(`const response = await fetch('https://en-dcode.vercel.app/api/encode-decode?text=Hello%20World&operation=encode&type=base64');
const data = await response.json();
console.log(data.output); // SGVsbG8gV29ybGQ=`)
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <pre>{`const response = await fetch('https://en-dcode.vercel.app/api/encode-decode?text=Hello%20World&operation=encode&type=base64');
const data = await response.json();
console.log(data.output); // SGVsbG8gV29ybGQ=`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Using Axios</h4>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-transparent"
                    onClick={() =>
                      copyToClipboard(`const axios = require('axios');

const response = await axios.get('https://en-dcode.vercel.app/api/encode-decode', {
  params: {
    text: 'Hello World',
    operation: 'encode',
    type: 'base64'
  }
});

console.log(response.data.output); // SGVsbG8gV29ybGQ=`)
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <pre>{`const axios = require('axios');

const response = await axios.get('https://en-dcode.vercel.app/api/encode-decode', {
  params: {
    text: 'Hello World',
    operation: 'encode',
    type: 'base64'
  }
});

console.log(response.data.output); // SGVsbG8gV29ybGQ=`}</pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="python" className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Using Requests</h4>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-transparent"
                    onClick={() =>
                      copyToClipboard(`import requests

response = requests.get('https://en-dcode.vercel.app/api/encode-decode', params={
    'text': 'Hello World',
    'operation': 'encode',
    'type': 'base64'
})

data = response.json()
print(data['output'])  # SGVsbG8gV29ybGQ=`)
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <pre>{`import requests

response = requests.get('https://en-dcode.vercel.app/api/encode-decode', params={
    'text': 'Hello World',
    'operation': 'encode',
    'type': 'base64'
})

data = response.json()
print(data['output'])  # SGVsbG8gV29ybGQ=`}</pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Using urllib</h4>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-transparent"
                    onClick={() =>
                      copyToClipboard(`import urllib.request
import urllib.parse
import json

params = urllib.parse.urlencode({
    'text': 'Hello World',
    'operation': 'encode',
    'type': 'base64'
})

url = f'https://en-dcode.vercel.app/api/encode-decode?{params}'
response = urllib.request.urlopen(url)
data = json.loads(response.read())
print(data['output'])  # SGVsbG8gV29ybGQ=`)
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <pre>{`import urllib.request
import urllib.parse
import json

params = urllib.parse.urlencode({
    'text': 'Hello World',
    'operation': 'encode',
    'type': 'base64'
})

url = f'https://en-dcode.vercel.app/api/encode-decode?{params}'
response = urllib.request.urlopen(url)
data = json.loads(response.read())
print(data['output'])  # SGVsbG8gV29ybGQ=`}</pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="php" className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Using file_get_contents</h4>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-transparent"
                    onClick={() =>
                      copyToClipboard(`<?php
$url = 'https://en-dcode.vercel.app/api/encode-decode?' . http_build_query([
    'text' => 'Hello World',
    'operation' => 'encode',
    'type' => 'base64'
]);

$response = file_get_contents($url);
$data = json_decode($response, true);
echo $data['output']; // SGVsbG8gV29ybGQ=
?>`)
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <pre>{`<?php
$url = 'https://en-dcode.vercel.app/api/encode-decode?' . http_build_query([
    'text' => 'Hello World',
    'operation' => 'encode',
    'type' => 'base64'
]);

$response = file_get_contents($url);
$data = json_decode($response, true);
echo $data['output']; // SGVsbG8gV29ybGQ=
?>`}</pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Response Format */}
      <Card>
        <CardHeader>
          <CardTitle>Response Format</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Success Response</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <pre>{`{
  "success": true,
  "operation": "encode",
  "type": "base64",
  "input": "Hello World",
  "output": "SGVsbG8gV29ybGQ=",
  "timestamp": "2024-01-15T10:30:00.000Z"
}`}</pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Error Response</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm">
              <pre>{`{
  "success": false,
  "error": "Invalid type. Supported types: base64, hex, binary, ...",
  "timestamp": "2024-01-15T10:30:00.000Z"
}`}</pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Supported Formats */}
      <Card>
        <CardHeader>
          <CardTitle>Supported Formats</CardTitle>
          <CardDescription>All available encoding/decoding formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {supportedFormats.map((format) => (
              <Badge key={format} variant="outline" className="justify-center py-2">
                {format}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Error Codes */}
      <Card>
        <CardHeader>
          <CardTitle>Error Codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <Badge variant="destructive" className="mb-2">
                  400
                </Badge>
                <h4 className="font-semibold">Bad Request</h4>
                <p className="text-sm text-muted-foreground">Missing required parameters or invalid format</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Badge variant="destructive" className="mb-2">
                  429
                </Badge>
                <h4 className="font-semibold">Too Many Requests</h4>
                <p className="text-sm text-muted-foreground">Rate limit exceeded</p>
              </div>
              <div className="p-4 border rounded-lg">
                <Badge variant="destructive" className="mb-2">
                  500
                </Badge>
                <h4 className="font-semibold">Internal Server Error</h4>
                <p className="text-sm text-muted-foreground">Server processing error</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rate Limiting */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Limiting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              To ensure fair usage and maintain service quality, the EnDcode API implements rate limiting:
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Badge variant="outline">Free Tier</Badge>
                <span>100 requests per minute per IP address</span>
              </li>
              <li className="flex items-center gap-2">
                <Badge variant="outline">Burst Limit</Badge>
                <span>10 requests per second</span>
              </li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> Rate limits may be adjusted based on usage patterns and server capacity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Testing */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Testing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">Test the API directly from your browser:</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://en-dcode.vercel.app/api/encode-decode?text=Hello%20World&operation=encode&type=base64"
                target="_blank"
              >
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Test Base64 Encode
                </Button>
              </Link>
              <Link
                href="https://en-dcode.vercel.app/api/encode-decode?text=SGVsbG8gV29ybGQ%3D&operation=decode&type=base64"
                target="_blank"
              >
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Test Base64 Decode
                </Button>
              </Link>
              <Link
                href="https://en-dcode.vercel.app/api/encode-decode?text=Hello%20World&operation=encode&type=hex"
                target="_blank"
              >
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Test Hex Encode
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card>
        <CardHeader>
          <CardTitle>Support & Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">Need help with the EnDcode API? Get in touch:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Developer</h4>
                <p className="text-sm text-muted-foreground">OmHackz</p>
                <p className="text-sm text-muted-foreground">Creator of EnDcode</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">GitHub Repository</h4>
                <Link href="https://github.com/OmHackz-dev/EnDcode" target="_blank">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on GitHub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center py-8 border-t">
        <p className="text-muted-foreground">
          <strong>EnDcode API</strong> by <strong>OmHackz</strong> - Universal Text Encoding & Decoding Service
        </p>
        <p className="text-sm text-muted-foreground mt-2">Built with ❤️ for developers worldwide</p>
      </div>
    </div>
  )
}
