import React, { useContext, useState, memo } from "react";
import "../styles/styles.scss";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import schemeSetterStyles from "../styles/panel/SchemeSetter.module.css";
import PropTypes from "prop-types";

const formatNumber = (number) => {
  return number + "'";
};

const deformatNumber = (string) => {
  const number = string.replace(/\D/g, "") || 0;
  return Number(number);
};

const positionCursor = (cursorPosition, target) => {
  target.focus();
  target.setSelectionRange(cursorPosition, cursorPosition);
};

function NumberSetter({ initValue, placeholder, onChange, isSmall }) {
  const [number, setValue] = useState(initValue);
  const className = isSmall
    ? schemeSetterStyles.numberSetterSmall
    : schemeSetterStyles.numberSetter;
  return (
    <InputGroup className={className} size="sm">
      <InputGroup.Text>{placeholder}</InputGroup.Text>
      <Form.Control
        value={formatNumber(number)}
        onChange={(e) => {
          const newNumber = deformatNumber(e.target.value);
          setValue(newNumber);
          const cursorPosition = String(newNumber).length;
          onChange(newNumber);
          positionCursor(cursorPosition, e.target);
        }}
      />
    </InputGroup>
  );
}

NumberSetter.propTypes = {
  initValue: PropTypes.number,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  isSmall: PropTypes.bool,
};

export default memo(NumberSetter);
