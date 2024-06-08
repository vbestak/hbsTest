import { concatHelper } from "./concat.helper";
import { lookupHelper } from "./lookup.helper";
import { ifEqHelper } from "./ifEq.helper";
import { setErrorClassHelper } from "./setErrorClass.helper";
import { getFieldErrorsHelper } from "./getFieldErrors.helper";
import { formatDateHelper } from "./formatDate.helper";

export const handlebarsHelpers = {
  getFieldErrors: getFieldErrorsHelper,
  setErrorClass: setErrorClassHelper,
  if_eq: ifEqHelper,
  concat: concatHelper,
  lookup: lookupHelper,
  formatDate: formatDateHelper
};