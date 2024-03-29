import { useState } from "react";
import "./App.css";
import TasksForm from "./component/TaskForm";
import TaskItemsList from "./component/TaskItemsList";
// import { TasksInterface } from "./interface";
import { moonIcon, sunIcon } from "./component/SVGs";
import { TasksInterface } from "./interface";

function App() {
  const [filterType, setFilterType] = useState("all");
  const [lightsTheme, setLightsTheme] = useState(false);
  // TODO: make a service to get those, maybe a class
  const [tasks, setTasks] = useState<TasksInterface[]>([
    { isChecked: false, task: "Learn more" },
    { isChecked: false, task: "Finish This project" },
    { isChecked: true, task: "Start this project" },
    { isChecked: true, task: "Learn some react and js" },
  ]);

  const visibleTasks =
    filterType === "all"
      ? [...tasks]
      : filterType === "active"
      ? tasks.filter((task) => !task.isChecked)
      : tasks.filter((task) => task.isChecked);

  const handleChnageTheme = () => {
    setLightsTheme(!lightsTheme);
    document.body.style.backgroundColor = "var(--Very-Dark-Blue);";
  };

  const handleSubmit = (taskTitle: string) => {
    console.log("> Submit !", taskTitle);
    setTasks([{ isChecked: false, task: taskTitle }, ...tasks]);
  };

  const handleCheck = (key: number) => {
    console.log("> Check !", key);
    setTasks(
      tasks.map((task, index) =>
        index === key ? { ...task, isChecked: !task.isChecked } : { ...task }
      )
    );
  };

  const handleDelete = (key: number) => {
    console.log("> Delete !", key);
    setTasks(tasks.filter((_, index) => index !== key));
  };

  const handleFilter = (filter: string) => {
    console.log("> Filter type:", filter);
    setFilterType(filter);
  };

  const handleClear = () => {
    console.log("> Clear Completed!");
    setTasks([...tasks.filter((task) => !task.isChecked)]);
  };

  return (
    <main className={lightsTheme ? "main main__light" : "main main__dark"}>
      <div className="container">
        {/* {checkIcon} {crossIcon} */}
        <header>
          <h1>TODO</h1>
          <span onClick={handleChnageTheme}>
            {lightsTheme ? moonIcon : sunIcon}
          </span>
        </header>
        <TasksForm
          lightsTheme={lightsTheme}
          onSubmit={handleSubmit}
        ></TasksForm>
        {/* PS: instead of passing all those functions, we can
        just pass a function to change the state, and declare
        those function in the component itself */}
        <TaskItemsList
          lightsTheme={lightsTheme}
          tasksList={visibleTasks}
          setTasksList={setTasks}
          onCheck={handleCheck}
          onDelete={handleDelete}
          onFilter={handleFilter}
          onClear={handleClear}
        ></TaskItemsList>
      </div>
      <div
        style={
          lightsTheme
            ? { color: "var(--Very-Dark-Desaturated-Blue)" }
            : { color: "var(--neutral-Dark-Grayish-Blue)" }
        }
      >
        Drag and drop To reorder list
      </div>
    </main>
  );
}

export default App;
