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
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 440);

  // Attach an event listener to handle screen width changes
  window.addEventListener("resize", function handleResize() {
    setIsWideScreen(window.innerWidth > 440);
  });

  /* Filter Buttons will be placed in different locations according to
  the width (desktop or mobile), that's why we made a function, we will 
  call it in two places */
  const FilterButtons = (selectedId: string) => {
    const buttonsText = ["All", "Active", "Selected"];

    const handleClick = (id: string) => {
      setSelectedid(id);
      id === "0"
        ? onFilter("all")
        : id === "1"
        ? onFilter("active")
        : onFilter("completed");
    };

    return (
      <div>
        {buttonsText.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(index.toString())}
            className={
              selectedId === index.toString() ? styles["selected"] : ""
            }
          >
            {item}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
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
          <div className={styles["items-left"]}>
            {tasksList.reduce(
              (acc, task) => (!task.isChecked ? acc + 1 : acc),
              0
            )}{" "}
            items left
          </div>
          {/* FilterButtons will be placed in different locations according to
          the width (desktop or mobile), that's why we made a function, we will 
          call it in another location down below */}
          {isWideScreen ? <>{FilterButtons(selectedId)}</> : ""}
          <button onClick={onClear}>Clear Completed</button>
        </div>
      </div>
      {isWideScreen ? (
        ""
      ) : (
        <>
          <div
            className={
              lightsTheme
                ? `${styles["control"]} ${styles["control__mobile"]}`
                : `${styles["control"]} ${styles["control__mobile"]} ${styles["control__dark"]}`
            }
          >
            {FilterButtons(selectedId)}
          </div>
        </>
      )}
    </>
  );
};

export default TaskItemsList;
