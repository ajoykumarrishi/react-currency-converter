export async function fetchExchangeRates(baseCurrency, targetCurrency) {
  const apiKey = '250c22869b66f9d9f19e29ea';
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${baseCurrency}/${targetCurrency}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data['result'] === "success") {
      return data['conversion_rate'];
    } else {
      throw new Error(`API Error: ${data['error-type']}`);
    }
  } catch (error) {
    throw error; 
  }
}
