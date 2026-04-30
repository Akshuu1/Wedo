'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Local Knowledge Fallback ──────────────────
const KNOWLEDGE = {
  services: {
    keywords: ['service', 'offer', 'do you do', 'provide'],
    response: `We offer 4 core services:\n\n⚡ **Website Design** — Fast, beautiful, conversion-ready websites\n🎨 **Brand Identity** — Logos, typography, palettes that stand out\n🖥️ **UI/UX Design** — Intuitive interfaces that keep users hooked\n📱 **Social Media** — Strategies that turn followers into customers\n\nWant details on any of these?`
  },
  pricing: {
    keywords: ['price', 'cost', 'how much', 'budget', 'rate'],
    response: `Our pricing depends on scope:\n\n💰 **Website Design** — From ₹15,000\n💰 **Brand Identity** — From ₹10,000\n💰 **UI/UX Design** — From ₹12,000\n💰 **Social Media** — Custom packages\n\nContact us for a free quote!`
  },
  process: {
    keywords: ['process', 'how do you work', 'steps', 'timeline'],
    response: `Our process:\n\n**01 → BRIEF** — Understand vision\n**02 → DESIGN** — Craft concepts\n**03 → BUILD** — Develop with tech\n**04 → LAUNCH** — Deploy & support\n\nProjects delivered in 1-3 weeks.`
  },
  about: {
    keywords: ['about', 'who are you', 'team', 'wedo'],
    response: `**WEDO** is a focused creative studio making businesses look incredible online. No bloated overhead, just results.`
  },
  contact: {
    keywords: ['contact', 'email', 'talk', 'hire'],
    response: `Reach us at:\n\n📧 **Email** — hello@wedo.com\n📍 **Location** — New Delhi, India\n\nOr head to our **Contact** page.`
  },
}

function findFallbackResponse(input) {
  const lower = input.toLowerCase().trim()
  for (const category of Object.values(KNOWLEDGE)) {
    for (const keyword of category.keywords) {
      if (lower.includes(keyword)) return category.response
    }
  }
  return null
}

// ─── Chat Message Component ──────────────────────
function ChatMessage({ message, isBot }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-3`}
    >
      <div className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed font-mono tracking-wide ${
        isBot
          ? 'bg-white/[0.04] border border-white/[0.08] text-white/80 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl'
          : 'bg-[#E8002D]/90 text-white rounded-tl-2xl rounded-bl-2xl rounded-br-2xl'
      }`}>
        {isBot && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/[0.06]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#E8002D] animate-pulse" />
            <span className="text-[9px] text-[#E8002D] uppercase tracking-[0.3em] font-bold">Sole</span>
          </div>
        )}
        <div className="whitespace-pre-line">
          {message.split('**').map((part, i) => 
            i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Typing Indicator ────────────────────────────
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex justify-start mb-3"
    >
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-5 py-3 flex items-center gap-1.5">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }}
            className="w-1.5 h-1.5 rounded-full bg-[#E8002D]"
          />
        ))}
      </div>
    </motion.div>
  )
}

// ─── Quick Action Chips ──────────────────────────
const QUICK_ACTIONS = [
  { label: 'Services', query: 'What services do you offer?' },
  { label: 'Pricing', query: 'What are your prices?' },
  { label: 'Process', query: 'How do you work?' },
  { label: 'Contact', query: 'How can I contact you?' },
]

// ─── Main Chatbot Component ─────────────────────
export default function SoleChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: `Hey! I'm **Sole**, WEDO's AI assistant. 🚀\n\nAsk me anything about our services, pricing, or process. I'm here to help!`, isBot: true }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const handleSend = async (text) => {
    const msg = text || input.trim()
    if (!msg) return

    // Add user message
    const newMessages = [...messages, { text: msg, isBot: false }]
    setMessages(newMessages)
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      
      const data = await response.json()
      
      if (response.ok && data.text) {
        setMessages(prev => [...prev, { text: data.text, isBot: true }])
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      
      // Fallback logic
      const fallback = findFallbackResponse(msg)
      if (fallback) {
        setMessages(prev => [...prev, { text: fallback, isBot: true }])
      } else {
        const errorMsg = error.message?.includes('quota') 
          ? "I'm currently in high demand and reached my AI quota! 🚀\n\nPlease ask about our **services**, **pricing**, or **process**, or contact the team directly at hello@wedo.com."
          : "System overload. Please try again later or contact hello@wedo.com."
        setMessages(prev => [...prev, { text: errorMsg, isBot: true }])
      }
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!mounted) return null

  return (
    <>
      {/* ── Floating Toggle Button ── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(232,0,45,0.15)] cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)' }}
        whileHover={{ scale: 1.08, boxShadow: '0 0 40px rgba(232,0,45,0.3)' }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8002D" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <div className="relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E8002D] rounded-full"
            />
          </div>
        )}
      </motion.button>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-[9998] w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[70vh] flex flex-col border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
            style={{ background: 'linear-gradient(180deg, #0d0d0d 0%, #080808 100%)' }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E8002D] to-[#8B0000] flex items-center justify-center">
                    <span className="font-syne font-black text-white text-[11px]">S</span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0d0d0d]" />
                </div>
                <div>
                  <div className="font-syne font-black text-white text-sm uppercase tracking-wider">Sole</div>
                  <div className="font-mono text-[8px] text-white/40 uppercase tracking-[0.3em]">WEDO AI • Online</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeOpacity="0.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            {/* ── Messages Area ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 no-scrollbar">
              {messages.map((msg, i) => (
                <ChatMessage key={i} message={msg.text} isBot={msg.isBot} />
              ))}
              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick Actions ── */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex gap-2 flex-wrap">
                {QUICK_ACTIONS.map((action) => (
                  <motion.button
                    key={action.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend(action.query)}
                    className="px-3 py-1.5 border border-white/10 bg-white/[0.03] rounded-full font-mono text-[9px] text-white/60 uppercase tracking-widest hover:border-[#E8002D]/40 hover:text-white/90 transition-all cursor-pointer"
                  >
                    {action.label}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ── Input Area ── */}
            <div className="px-4 py-3 border-t border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Sole anything..."
                  className="flex-1 bg-transparent text-white text-[13px] font-mono tracking-wide placeholder:text-white/25 outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-lg bg-[#E8002D] flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-opacity"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </motion.button>
              </div>
              <div className="text-center mt-2">
                <span className="font-mono text-[7px] text-white/20 uppercase tracking-[0.4em]">Powered by WEDO Systems</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
