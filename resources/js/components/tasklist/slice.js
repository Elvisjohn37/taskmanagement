import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskList: [],
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    setTaskList: (state, action) => {
      state.taskList = action.payload?.taskList;
    },
    addTask: (state, action) => {
      state.taskList = [
        {
          ...action.payload?.task,
          status_id: 0,
          id: Math.max(...state.taskList.map((o) => o.id)) + 1,
          isSaved: false,
        },
        ...state.taskList,
      ];
    },
    setTaskStatus: (state, action) => {
      state.taskList = state.taskList.map((task) =>
        task.id == action.payload.id
          ? { ...task, status_id: action.payload.status_id }
          : task
      );
    },
    removeUnsaved: (state, action) => {
      state.taskList = state.taskList.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, taskType: "" };
        } else {
          return task;
        }
      });
    },
    editUnsaved: (state, action) => {
      state.taskList = state.taskList.map((task) => {
        if (task.taskType === "newTask") {
          return {
            ...task,
            name: action.payload.name,
            description: action.payload.description,
          };
        } else {
          return task;
        }
      });
    },
    editTask: (state, action) => {
      state.taskList = state.taskList.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            taskType: "toEdit",
            isSaved: false,
          };
        } else {
          return { ...task, taskType: "" };
        }
      });
    },

    removeNewTask: (state, action) => {
      state.taskList = state.taskList.filter(
        (task) => task.taskType != "newTask"
      );
    },
    resetTaskType: (state, action) => {
      state.taskList = state.taskList.map((task) =>
        task.id === action.payload.id ? { ...task, taskType: "" } : task
      );
    },
    editName: (state, action) => {
      state.taskList = state.taskList.map((task) =>
        task.id === action.payload.id
          ? { ...task, name: action.payload.name }
          : task
      );
    },
    editDescription: (state, action) => {
      state.taskList = state.taskList.map((task) =>
        task.id === action.payload.id
          ? { ...task, description: action.payload.name }
          : task
      );
    },
    removeTaskData: (state, action) => {
      state.taskList = state.taskList.filter(
        (task) => task.id !== action.payload.id
      );
    },
  },
});

const getTaskListState = (state) => state.taskList;

export const {
  setTaskList,
  addTask,
  setTaskStatus,
  removeUnsaved,
  editUnsaved,
  editTask,
  removeNewTask,
  resetTaskType,
  editName,
  editDescription,
  removeTaskData,
} = taskListSlice.actions;

export default taskListSlice.reducer;

export { getTaskListState };
