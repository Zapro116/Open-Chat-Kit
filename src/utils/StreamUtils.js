export function extractJsonObjectsFromStreamUtil(stream) {
  const jsonObjects = [];
  let hasCountStarted = false;
  let bracketCount = 0;
  let startIndex = -1;
  let inString = false;

  for (let i = 0; i < stream.length; i++) {
    const char = stream.charAt(i);
    const prevChar = i > 0 ? stream.charAt(i - 1) : null;

    if (char === '"' && prevChar !== "\\") {
      inString = !inString; // Toggle string mode
    }

    if (!inString) {
      if (char === "{") {
        bracketCount++;
        hasCountStarted = true;
        if (startIndex === -1) {
          startIndex = i;
        }
      } else if (char === "}") {
        bracketCount--;
      }
    }

    if (hasCountStarted && bracketCount === 0) {
      const jsonString = stream.substring(startIndex, i + 1);

      try {
        jsonObjects.push(JSON.parse(jsonString));
      } catch (error) {
        console.error("Invalid JSON detected:", jsonString);
      }
      hasCountStarted = false;
      startIndex = -1; // Reset for next JSON object
    }
  }

  return jsonObjects;
}
