import { ValidationError } from "class-validator";

export function getFieldErrorsHelper(errors: ValidationError[], field: string): string[] {
  const fieldErrors: string[] = [];

  if (!errors) return fieldErrors;

  errors.forEach(error => {
    let fieldValue = error.target;
    const fieldParts = field.split(".");

    for (const part of fieldParts) {
      fieldValue = fieldValue[part];
      if (fieldValue === undefined) {
        break;
      }
    }

    if (fieldValue !== undefined && error.property === field) {
      const errorMessages = Object.values(error.constraints || {});
      fieldErrors.push(...errorMessages);
    } else if (error.children && Array.isArray(error.children)) {
      error.children.forEach(childError => {
        const fields = fieldParts.slice(1, fieldParts.length).join(".");
        const nestedErrors = getFieldErrorsHelper([childError], fields);
        fieldErrors.push(...nestedErrors);
      });
    }
  });

  return fieldErrors;
}