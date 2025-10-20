export const metadata = {
  title: "Refund & Cancellation Policy | Elaksi Atelier",
  description: "Refund and cancellation details for orders placed at Elaksi Atelier.",
}

export default function RefundPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-700">
      <h1 className="text-3xl font-semibold text-slate-800 mb-6">Refund & Cancellation</h1>

      <p className="text-lg text-slate-600 mb-4">
        We want you to love your purchase. If you are not satisfied, here is how returns, cancellations and refunds work.
      </p>

      <section className="mb-6">
        <h2 className="font-medium text-slate-800 mb-2">Cancellations</h2>
        <p className="text-slate-600">
          You may cancel an order within 24 hours of purchase provided it has not yet been shipped. To request cancellation, contact us at <a href="mailto:elaksiatelier777@gmail.com" className="text-green-600 underline">elaksiatelier777@gmail.com</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-medium text-slate-800 mb-2">Returns & Refunds</h2>
        <ul className="list-disc list-inside text-slate-600">
          <li>Returns are accepted within 7 days of delivery for eligible items (unused, in original packaging).</li>
          <li>Refunds are processed within 5–7 business days after we receive and inspect the return.</li>
          <li>Shipping charges may be non-refundable unless the return is due to our error.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-medium text-slate-800 mb-2">How to return</h2>
        <p className="text-slate-600">
          Email <a href="mailto:elaksiatelier777@gmail.com" className="text-green-600 underline">elaksiatelier777@gmail.com</a> with your order number and reason for return. We'll reply with instructions and a return label if applicable.
        </p>
      </section>
    </main>
  )
}
