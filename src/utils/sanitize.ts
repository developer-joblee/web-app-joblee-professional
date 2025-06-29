/* eslint-disable @typescript-eslint/no-explicit-any */
export const sanitize = (data: any) =>
  JSON.parse(
    JSON.stringify(data, (_, value) => (value === '' ? undefined : value)),
  );

export const sanitizeWithNull = (data: any) =>
  JSON.parse(
    JSON.stringify(data, (_, value) =>
      value === '' || value === null ? undefined : value,
    ),
  );
