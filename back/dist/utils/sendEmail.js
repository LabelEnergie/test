"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
exports.sendResetPasswordEmail = sendResetPasswordEmail;
exports.sendErrorEmail = sendErrorEmail;
const DB_1 = require("../DB");
const date_fns_1 = require("date-fns");
const constants_1 = require("../constants");
const error_1 = require("./error");
async function sendEmail(subject, content, email, options) {
    const env = (0, constants_1.ENV)();
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
        (0, error_1.throwError)('Failed to send email', 500);
    }
}
async function sendResetPasswordEmail(email, code) {
    const mode = (0, constants_1.ENV)().MODE;
    const link = `${mode == 'DEV' ? 'http://localhost:3000' : 'https://labelenergie.fr'}/app/reinitialiser-mot-de-passe?code=${code}&email=${email}`;
    await sendEmail('Réinitialisation de votre mot de passe', `Bonjour,\n
    Vous venez de faire une demande de réinitialisation de votre mot de passe sur Label Energie.`, email, {
        link,
        templateId: 'template_58m6m6c',
    });
}
async function sendErrorEmail(error) {
    let isSendEmail = true;
    const lastError = await DB_1.DatabaseBuilder.query('SELECT * FROM TB_ERROR ORDER BY DATE DESC LIMIT 1');
    if (lastError?.length) {
        const lastDateError = lastError[0]['date'];
        if (!(0, date_fns_1.isSameDay)(new Date(), lastDateError)) {
            isSendEmail = true;
        }
        else {
            isSendEmail = false;
        }
    }
    try {
        if (isSendEmail) {
            await sendEmail('Erreur 500 Label Energie', JSON.stringify(error), 'lucgireaud@gmail.com');
        }
        await DB_1.DatabaseBuilder.query('INSERT INTO TB_ERROR(error) values($1)', [
            JSON.stringify(error),
        ]);
    }
    catch (err) {
        console.error(err);
    }
}
//# sourceMappingURL=sendEmail.js.map