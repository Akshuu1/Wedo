'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

const CHARS = '!@#$%^&*()_+{}:"<>?,./;[]\\|`~ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export default function ScrambleText({ text, speed = 1, delay = 0, laggy = true }) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const iteration = useRef(0)
  const frameId = useRef(null)
  const lastUpdate = useRef(0)

  const scramble = useCallback(() => {
    setIsScrambling(true)
    iteration.current = 0
    
    const update = (time) => {
      // "Laggy" effect: Only update every 3 frames (~50ms) to simulate rhythmic glitch
      if (laggy && time - lastUpdate.current < (50 / speed)) {
        frameId.current = requestAnimationFrame(update)
        return
      }
      lastUpdate.current = time

      const scrambled = text
        .split('')
        .map((char, index) => {
          if (index < iteration.current) {
            return text[index]
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')

      setDisplayText(scrambled)

      if (iteration.current < text.length) {
        iteration.current += 1 / 3
        frameId.current = requestAnimationFrame(update)
      } else {
        setIsScrambling(false)
        setDisplayText(text)
      }
    }

    frameId.current = requestAnimationFrame(update)
  }, [text, speed, laggy])

  useEffect(() => {
    const timer = setTimeout(() => {
      scramble()
    }, delay)
    return () => {
      clearTimeout(timer)
      if (frameId.current) cancelAnimationFrame(frameId.current)
    }
  }, [scramble, delay])

  return (
    <span 
      onMouseEnter={() => !isScrambling && scramble()}
      className={`font-mono transition-all ${isScrambling ? 'text-white/40' : ''}`}
    >
      {displayText}
    </span>
  )
}
