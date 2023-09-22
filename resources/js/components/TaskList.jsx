import React, { useEffect, useState } from "react";
import styles from "./TaskList.module.scss";
import { getTaskList } from "./../backend/requests.js";
import { Alert } from "@mui/joy";
import Typography from "@mui/material/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Sheet from "@mui/joy/Sheet";
import Skeleton from "@mui/joy/Skeleton";
import Slider from "@mui/joy/Slider";
import classnames from "classnames";
import Chip from "@mui/joy/Chip";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  setTaskList,
  getTaskListState,
  setTaskStatus,
  removeUnsaved,
  editUnsaved,
  editTask,
  removeNewTask,
  resetTaskType,
  editName,
  editDescription,
  removeTaskData,
} from "./tasklist/slice";
import { addTask, updateTask, removeTask } from "./../backend/requests.js";

const TaskList = () => {
  // const [tasks, setTasks] = useState([]);
  const [hasError, setHasError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const { taskList } = useSelector(getTaskListState);
  const [newTask, setNewTask] = useState({});
  const [isEditLoading, setIsEditLoading] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    getTaskList({
      success: (response) => {
        dispatch(setTaskList({ taskList: response.data }));
      },
      error: (response) => {
        setHasError(response.data);
      },
      completed: () => setIsFetching(false),
    });
  }, []);

  const getMarks = (statusId) => {
    return [
      {
        value: 0,
        label: (
          <Chip color={statusId === 0 ? "primary" : "neutral"} variant="soft">
            To Do
          </Chip>
        ),
        color: "",
      },
      {
        value: 1,
        label: (
          <Chip color={statusId === 1 ? "warning" : "neutral"} variant="soft">
            In Progress
          </Chip>
        ),
        color: "warning",
      },
      {
        value: 2,
        label: (
          <Chip color={statusId === 2 ? "success" : "neutral"} variant="soft">
            Completed
          </Chip>
        ),
        color: "success",
      },
    ];
  };

  function valueText(value) {
    const status = ["To Do", "In Progress", "Completed"];
    return parseInt(value);
  }

  const handleCancel = (taskType, id) => {
    dispatch(
      taskType === "newTask" ? removeNewTask({ id }) : removeUnsaved({ id })
    );
  };
  const handleSave = (event) => {
    event.preventDefault();
    dispatch(editUnsaved(newTask));
    const unSaved = taskList.find((task) => task.taskType === "newTask");
    const toEdit = taskList.find((task) => task.taskType === "toEdit");
    if (unSaved) {
      addTask({
        data: { ...unSaved, ...newTask },
        success: () => {
          dispatch(resetTaskType({ id: unSaved.id }));
          dispatch(removeUnsaved());
        },
        error: () => {},
        completed: () => {},
      });
    }

    if (toEdit) {
      setIsEditLoading(true);
      updateTask({
        data: { ...toEdit, ...newTask },
        success: () => {
          dispatch(resetTaskType({ id: toEdit.id }));
          dispatch(removeUnsaved());
        },
        error: () => {},
        completed: () => setIsEditLoading(false),
      });
    }
  };

  const handleStatusChange = (event, taskType, id) => {
    taskType === "newTask" &&
      setNewTask({
        ...newTask,
        status_id: event.target.value,
      });
    taskType === "toEdit" &&
      dispatch(
        setTaskStatus({
          id,
          status_id: event.target.value,
        })
      );
  };

  const handleNameChange = (event, taskType, id) => {
    taskType === "newTask" &&
      setNewTask({
        ...newTask,
        name: event.target.value,
      });
    taskType === "toEdit" &&
      dispatch(
        editName({
          name: event.target.value,
          id,
        })
      );
  };

  const handleDescriptionChange = (event, taskType, id) => {
    taskType === "newTask" &&
      setNewTask({
        ...newTask,
        description: event.target.value,
      });
    taskType === "toEdit" &&
      dispatch(
        editDescription({
          name: event.target.value,
          id,
        })
      );
  };

  const handleEdit = (id) => {
    dispatch(
      editTask({
        id: id,
      })
    );
  };

  const handleRemove = (id) => {
    removeTask({
      data: {task_id: id},
      success: (response) => {
        dispatch(removeTaskData({ id }))
      },
      error: () => {

      },
      completed: () => {

      }
    })
  }

  return (
    <div className={styles.taskList}>
      <div className={styles.title}>
        <Typography variant="h3" component="h4">
          Task List
        </Typography>
      </div>
      {hasError && <Alert variant="soft" color="danger"></Alert>}
      <div className={styles.tasksContainer}>
        {isFetching ? (
          <Card variant="outlined" sx={{ display: "flex", gap: 2 }}>
            <AspectRatio ratio="21/3">
              <Skeleton variant="overlay">
                <img
                  alt=""
                  src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                />
              </Skeleton>
            </AspectRatio>
          </Card>
        ) : (
          taskList.map((task) => (
            <Card
              className={classnames([
                styles.card,
                (task.taskType === "newTask" || task.taskType === "toEdit") &&
                  styles.unSaved,
              ])}
              key={task}
              orientation="horizontal"
              sx={{
                width: "100%",
                flexWrap: "wrap",
                [`& > *`]: {
                  "--stack-point": "500px",
                  minWidth:
                    "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
                },
                overflow: "auto",
                resize: "horizontal",
              }}
            >
              <AspectRatio
                flex
                ratio="1"
                maxHeight={182}
                sx={{ minWidth: 182 }}
              >
                <img
                  src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-png-transparent.png"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
              <CardContent>
                <div className={styles.form}>
                  <form>
                    <Typography fontSize="xl" fontWeight="lg">
                      {task.taskType === "newTask" ||
                      task.taskType === "toEdit" ? (
                        <FormGroup className={styles.formGroup}>
                          <TextField
                            id="standard-basic"
                            label="Task Name"
                            variant="standard"
                            onChange={(event) =>
                              handleNameChange(event, task.taskType, task.id)
                            }
                            value={
                              task.taskType === "newTask"
                                ? newTask.name
                                : task.name
                            }
                          />
                        </FormGroup>
                      ) : (
                        task.name
                      )}
                    </Typography>
                    <Typography
                      level="body-sm"
                      fontWeight="lg"
                      textColor="text.tertiary"
                    >
                      {task.taskType === "newTask" ||
                      task.taskType === "toEdit" ? (
                        <FormGroup className={styles.formGroup}>
                          <TextField
                            id="standard-basic"
                            label="Description"
                            variant="standard"
                            onChange={(event) =>
                              handleDescriptionChange(
                                event,
                                task.taskType,
                                task.id
                              )
                            }
                            value={
                              task.taskType === "newTask"
                                ? newTask.description
                                : task.description
                            }
                          />
                        </FormGroup>
                      ) : (
                        task.description
                      )}
                    </Typography>
                    <Sheet
                      sx={{
                        bgcolor: "background.level1",
                        borderRadius: "sm",
                        p: 1.5,
                        my: 1.5,
                        display: "flex",
                        gap: 2,
                        "& > div": { flex: 1 },
                      }}
                    >
                      <div className={styles.sliderContainer}>
                        <Slider
                          aria-label="Small steps"
                          getAriaValueText={valueText}
                          marks={getMarks(task.status_id)}
                          defaultValue={0}
                          value={task.status_id.toString()}
                          min={0}
                          max={2}
                          color={getMarks()[task.status_id].color}
                          valueLabelDisplay="off"
                          onChange={(event) =>
                            handleStatusChange(event, task.taskType, task.id)
                          }
                        />
                      </div>
                    </Sheet>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        "& > button": { flex: 1 },
                      }}
                    >
                      {task.taskType === "newTask" ||
                      task.taskType === "toEdit" ? (
                        <Button
                          onClick={handleSave}
                          variant="soft"
                          color="primary"
                          loading={isEditLoading}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleEdit(task.id)}
                          variant="soft"
                          color="primary"
                        >
                          Edit
                        </Button>
                      )}
                      {task.taskType === "newTask" ||
                      task.taskType === "toEdit" ? (
                        <Button
                          onClick={() => handleCancel(task.taskType, task.id)}
                          variant="outlined"
                          color="danger"
                        >
                          Cancel
                        </Button>
                      ) : (
                        <Button onClick={() => handleRemove(task.id)} variant="outlined" color="danger">
                          Remove
                        </Button>
                      )}
                    </Box>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
