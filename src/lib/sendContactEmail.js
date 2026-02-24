import { CONTACT_API_URL } from '../constants.js';

export const sendContactEmail = async ({ name, email, subject, message }) => {
  const response = await fetch(CONTACT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message }),
  });
  if (!response.ok) {
    let message = 'Failed to send message.';
    const text = await response.text();

    try {
      const data = JSON.parse(text);
      message = data.errors?.join(', ') || data.error || message;
    } catch {
      message = text || message;
    }

    throw new Error(message);
  }
  return response.json();
};
