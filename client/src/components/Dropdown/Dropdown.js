import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const Picker = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>Dong Player</DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Corcoran</DropdownItem>
        <DropdownItem>Olsen</DropdownItem>
        <DropdownItem>Lakeman</DropdownItem>
        <DropdownItem>Ross</DropdownItem>
        <DropdownItem>Massa</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Picker;
