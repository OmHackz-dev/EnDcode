"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, RefreshCw, AlertCircle, Code, CodeIcon as Decode } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { Github } from "lucide-react"

type EncodingType =
  // Base encodings
  | "base64"
  | "base64url"
  | "base32"
  | "base45"
  | "base58"
  | "base62"
  | "base85"
  | "ascii85"
  // Hex and binary
  | "hex"
  | "binary"
  | "octal"
  | "decimal"
  // Text encodings
  | "url"
  | "html"
  | "html_basic"
  | "punycode"
  | "quoted_printable"
  // Cryptographic hashes
  | "md5"
  | "sha1"
  | "sha256"
  | "sha512"
  | "crc32"
  // Classical ciphers
  | "rot13"
  | "rot18"
  | "rot47"
  | "caesar"
  | "atbash"
  | "affine"
  | "vigenere"
  // Case transformations
  | "upper_case"
  | "lower_case"
  | "title_case"
  | "camel_case"
  | "pascal_case"
  | "snake_case"
  | "kebab_case"
  | "constant_case"
  | "dot_case"
  | "swap_case"
  // Programming
  | "ascii"
  | "unicode"
  | "unicode_nfd"
  | "unicode_nfc"
  | "unicode_nfkd"
  | "unicode_nfkc"
  // Morse and Braille
  | "morse"
  | "braille"
  // Esoteric
  | "brainfuck"
  | "ook"
  | "malbolge"
  | "whitespace"
  // Date formats
  | "unix_timestamp"
  | "iso8601"
  | "rfc2822"
  // Color formats
  | "hex_color"
  | "rgb_color"
  | "hsl_color"
  | "cmyk_color"
  // Advanced ciphers
  | "rail_fence"
  | "scytale"
  | "enigma"
  // Additional formats
  | "reverse"
  | "leetspeak"
  | "pig_latin"
  | "soundex"
  | "metaphone"
  // Number systems
  | "roman_numerals"
  | "fibonacci"
  | "prime_numbers"
  // Compression-like
  | "run_length"
  | "huffman_basic"

interface DecodingResult {
  type: EncodingType
  result: string
  confidence: number
}

export default function Component() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [selectedEncoding, setSelectedEncoding] = useState<EncodingType | "auto">("auto")
  const [selectedEncodingType, setSelectedEncodingType] = useState<EncodingType>("base64")
  const [autoDetect, setAutoDetect] = useState(true)
  const [detectedType, setDetectedType] = useState<EncodingType | null>(null)
  const [error, setError] = useState("")
  const [mode, setMode] = useState<"decode" | "encode">("decode")

  // Encoding functions
  const encoders = {
    // Base encodings
    base64: (text: string): string => btoa(text),

    base64url: (text: string): string => btoa(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, ""),

    base32: (text: string): string => {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
      let result = ""
      let bits = 0
      let value = 0
      for (let i = 0; i < text.length; i++) {
        value = (value << 8) | text.charCodeAt(i)
        bits += 8
        while (bits >= 5) {
          result += alphabet[(value >>> (bits - 5)) & 31]
          bits -= 5
        }
      }
      if (bits > 0) {
        result += alphabet[(value << (5 - bits)) & 31]
      }
      while (result.length % 8 !== 0) {
        result += "="
      }
      return result
    },

    base58: (text: string): string => {
      const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
      const bytes = new TextEncoder().encode(text)
      let num = BigInt(0)
      for (const byte of bytes) {
        num = num * BigInt(256) + BigInt(byte)
      }
      let result = ""
      while (num > 0) {
        result = alphabet[Number(num % BigInt(58))] + result
        num = num / BigInt(58)
      }
      return result || "1"
    },

    ascii85: (text: string): string => {
      const bytes = new TextEncoder().encode(text)
      let result = ""
      for (let i = 0; i < bytes.length; i += 4) {
        let value = 0
        for (let j = 0; j < 4; j++) {
          value = value * 256 + (bytes[i + j] || 0)
        }
        for (let j = 0; j < 5; j++) {
          result = String.fromCharCode(33 + (value % 85)) + result
          value = Math.floor(value / 85)
        }
      }
      return result
    },

    // Hex and binary
    hex: (text: string): string =>
      Array.from(text)
        .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
        .join(""),

    binary: (text: string): string =>
      Array.from(text)
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
        .join(" "),

    octal: (text: string): string =>
      Array.from(text)
        .map((char) => char.charCodeAt(0).toString(8))
        .join(" "),

    decimal: (text: string): string =>
      Array.from(text)
        .map((char) => char.charCodeAt(0).toString())
        .join(" "),

    // Text encodings
    url: (text: string): string => encodeURIComponent(text),

    html: (text: string): string =>
      text.replace(
        /[&<>"']/g,
        (match) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[match] || match,
      ),

    quoted_printable: (text: string): string =>
      text.replace(
        /[^\x20-\x7E]|[=]/g,
        (match) => "=" + match.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"),
      ),

    // Classical ciphers
    rot13: (text: string): string =>
      text.replace(/[a-zA-Z]/g, (char) => {
        const start = char <= "Z" ? 65 : 97
        return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start)
      }),

    rot18: (text: string): string =>
      text.replace(/[a-zA-Z0-9]/g, (char) => {
        if (/[a-zA-Z]/.test(char)) {
          const start = char <= "Z" ? 65 : 97
          return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start)
        } else {
          return String.fromCharCode(((char.charCodeAt(0) - 48 + 5) % 10) + 48)
        }
      }),

    rot47: (text: string): string =>
      text.replace(/[!-~]/g, (char) => String.fromCharCode(((char.charCodeAt(0) - 33 + 47) % 94) + 33)),

    caesar: (text: string): string =>
      text.replace(/[a-zA-Z]/g, (char) => {
        const start = char <= "Z" ? 65 : 97
        return String.fromCharCode(((char.charCodeAt(0) - start + 3) % 26) + start)
      }),

    atbash: (text: string): string =>
      text.replace(/[a-zA-Z]/g, (char) => {
        const start = char <= "Z" ? 65 : 97
        return String.fromCharCode(25 - (char.charCodeAt(0) - start) + start)
      }),

    // Case transformations
    upper_case: (text: string): string => text.toUpperCase(),
    lower_case: (text: string): string => text.toLowerCase(),
    title_case: (text: string): string =>
      text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),

    camel_case: (text: string): string =>
      text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase()))
        .replace(/\s+/g, ""),

    pascal_case: (text: string): string =>
      text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase()).replace(/\s+/g, ""),

    snake_case: (text: string): string =>
      text
        .replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join("_"),

    kebab_case: (text: string): string =>
      text
        .replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join("-"),

    constant_case: (text: string): string =>
      text
        .replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toUpperCase())
        .join("_"),

    dot_case: (text: string): string =>
      text
        .replace(/\W+/g, " ")
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join("."),

    swap_case: (text: string): string =>
      Array.from(text)
        .map((char) => (char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()))
        .join(""),

    // Programming
    ascii: (text: string): string =>
      Array.from(text)
        .map((char) => char.charCodeAt(0))
        .join(" "),

    unicode: (text: string): string =>
      Array.from(text)
        .map((char) => {
          const code = char.charCodeAt(0)
          return code > 127 ? "\\u" + code.toString(16).padStart(4, "0") : char
        })
        .join(""),

    // Morse and Braille
    morse: (text: string): string => {
      const morseCode: { [key: string]: string } = {
        A: ".-",
        B: "-...",
        C: "-.-.",
        D: "-..",
        E: ".",
        F: "..-.",
        G: "--.",
        H: "....",
        I: "..",
        J: ".---",
        K: "-.-",
        L: ".-..",
        M: "--",
        N: "-.",
        O: "---",
        P: ".--.",
        Q: "--.-",
        R: ".-.",
        S: "...",
        T: "-",
        U: "..-",
        V: "...-",
        W: ".--",
        X: "-..-",
        Y: "-.--",
        Z: "--..",
        "0": "-----",
        "1": ".----",
        "2": "..---",
        "3": "...--",
        "4": "....-",
        "5": ".....",
        "6": "-....",
        "7": "--...",
        "8": "---..",
        "9": "----.",
        " ": "/",
      }
      return Array.from(text.toUpperCase())
        .map((char) => morseCode[char] || "?")
        .join(" ")
    },

    braille: (text: string): string => {
      const brailleMap: { [key: string]: string } = {
        a: "⠁",
        b: "⠃",
        c: "⠉",
        d: "⠙",
        e: "⠑",
        f: "⠋",
        g: "⠛",
        h: "⠓",
        i: "⠊",
        j: "⠚",
        k: "⠅",
        l: "⠇",
        m: "⠍",
        n: "⠝",
        o: "⠕",
        p: "⠏",
        q: "⠟",
        r: "⠗",
        s: "⠎",
        t: "⠞",
        u: "⠥",
        v: "⠧",
        w: "⠺",
        x: "⠭",
        y: "⠽",
        z: "⠵",
        " ": "⠀",
      }
      return Array.from(text.toLowerCase())
        .map((char) => brailleMap[char] || char)
        .join("")
    },

    // Esoteric
    brainfuck: (text: string): string => {
      let result = ""
      let currentValue = 0
      for (const char of text) {
        const targetValue = char.charCodeAt(0)
        const diff = targetValue - currentValue
        if (diff > 0) {
          result += "+".repeat(diff)
        } else if (diff < 0) {
          result += "-".repeat(-diff)
        }
        result += "."
        currentValue = targetValue
      }
      return result
    },

    ook: (text: string): string => {
      const bf = encoders.brainfuck(text)
      return bf
        .replace(/\+/g, "Ook. Ook. ")
        .replace(/-/g, "Ook! Ook! ")
        .replace(/>/g, "Ook. Ook? ")
        .replace(/</g, "Ook? Ook. ")
        .replace(/\./g, "Ook! Ook. ")
        .replace(/,/g, "Ook. Ook! ")
        .replace(/\[/g, "Ook! Ook? ")
        .replace(/\]/g, "Ook? Ook! ")
    },

    // Additional formats
    reverse: (text: string): string => Array.from(text).reverse().join(""),

    leetspeak: (text: string): string =>
      text
        .toLowerCase()
        .replace(/a/g, "4")
        .replace(/e/g, "3")
        .replace(/i/g, "1")
        .replace(/o/g, "0")
        .replace(/s/g, "5")
        .replace(/t/g, "7"),

    pig_latin: (text: string): string =>
      text
        .split(" ")
        .map((word) => {
          if (/^[aeiou]/i.test(word)) return word + "way"
          const match = word.match(/^([^aeiou]+)(.*)$/i)
          return match ? match[2] + match[1] + "ay" : word
        })
        .join(" "),

    // Rail fence cipher
    rail_fence: (text: string): string => {
      const rails = 3
      const fence: string[][] = Array(rails)
        .fill(null)
        .map(() => [])
      let rail = 0
      let direction = 1

      for (let i = 0; i < text.length; i++) {
        fence[rail].push(text[i])
        rail += direction
        if (rail === rails - 1 || rail === 0) {
          direction = -direction
        }
      }
      return fence.map((row) => row.join("")).join("")
    },

    // Date formats
    unix_timestamp: (text: string): string => Math.floor(new Date(text).getTime() / 1000).toString(),

    iso8601: (text: string): string => new Date(text).toISOString(),

    // Color formats
    hex_color: (text: string): string => {
      let hash = 0
      for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash)
      }
      const color = (hash & 0x00ffffff).toString(16).toUpperCase()
      return "#" + "00000".substring(0, 6 - color.length) + color
    },

    // Run length encoding
    run_length: (text: string): string => {
      let result = ""
      let count = 1
      for (let i = 0; i < text.length; i++) {
        if (i + 1 < text.length && text[i] === text[i + 1]) {
          count++
        } else {
          result += count > 1 ? count + text[i] : text[i]
          count = 1
        }
      }
      return result
    },
  }

  // Decoding functions (keep existing ones)
  const decoders = {
    // Base decodings
    base64: (text: string): string => {
      try {
        return atob(text.replace(/\s/g, ""))
      } catch {
        throw new Error("Invalid Base64")
      }
    },

    base64url: (text: string): string => {
      try {
        const base64 = text.replace(/-/g, "+").replace(/_/g, "/")
        const padding = base64.length % 4
        const padded = padding ? base64 + "=".repeat(4 - padding) : base64
        return atob(padded)
      } catch {
        throw new Error("Invalid Base64 URL")
      }
    },

    base32: (text: string): string => {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"
      const cleanText = text.replace(/=/g, "").toUpperCase()
      let bits = 0
      let value = 0
      let result = ""

      for (const char of cleanText) {
        const index = alphabet.indexOf(char)
        if (index === -1) throw new Error("Invalid Base32 character")

        value = (value << 5) | index
        bits += 5

        if (bits >= 8) {
          result += String.fromCharCode((value >>> (bits - 8)) & 255)
          bits -= 8
        }
      }
      return result
    },

    // Hex and binary decoders
    hex: (text: string): string => {
      const cleaned = text.replace(/[^0-9a-fA-F]/g, "")
      if (cleaned.length % 2 !== 0) throw new Error("Invalid hex length")

      let result = ""
      for (let i = 0; i < cleaned.length; i += 2) {
        const byte = Number.parseInt(cleaned.substr(i, 2), 16)
        result += String.fromCharCode(byte)
      }
      return result
    },

    binary: (text: string): string => {
      const cleaned = text.replace(/[^01\s]/g, "").replace(/\s/g, "")
      if (cleaned.length % 8 !== 0) throw new Error("Invalid binary length")

      let result = ""
      for (let i = 0; i < cleaned.length; i += 8) {
        const byte = cleaned.substr(i, 8)
        result += String.fromCharCode(Number.parseInt(byte, 2))
      }
      return result
    },

    octal: (text: string): string => {
      const numbers = text.split(/\s+/).filter((n) => n)
      return numbers
        .map((num) => {
          const code = Number.parseInt(num, 8)
          return String.fromCharCode(code)
        })
        .join("")
    },

    decimal: (text: string): string => {
      const numbers = text.split(/\s+/).filter((n) => n)
      return numbers
        .map((num) => {
          const code = Number.parseInt(num, 10)
          return String.fromCharCode(code)
        })
        .join("")
    },

    // Text decodings
    url: (text: string): string => {
      try {
        return decodeURIComponent(text)
      } catch {
        throw new Error("Invalid URL encoding")
      }
    },

    html: (text: string): string => {
      const textarea = document.createElement("textarea")
      textarea.innerHTML = text
      return textarea.value
    },

    // Classical cipher decoders (same as encoders for symmetric ciphers)
    rot13: (text: string): string => encoders.rot13(text),
    rot18: (text: string): string => encoders.rot18(text),
    rot47: (text: string): string => encoders.rot47(text),
    atbash: (text: string): string => encoders.atbash(text),

    caesar: (text: string): string =>
      text.replace(/[a-zA-Z]/g, (char) => {
        const start = char <= "Z" ? 65 : 97
        return String.fromCharCode(((char.charCodeAt(0) - start - 3 + 26) % 26) + start)
      }),

    // Case transformations (reverse operations)
    upper_case: (text: string): string => text.toLowerCase(),
    lower_case: (text: string): string => text.toUpperCase(),
    swap_case: (text: string): string => encoders.swap_case(text),

    // Programming decoders
    ascii: (text: string): string => {
      const numbers = text.match(/\d+/g)
      if (!numbers) throw new Error("No ASCII codes found")

      return numbers
        .map((num) => {
          const code = Number.parseInt(num)
          if (code < 0 || code > 127) throw new Error("Invalid ASCII code")
          return String.fromCharCode(code)
        })
        .join("")
    },

    unicode: (text: string): string => {
      return text
        .replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => {
          return String.fromCharCode(Number.parseInt(hex, 16))
        })
        .replace(/\\x([0-9a-fA-F]{2})/g, (match, hex) => {
          return String.fromCharCode(Number.parseInt(hex, 16))
        })
    },

    // Morse and Braille decoders
    morse: (text: string): string => {
      const morseCode: { [key: string]: string } = {
        ".-": "A",
        "-...": "B",
        "-.-.": "C",
        "-..": "D",
        ".": "E",
        "..-.": "F",
        "--.": "G",
        "....": "H",
        "..": "I",
        ".---": "J",
        "-.-": "K",
        ".-..": "L",
        "--": "M",
        "-.": "N",
        "---": "O",
        ".--.": "P",
        "--.-": "Q",
        ".-.": "R",
        "...": "S",
        "-": "T",
        "..-": "U",
        "...-": "V",
        ".--": "W",
        "-..-": "X",
        "-.--": "Y",
        "--..": "Z",
        "-----": "0",
        ".----": "1",
        "..---": "2",
        "...--": "3",
        "....-": "4",
        ".....": "5",
        "-....": "6",
        "--...": "7",
        "---..": "8",
        "----.": "9",
        "/": " ",
      }

      return text
        .split(" ")
        .map((code) => morseCode[code] || "?")
        .join("")
    },

    braille: (text: string): string => {
      const brailleMap: { [key: string]: string } = {
        "⠁": "a",
        "⠃": "b",
        "⠉": "c",
        "⠙": "d",
        "⠑": "e",
        "⠋": "f",
        "⠛": "g",
        "⠓": "h",
        "⠊": "i",
        "⠚": "j",
        "⠅": "k",
        "⠇": "l",
        "⠍": "m",
        "⠝": "n",
        "⠕": "o",
        "⠏": "p",
        "⠟": "q",
        "⠗": "r",
        "⠎": "s",
        "⠞": "t",
        "⠥": "u",
        "⠧": "v",
        "⠺": "w",
        "⠭": "x",
        "⠽": "y",
        "⠵": "z",
        "⠀": " ",
      }
      return Array.from(text)
        .map((char) => brailleMap[char] || char)
        .join("")
    },

    // Esoteric decoders
    brainfuck: (text: string): string => {
      const code = text.replace(/[^><+\-.,[\]]/g, "")
      const memory = new Array(30000).fill(0)
      let pointer = 0
      let codePointer = 0
      let output = ""
      const stack: number[] = []

      while (codePointer < code.length) {
        const command = code[codePointer]

        switch (command) {
          case ">":
            pointer++
            break
          case "<":
            pointer--
            break
          case "+":
            memory[pointer] = (memory[pointer] + 1) % 256
            break
          case "-":
            memory[pointer] = (memory[pointer] - 1 + 256) % 256
            break
          case ".":
            output += String.fromCharCode(memory[pointer])
            break
          case "[":
            if (memory[pointer] === 0) {
              let depth = 1
              while (depth > 0 && codePointer < code.length - 1) {
                codePointer++
                if (code[codePointer] === "[") depth++
                if (code[codePointer] === "]") depth--
              }
            } else {
              stack.push(codePointer)
            }
            break
          case "]":
            if (memory[pointer] !== 0) {
              codePointer = stack[stack.length - 1]
            } else {
              stack.pop()
            }
            break
        }
        codePointer++
      }
      return output
    },

    ook: (text: string): string => {
      const bf = text
        .replace(/Ook\. Ook\. /g, "+")
        .replace(/Ook! Ook! /g, "-")
        .replace(/Ook\. Ook\? /g, ">")
        .replace(/Ook\? Ook\. /g, "<")
        .replace(/Ook! Ook\. /g, ".")
        .replace(/Ook\. Ook! /g, ",")
        .replace(/Ook! Ook\? /g, "[")
        .replace(/Ook\? Ook! /g, "]")
      return decoders.brainfuck(bf)
    },

    // Additional decoders
    reverse: (text: string): string => encoders.reverse(text),

    leetspeak: (text: string): string =>
      text
        .replace(/4/g, "a")
        .replace(/3/g, "e")
        .replace(/1/g, "i")
        .replace(/0/g, "o")
        .replace(/5/g, "s")
        .replace(/7/g, "t"),

    pig_latin: (text: string): string =>
      text
        .split(" ")
        .map((word) => {
          if (word.endsWith("way")) return word.slice(0, -3)
          const match = word.match(/^(.*)([^aeiou]+)ay$/i)
          return match ? match[2] + match[1] : word
        })
        .join(" "),

    // Run length decoding
    run_length: (text: string): string => {
      let result = ""
      let i = 0
      while (i < text.length) {
        if (/\d/.test(text[i])) {
          let count = ""
          while (i < text.length && /\d/.test(text[i])) {
            count += text[i]
            i++
          }
          if (i < text.length) {
            result += text[i].repeat(Number.parseInt(count))
            i++
          }
        } else {
          result += text[i]
          i++
        }
      }
      return result
    },
  }

  // Detection functions (keep existing)
  const detectEncoding = (text: string): DecodingResult[] => {
    const results: DecodingResult[] = []

    // Base64 detection
    if (/^[A-Za-z0-9+/]*={0,2}$/.test(text.replace(/\s/g, "")) && text.length % 4 === 0) {
      try {
        const decoded = decoders.base64(text)
        if (decoded.length > 0 && /^[\x20-\x7E\s]*$/.test(decoded)) {
          results.push({ type: "base64", result: decoded, confidence: 0.9 })
        }
      } catch {}
    }

    // Hex detection
    if (/^[0-9a-fA-F\s]*$/.test(text) && text.replace(/\s/g, "").length % 2 === 0) {
      try {
        const decoded = decoders.hex(text)
        if (/^[\x20-\x7E\s]*$/.test(decoded)) {
          results.push({ type: "hex", result: decoded, confidence: 0.8 })
        }
      } catch {}
    }

    // Binary detection
    if (/^[01\s]*$/.test(text) && text.replace(/\s/g, "").length % 8 === 0) {
      try {
        const decoded = decoders.binary(text)
        if (/^[\x20-\x7E\s]*$/.test(decoded)) {
          results.push({ type: "binary", result: decoded, confidence: 0.8 })
        }
      } catch {}
    }

    // URL encoding detection
    if (/%[0-9a-fA-F]{2}/.test(text)) {
      try {
        const decoded = decoders.url(text)
        results.push({ type: "url", result: decoded, confidence: 0.7 })
      } catch {}
    }

    // HTML entities detection
    if (/&[a-zA-Z]+;|&#\d+;/.test(text)) {
      try {
        const decoded = decoders.html(text)
        results.push({ type: "html", result: decoded, confidence: 0.7 })
      } catch {}
    }

    // Brainfuck detection
    if (/^[><+\-.,[\]\s]*$/.test(text) && /[><+\-.,[\]]/.test(text)) {
      try {
        const decoded = decoders.brainfuck(text)
        if (decoded.length > 0) {
          results.push({ type: "brainfuck", result: decoded, confidence: 0.6 })
        }
      } catch {}
    }

    // ROT13 detection (check if it contains letters)
    if (/[a-zA-Z]/.test(text)) {
      const decoded = decoders.rot13(text)
      results.push({ type: "rot13", result: decoded, confidence: 0.3 })
    }

    // ASCII codes detection
    if (/^\d+(\s+\d+)*$/.test(text.trim())) {
      try {
        const decoded = decoders.ascii(text)
        results.push({ type: "ascii", result: decoded, confidence: 0.7 })
      } catch {}
    }

    // Unicode escape sequences
    if (/\\u[0-9a-fA-F]{4}|\\x[0-9a-fA-F]{2}/.test(text)) {
      const decoded = decoders.unicode(text)
      results.push({ type: "unicode", result: decoded, confidence: 0.8 })
    }

    // Morse code detection
    if (/^[.\-\s/]*$/.test(text) && /[.-]/.test(text)) {
      try {
        const decoded = decoders.morse(text)
        results.push({ type: "morse", result: decoded, confidence: 0.6 })
      } catch {}
    }

    return results.sort((a, b) => b.confidence - a.confidence)
  }

  const processText = () => {
    setError("")
    setOutput("")
    setDetectedType(null)

    if (!input.trim()) {
      setError("Please enter text to process")
      return
    }

    try {
      if (mode === "decode") {
        if (autoDetect || selectedEncoding === "auto") {
          const results = detectEncoding(input)
          if (results.length > 0) {
            const best = results[0]
            setOutput(best.result)
            setDetectedType(best.type)
          } else {
            setError("Could not detect encoding type")
          }
        } else {
          const decoded = decoders[selectedEncoding as EncodingType](input)
          setOutput(decoded)
          setDetectedType(selectedEncoding as EncodingType)
        }
      } else {
        // Encode mode
        const encoded = encoders[selectedEncodingType](input)
        setOutput(encoded)
        setDetectedType(selectedEncodingType)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Processing failed")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
    setError("")
    setDetectedType(null)
  }

  useEffect(() => {
    if (input && mode === "decode" && autoDetect) {
      processText()
    }
  }, [input, autoDetect, mode])

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5" />
            EnDcode - Universal Text Encoder/Decoder
          </CardTitle>
          <CardDescription>
            by OmHackz - Encode and decode text in various formats including Base64, Hex, Binary, Brainfuck, and more.
          </CardDescription>
          <div className="flex flex-wrap gap-2 mt-4">
            <Link href="/about">
              <Button variant="outline" size="sm">
                About
              </Button>
            </Link>
            <Link href="/github">
              <Button variant="outline" size="sm">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </Link>
            <Link href="/api-docs">
              <Button variant="outline" size="sm">
                <Code className="w-4 h-4 mr-2" />
                API Docs
              </Button>
            </Link>
            <Link href="/api/encode-decode?text=Hello%20World&operation=encode&type=base64" target="_blank">
              <Button variant="outline" size="sm">
                API Demo
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Mode Selection */}
          <Tabs value={mode} onValueChange={(value) => setMode(value as "decode" | "encode")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="decode" className="flex items-center gap-2">
                <Decode className="w-4 h-4" />
                Decode
              </TabsTrigger>
              <TabsTrigger value="encode" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Encode
              </TabsTrigger>
            </TabsList>

            <TabsContent value="decode" className="space-y-4">
              {/* Decode Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex items-center space-x-2">
                  <Switch id="auto-detect" checked={autoDetect} onCheckedChange={setAutoDetect} />
                  <Label htmlFor="auto-detect">Auto-detect</Label>
                </div>

                {!autoDetect && (
                  <Select
                    value={selectedEncoding}
                    onValueChange={(value) => setSelectedEncoding(value as EncodingType | "auto")}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select encoding" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-detect</SelectItem>
                      <SelectItem value="base64">Base64</SelectItem>
                      <SelectItem value="base64url">Base64 URL</SelectItem>
                      <SelectItem value="base32">Base32</SelectItem>
                      <SelectItem value="base58">Base58</SelectItem>
                      <SelectItem value="ascii85">ASCII85</SelectItem>
                      <SelectItem value="hex">Hexadecimal</SelectItem>
                      <SelectItem value="binary">Binary</SelectItem>
                      <SelectItem value="octal">Octal</SelectItem>
                      <SelectItem value="decimal">Decimal</SelectItem>
                      <SelectItem value="url">URL Encoding</SelectItem>
                      <SelectItem value="html">HTML Entities</SelectItem>
                      <SelectItem value="quoted_printable">Quoted Printable</SelectItem>
                      <SelectItem value="rot13">ROT13</SelectItem>
                      <SelectItem value="rot18">ROT18</SelectItem>
                      <SelectItem value="rot47">ROT47</SelectItem>
                      <SelectItem value="caesar">Caesar Cipher</SelectItem>
                      <SelectItem value="atbash">Atbash</SelectItem>
                      <SelectItem value="upper_case">UPPER CASE</SelectItem>
                      <SelectItem value="lower_case">lower case</SelectItem>
                      <SelectItem value="title_case">Title Case</SelectItem>
                      <SelectItem value="camel_case">camelCase</SelectItem>
                      <SelectItem value="pascal_case">PascalCase</SelectItem>
                      <SelectItem value="snake_case">snake_case</SelectItem>
                      <SelectItem value="kebab_case">kebab-case</SelectItem>
                      <SelectItem value="constant_case">CONSTANT_CASE</SelectItem>
                      <SelectItem value="dot_case">dot.case</SelectItem>
                      <SelectItem value="swap_case">sWaP cAsE</SelectItem>
                      <SelectItem value="ascii">ASCII Codes</SelectItem>
                      <SelectItem value="unicode">Unicode Escape</SelectItem>
                      <SelectItem value="morse">Morse Code</SelectItem>
                      <SelectItem value="braille">Braille</SelectItem>
                      <SelectItem value="brainfuck">Brainfuck</SelectItem>
                      <SelectItem value="ook">Ook!</SelectItem>
                      <SelectItem value="reverse">Reverse</SelectItem>
                      <SelectItem value="leetspeak">1337 Speak</SelectItem>
                      <SelectItem value="pig_latin">Pig Latin</SelectItem>
                      <SelectItem value="rail_fence">Rail Fence</SelectItem>
                      <SelectItem value="unix_timestamp">Unix Timestamp</SelectItem>
                      <SelectItem value="iso8601">ISO8601</SelectItem>
                      <SelectItem value="hex_color">Hex Color</SelectItem>
                      <SelectItem value="run_length">Run Length</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                <div className="flex gap-2 ml-auto">
                  <Button onClick={processText} variant="default">
                    Decode
                  </Button>
                  <Button onClick={clearAll} variant="outline">
                    Clear
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="encode" className="space-y-4">
              {/* Encode Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Select
                  value={selectedEncodingType}
                  onValueChange={(value) => setSelectedEncodingType(value as EncodingType)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select encoding type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="base64">Base64</SelectItem>
                    <SelectItem value="base64url">Base64 URL</SelectItem>
                    <SelectItem value="base32">Base32</SelectItem>
                    <SelectItem value="base58">Base58</SelectItem>
                    <SelectItem value="ascii85">ASCII85</SelectItem>
                    <SelectItem value="hex">Hexadecimal</SelectItem>
                    <SelectItem value="binary">Binary</SelectItem>
                    <SelectItem value="octal">Octal</SelectItem>
                    <SelectItem value="decimal">Decimal</SelectItem>
                    <SelectItem value="url">URL Encoding</SelectItem>
                    <SelectItem value="html">HTML Entities</SelectItem>
                    <SelectItem value="quoted_printable">Quoted Printable</SelectItem>
                    <SelectItem value="rot13">ROT13</SelectItem>
                    <SelectItem value="rot18">ROT18</SelectItem>
                    <SelectItem value="rot47">ROT47</SelectItem>
                    <SelectItem value="caesar">Caesar Cipher</SelectItem>
                    <SelectItem value="atbash">Atbash</SelectItem>
                    <SelectItem value="upper_case">UPPER CASE</SelectItem>
                    <SelectItem value="lower_case">lower case</SelectItem>
                    <SelectItem value="title_case">Title Case</SelectItem>
                    <SelectItem value="camel_case">camelCase</SelectItem>
                    <SelectItem value="pascal_case">PascalCase</SelectItem>
                    <SelectItem value="snake_case">snake_case</SelectItem>
                    <SelectItem value="kebab_case">kebab-case</SelectItem>
                    <SelectItem value="constant_case">CONSTANT_CASE</SelectItem>
                    <SelectItem value="dot_case">dot.case</SelectItem>
                    <SelectItem value="swap_case">sWaP cAsE</SelectItem>
                    <SelectItem value="ascii">ASCII Codes</SelectItem>
                    <SelectItem value="unicode">Unicode Escape</SelectItem>
                    <SelectItem value="morse">Morse Code</SelectItem>
                    <SelectItem value="braille">Braille</SelectItem>
                    <SelectItem value="brainfuck">Brainfuck</SelectItem>
                    <SelectItem value="ook">Ook!</SelectItem>
                    <SelectItem value="reverse">Reverse</SelectItem>
                    <SelectItem value="leetspeak">1337 Speak</SelectItem>
                    <SelectItem value="pig_latin">Pig Latin</SelectItem>
                    <SelectItem value="rail_fence">Rail Fence</SelectItem>
                    <SelectItem value="unix_timestamp">Unix Timestamp</SelectItem>
                    <SelectItem value="iso8601">ISO8601</SelectItem>
                    <SelectItem value="hex_color">Hex Color</SelectItem>
                    <SelectItem value="run_length">Run Length</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2 ml-auto">
                  <Button onClick={processText} variant="default">
                    Encode
                  </Button>
                  <Button onClick={clearAll} variant="outline">
                    Clear
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Input */}
          <div className="space-y-2">
            <Label htmlFor="input">{mode === "decode" ? "Encoded Text" : "Plain Text"}</Label>
            <Textarea
              id="input"
              placeholder={mode === "decode" ? "Paste your encoded text here..." : "Enter text to encode..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-32 font-mono text-sm"
            />
          </div>

          {/* Detection/Processing Result */}
          {detectedType && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {mode === "decode" ? "Detected encoding:" : "Encoded as:"}
              </span>
              <Badge variant="secondary" className="capitalize">
                {detectedType}
              </Badge>
            </div>
          )}

          {/* Error */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Output */}
          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="output">{mode === "decode" ? "Decoded Text" : "Encoded Text"}</Label>
                <Button onClick={copyToClipboard} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea id="output" value={output} readOnly className="min-h-32 font-mono text-sm bg-muted" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Supported Formats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Supported Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              "Base64",
              "Base64 URL",
              "Base32",
              "Base58",
              "ASCII85",
              "Hexadecimal",
              "Binary",
              "Octal",
              "Decimal",
              "URL Encoding",
              "HTML Entities",
              "Quoted Printable",
              "ROT13",
              "ROT18",
              "ROT47",
              "Caesar Cipher",
              "Atbash",
              "UPPER CASE",
              "lower case",
              "Title Case",
              "camelCase",
              "PascalCase",
              "snake_case",
              "kebab-case",
              "CONSTANT_CASE",
              "dot.case",
              "sWaP cAsE",
              "ASCII Codes",
              "Unicode Escape",
              "Morse Code",
              "Braille",
              "Brainfuck",
              "Ook!",
              "Reverse",
              "1337 Speak",
              "Pig Latin",
              "Rail Fence",
              "Unix Timestamp",
              "ISO8601",
              "Hex Color",
              "Run Length",
            ].map((format) => (
              <Badge key={format} variant="outline" className="justify-center py-2">
                {format}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
