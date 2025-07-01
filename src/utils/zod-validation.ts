/* eslint-disable @typescript-eslint/no-explicit-any */
import { z, ZodError, ZodType } from 'zod';

export async function validate<T extends ZodType>(
  schema: T,
  objectToValidate: any,
): Promise<z.infer<T>> {
  try {
    return await schema.parseAsync(objectToValidate);
  } catch (error) {
    if (error instanceof ZodError) {
      throw { zodError: error.issues };
    }

    return JSON.stringify({ zodError: error });
  }
}

export const formatErrorResponse = (error: any) => {
  return error.reduce((acc: any, error: any) => {
    if (error.path.length > 1) {
      acc[error.path[0]] = {
        ...acc[error.path[0]],
        [error.path[1]]: error.message,
      };
      return acc;
    }

    acc[error.path[0]] = error.message;
    return acc;
  }, {});
};
