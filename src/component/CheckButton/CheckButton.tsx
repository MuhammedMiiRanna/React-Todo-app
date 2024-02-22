// import { IoIosDoneAll } from "react-icons/io";
import { MdDone } from "react-icons/md";
// import { MdOutlineDone } from "react-icons/md";
// import { IoMdDoneAll } from "react-icons/io";
import styles from "./CheckButton.module.css";

interface Props {
  isChecked: boolean;
  onCheck: () => void;
}

const CheckButton = ({ isChecked, onCheck }: Props) => {
  return (
    <div
      onClick={onCheck}
      className={
        isChecked
          ? [styles["btn"], styles["btn-checked"]].join(" ")
          : styles["btn"]
      }
    >
      {/* {isChecked ? <IoIosDoneAll color="white" /> : ""} */}
      {isChecked ? <MdDone color="white" /> : ""}
      {/* {isChecked ? <MdOutlineDone color="white" /> : ""} */}
      {/* {isChecked ? <IoMdDoneAll color="white" /> : ""} */}
    </div>
  );
};

export default CheckButton;
