function CurrencySelectorComponent({ codes, selectedCurrency, onChange }) {
  return (
    <select name="currency" value={selectedCurrency} onChange={onChange}>
      {codes.length > 0 ? (
        codes.map(([code, label]) => (
          <option key={code} value={code}>
            {label} ({code})
          </option>
        ))
      ) : (
        <option disabled>Loading currencies...</option>
      )}
    </select>
  );
}

export default CurrencySelectorComponent;