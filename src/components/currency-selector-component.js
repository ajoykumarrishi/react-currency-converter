import PropTypes from 'prop-types';

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

CurrencySelectorComponent.propTypes = {
  codes: PropTypes.arrayOf(PropTypes.array).isRequired,
  selectedCurrency: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CurrencySelectorComponent;