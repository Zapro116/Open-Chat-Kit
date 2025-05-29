export function countBackticks(str) {
  return (str.match(/`/g) || []).length;
}

export function hasNonBackticksOrNewlines(text) {
  // Check if the string contains any character that is not a backtick or newline
  return /[^`\n]/.test(text);
}

export function getLatestBlacktickIndexForCodeBlock(
  content,
  currentBlackTickCount
) {
  if (currentBlackTickCount == 1) {
    return content.lastIndexOf("`");
  } else if (currentBlackTickCount == 2) {
    const index = content.lastIndexOf("``");
    return index >= 0 ? index : -1;
  } else if (currentBlackTickCount == 3) {
    const index = content.lastIndexOf("```");
    return index >= 0 ? index : -1;
  }

  return -1;
}

export function removeBackticks(text, blackTickCount) {
  /*-- Added Special Case for Claude sonnet llm model its stream data contains more than backticks   --*/
  if (blackTickCount) {
    if (blackTickCount <= 3) {
      text = text.replace(/^[^`]*/, "");
    } else if (blackTickCount > 3 && blackTickCount <= 6) {
      text = text.replace(/`[^`]*$/, "");
    }
  }

  return text.replace(/`/g, "");
}

export function extractLanguage(codeBlock) {
  // Match code blocks that start with ```language
  let firstLine = "";
  try {
    firstLine = removeBackticks(codeBlock.trim().split("\n")[0]);
    // Check for special characters using regex
    if (/[!@#$%^&*(),.?":{}|<>]/.test(firstLine)) {
      return "file";
    }
  } catch (e) {
    console.log(e);
  }
  return firstLine.trim();
}

export function getFileExtension(language) {
  const languageMap = {
    typescript: ".ts",
    javascript: ".js",
    python: ".py",
    java: ".java",
    rust: ".rs",
    go: ".go",
    ruby: ".rb",
    php: ".php",
    swift: ".swift",
    kotlin: ".kt",
    css: ".css",
    html: ".html",
    c: ".c",
    cpp: ".cpp",
    csharp: ".cs",
    markdown: ".md",
    json: ".json",
    yaml: ".yml",
    dockerfile: ".dockerfile",
    shell: ".sh",
    sql: ".sql",
    xml: ".xml",
    bash: ".sh",
    jsx: ".js",
    dart: ".dart",
  };

  const normalizedLanguage = language.toLowerCase().trim();
  return languageMap[normalizedLanguage] || ".md";
}

export function addChatCodeData(code, fileName, messageIndex) {
  let codeParts = code.split("\n");

  /*--
    TODO - Still not proper solution to get extenion and add their comment with file name
            Not tested with every language code
  --*/
  const commentSyntax = getCommentSyntax(fileName);
  let fileNamewithCommentSyntax = "";

  if (commentSyntax === "<!--") {
    fileNamewithCommentSyntax = `${commentSyntax} [fileName]=${messageIndex}=${fileName}= -->`;
  } else {
    fileNamewithCommentSyntax = `${commentSyntax} [fileName]=${messageIndex}=${fileName}`;
  }

  codeParts.splice(1, 0, ` ${fileNamewithCommentSyntax} \n`);

  /*-- As first element is language name if after first backtick 
  their is any space between language and backtick code render breaks --*/
  codeParts = fixFirstElement(codeParts);

  let attachmentCode = "\n```" + codeParts.join("\n") + " \n" + "```" + " \n\n";

  return attachmentCode;
}

export function getDisplayTextFromMessage(dbDisplayContent) {
  return dbDisplayContent.split("question_meta:")[0].trim();
}
