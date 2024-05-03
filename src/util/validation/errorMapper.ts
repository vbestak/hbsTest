import { ValidationError } from "class-validator";

export type MappedValidationError = { property: string; constraints?: string[], children?: MappedValidationError[] }

export function mapErrors(errors: ValidationError[], parentProperty = ""): MappedValidationError[] {
  return errors.reduce((mappedErrors, error) => {
    const property = parentProperty ? `${parentProperty}.${error.property}` : error.property;
    const errorObj = {
      property
    };
    if (error.constraints) {
      errorObj["constraints"] = Object.values(error.constraints);
    }
    if (error.children && error.children.length > 0) {
      errorObj["children"] = mapErrors(error.children, property);
    }
    return [...mappedErrors, errorObj];
  }, []);
}