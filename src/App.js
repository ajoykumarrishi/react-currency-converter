import React, { useState, useEffect } from "react";
import {
  fetchExchangeRate,
  fetchCurrencyCodes,
} from "./services/exchangeRateApi";
import CurrencySelectorComponent from "./components/currency-selector-component";
import CurrencyInputComponent from "./components/currency-input-component";
import CurrencyOutputComponent from "./components/currency-output-component";
import "./App.css";

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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Currency Converter</h1>
              <div className="exchange-rate-display text-center mb-4">
                <h5 className="mb-2">Current Exchange Rate</h5>
                <div className="display-4 text-primary">{exchangeRate.toFixed(4)}</div>
              </div>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="currency-input-group">
                    <label htmlFor="baseCurrency" className="form-label">Base Currency</label>
                    <div className="input-group">
                      <CurrencySelectorComponent
                        codes={currencyCodes}
                        selectedCurrency={selectedBaseCurrency}
                        onChange={handleBaseCurrencyChange}
                      />
                      <CurrencyInputComponent
                        value={baseCurrencyValue}
                        onChange={(e) => handleBaseCurrencyValueChange(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="currency-output-group">
                    <label htmlFor="targetCurrency" className="form-label">Target Currency</label>
                    <div className="input-group">
                      <CurrencySelectorComponent
                        codes={currencyCodes}
                        selectedCurrency={selectedTargetCurrency}
                        onChange={handleTargetCurrencyChange}
                      />
                      <CurrencyOutputComponent
                        value={targetCurrencyValue}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;