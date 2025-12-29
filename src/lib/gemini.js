const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('proveit-user-gemini-key')

export async function runAI(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error('No Gemini API key configured')
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1024,
        }
      })
    }
  )

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
}
