const CONTACT_API_URL = 'https://1ythblxki4.execute-api.us-east-1.amazonaws.com/prod/contact';

export const sendContactEmail = async ({ name, email, subject, message }) => {
  const response = await fetch(CONTACT_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.errors ? data.errors.join(', ') : data.error || 'Failed to send message.');
  }
  return response.json();
};
