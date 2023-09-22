import React, { useState } from "react";
import styles from "./Trash.module.scss";
import Button from "../components/Button.jsx";
import TrashList from "../components/TrashList.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../components/tasklist/slice";
import { getTaskListState } from "../components/tasklist/slice";

const Task = () => {
  const dispatch = useDispatch();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
  };

  const handleTaskNameChange = () => {};

  const handleAddTask = () => {
    dispatch(
      addTask({
        task: {
          name: "",
          description: "",
          taskType: "newTask"
        },
      })
    );
  };

  const { taskList } = useSelector(getTaskListState);
  const hasUnsaved = taskList.find(task => task.taskType === "newTask");

  return (
    <div className={styles.task}>
      <div className={styles.actionMenu}>
        <TrashList />
      </div>
    </div>
  );
};

export default Task;
