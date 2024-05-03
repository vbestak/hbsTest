export function ifEqHelper(a: unknown, b: unknown, opts) {
  if (a === b) {
    return opts.fn(this);
  } else {
    return opts.inverse(this);
  }
}