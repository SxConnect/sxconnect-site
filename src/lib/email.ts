import "server-only";

import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(to: string, resetLink: string) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user || "no-reply@sxconnect.com.br";

  if (!host || !user || !pass) {
    console.log(`[password-reset] link para ${to}: ${resetLink}`);
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to,
    subject: "Redefinição de senha - SxConnect CMS",
    html: `
      <p>Olá,</p>
      <p>Recebemos um pedido para redefinir sua senha. Clique no link abaixo:</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>Este link expira em 1 hora. Se você não solicitou, ignore este e-mail.</p>
    `,
  });
}
