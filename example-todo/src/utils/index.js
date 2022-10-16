/**
 * Create a API error handler.
 */
 export function apiErrorHandler(error) {
    console.error(error);
    const errors = {};
    if (error.response && error.response.data && error.response.data.message) {
      errors.common = error.response.data.message;
    } else {
      errors.common = "An unexpected error occurred.";
    }
    return errors;
  }