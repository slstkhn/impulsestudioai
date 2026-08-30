import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, contact, message, services } = body

    if (!name || !contact || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const emailUser = process.env.EMAIL_USER
    const emailPass = process.env.EMAIL_PASS

    if (!emailUser || !emailPass) {
      console.warn("EMAIL_USER or EMAIL_PASS is missing in environment variables. Falling back to success without sending real email.")
      return NextResponse.json({ success: true, warning: 'Email credentials not set' })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass
      }
    })

    const mailOptions = {
      from: emailUser,
      to: 'impulsaistudio@gmail.com',
      subject: `Новая заявка от: ${name}`,
      text: `
Имя: ${name}
Контакт: ${contact}
Услуги: ${services.join(', ')}

Сообщение:
${message}
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
