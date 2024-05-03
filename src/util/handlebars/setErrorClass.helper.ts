import { getFieldErrorsHelper } from "./getFieldErrors.helper";
import { MappedValidationError } from "../validation/errorMapper";

export function setErrorClassHelper(errors: MappedValidationError[] | undefined, field: string) {
  if(!errors?.length) return "";

  if (errors && getFieldErrorsHelper(errors, field).length) {
    return "is-invalid";
  } else {
    return "";
  }
}