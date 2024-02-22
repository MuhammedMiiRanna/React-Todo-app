import CheckButton from "../CheckButton";
import styles from "./TaskItem.module.css";

interface Props {
  children: string;
  isChecked: boolean;
  onCheck: () => void;
}

// children is the task content
const TaskItem = ({ children, isChecked, onCheck }: Props) => {
  return (
    <div className={styles["task-container"]}>
      <CheckButton isChecked={isChecked} onCheck={onCheck}></CheckButton>
      <div
        className={
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
