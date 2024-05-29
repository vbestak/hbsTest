import { isRecord } from "../validation/isRecord";

export function lookupHelper(obj: unknown, ...rest: unknown[]): string | unknown {
  if(!obj) return undefined;
  if(!isRecord(obj)) return "Argument is not a Record";

  let res: unknown = {...(obj as Record<string, unknown>)};

  const lastIndex = rest.length - 1;
  rest.slice(0, lastIndex).forEach(item => {
    if(!(typeof item === 'string' || typeof item === 'number')) return undefined;
    res = __getObjectField(res, item);
  })

  return res;
}

function __getObjectField(obj: unknown, field: string | number): unknown {
  if(!isRecord(obj) && !Array.isArray(obj)) return undefined;
  return obj[field];
}