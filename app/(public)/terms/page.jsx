export const metadata = {
  title: "Terms & Conditions | Elaksi Atelier",
  description: "Terms and conditions for use of Elaksi Atelier website and purchases.",
}

export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-700">
      <h1 className="text-3xl font-semibold text-slate-800 mb-6">Terms & Conditions</h1>

      <p className="text-lg text-slate-600 mb-4">
        These terms govern your use of the Elaksi Atelier website and your purchase of goods from the site. By using the website and placing an order, you agree to these terms.
      </p>

      <section className="mb-6">
        <h2 className="font-medium text-slate-800 mb-2">Ordering</h2>
        <p className="text-slate-600">
          Orders are subject to acceptance and availability. We reserve the right to refuse or cancel orders for reasons including product or pricing errors.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-medium text-slate-800 mb-2">Pricing & Payment</h2>
        <p className="text-slate-600">
          All prices are shown in the site currency. We accept the payment methods displayed at checkout. You are responsible for providing accurate billing and shipping information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-medium text-slate-800 mb-2">Limitation of Liability</h2>
        <p className="text-slate-600">
          To the fullest extent permitted by law, Elaksi Atelier will not be liable for indirect, special, or consequential damages arising from your use of the website or purchase of products.
        </p>
      </section>

      <section>
        <h2 className="font-medium text-slate-800 mb-2">Contact</h2>
        <p className="text-slate-600">
          For questions about these terms, contact us at <a href="mailto:elaksiatelier777@gmail.com" className="text-green-600 underline">elaksiatelier777@gmail.com</a>.
        </p>
      </section>
    </main>
  )
}
