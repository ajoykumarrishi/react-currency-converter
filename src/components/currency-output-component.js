// CurrencyOutputComponent.js
import React from 'react';
import PropTypes from 'prop-types';

function CurrencyOutputComponent({ value }) {
  return (
    <input
      type="text"
      className="form-control"
      value={value.toFixed(2)}
      readOnly
      aria-readonly="true"
    />
  );
}

CurrencyOutputComponent.propTypes = {
  value: PropTypes.number.isRequired,
}

export default CurrencyOutputComponent;