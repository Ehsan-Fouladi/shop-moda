/** Shape of `searchParams` delivered to App Router pages. */
export type SearchParamsRecord = Record<string, string | string[] | undefined>;

/** First value of a (possibly repeated) query parameter. */
export function firstParam(
  value: string | string[] | undefined,
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function toURLSearchParams(record: SearchParamsRecord): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(record)) {
    const v = firstParam(value);
    if (v !== undefined) params.set(key, v);
  }
  return params;
}
