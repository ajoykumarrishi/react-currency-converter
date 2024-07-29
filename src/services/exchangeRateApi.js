const API_KEY = '250c22869b66f9d9f19e29ea';

async function fetchData(url, extractKey) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result === 'success') {
      return extractKey ? data[extractKey] : data; 
    } else {
      throw new Error(`API Error: ${data['error-type']}`);
    }
  } catch (error) {
    return null;
  }
}

export async function fetchExchangeRate(baseCurrency, targetCurrency) {
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${baseCurrency}/${targetCurrency}`;
  return fetchData(url, 'conversion_rate');
}

export async function fetchCurrencyCodes() {
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`;
  const codes = await fetchData(url, 'supported_codes');
  return codes; 
}
