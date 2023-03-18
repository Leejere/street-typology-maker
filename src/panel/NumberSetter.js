import React, { useContext, useState, memo } from "react";
import "../styles/styles.scss";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import schemeSetterStyles from "../styles/panel/SchemeSetter.module.css";
import PropTypes from "prop-types";

function NumberSetter({ initValue, onChange }) {
  const [number, setValue] = useState(initValue);
  return (
    <InputGroup className={schemeSetterStyles.numberSetter} size="sm">
      <InputGroup.Text>Height</InputGroup.Text>
      <Form.Control
        value={number}
        type="number"
        onChange={(e) => {
          const newNumber = Number(e.target.value);
          setValue(newNumber);
          onChange(newNumber);
        }}
      />
      <InputGroup.Text>&apos;</InputGroup.Text>
    </InputGroup>
  );
}

NumberSetter.propTypes = {
  initValue: PropTypes.number,
  onChange: PropTypes.func,
};

export default memo(NumberSetter);
