import CheckButton from "../CheckButton";
import styles from "./TaskItem.module.css";

interface Props {
  children: string;
  isChecked: boolean;
  lightsTheme: boolean;
  onCheck: () => void;
}

// children is the task content
const TaskItem = ({ children, lightsTheme, isChecked, onCheck }: Props) => {
  return (
    <div
      className={
        lightsTheme
          ? styles["task-container"]
          : `${styles["task-container"]} ${styles["task-container__dark"]}`
      }
    >
      <CheckButton isChecked={isChecked} onCheck={onCheck}></CheckButton>
      <div
        className={
          // TODO: make this for darkTheme
          isChecked
            ? [styles["task"], styles["task-check"]].join(" ")
            : styles["task"]
        }
      >
        {children}
      </div>
    </div>
  );
};

export default TaskItem;
