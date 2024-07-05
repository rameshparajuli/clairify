export function prepareObject(value?: unknown): string {
  if (value === null || value === undefined) {
    return "";
  }

  return typeof value === "string" ? `\"${value}\"` : JSON.stringify(value);
}
