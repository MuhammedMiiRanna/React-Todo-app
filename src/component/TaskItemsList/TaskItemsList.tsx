import { useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import { TasksInterface } from "../../interface";
import styles from "./TaskItemsList.module.css";

interface Props {
  tasksList: TasksInterface[];
  lightsTheme: boolean;
  // handleClick: (data: TasksInterface) => void;
  onCheck: (index: number) => void;
  onFilter: (filter: string) => void;
  onClear: () => void;
}

const TaskItemsList = ({
  tasksList,
  lightsTheme,
  onCheck,
  onFilter,
  onClear,
}: Props) => {
  const [selectedId, setSelectedid] = useState("0");

  const handleClick = (id: string) => {
    setSelectedid(id);
    id === "0"
      ? onFilter("all")
      : id === "1"
      ? onFilter("active")
      : onFilter("completed");
    // console.log(event);
  };

  return (
    <div className={styles["TaskItemsList"]}>
      {tasksList.length > 0 ? (
        tasksList.map((task, index) => {
          return (
            <TaskItem
              lightsTheme={lightsTheme}
              key={index}
              children={task.task}
              isChecked={task.isChecked}
              onCheck={() => onCheck(index)}
            ></TaskItem>
          );
        })
      ) : (
        <div className={styles["no-items"]}>GG! No items so far</div>
      )}
      <div
        className={
          lightsTheme
            ? styles["control"]
            : `${styles["control"]} ${styles["control__dark"]}`
        }
      >
        <div className={styles["items-left"]}>
          {tasksList.reduce(
            (acc, task) => (!task.isChecked ? acc + 1 : acc),
            0
          )}{" "}
          items left
        </div>
        <div>
          <button
            id="0"
            onClick={() => handleClick("0")}
            className={selectedId === "0" ? styles["selected"] : ""}
          >
            All
          </button>
          <button
            id="1"
            onClick={() => handleClick("1")}
            className={selectedId === "1" ? styles["selected"] : ""}
          >
            Active
          </button>
          <button
            id="2"
            onClick={() => handleClick("2")}
            className={selectedId === "2" ? styles["selected"] : ""}
          >
            Completed
          </button>
        </div>
        <button onClick={onClear}>Clear Completed</button>
      </div>
    </div>
  );
};

export default TaskItemsList;
