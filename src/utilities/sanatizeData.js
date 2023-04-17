import { stripHtml } from "string-strip-html";

function sanitizeObjectValues(obj) {
  const sanitizedObj = {};
  for (const [key, value] of Object.entries(obj)) {
    sanitizedObj[key] =
      typeof value === "string" ? stripHtml(value).result : value;
  }
  return sanitizedObj;
}

export default sanitizeObjectValues;
