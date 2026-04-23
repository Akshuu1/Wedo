'use client'

import { useState, useEffect, useCallback } from 'react'

export default function SoundController() {
  const [audioCtx, setAudioCtx] = useState(null)

  useEffect(() => {
    const initAudio = () => {
      if (!audioCtx) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)()
        setAudioCtx(ctx)
      }
    }
    window.addEventListener('mousedown', initAudio)
    window.addEventListener('scroll', initAudio)
    return () => {
      window.removeEventListener('mousedown', initAudio)
      window.removeEventListener('scroll', initAudio)
    }
  }, [audioCtx])

  const playSpaceSound = useCallback((type = 'hover') => {
    if (!audioCtx) return

    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    if (type === 'hover') {
      // High-pitched laser "blip" - Increased volume
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.03)
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime) // Increased from 0.04
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03)
      osc.start()
      osc.stop(audioCtx.currentTime + 0.03)
    } else if (type === 'click') {
      // "System Ignition" sound - Increased volume
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(100, audioCtx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1)
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime) // Increased from 0.05
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1)
      osc.start()
      osc.stop(audioCtx.currentTime + 0.1)
    }

    osc.connect(gain)
    gain.connect(audioCtx.destination)
  }, [audioCtx])

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        playSpaceSound('hover')
      }
    }

    const handleClick = () => {
      playSpaceSound('click')
    }

    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('click', handleClick)
    }
  }, [playSpaceSound])

  return null
}
