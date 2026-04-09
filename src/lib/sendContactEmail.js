import { CONTACT_API_URL } from '../constants.js';

export const sendContactEmail = async ({ name, email, subject, message, captchaToken }) => {
  const response = await fetch(CONTACT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message, captchaToken }),
  });
  if (!response.ok) {
    let errMessage = 'Failed to send errMessage.';
    const text = await response.text();

    try {
      const data = JSON.parse(text);
      errMessage = data.errors?.join(', ') || data.error || errMessage;
    } catch {
      errMessage = text || errMessage;
    }

    throw new Error(errMessage);
  }
  return response.json();
};
