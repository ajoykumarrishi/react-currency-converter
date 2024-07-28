import { fetchExchangeRates } from './services/exchangeRateApi';
import { useState, useEffect } from 'react';

function App() {
  const [exchangeRate, setExchangeRate] = useState('');

  async function getExchangeRates() {
    try {
      const conversion_rate = await fetchExchangeRates('USD', 'EUR');
      setExchangeRate(conversion_rate);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  }

  useEffect(() => {
    getExchangeRates();
  }, []); 

  return (
    <div className="App">
      <h1>Exchange Rate: ${exchangeRate}</h1>
      <button onClick={getExchangeRates}> 
        Get Exchange Rate
      </button>
    </div>
  );
}

export default App;
