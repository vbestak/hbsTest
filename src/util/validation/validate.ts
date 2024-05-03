import { mapErrors, MappedValidationError } from "./errorMapper";
import { validate as objectValidate } from "class-validator";

export async function validate(objectToValidate: object): Promise<MappedValidationError[] | void> {
  const errors = await objectValidate(objectToValidate, { whitelist: true, forbidNonWhitelisted: true });

   if (errors?.length > 0) {
    return mapErrors(errors);
  }
}
