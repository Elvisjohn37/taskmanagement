import React, { useState } from "react";
import styles from "./Task.module.scss";
import Button from "../components/Button.jsx";
import TaskList from "../components/TaskList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../components/tasklist/slice";
import { getTaskListState } from "../components/tasklist/slice";
import classnames from "classnames";
import { getUserState } from "../Pages/login/slice";
import { resetTaskType } from "../components/tasklist/slice";

const Task = () => {
  const user = useSelector(getUserState);
  const dispatch = useDispatch();
  const { taskList } = useSelector(getTaskListState);
  const hasUnsaved = taskList.find((task) => task.taskType === "newTask");

  const handleAddTask = () => {
    const hasNewTask = taskList.find((tl) => tl.id === undefined);
    if (!hasNewTask) {
      dispatch(resetTaskType());
      dispatch(
        addTask({
          task: {
            name: "",
            description: "",
            taskType: "newTask",
          },
        })
      );
    }
  };

  return (
    <div className={classnames([styles.task, user.isLogin && styles.login])}>
      <div className={styles.actionMenu}>
        <Button onClick={handleAddTask} disabled={hasUnsaved}>
          Create New Task
        </Button>

        <TaskList />
      </div>
    </div>
  );
};

export default Task;
