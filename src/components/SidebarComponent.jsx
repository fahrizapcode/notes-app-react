import React from "react";
import "../styles/sidebar.css";
import PropTypes from "prop-types";
export default function SidebarComponent({
  onChangeShowNotesForm,
  rotateButtonShowNotesForm,
}) {
  return (
    <div className="sidebar">
      <button onClick={onChangeShowNotesForm}>
        <img
          src="./image/plus.svg"
          alt="plus"
          style={{ transform: `rotate(${rotateButtonShowNotesForm}deg)` }}
        />
      </button>
    </div>
  );
}

SidebarComponent.propTypes = {
  onChangeShowNotesForm: PropTypes.func.isRequired,
  rotateButtonShowNotesForm: PropTypes.number.isRequired,
};
