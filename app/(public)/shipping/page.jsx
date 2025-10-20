export const metadata = {
  title: "Shipping Policy | Elaksi Atelier",
  description: "Shipping information — delivery times, charges and tracking for Elaksi Atelier orders.",
}

export default function ShippingPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 text-slate-700">
      <h1 className="text-3xl font-semibold text-slate-800 mb-6">Shipping Policy</h1>

      <p className="text-lg text-slate-600 mb-4">
        We deliver across India. Below are the basic shipping terms — delivery windows, costs and tracking.
      </p>

      <section className="mb-6">
        <h2 className="font-medium text-slate-800 mb-2">Delivery times</h2>
        <p className="text-slate-600">
          Orders are typically processed within 1–2 business days. Domestic delivery usually takes 3–7 business days depending on location.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-medium text-slate-800 mb-2">Shipping charges</h2>
        <p className="text-slate-600">
          Standard shipping charges are applied at checkout. Free shipping promotions (if any) will be displayed on the cart/checkout page.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-medium text-slate-800 mb-2">Tracking</h2>
        <p className="text-slate-600">
          Once your order ships, we will send you a tracking number via email so you can follow your delivery.
        </p>
      </section>

      <section>
        <h2 className="font-medium text-slate-800 mb-2">Contact</h2>
        <p className="text-slate-600">
          Questions about shipping? Email <a href="mailto:elaksiatelier777@gmail.com" className="text-green-600 underline">elaksiatelier777@gmail.com</a>.
        </p>
      </section>
    </main>
  )
}
