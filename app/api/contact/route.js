import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

// POST /api/contact
export async function POST(req) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 })
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // use true if 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Send email
    await transporter.sendMail({
      from: `"Elaksi Atelier" <${process.env.SMTP_USER}>`,
      to: "elaksiatelier777@gmail.com",
      subject: `New Contact Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    })

    return NextResponse.json({ ok: true, msg: "Message sent successfully!" })
  } catch (err) {
    console.error("Contact API error:", err)
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    )
  }
}
