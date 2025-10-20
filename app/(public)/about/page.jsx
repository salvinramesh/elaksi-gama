export const metadata = {
  title: "About | Elaksi Atelier",
  description:
    "Discover the story behind Elaksi Atelier – where elegance meets affordability and every woman shines beautifully every day.",
}

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 text-slate-700">
      <section className="space-y-8">
        <h1 className="text-4xl font-semibold text-slate-800">
          About <span className="text-green-600">Elaksi Atelier</span>
        </h1>

        <p className="text-lg leading-relaxed text-slate-600">
          At <span className="font-semibold text-slate-800">Elaksi Atelier</span>,
          we believe that elegance should never come at the cost of affordability.
          Our mission is simple — to empower every woman to express her individuality
          through timeless designs and everyday accessories that shine with grace.
        </p>

        <p className="text-lg leading-relaxed text-slate-600">
          Founded in <strong>Kozhikode, Kerala</strong>, Elaksi Atelier blends modern
          minimalism with traditional craftsmanship. Each piece in our collection
          reflects care, creativity, and the belief that true beauty lies in simplicity.
        </p>

        <p className="text-lg leading-relaxed text-slate-600">
          Whether you're dressing up for a special occasion or adding a subtle touch
          of style to your daily wear, Elaksi Atelier offers jewelry and accessories
          designed to complement every moment of your journey.
        </p>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">
          Why Choose Us
        </h2>
        <ul className="list-disc list-inside space-y-3 text-slate-600 text-lg">
          <li>💎 Handpicked quality and authentic craftsmanship</li>
          <li>💚 Elegant, minimal, and affordable designs</li>
          <li>🌿 Sustainable and locally inspired creations</li>
          <li>🛡️ Anti-tarnish, waterproof, and anti-allergic materials for lasting comfort</li>
          <li>🚚 Fast and reliable shipping across India</li>
          <li>💬 Dedicated customer support for every order</li>
        </ul>
      </section>

      <section className="mt-16 text-lg text-slate-600">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4">Our Vision</h2>
        <p>
          We aspire to redefine how women experience fashion — to make style
          accessible, meaningful, and empowering. Elaksi Atelier isn’t just a brand;
          it’s a celebration of confidence, grace, and everyday beauty.
        </p>
      </section>
    </main>
  )
}
