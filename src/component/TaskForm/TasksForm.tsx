import { FieldValues, useForm } from "react-hook-form";
import { MdDone } from "react-icons/md";
import styles from "./TaskForm.module.css";

interface Props {
  onSubmit: (taskText: string) => void;
}

interface FormData {
  task: string;
}

const TasksForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, reset } = useForm<FormData>();

  const formSubmit = (data: FieldValues) => {
    reset();
    console.log(typeof data, data);
    onSubmit(data.task);
  };

  return (
    <div className={styles["task-container"]}>
      {/* <CheckButton isChecked={false} onCheck={() => handleSubmit}></CheckButton> */}
      <form onSubmit={handleSubmit(formSubmit)}>
        {/* <CheckButton onClick={() => handleSubmit}></CheckButton> */}
        <button type="submit">
          {/* <button className={styles["submit"]} type="submit"> */}
          <MdDone color="black" />
        </button>
        <input
          {...register("task", { required: true, minLength: 3 })}
          className={styles["task"]}
          type="text"
          id="task"
          placeholder="Create a new todo..."
          autoComplete="off"
        />
      </form>
    </div>
  );
};

export default TasksForm;
