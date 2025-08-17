type ErrorTypes = "api" | "ui";
class AppError extends Error {
  message: string;
  type: ErrorTypes;
  constructor(type: ErrorTypes, message: string) {
    super();
    this.type = type;
    this.message = message;
  }
}

const formatErrorMessage = (type: ErrorTypes, message: string) => {
  return `❌${type.toUpperCase()}_ERROR :: ${message}`;
};

const handleError = (err: any) => {
  if (err instanceof AppError) {
    console.error(formatErrorMessage(err.type, err.message));
  } else {
    if (err instanceof Error) {
      const message = err.message;
      console.error(`❌UNKNOWN_ERROR :: ${message}`);
      return;
    }
    console.error(
      `❌UNKNOWN_ERROR :: This is unknown_error. Please contact to admin (lunatics384@gmail.com)`
    );
  }
};

export { AppError, handleError };
