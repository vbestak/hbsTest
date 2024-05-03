import { MappedValidationError } from "../validation/errorMapper";


export function getFieldErrorsHelper(errors: MappedValidationError[] | undefined, propertyKey: string): string[] {
  if(!errors?.length) return [];

  for (const error of errors) {
    const constraints = getConstraintsForPropertyRecursively(error, propertyKey);
    if (constraints) {
      return constraints;
    }
  }

  return [];
}

function getConstraintsForPropertyRecursively(error: MappedValidationError, propertyKey: string): string[] {
  if (error.property === propertyKey) {
    if (error.constraints) {
      return error.constraints;
    }
  }

  if (error.children) {
    for (const childError of error.children) {
      const constraints = getConstraintsForPropertyRecursively(childError, propertyKey);
      if (constraints) {
        return constraints;
      }
    }
  }
}