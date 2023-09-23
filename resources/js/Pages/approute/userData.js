import { fetchUserData } from "../../backend/requests";
import { useDispatch } from "react-redux";
import { setUserStatus } from "../login/slice";
import { setLoading } from "../approute/slice.js";

export const refreshUserData = () => {
  const dispatch = useDispatch();

  fetchUserData({
    success: (response) => {
      dispatch(setUserStatus(response.data));
      dispatch(setLoading({ isLoading: false }));
    },
  });
};
