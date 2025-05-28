import {
  addChatCodeData,
  countBackticks,
  extractLanguage,
  getFileExtension,
  getLatestBlacktickIndexForCodeBlock,
  hasNonBackticksOrNewlines,
  removeBackticks,
} from "./commonUtils";

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

export function processTypeLastAIMessage(
  jsonObject,
  getCurrentChatLength,
  getMessages,
  setMessages
) {
  const {
    id: aiMessageDBConversationId,
    parent_message_id: aiMessageParentId,
  } = jsonObject.payload;

  const latestAiMessageIndex = getCurrentChatLength() - 1;
  const messages = getMessages();
  const aiChatMessage = messages[latestAiMessageIndex];

  if (aiChatMessage) {
    aiChatMessage.dbConversationId = aiMessageDBConversationId;
    aiChatMessage.parentId = aiMessageParentId;
    messages[latestAiMessageIndex] = aiChatMessage;
    setMessages(messages);
  }
}

export function processTypeData(
  jsonObject,
  responseData,
  messages,
  setMessages
) {
  const text = jsonObject.payload.content;
  if (text) {
    responseData.answer += text;
    console.log(messages[messages.length - 1].content);

    if (messages) {
      const prevContent = messages[messages.length - 1].content;
      messages[messages.length - 1] = {
        ...messages[messages.length - 1],
        content: prevContent + text,
      };
      setMessages(messages);
      // messages[messages.length - 1].content += text;
    }
  }
}
