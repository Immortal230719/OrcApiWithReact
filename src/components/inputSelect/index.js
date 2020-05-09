import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const renderSelectField = ({
  value,
  input,
  label,
  variant,
  children,
  name,
  ...custom
}) => (
  <>
    <FormControl>
      <InputLabel
        required
        color='primary'
        style={{ padding: '0 7px' }}
        disabled
        htmlFor={label}
      >
        Status
      </InputLabel>
      <Select
        native
        variant={variant}
        value={value}
        {...input}
        {...custom}
        inputProps={{
          name,
          id: label,
        }}
      >
        {children}
      </Select>
    </FormControl>
  </>
);

export default renderSelectField;

renderSelectField.defaultProps = {
  value: '',
  name: 'status',
};

renderSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  name: PropTypes.string,
  variant: PropTypes.string.isRequired,
  value: PropTypes.string,

  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func,
    onFocus: PropTypes.func,
  }).isRequired,

  meta: PropTypes.shape({
    touched: PropTypes.bool,
    invalid: PropTypes.bool,
    error: PropTypes.string,
  }).isRequired,
};
