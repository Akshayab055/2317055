const LOG_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";
const LEVEL_VALUES = ["debug", "info", "warn", "error", "fatal"];
const PACKAGE_VALUES = [
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",
  "auth",
  "config",
  "middleware",
  "utils",
];
function normalize(value) {
  return String(value ?? "").toLowerCase().trim();
}
function isValidLevel(level) {
  return LEVEL_VALUES.includes(normalize(level));
}
function isValidPackage(pkg) {
  return PACKAGE_VALUES.includes(normalize(pkg));
}
export async function Log(level, packageName, message) {
  const normalizedLevel = normalize(level);
  const normalizedPackage = normalize(packageName);
  const normalizedMessage = String(message ?? "").trim();
  const payload = {
    stack: "frontend",
    level: normalizedLevel,
    package: normalizedPackage,
    message: normalizedMessage || "No message provided",
  };
  if (!isValidLevel(payload.level)) {
    console.warn(`Invalid Log Level: "${level}". Allowed: ${LEVEL_VALUES.join(", ")}`);
    return false;
  }
  if (!isValidPackage(payload.package)) {
    console.warn(`Invalid Package: "${packageName}". Allowed: ${PACKAGE_VALUES.join(", ")}`);
    return false;
  }
  try {
    const response = await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMzE3MDU1QG5lYy5lZHUuaW4iLCJleHAiOjE3ODI5NjkxOTAsImlhdCI6MTc4Mjk2ODI5MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjZiNzBjN2M3LWI0NGItNGJhNS1iNDA1LWE3MGYzMWZlYzJmMSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFrc2hheWEgYiIsInN1YiI6IjlmZDEzOGRjLTM0Y2YtNGNmMS05NjY1LTMwYjk0NTJjZDQwNiJ9LCJlbWFpbCI6IjIzMTcwNTVAbmVjLmVkdS5pbiIsIm5hbWUiOiJha3NoYXlhIGIiLCJyb2xsTm8iOiIyMzE3MDU1IiwiYWNjZXNzQ29kZSI6IkVSelV5eCIsImNsaWVudElEIjoiOWZkMTM4ZGMtMzRjZi00Y2YxLTk2NjUtMzBiOTQ1MmNkNDA2IiwiY2xpZW50U2VjcmV0IjoiR3pZelBISmtqS2hyZ2tORyJ9.vWlzRHvEX3EAMbGlw3MZa0DLKVBUpIfTLQrO4LhQuM8"
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Logging Failed: ${response.status} ${response.statusText}`);
      return false;
    }

    const data = await response.json();
    console.log("Log Sent Successfully:", data);
    return true;
  } catch (error) {
    console.error("Network Error - Failed to send log:", error.message);
    return false;
  }
}
export function LogSync(level, packageName, message) {
  const normalizedLevel = normalize(level);
  const normalizedPackage = normalize(packageName);

  if (!isValidLevel(normalizedLevel) || !isValidPackage(normalizedPackage)) {
    console.warn("Invalid Log (Sync):", { level, packageName, message });
    return false;
  }

  console.log(`[${normalizedLevel.toUpperCase()}] [${normalizedPackage}] ${message}`);
  return true;
}