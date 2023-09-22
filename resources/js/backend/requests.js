import axios from "axios";

export const login = ({
  data = {},
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios.post("/login", data).then(success).catch(error).finally(completed);
};

export const logout = ({
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios.post("/logout").then(success).catch(error).finally(completed);
};

export const register = ({
  data = {},
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios.post("/register", data).then(success).catch(error).finally(completed);
};

export const getTaskList = ({
  data = {},
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios.get("/gettasklist", data).then(success).catch(error).finally(completed);
};

export const getTrashList = ({
  data = {},
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios.get("/gettrashlist", data).then(success).catch(error).finally(completed);
};

export const fetchUserData = ({
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios.get("/fetchuserdata").then(success).catch(error).finally(completed);
};

export const addTask = ({
  data = {},
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios.post("/addtask", data).then(success).catch(error).finally(completed);
};

export const updateTask = ({
  data = {},
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios.post("/updatetask", data).then(success).catch(error).finally(completed);
};

export const removeTask = ({
  data = {},
  success = () => null,
  error = () => null,
  completed = () => null,
}) => {
  axios.post("/movetotrash", data).then(success).catch(error).finally(completed);
};