import { useMutation } from '@tanstack/react-query';

export function useDownloadPost() {
  return useMutation({
    mutationFn: async ({ url, body }) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }
      const blob = await response.blob();

      return { blob, response };
    },
  });
}
