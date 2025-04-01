import { DatabaseBuilder } from 'src/DB';
import { isSameDay } from 'date-fns';
import axios from 'axios';
import { ENV } from 'src/constants';
import { throwError } from './error';

export async function sendEmail(
  subject: string,
  content: string,
  email: string,
  options?: {
    link?: string;
    templateId?: string;
  },
) {
  const env = ENV();
  
  // EmailJS configuration
  const EMAIL_API_KEY = 'Tp9DuDm7gmJAwDYP1';
  const EMAIL_SERVICE_ID = 'service_ljm5mve';
  const EMAIL_TEMPLATE_ID = options?.templateId || 'template_6ea8ucx';

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: EMAIL_SERVICE_ID,
      template_id: EMAIL_TEMPLATE_ID,
      user_id: EMAIL_API_KEY,
      template_params: {
        subject,
        content,
        to_email: email,
        link: options?.link,
      },
    }),
  });

  if (!response.ok) {
    throwError('Failed to send email', 500);
  }
}

export async function sendResetPasswordEmail(email: string, code: string) {
  const mode = ENV().MODE;

  const link = `${
    mode == 'DEV' ? 'http://localhost:3000' : 'https://labelenergie.fr'
  }/app/reinitialiser-mot-de-passe?code=${code}&email=${email}`;

  await sendEmail(
    'Réinitialisation de votre mot de passe',
    `Bonjour,\n
    Vous venez de faire une demande de réinitialisation de votre mot de passe sur Label Energie.`,
    email,
    {
      link,
      templateId: 'template_58m6m6c',
    },
  );
}

export async function sendErrorEmail(error: any) {
  // Send error email if last error was before today
  let isSendEmail = true;

  const lastError = await DatabaseBuilder.query(
    'SELECT * FROM TB_ERROR ORDER BY DATE DESC LIMIT 1',
  );

  if (lastError?.length) {
    const lastDateError: Date = lastError[0]['date'];

    if (!isSameDay(new Date(), lastDateError)) {
      isSendEmail = true;
    } else {
      isSendEmail = false;
    }
  }

  try {
    if (isSendEmail) {
      await sendEmail(
        'Erreur 500 Label Energie',
        JSON.stringify(error),
        'lucgireaud@gmail.com',
      );
    }
    await DatabaseBuilder.query('INSERT INTO TB_ERROR(error) values($1)', [
      JSON.stringify(error),
    ]);
  } catch (err) {
    console.error(err);
  }
}
