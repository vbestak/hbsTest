import { ValidationError } from "class-validator";

export function setErrorClass(errors: ValidationError[], field: string) {
  const fieldParts = field.split(".");

  if (errors && errors.some(error => isFieldError(error, fieldParts))) {
    return "is-invalid";
  } else {
    return "";
  }
}

function isFieldError(error: ValidationError, fieldParts: string[]) {
  let fieldValue = error.target;

  if (fieldValue === undefined) {
    return false;
  }

  for (const part of fieldParts) {
    fieldValue = fieldValue[part];
    if (fieldValue === undefined) {
      return false;
    }
  }

  let res = false;
  if (error.children && Array.isArray(error.children)) {
    res = error.children.some(childError => {
      const fields = fieldParts.slice(1, fieldParts.length);
      const hasError = isFieldError(childError, fields);
      return hasError;
    });
  }

  return res || error.property === fieldParts.join(".");
}