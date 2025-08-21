export const removeEmptyValues = ({
  obj,
  excludeValidation = [],
}: {
  obj: Record<string, any>;
  excludeValidation?: Array<
    | "null"
    | "undefined"
    | "empty-string"
    | "empty-object"
    | "empty-string-object"
  >;
}): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => {
      // === Remove undefined
      if (!excludeValidation.includes("undefined") && value === undefined)
        return false;

      // === Remove null
      if (!excludeValidation.includes("null") && value === null) return false;

      // === Remove empty string
      if (!excludeValidation.includes("empty-string") && value === "")
        return false;

      // === Remove empty object {}
      if (
        !excludeValidation.includes("empty-object") &&
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        const entries = Object.entries(value);
        if (entries.length === 0) return false;

        // === Remove object whose values are all empty strings
        if (!excludeValidation.includes("empty-string-object")) {
          const allValuesEmpty = entries.every(([_, v]) => v === "");
          if (allValuesEmpty) return false;
        }
      }

      return true;
    })
  );
};
