export const getChatbotResponse = async (prompt: string, contextData: any) => {
  const res = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, contextData }),
  });

  const data = await res.json();
  return data.text;
};
