export async function translateToDanish(text) {
  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        q: text,
        source: 'en',
        target: 'da',
      }),
    });
    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error('Translation failed:', error);
    return text; 
  }
}