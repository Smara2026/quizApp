
import React, { useState, useEffect, useRef } from "react";
import Select, { components } from "react-select";
// :root {
//   --color-darkest: #343a40;
//   --color-dark: #495057;
//   --color-medium: #ced4da;
//   --color-light: #f1f3f5;

//   --color-theme: #1098ad;
//   --color-accent: #ffa94d;
// }

// export default DifficultySelect;
const OptionWithCheckbox = (props) => {
  return (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null}
        style={{ marginRight: 10 }}
      />
      <label>{props.label}</label>
    </components.Option>
  );
};

const CustomValueContainer = ({ children, ...props }) => {
  const [input, valueContainer] = children;

  return (
    <components.ValueContainer {...props}>
      {props.hasValue ? (
        <span style={{ color: "#ccc", marginLeft: "5px" }}>
          {props.selectProps.placeholder}
        </span>
      ) : null}
      {input}
    </components.ValueContainer>
  );
};

const DropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <span style={{ color: "#ccc", fontSize: "1rem" }}>
        {menuIsOpen ? "▲" : "▼"}
      </span>
    </components.DropdownIndicator>
  );
};

const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor:
      state.menuIsOpen || state.isFocused ? "#343a40" : "#495057",
    color: "white",
    borderRadius: "9999px",
    border: "2px solid #495057",
    width: "480px",
    minHeight: "60px",
    fontSize: "2rem",
    padding: "1.2rem 2.4rem",
    "&:hover": {
      backgroundColor: "#343a40",
    },}),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isFocused ? "#40444b" : "#2c2f33",
    color: "inherit",
    fontSize: "2rem",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#2c2f33",
    zIndex: 9999,
    width: "480px",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "white",
  }),

  placeholder: (base) => ({
    ...base,
    color: "inherit",
  }),
  multiValue: () => ({
    display: "none", 
  }),
  singleValue: (base) => ({
    ...base,
    display: "none", 
  }),
};

function CheckboxSelect({ options, isMulti, placeholder, dispatch, type }) {
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(null);

  useEffect(function () {
    function handleMousedown(e) {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleMousedown);
    return () => {
      document.removeEventListener("mousedown", handleMousedown);
    };
  }, []);

  return (
    <div className="select-container" ref={menuRef}>
      <Select
        options={options}
        isMulti={isMulti}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        components={{
          Option: OptionWithCheckbox,
          ValueContainer: CustomValueContainer,
          DropdownIndicator: DropdownIndicator,
        }}
        onChange={(e) => {
          let dataArr = isMulti ? [...e] : e;
          if(dataArr===null) {
            const indArr=['10','20','30'];
            const num=indArr[Math.floor(Math.random()*2)];
            dataArr={value:num,label:num};
          }
          console.log(dataArr)
          dispatch({ type: type, payload: dataArr });
        }}
        allowSelectAll={true}
        styles={customStyles}
        placeholder={placeholder}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
        menuIsOpen={menuOpen}
        isClearable
      />
    </div>
  );
}

export default CheckboxSelect;
