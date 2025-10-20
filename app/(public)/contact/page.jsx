'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  // WhatsApp contact details
  const WHATSAPP_NUMBER = '919497364384' // without + sign, country code first (India +91)
  const defaultWhatsAppMessage = (name = '') =>
    `Hello Elaksi Atelier, I have a question about your products. ${name ? `My name is ${name}.` : ''}`

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)

    const payload = { name, email, message }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setResult({ ok: true, msg: 'Thanks — your message was sent. We will get back soon!' })
        setName('')
        setEmail('')
        setMessage('')
      } else {
        throw new Error('server reject')
      }
    } catch (err) {
      // fallback: open mail client as before, but also provide WhatsApp option visually
      const subject = encodeURIComponent(`Contact from ${name || 'Website Visitor'}`)
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
      window.location.href = `mailto:elaksiatelier777@gmail.com?subject=${subject}&body=${body}`

      setResult({
        ok: true,
        msg: 'Your mail client opened as a fallback. You can send the email from there, or contact us on WhatsApp below.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  // helper to build wa.me URL with prefilled text
  const whatsappHref = (prefilledText) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledText)}`

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-700">
      <section className="space-y-6">
        <h1 className="text-4xl font-semibold text-slate-800">
          Contact <span className="text-green-600">Elaksi Atelier</span>
        </h1>

        <p className="text-lg text-slate-600">
          Have a question, custom order request or collaboration idea? Fill the form below, email or WhatsApp Us
          . We typically respond within 24–48 hours.
        </p>
      </section>

      <section className="mt-10 bg-white rounded-lg p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Your name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border rounded-md outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md outline-none focus:ring-2 focus:ring-green-200"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              required
              className="w-full px-4 py-3 border rounded-md outline-none focus:ring-2 focus:ring-green-200"
              placeholder="Tell us about your question or request..."
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-60"
            >
              {submitting ? 'Sending…' : 'Send Message'}
            </button>

            <button
              type="button"
              onClick={() => {
                setName('')
                setEmail('')
                setMessage('')
                setResult(null)
              }}
              className="px-4 py-2 rounded-full border text-sm text-slate-600 hover:bg-slate-50 transition"
            >
              Reset
            </button>

            {/* Optional quick WhatsApp CTA next to buttons */}
            <a
              href={whatsappHref(defaultWhatsAppMessage(name))}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition"
            >
              {/* WhatsApp icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M20.52 3.48A11.88 11.88 0 0012 0C5.37 0 .02 5.35.02 12a11.9 11.9 0 001.72 6.13L0 24l5.02-1.3A11.92 11.92 0 0012 24c6.63 0 12-5.35 12-12 0-3.2-1.24-6.19-3.48-8.52z" fill="white" />
                <path d="M17.5 14.5c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.7-.2-1 .2-.3.4-1.1 1.2-1.3 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1.1-1.8-2.3-2-3-.2-.5 0-.7.2-.9.2-.2.4-.6.6-.9.2-.3.2-.6 0-.9-.2-.3-1-2.4-1.4-3.3-.4-.9-.8-.7-1-.7-.3 0-.6 0-.9 0-.3 0-.9.1-1.4.7-.5.6-1.8 1.8-1.8 4.5 0 2.7 1.8 5.2 2 5.6.2.4 3.1 5 7.6 6.8 4 .7 4.6.4 5 .4.3 0 2.8-1.1 3.2-3.1.4-2-.4-3.8-1.2-4.2z" fill="#0DBF3B" />
              </svg>
              WhatsApp
            </a>
          </div>

          {result && (
            <div className={`mt-3 text-sm ${result.ok ? 'text-green-700' : 'text-red-600'}`}>
              {result.msg}
            </div>
          )}
        </form>
      </section>

      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Customer Support</h3>
          <p className="mb-2">
            For order tracking and returns:
            <br />
            <a className="text-green-600 underline" href="mailto:elaksiatelier777@gmail.com">
              elaksiatelier777@gmail.com
            </a>
          </p>

          {/* WhatsApp contact line */}
          <p>
            Or message us on WhatsApp:
            <br />
            <a
              href={whatsappHref(defaultWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 text-emerald-600 hover:underline"
            >
              {/* small green WhatsApp icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M20.52 3.48A11.88 11.88 0 0012 0C5.37 0 .02 5.35.02 12a11.9 11.9 0 001.72 6.13L0 24l5.02-1.3A11.92 11.92 0 0012 24c6.63 0 12-5.35 12-12 0-3.2-1.24-6.19-3.48-8.52z" fill="#0DBF3B" />
                <path d="M17.5 14.5c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.7-.2-1 .2-.3.4-1.1 1.2-1.3 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1.1-1.8-2.3-2-3-.2-.5 0-.7.2-.9.2-.2.4-.6.6-.9.2-.3.2-.6 0-.9-.2-.3-1-2.4-1.4-3.3-.4-.9-.8-.7-1-.7-.3 0-.6 0-.9 0-.3 0-.9.1-1.4.7-.5.6-1.8 1.8-1.8 4.5 0 2.7 1.8 5.2 2 5.6.2.4 3.1 5 7.6 6.8 4 .7 4.6.4 5 .4.3 0 2.8-1.1 3.2-3.1.4-2-.4-3.8-1.2-4.2z" fill="#fff" />
              </svg>
              +91 9497364384
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Visit Us</h3>
          <p>Kozhikode, Kerala<br />Working hours: Mon — Sat, 9:30 AM — 6:00 PM</p>
        </div>
      </section>

      {/* Sticky WhatsApp floating button (bottom-right) */}
      <a
        href={whatsappHref(defaultWhatsAppMessage())}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="fixed right-5 bottom-5 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M20.52 3.48A11.88 11.88 0 0012 0C5.37 0 .02 5.35.02 12a11.9 11.9 0 001.72 6.13L0 24l5.02-1.3A11.92 11.92 0 0012 24c6.63 0 12-5.35 12-12 0-3.2-1.24-6.19-3.48-8.52z" fill="#fff" opacity="0.06" />
          <path d="M17.5 14.5c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.7-.2-1 .2-.3.4-1.1 1.2-1.3 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.9-1.1-1.1-1.8-2.3-2-3-.2-.5 0-.7.2-.9.2-.2.4-.6.6-.9.2-.3.2-.6 0-.9-.2-.3-1-2.4-1.4-3.3-.4-.9-.8-.7-1-.7-.3 0-.6 0-.9 0-.3 0-.9.1-1.4.7-.5.6-1.8 1.8-1.8 4.5 0 2.7 1.8 5.2 2 5.6.2.4 3.1 5 7.6 6.8 4 .7 4.6.4 5 .4.3 0 2.8-1.1 3.2-3.1.4-2-.4-3.8-1.2-4.2z" fill="white" />
        </svg>
        WhatsApp
      </a>
    </main>
  )
}
