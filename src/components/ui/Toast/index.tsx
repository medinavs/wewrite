import React from "react";
import {
  toast,
  ToastContainer as ReactToastContainer,
  ToastOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toastStyles.css";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
  message: string;
  type?: ToastType;
  position?:
    | "top-right"
    | "top-left"
    | "top-center"
    | "bottom-right"
    | "bottom-left"
    | "bottom-center";
  autoClose?: number;
}

const defaultToastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export const showToast = ({
  message,
  type = "info",
  position = "bottom-right",
  autoClose = 3000,
}: ToastProps) => {
  const options: ToastOptions = {
    ...defaultToastOptions,
    position: position as any,
    autoClose,
  };

  switch (type) {
    case "success":
      return toast.success(message, options);
    case "error":
      return toast.error(message, options);
    case "warning":
      return toast.warning(message, options);
    case "info":
    default:
      return toast.info(message, options);
  }
};

export const ToastContainer: React.FC = () => {
  return (
    <ReactToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      className="custom-toast-container"
      toastClassName="custom-toast"
    />
  );
};

export default { showToast, ToastContainer };
