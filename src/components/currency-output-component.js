import React from 'react';
import PropTypes from 'prop-types';

function CurrencyOutputComponent({ value }) {
  console.log(value);
  return (
    <div>
      <input type="number" value={value.toFixed(2)} readOnly aria-readonly="true" /> 
    </div>
  );
}

CurrencyOutputComponent.propTypes = {
  value: PropTypes.number.isRequired,
}

export default CurrencyOutputComponent;
