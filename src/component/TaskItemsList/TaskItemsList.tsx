import { useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import { TasksInterface } from "../../interface";
import styles from "./TaskItemsList.module.css";

interface Props {
  tasksList: TasksInterface[];
  lightsTheme: boolean;
  // handleClick: (data: TasksInterface) => void;
  onCheck: (index: number) => void;
  onDelete: (index: number) => void;
  onFilter: (filter: string) => void;
  onClear: () => void;
}

const TaskItemsList = ({
  tasksList,
  lightsTheme,
  onCheck,
  onDelete,
  onFilter,
  onClear,
}: Props) => {
  const [selectedId, setSelectedid] = useState("0");
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 400);

  const handleClick = (id: string) => {
    setSelectedid(id);
    id === "0"
      ? onFilter("all")
      : id === "1"
      ? onFilter("active")
      : onFilter("completed");
    // console.log(event);
  };
  const handleResize = () => {
    setIsWideScreen(window.innerWidth > 400);
  };
  // Attach an event listener to handle screen width changes
  window.addEventListener("resize", handleResize);

  // some local components
  const itemsLeft = (
    <div className={styles["items-left"]}>
      {tasksList.reduce((acc, task) => (!task.isChecked ? acc + 1 : acc), 0)}{" "}
      items left
    </div>
  );

  const filterButtons = (
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
  );

  const ClearCompleted = <button onClick={onClear}>Clear Completed</button>;

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
              onDelete={() => onDelete(index)}
            ></TaskItem>
          );
        })
      ) : (
        <div
          className={
            lightsTheme
              ? styles["no-items"]
              : [styles["no-items"], styles["no-items__dark"]].join(" ")
          }
        >
          GG! No items so far
        </div>
      )}
      <div
        className={
          lightsTheme
            ? styles["control"]
            : `${styles["control"]} ${styles["control__dark"]}`
        }
      >
        {itemsLeft}
        {filterButtons}
        {ClearCompleted}
      </div>
      {/* // TODO: change this here so it  */}
      {isWideScreen 
      ? 
      <div>Nahhh</div> 
      : 
      <div>Hell yeah</div>}
    </div>
  );
};

export default TaskItemsList;
