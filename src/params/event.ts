import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
  // Check if parameter is a date in YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (dateRegex.test(param)) {
    // Additional validation to ensure it's a valid date
    const date = new Date(param);
    return (
      date instanceof Date &&
      !Number.isNaN(date.getTime()) &&
      date.toISOString().slice(0, 10) === param
    );
  }

  // Check if parameter is a number
  const numberRegex = /^\d+$/;
  return numberRegex.test(param);
};
