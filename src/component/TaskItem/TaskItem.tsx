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
    const classNames = [styles["task"]];
    if (isChecked) {
      classNames.push(styles["task-check"]);
      if (!lightsTheme) {
        classNames.push(styles["task-check__dark"]);
      }
    }
    return classNames.join(" ");
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
