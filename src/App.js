import {
  fetchExchangeRate,
  fetchCurrencyCodes,
} from "./services/exchangeRateApi";
import { useState, useEffect } from "react";
import CurrencySelectorComponent from "./components/currency-selector-component";
import CurrencyInputComponent from "./components/currency-input-component";
import CurrencyOutputComponent from "./components/currency-output-component";

function App() {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currencyCodes, setCurrencyCodes] = useState([]);
  const [selectedBaseCurrency, setSelectedBaseCurrency] = useState("USD");
  const [selectedTargetCurrency, setSelectedTargetCurrency] = useState("EUR");
  const [baseCurrencyValue, setBaseCurrencyValue] = useState(1);
  const [targetCurrencyValue, setTargetCurrencyValue] = useState(0);

  // Fetch currency codes once on initial load
  useEffect(() => {
    async function fetchData() {
      try {
        const codes = await fetchCurrencyCodes();
        setCurrencyCodes(codes);
      } catch (error) {
        console.error("Error fetching currency codes:", error);
        // Handle the error (e.g., set an error message in state)
      }
    }
    fetchData();
  }, []); 

  // Fetch exchange rate whenever selected currencies or base value change
  useEffect(() => {
    async function fetchData() {
      try {
        if (selectedBaseCurrency && selectedTargetCurrency) {
          const rate = await fetchExchangeRate(
            selectedBaseCurrency,
            selectedTargetCurrency
          );
          setExchangeRate(rate);
          setTargetCurrencyValue(baseCurrencyValue * rate);
        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        // Handle the error (e.g., set an error message in state)
      }
    }
    fetchData();
  }, [selectedBaseCurrency, selectedTargetCurrency, baseCurrencyValue]);

  function handleBaseCurrencyChange(event) {
    setSelectedBaseCurrency(event.target.value);
  }

  function handleTargetCurrencyChange(event) {
    setSelectedTargetCurrency(event.target.value);
  }

  function handleBaseCurrencyValueChange(value) {
    if (!value) {
      setBaseCurrencyValue(0);
      setTargetCurrencyValue(0);
      return;
    }

    const numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      setBaseCurrencyValue(numericValue);
      setTargetCurrencyValue(numericValue * exchangeRate);
    }
  }

  return (
    <div className="App">
      <h1>
        Exchange Rate: {exchangeRate}
      </h1>

      <div>
        <CurrencySelectorComponent
          codes={currencyCodes}
          selectedCurrency={selectedBaseCurrency}
          onChange={handleBaseCurrencyChange}
          label="Base Currency"
        />
        <CurrencyInputComponent
          value={baseCurrencyValue}
          onChange={(e) => handleBaseCurrencyValueChange(e.target.value)}
        />
      </div>

      <div>
        <CurrencySelectorComponent
          codes={currencyCodes}
          selectedCurrency={selectedTargetCurrency}
          onChange={handleTargetCurrencyChange}
          label="Target Currency"
        />
        <CurrencyOutputComponent
          currency={selectedTargetCurrency}
          value={targetCurrencyValue}
        />
      </div>
    </div>
  );
}

export default App;
