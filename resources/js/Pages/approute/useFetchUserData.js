import { useEffect, useState } from "react";
import { fetchUserData } from "../../backend/requests";
import { useDispatch } from "react-redux";
import { setUserStatus } from "../login/slice";
import { setLoading } from "../approute/slice.js";

const useFetchUserData = async () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  await useEffect(() => {
    fetchUserData({
      success: (response) => {
        dispatch(setUserStatus(response.data));
        dispatch(setLoading({ isLoading: false }));
      },
      error: () => null,
    });
  }, []);

  return [user, setUser];
};

export default useFetchUserData;
