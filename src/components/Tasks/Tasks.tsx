import React, { FormEvent, useContext, useState } from "react";
import styles from "./style.module.scss";
import { TasksContext } from "../../context/TasksContext";

export const Tasks: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const { tasks, setTasks } = useContext(TasksContext);

  function handlerSubmitAddTask(event: FormEvent) {
    event.preventDefault();

    if (taskTitle.length < 3) {
      alert("Não é possivel adicionar uma tarefa com menos de 3 letras.");
      return;
    }

    const newTasks = [
      ...tasks,
      { id: new Date().getTime(), title: taskTitle, done: false },
    ];

    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));

    setTaskTitle("");
  }

  function handlerToggleTaskStatus(taskId: number) {
    const newTasks = tasks.map((task) => {
      if (taskId === task.id) {
        return {
          ...task,
          done: !task.done,
        };
      }

      return task;
    });

    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  function handlerRemoveTask(taskId: number) {
    const newTasks = tasks.filter((task) => task.id !== taskId);

    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  return (
    <section className={styles.container}>
      <form onSubmit={handlerSubmitAddTask}>
        <div>
          <label htmlFor="task-title">Adcionar Tarefa</label>
          <input
            value={taskTitle}
            onChange={(event) => setTaskTitle(event.target.value)}
            type="text"
            id="task-title"
            placeholder="Titulo da tarefa"
          />
        </div>
        <button type="submit">ADICIONAR</button>
      </form>
      <ul>
        {tasks.map((task) => {
          return (
            <div key={task.id}>
              <li>
                <div>
                  <input
                    type="checkbox"
                    id={`${task.id}`}
                    onChange={() => handlerToggleTaskStatus(task.id)}
                  />
                  <label className="label" htmlFor={`${task.id}`}>
                    {task.title}
                  </label>
                </div>
                <button onClick={() => handlerRemoveTask(task.id)}>
                  EXCLUIR
                </button>
              </li>
              <hr />
            </div>
          );
        })}
      </ul>
    </section>
  );
};
