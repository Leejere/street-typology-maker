import React, { useState, memo } from "react";
import schemeSetterStyles from "../styles/panel/SchemeSetter.module.css";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/styles.scss";

function DropdownSelect({ variant, initValue, options, onSelect }) {
  const [selectedValue, setSelectedValue] = useState(initValue);
  const dropdownItems = Object.keys(options).map((type, index) => (
    <Dropdown.Item
      key={index}
      className={schemeSetterStyles.dropdownItem}
      onClick={() => {
        onSelect(type);
        setSelectedValue(type);
      }}
    >
      <FontAwesomeIcon icon={options[type].icon} />
      {options[type].label}
    </Dropdown.Item>
  ));
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant={variant}
        className={schemeSetterStyles.dropdownToggle}
      >
        <FontAwesomeIcon icon={options[selectedValue].icon} />
      </Dropdown.Toggle>
      <Dropdown.Menu>{dropdownItems}</Dropdown.Menu>
    </Dropdown>
  );
}

DropdownSelect.propTypes = {
  variant: PropTypes.string,
  initValue: PropTypes.string,
  options: PropTypes.object,
  onSelect: PropTypes.func,
};

export default memo(DropdownSelect);
