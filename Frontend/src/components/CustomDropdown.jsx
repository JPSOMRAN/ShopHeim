import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import "../styles/CustomDropdown.css";

function CustomDropdown({

  label,

  value,

  options,

  onChange,

}) {

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {

    function handleClickOutside(event) {

      if (

        dropdownRef.current &&

        !dropdownRef.current.contains(event.target)

      ) {

        setOpen(false);

      }

    }

    document.addEventListener(

      "mousedown",

      handleClickOutside

    );

    return () =>

      document.removeEventListener(

        "mousedown",

        handleClickOutside

      );

  }, []);

  return (

    <div

      className="custom-dropdown"

      ref={dropdownRef}

    >

      {label && (

        <label>{label}</label>

      )}

      <button

        type="button"

        className="dropdown-btn"

        onClick={() =>

          setOpen(!open)

        }

      >

        <span>{value}</span>

        <FaChevronDown

          className={

            open ? "rotate" : ""

          }

        />

      </button>

      {open && (

        <div className="dropdown-menu">

          {options.map((item) => (

            <div

              key={item}

              className={`dropdown-item ${
                item === value
                  ? "active"
                  : ""
              }`}

              onClick={() => {

                onChange(item);

                setOpen(false);

              }}

            >

              {item}

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default CustomDropdown;