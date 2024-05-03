import { ValidationError } from "class-validator";
import { mapErrors, MappedValidationError } from "../../util/validation/errorMapper";

export class ValidationFailedError extends Error {
  validationErrors: MappedValidationError[];
  target: any;

  constructor(validationErrors) {
    super();
    this.validationErrors = mapErrors(validationErrors);
    this.target = validationErrors[0].target
  }
}