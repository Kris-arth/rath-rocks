import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body as Record<string, string>;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_EMAIL;
    if (!apiKey || !to) {
      console.error("Missing RESEND_API_KEY or CONTACT_EMAIL env vars");
      return NextResponse.json(
        { error: "Server misconfiguration." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "RATH <contact@rath.rock>",
      to: [to],
      replyTo: email,
      subject: subject?.trim()
        ? `[RATH] ${subject.trim()}`
        : `[RATH] New inquiry from ${name.trim()}`,
      html: buildEmailHtml({ name, email, subject, message }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

function buildEmailHtml(fields: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const { name, email, subject, message } = fields;
  const escaped = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#080808;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#080808;min-height:100vh;">
    <tr><td align="center" style="padding:48px 16px;">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="padding-bottom:8px;">
            <span style="font-family:Georgia,serif;font-weight:300;font-size:52px;letter-spacing:10px;color:#ECE7DF;line-height:1;">RATH</span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom:36px;">
            <div style="width:48px;height:1px;background:#C9A96A;"></div>
          </td>
        </tr>

        <!-- Label -->
        <tr>
          <td style="padding-bottom:28px;">
            <span style="font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:9px;letter-spacing:4px;text-transform:uppercase;color:#C9A96A;">New Inquiry</span>
          </td>
        </tr>

        <!-- Fields table -->
        <tr>
          <td>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #1C1C1C;width:80px;vertical-align:top;">
                  <span style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(236,231,223,0.35);font-family:-apple-system,sans-serif;">From</span>
                </td>
                <td style="padding:14px 0 14px 16px;border-bottom:1px solid #1C1C1C;">
                  <span style="font-size:14px;color:#ECE7DF;">${escaped(name)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:14px 0;border-bottom:1px solid #1C1C1C;vertical-align:top;">
                  <span style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(236,231,223,0.35);font-family:-apple-system,sans-serif;">Email</span>
                </td>
                <td style="padding:14px 0 14px 16px;border-bottom:1px solid #1C1C1C;">
                  <a href="mailto:${escaped(email)}" style="font-size:14px;color:#C9A96A;text-decoration:none;">${escaped(email)}</a>
                </td>
              </tr>
              ${
                subject?.trim()
                  ? `<tr>
                <td style="padding:14px 0;border-bottom:1px solid #1C1C1C;vertical-align:top;">
                  <span style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(236,231,223,0.35);font-family:-apple-system,sans-serif;">Subject</span>
                </td>
                <td style="padding:14px 0 14px 16px;border-bottom:1px solid #1C1C1C;">
                  <span style="font-size:14px;color:#ECE7DF;">${escaped(subject)}</span>
                </td>
              </tr>`
                  : ""
              }
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="padding-top:32px;padding-bottom:8px;">
            <span style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(236,231,223,0.35);font-family:-apple-system,sans-serif;">Message</span>
          </td>
        </tr>
        <tr>
          <td>
            <p style="margin:0;font-size:14px;line-height:1.9;color:rgba(236,231,223,0.7);white-space:pre-wrap;">${escaped(message)}</p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding-top:48px;border-top:1px solid #1C1C1C;margin-top:48px;">
            <span style="font-size:10px;color:rgba(236,231,223,0.2);font-family:-apple-system,sans-serif;letter-spacing:2px;">rath.rock</span>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
