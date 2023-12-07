import React, { useEffect, useState } from "react";
import styles from "./TrashList.module.scss";
import { Alert } from "@mui/joy";
import Typography from "@mui/material/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Sheet from "@mui/joy/Sheet";
import Slider from "@mui/joy/Slider";
import classnames from "classnames";
import Chip from "@mui/joy/Chip";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import TaskListSkeleton from "./TaskListSkeleton.jsx";
import {
  setTaskList,
  getTaskListState,
  setTaskStatus,
  removeUnsaved,
  removeNewTask,
  editName,
  editDescription,
} from "./tasklist/slice";
import {
  getTrashList,
} from "../backend/requests.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const TrashList = () => {
  // const [tasks, setTasks] = useState([]);
  const [hasError, setHasError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const { taskList } = useSelector(getTaskListState);
  const [newTask, setNewTask] = useState({});
  const [isEditLoading, setIsEditLoading] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    getTrashList({
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

  return (
    <div className={styles.taskList}>
      <div className={styles.title}>
        <Typography variant="h3" component="h4">
          Trash List
        </Typography>
      </div>
      {hasError && <Alert variant="soft" color="danger"></Alert>}
      <div className={styles.tasksContainer}>
        {isFetching ? (
          <TaskListSkeleton count={2} />
        ) : taskList.length === 0 ? (
          <div className={styles.warningMessage}>
            <Alert size="lg" color="primary" variant="soft">
              No task to be deleted.
            </Alert>
            <FontAwesomeIcon
              className={styles.listIcon}
              icon={faList}
              size="lg"
            />
          </div>
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

export default TrashList;
