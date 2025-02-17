// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateError = (error: any) => {
  if (error && error.data) {
    return error.data.errors;
  }
  if (error?.errors) {
    return error.errors;
  }
  return 'Something went wrong';
};
