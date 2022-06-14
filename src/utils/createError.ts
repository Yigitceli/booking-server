import { newError } from "../../types";

const createError = (
  name: string | undefined,
  stack: string | undefined,
  message: string = "Something went wrong!",
  status: number = 500
) => {
  const error = new Error(message) as newError;
  if (name) {
    error.name = name;
  }
  if (stack) {
    error.stack = stack;
  }
  error.status = status;
  return error;
};

export default createError
