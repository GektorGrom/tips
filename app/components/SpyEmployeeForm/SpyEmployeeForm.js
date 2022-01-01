import React from 'react';
import PropTypes from 'prop-types';
import { FormSpy } from 'react-final-form';

function SpyEmployeeForm({ onChange }) {
  return (
    <FormSpy onChange={({ values: { employees } }) => onChange(employees)} />

  );
}

SpyEmployeeForm.propTypes = {
  onChange: PropTypes.func.isRequired,
};
SpyEmployeeForm.defaultProps = {};

export default React.memo(SpyEmployeeForm);
