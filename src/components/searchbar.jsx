import { IoSearch } from "react-icons/io5";
import "./searchbar.css";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Searchbar({
  className,
  inputClassName,
  iconClassName,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className={cx("xlr-searchbar", className)}>
      <IoSearch className={cx("xlr-searchbar-icon", iconClassName)} />
      <input
        className={cx("xlr-searchbar-input", inputClassName)}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default Searchbar;
