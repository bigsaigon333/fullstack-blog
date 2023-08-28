export const getErrorMessage = (error: unknown): string => {
  try {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === "object" && error != null && "message" in error) {
      return (error as { message: string }).message;
    }

    if (typeof error === "string") {
      return error;
    }

    throw new Error("unknown error");
  } catch {
    return "unknown error";
  }
};
