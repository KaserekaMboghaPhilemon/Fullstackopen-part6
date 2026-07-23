import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext);
  return notification;
};

export const useNotificationDispatch = () => {
  const [, dispatch] = useContext(NotificationContext);
  return dispatch;
};

export const useNotify = () => {
  const dispatch = useNotificationDispatch();

  return (message, seconds = 5) => {
    dispatch({ type: "SET", payload: message });
    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, seconds * 1000);
  };
};
