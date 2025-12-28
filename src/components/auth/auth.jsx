import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Loader2, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'

export default function Auth({ onAuthSuccess }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address' })
      return
    }

    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: 'https://nymfarious.github.io/ProveIt/',
      },
    })

    setLoading(false)

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ 
        type: 'success', 
        text: 'Magic link sent! Check your email inbox.' 
      })
    }
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-ink flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4 text-copper/50">
            <span>❧</span>
            <div className="w-8 h-px bg-current" />
            <span>✦</span>
            <div className="w-8 h-px bg-current" />
            <span>☙</span>
          </div>
          
          <h1 className="font-masthead text-4xl font-bold tracking-widest text-ink dark:text-paper mb-2">
            P R O V E I T
          </h1>
          
          <p className="font-headline text-sm italic text-ink/50 dark:text-paper/50">
            Veritas Lux — Truth is Light
          </p>
        </div>

        <div className="bg-white dark:bg-ink-light rounded-xl shadow-lg border border-ink/10 dark:border-paper/10 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-copper/10 flex items-center justify-center">
              <Mail className="w-8 h-8 text-copper" />
            </div>
            <h2 className="font-headline text-2xl font-semibold text-ink dark:text-paper mb-2">
              Welcome
            </h2>
            <p className="text-sm text-ink/60 dark:text-paper/60">
              Enter your email to receive a secure magic link
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink/70 dark:text-paper/70 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg bg-paper dark:bg-ink border-2 border-ink/10 dark:border-paper/10 
                         text-ink dark:text-paper placeholder:text-ink/40 dark:placeholder:text-paper/40
                         focus:outline-none focus:border-copper transition-colors"
                disabled={loading}
              />
            </div>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                  message.type === 'success' 
                    ? 'bg-forest/10 text-forest border border-forest/20' 
                    : 'bg-burgundy/10 text-burgundy border border-burgundy/20'
                }`}
              >
                {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                {message.text}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg bg-copper text-white font-medium
                       hover:bg-copper-dark transition-colors flex items-center justify-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending Link...
                </>
              ) : (
                <>
                  Send Magic Link
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-ink/10 dark:border-paper/10">
            <p className="text-xs text-center text-ink/40 dark:text-paper/40">
              🔒 No password needed. We'll send a secure link to your email.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <button 
            onClick={onAuthSuccess}
            className="text-sm text-ink/50 dark:text-paper/50 hover:text-copper transition-colors"
          >
            Continue without signing in →
          </button>
        </div>

        <div className="text-center mt-8 text-xs text-ink/30 dark:text-paper/30">
          <p className="font-mono">ProveIt v2.3.0 • Personal Edition</p>
        </div>
      </motion.div>
    </div>
  )
}
