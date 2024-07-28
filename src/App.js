import { fetchExchangeRate, fetchCurrencyCodes } from './services/exchangeRateApi';
import { useState, useEffect } from 'react';
import CurrencySelectorComponent from './components/currency-selector-component';

function App() {
  const [exchangeRate, setExchangeRate] = useState('');
  const [currencyCodes, setCurrencyCodes] = useState([]); 
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState('USD');
  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState('EUR');

  useEffect(() => {
    async function fetchData() {
      try {
        const codes = await fetchCurrencyCodes();
        setCurrencyCodes(codes);
        const rate = await fetchExchangeRate(selectedBaseCurrency, selectedTargetCurrency);
        setExchangeRate(rate);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [selectedBaseCurrency, selectedTargetCurrency]);

  function handleBaseCurrencyChange(event) {
    setSelectedBaseCurrency(event.target.value);
  }

  function handleTargetCurrencyChange(event) {
    setSelectedTargetCurrency(event.target.value);
  }

  return (
    <div className="App">
      <h1>Exchange Rate: {exchangeRate}</h1>
      <CurrencySelectorComponent
        codes={currencyCodes}
        selectedCurrency={selectedBaseCurrency}
        onChange={handleBaseCurrencyChange}
        label="Base Currency"
      />
      <CurrencySelectorComponent
        codes={currencyCodes}
        selectedCurrency={selectedTargetCurrency}
        onChange={handleTargetCurrencyChange}
        label="Target Currency"
      />
    </div>
  );
}

export default App;
