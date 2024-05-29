export function concatHelper(...args: any[]) {
  const lastIndex = args.length - 1;
  return args.slice(0, lastIndex).join("");
}