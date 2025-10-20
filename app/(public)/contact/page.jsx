'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

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
      const subject = encodeURIComponent(`Contact from ${name || 'Website Visitor'}`)
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
      window.location.href = `mailto:elaksiatelier777@gmail.com?subject=${subject}&body=${body}`
      setResult({
        ok: true,
        msg: 'Your mail client opened as a fallback. You can send the email from there.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-700">
      <section className="space-y-6">
        <h1 className="text-4xl font-semibold text-slate-800">
          Contact <span className="text-green-600">Elaksi Atelier</span>
        </h1>

        <p className="text-lg text-slate-600">
          Have a question, custom order request or collaboration idea? Fill the form below or email us at{' '}
          <a className="text-green-600 underline" href="mailto:elaksiatelier777@gmail.com">
            elaksiatelier777@gmail.com
          </a>
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
          <p>
            For order tracking and returns: <br />
            <a
              className="text-green-600 underline"
              href="mailto:elaksiatelier777@gmail.com"
            >
              elaksiatelier777@gmail.com
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Visit Us</h3>
          <p>Kozhikode, Kerala<br />Working hours: Mon — Sat, 9:30 AM — 6:00 PM</p>
        </div>
      </section>
    </main>
  )
}
