/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "CLEAR":
      return null;
    default:
      return state;
  }
};

export const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

// Custom hooks for accessing context easily
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

export default NotificationContext;