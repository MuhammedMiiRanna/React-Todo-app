import CheckButton from "../CheckButton";
import { IoMdClose } from "react-icons/io";
import styles from "./TaskItem.module.css";

interface Props {
  children: string;
  isChecked: boolean;
  lightsTheme: boolean;
  onCheck: () => void;
  onDelete: () => void;
}

// children is the task content
const TaskItem = ({
  children,
  lightsTheme,
  isChecked,
  onCheck,
  onDelete,
}: Props) => {

  const taskClass = (isChecked: boolean, lightsTheme: boolean) => {
    // TODO: make this for darkTheme
    const className = [styles["task"]];
    if (isChecked) {
      className.push(styles["task-check"]);
      if (!lightsTheme) {
        className.push(styles["task-check__dark"]);
      }
    }
    return className.join(" ");
  };
  
  return (
    <div
      className={
        lightsTheme
          ? styles["task-container"]
          : `${styles["task-container"]} ${styles["task-container__dark"]}`
      }
    >
      <CheckButton isChecked={isChecked} onCheck={onCheck}></CheckButton>
      <div className={taskClass(isChecked, lightsTheme)}>{children}</div>
      <button className={styles["icon"]} onClick={onDelete}>
        <IoMdClose color={lightsTheme ? "black" : "white"} size="25" />
      </button>
    </div>
  );
};

export default TaskItem;
