import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const VALID_USERNAME = 'EllieG'
const VALID_PASSWORD = 'PooperScooper'

function App() {
  const [state, setState] = useState('login') // login, loading, question, success
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const noButtonRef = useRef(null)

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      setState('loading')
    } else {
      setError("Invalid credentials. Please try again.")
    }
  }

  useEffect(() => {
    if (state === 'loading') {
      const timer = setTimeout(() => {
        setState('question')
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [state])

  const handleYes = () => {
    setState('success')
    // Trigger massive confetti explosion
    const duration = 5000
    const end = Date.now() + duration

    const colors = ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff', '#ff006e', '#ff006e']

    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval)
      }

      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      })
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      })
    }, 200)

    // Additional bursts
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
      })
    }, 250)
  }

  const handleNoHover = (e) => {
    if (noButtonRef.current) {
      const button = noButtonRef.current
      const buttonRect = button.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      // Calculate random position ensuring button stays within viewport
      const maxX = viewportWidth - buttonRect.width - 20
      const maxY = viewportHeight - buttonRect.height - 20
      const minX = 20
      const minY = 20
      
      const randomX = Math.random() * (maxX - minX) + minX
      const randomY = Math.random() * (maxY - minY) + minY
      
      button.style.position = 'fixed'
      button.style.left = `${randomX}px`
      button.style.top = `${randomY}px`
      button.style.transform = 'translate(0, 0)'
    }
  }

  const handleNoTouch = (e) => {
    e.preventDefault()
    handleNoHover(e)
  }

  // Generate floating hearts
  const hearts = Array.from({ length: 20 }, (_, i) => i)

  return (
    <div className="min-h-screen w-full overflow-hidden relative">
      <AnimatePresence mode="wait">
        {/* LOGIN STATE */}
        {state === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 relative overflow-hidden"
          >
            {/* Subtle grid pattern background */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-xl p-8 md:p-10 w-full max-w-md mx-4 border border-slate-700 relative z-10"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-lg mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                  Research Portal
                </h1>
                <p className="text-slate-300 text-sm md:text-base">
                  Project Viewer Access
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm transition-all bg-slate-700 text-white placeholder:text-slate-400"
                    placeholder="Enter your username"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-md border border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:outline-none text-sm transition-all bg-slate-700 text-white placeholder:text-slate-400"
                    placeholder="Enter your password"
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/30 border border-red-700 rounded-md p-3 text-red-200 text-sm text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2.5 rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                  Sign In
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-slate-400">
                  Authorized access only
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* LOADING STATE */}
        {state === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-red-100 to-rose-200"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 border-8 border-pink-500 border-t-transparent rounded-full mb-8 shadow-2xl"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-fredoka text-pink-700"
            >
              Checking if you're the right person...
            </motion.p>
          </motion.div>
        )}

        {/* QUESTION STATE */}
        {state === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen w-full bg-gradient-to-br from-pink-300 via-red-200 to-rose-300 relative overflow-hidden"
          >
            {/* Floating hearts */}
            {hearts.map((i) => (
              <motion.div
                key={i}
                className="absolute text-6xl md:text-8xl heart-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  rotate: [0, 20, -20, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                ❤️
              </motion.div>
            ))}

            <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
              <motion.h1
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="text-4xl md:text-6xl lg:text-7xl font-pacifico text-center mb-12 text-white drop-shadow-2xl leading-tight"
              >
                Will you be my valentine?
                <br />
                <span className="text-3xl md:text-5xl lg:text-6xl">- Richard</span>
              </motion.h1>

              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                <motion.button
                  onClick={handleYes}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: [1, 1.1, 1],
                    boxShadow: [
                      '0 0 20px rgba(34, 197, 94, 0.5)',
                      '0 0 40px rgba(34, 197, 94, 0.8)',
                      '0 0 20px rgba(34, 197, 94, 0.5)',
                    ],
                  }}
                  transition={{
                    scale: { duration: 1, repeat: Infinity },
                    boxShadow: { duration: 1, repeat: Infinity },
                  }}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-fredoka text-3xl md:text-4xl px-12 md:px-16 py-6 md:py-8 rounded-2xl shadow-2xl border-4 border-green-400 hover:border-green-300 transition-all"
                >
                  Yes! ❤️
                </motion.button>

                <motion.button
                  ref={noButtonRef}
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoTouch}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-500 to-rose-600 text-white font-fredoka text-3xl md:text-4xl px-12 md:px-16 py-6 md:py-8 rounded-2xl shadow-2xl border-4 border-red-400 hover:border-red-300 transition-all relative"
                >
                  No
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* SUCCESS STATE */}
        {state === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen w-full bg-gradient-to-br from-pink-400 via-red-300 to-rose-400 relative overflow-hidden"
          >
            {/* Sparkles and hearts */}
            {Array.from({ length: 30 }, (_, i) => (
              <motion.div
                key={i}
                className="absolute text-5xl md:text-7xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  rotate: [0, 360],
                  scale: [1, 1.5, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {Math.random() > 0.5 ? '❤️' : '✨'}
              </motion.div>
            ))}

            <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10">
              <motion.img
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                src="./basketball-meme.jpg"
                alt="Basketball meme"
                className="max-w-md md:max-w-lg lg:max-w-xl mb-8 rounded-lg shadow-2xl"
              />
              <motion.h1
                initial={{ scale: 0, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                className="text-6xl md:text-8xl lg:text-9xl font-fredoka text-center text-white drop-shadow-2xl font-bold"
              >
                MAJORRR
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
