require("dotenv").config({ path: __dirname + "/.env.local" });

const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const { ImapFlow } = require("imapflow");

async function appendToSent(rawMessage) {
  const client = new ImapFlow({
    host: process.env.IMAP_HOST || "imap.titan.email",
    port: Number(process.env.IMAP_PORT || 993),
    secure: process.env.IMAP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    logger: false,
  });

  try {
    await client.connect();

    const sentFolder = process.env.IMAP_SENT_FOLDER || "Sent";

    await client.append(sentFolder, rawMessage, ["\\Seen"]);

    await client.logout();

    console.log(`Sent copy saved to Titan folder: ${sentFolder}`);
  } catch (error) {
    try {
      await client.logout();
    } catch (_) {}

    throw new Error(`Failed to save copy to Sent folder: ${error.message}`);
  }
}

async function sendEmail() {
  try {
    const htmlPath = path.join(__dirname, "rondev-vet-clinic-email.html");

    if (!fs.existsSync(htmlPath)) {
      throw new Error(`HTML file not found: ${htmlPath}`);
    }

    const htmlContent = fs.readFileSync(htmlPath, "utf8");

    const mailOptions = {
      from: `"Rondev" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      replyTo: process.env.SMTP_USER,
      subject: "Helping Clinics Manage Appointments Better",
      text: `Hi,

Rondev helps veterinary clinics move from manual appointment scheduling to a simple online booking system.

With a custom web-based system, your clinic can organize appointment requests, pet owner details, pet records, service tracking, and clinic schedules in one place.

If your clinic currently manages bookings through calls, messages, walk-ins, notebooks, or spreadsheets, we can help you build a cleaner and easier system for your daily operations.

Visit: https://rondev.com.ph`,
      html: htmlContent,
    };

    const smtpTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      requireTLS: process.env.SMTP_PORT === "587",
    });

    await smtpTransporter.verify();
    console.log("Titan SMTP connected successfully.");

    const rawTransporter = nodemailer.createTransport({
      streamTransport: true,
      buffer: true,
      newline: "unix",
    });

    const rawInfo = await rawTransporter.sendMail(mailOptions);
    const rawMessage = rawInfo.message;

    const info = await smtpTransporter.sendMail(mailOptions);

    console.log("Email sent successfully.");
    console.log("Message ID:", info.messageId);

    await appendToSent(rawMessage);
  } catch (error) {
    console.error("Failed.");
    console.error(error.message);
  }
}

sendEmail();