import { type NextRequest, NextResponse } from "next/server"

type EncodingType =
  | "base64"
  | "hex"
  | "binary"
  | "url"
  | "html"
  | "brainfuck"
  | "rot13"
  | "ascii"
  | "unicode"
  | "morse"
  | "reverse"
  | "uppercase"
  | "lowercase"
  | "swapcase"

// Encoding functions
const encoders = {
  base64: (text: string): string => {
    return btoa(text)
  },
  hex: (text: string): string => {
    return Array.from(text)
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
  },
  binary: (text: string): string => {
    return Array.from(text)
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ")
  },
  url: (text: string): string => {
    return encodeURIComponent(text)
  },
  html: (text: string): string => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
  },
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
  rot13: (text: string): string => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= "Z" ? 65 : 97
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start)
    })
  },
  ascii: (text: string): string => {
    return Array.from(text)
      .map((char) => char.charCodeAt(0))
      .join(" ")
  },
  unicode: (text: string): string => {
    return Array.from(text)
      .map((char) => {
        const code = char.charCodeAt(0)
        if (code > 127) {
          return "\\u" + code.toString(16).padStart(4, "0")
        }
        return char
      })
      .join("")
  },
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
  reverse: (text: string): string => {
    return Array.from(text).reverse().join("")
  },
  uppercase: (text: string): string => {
    return text.toUpperCase()
  },
  lowercase: (text: string): string => {
    return text.toLowerCase()
  },
  swapcase: (text: string): string => {
    return Array.from(text)
      .map((char) => {
        if (char === char.toUpperCase()) {
          return char.toLowerCase()
        } else {
          return char.toUpperCase()
        }
      })
      .join("")
  },
}

// Decoding functions
const decoders = {
  base64: (text: string): string => {
    try {
      return atob(text.replace(/\s/g, ""))
    } catch (error) {
      throw new Error("Invalid Base64")
    }
  },
  hex: (text: string): string => {
    const cleaned = text.replace(/[^0-9a-fA-F]/g, "")
    if (cleaned.length % 2 !== 0) {
      throw new Error("Invalid hex length")
    }

    let result = ""
    for (let i = 0; i < cleaned.length; i += 2) {
      const byte = Number.parseInt(cleaned.substr(i, 2), 16)
      result += String.fromCharCode(byte)
    }
    return result
  },
  binary: (text: string): string => {
    const cleaned = text.replace(/[^01\s]/g, "").replace(/\s/g, "")
    if (cleaned.length % 8 !== 0) {
      throw new Error("Invalid binary length")
    }

    let result = ""
    for (let i = 0; i < cleaned.length; i += 8) {
      const byte = cleaned.substr(i, 8)
      result += String.fromCharCode(Number.parseInt(byte, 2))
    }
    return result
  },
  url: (text: string): string => {
    try {
      return decodeURIComponent(text)
    } catch (error) {
      throw new Error("Invalid URL encoding")
    }
  },
  html: (text: string): string => {
    return text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
  },
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
  rot13: (text: string): string => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= "Z" ? 65 : 97
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start)
    })
  },
  ascii: (text: string): string => {
    const numbers = text.match(/\d+/g)
    if (!numbers) {
      throw new Error("No ASCII codes found")
    }

    return numbers
      .map((num) => {
        const code = Number.parseInt(num)
        if (code < 0 || code > 127) {
          throw new Error("Invalid ASCII code")
        }
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
  reverse: (text: string): string => {
    return Array.from(text).reverse().join("")
  },
  uppercase: (text: string): string => {
    return text.toUpperCase()
  },
  lowercase: (text: string): string => {
    return text.toLowerCase()
  },
  swapcase: (text: string): string => {
    return Array.from(text)
      .map((char) => {
        if (char === char.toUpperCase()) {
          return char.toLowerCase()
        } else {
          return char.toUpperCase()
        }
      })
      .join("")
  },
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const text = searchParams.get("text")
    const operation = searchParams.get("operation") // 'encode' or 'decode'
    const type = searchParams.get("type") as EncodingType

    // Validation
    if (!text) {
      return NextResponse.json({ error: "Missing required parameter: text" }, { status: 400 })
    }

    if (!operation || !["encode", "decode"].includes(operation)) {
      return NextResponse.json({ error: 'Invalid operation. Must be "encode" or "decode"' }, { status: 400 })
    }

    if (!type || !Object.keys(encoders).includes(type)) {
      return NextResponse.json(
        {
          error: "Invalid type. Supported types: " + Object.keys(encoders).join(", "),
        },
        { status: 400 },
      )
    }

    let result: string

    if (operation === "encode") {
      result = encoders[type](text)
    } else {
      result = decoders[type](text)
    }

    return NextResponse.json({
      success: true,
      operation,
      type,
      input: text,
      output: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Processing failed",
        success: false,
      },
      { status: 400 },
    )
  }
}
