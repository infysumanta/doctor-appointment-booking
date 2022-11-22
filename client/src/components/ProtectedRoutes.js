import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { hideLoading, showLoading } from "../redux/alertsSlice";

const ProtectedRoutes = (props) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchData = async () => {
    dispatch(showLoading());
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
        console.log(user);
      } else {
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      fetchData();
    }
  }, [user]);

  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
