export async function POST(request: Request) {
  const body = await request.json();

  if (body?.message && body?.subject) {
    const EMAIL_API_KEY = process.env.EMAIL_API_KEY;
    const EMAIL_SERVICE_ID = process.env.EMAIL_SERVICE_ID;
    const EMAIL_TEMPLATE_ID = process.env.EMAIL_TEMPLATE_ID;
    const PRIVATE_KEY = process.env.EMAIL_PRIVATE_KEY;

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: EMAIL_SERVICE_ID,
          template_id: EMAIL_TEMPLATE_ID,
          user_id: EMAIL_API_KEY,
          accessToken: PRIVATE_KEY,
          template_params: {
            message: body.message,
            subject: body.subject,
            toEmail: process.env.CONTACT_EMAIL || "contact@labelenergie.fr",
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      console.error('Email sending error:', error);
      return new Response(
        JSON.stringify({ message: 'Failed to send email' }), 
        { status: 500 }
      );
    }
  }

  return new Response(
    JSON.stringify({ message: 'Invalid request body' }), 
    { status: 400 }
  );
}
