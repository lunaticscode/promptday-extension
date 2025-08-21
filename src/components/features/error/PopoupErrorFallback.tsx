import { AppError } from "@/utils/error";
import { FC } from "react";
import { FallbackProps } from "react-error-boundary";

const PopupErrorFallback: FC<FallbackProps> = ({ error }) => {
  if (error instanceof AppError) {
    const { type, message } = error;
    return (
      <>
        <h3>{type} error</h3>
        <div>{message}</div>
      </>
    );
  }
  const errorMessage = error.message || "unknown error";
  return <div>{errorMessage}</div>;
};
export default PopupErrorFallback;
