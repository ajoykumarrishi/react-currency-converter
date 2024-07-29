import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function CurrencyInputComponent({ value, onChange }) {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value, inputValue]); 

  return (
    <div>
      <input
        id="currencyInput"
        type="number"
        value={inputValue}
        onChange={onChange}
        defaultValue = {1}
      />
    </div>
  );
}

CurrencyInputComponent.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CurrencyInputComponent;
