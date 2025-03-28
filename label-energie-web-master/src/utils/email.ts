export async function sendEmail(subject: string, message: string) {
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      body: JSON.stringify({ subject, message }),
    });
    return response.status;
  } catch (err) {
    console.error(err);
    return 500;
  }
}
