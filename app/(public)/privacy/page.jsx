export const metadata = {
  title: "Privacy Policy | Elaksi Atelier",
  description: "Read Elaksi Atelier's privacy policy — how we collect, use and protect your personal data.",
}

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-700">
      <h1 className="text-3xl font-semibold text-slate-800 mb-6">Privacy Policy</h1>

      <p className="text-lg text-slate-600 mb-4">
        At <strong>Elaksi Atelier</strong> we respect your privacy. This page explains what information we collect, why we collect it, and how we protect it.
      </p>

      <section className="mb-6">
        <h2 className="font-medium text-slate-800 mb-2">Information we collect</h2>
        <ul className="list-disc list-inside text-slate-600">
          <li>Personal details you provide (name, email, address) when you place an order or contact us.</li>
          <li>Order and payment information necessary to fulfil purchases.</li>
          <li>Usage data such as pages visited and search queries to improve the site experience.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-medium text-slate-800 mb-2">How we use your information</h2>
        <p className="text-slate-600">
          We use your data to process orders, communicate about your purchase (shipping, returns), provide customer support, and to improve our products and services. We do not sell your personal information to third parties.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-medium text-slate-800 mb-2">Security</h2>
        <p className="text-slate-600">
          We implement appropriate technical and organizational safeguards to protect your personal data. Access to sensitive environment variables and databases is restricted to authorized personnel only.
        </p>
      </section>

      <section>
        <h2 className="font-medium text-slate-800 mb-2">Contact</h2>
        <p className="text-slate-600">
          For questions about this policy, email us at <a href="mailto:elaksiatelier777@gmail.com" className="text-green-600 underline">elaksiatelier777@gmail.com</a>.
        </p>
      </section>
    </main>
  )
}
