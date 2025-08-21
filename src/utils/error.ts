type ErrorTypes = "api" | "ui";

type UIErrorMessages = "INVALID_UI_CONTEXT_SCOPE";
type APIErrorMessages = "CALENDAR_LIST_ERROR";

const getErrorOriginFromStack = (stack: string | undefined) => {
  if (!stack) return null;
  const stackLines = stack.split("\n");
  const origin = stackLines[2]?.trim() ?? "unknown";
  return origin;
};

class AppError<T extends ErrorTypes> extends Error {
  type: ErrorTypes;
  message: string;
  from?: string;
  constructor(
    type: T,
    message: T extends "ui" ? UIErrorMessages : APIErrorMessages,
    from?: string
  ) {
    super();
    this.type = type;
    this.message = message;
    this.from = from ?? getErrorOriginFromStack(this.stack) ?? "unknown";
    const timestamp = new Date().getTime();
    const errorMessage = `❌ Error\n[Time]: ${timestamp}\n[From]: ${this.from}\n[Message]: ${message}`;
    console.error(errorMessage);
  }
}

const formatErrorMessage = (type: ErrorTypes, message: string) => {
  return `❌${type.toUpperCase()}_ERROR :: ${message}`;
};

const handleUnknownError = (err: unknown) => {
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

export { AppError, handleUnknownError };
