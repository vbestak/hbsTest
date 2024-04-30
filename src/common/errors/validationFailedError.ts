import { ValidationError } from "class-validator";

export class ValidationFailedError extends Error {
  validationErrors: ValidationError[];
  target: any;

  constructor(validationErrors) {
    super();
    this.validationErrors = validationErrors;
    this.target = validationErrors[0].target
  }
}