import React, { useContext } from "react";
import { StatsCard } from "../StatsCard/StatsCard";
import { TasksContext } from "../../context/TasksContext";
import styles from "./style.module.scss";

export const Header: React.FC = () => {
  const { tasks } = useContext(TasksContext);

  const totalTasks = tasks.length;
  const totalPeding = tasks.reduce((total, task) => {
    if (!task.done) return total + 1;
    return total;
  }, 0);
  const totalDone = totalTasks - totalPeding;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div>
          <h1>MyTodo</h1>
          <span>Bem vindo, Péricles!</span>
        </div>
        <div>
          <StatsCard title="Total de tarefas" value={totalTasks} />
          <StatsCard title="Tarefas pendentes" value={totalPeding} />
          <StatsCard title="Tarefas concluidas" value={totalDone} />
        </div>
      </div>
    </header>
  );
};
