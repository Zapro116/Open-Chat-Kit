import { DEFAULT_LIMIT_TOKEN_STATUS_CODE } from "./contants";

export function processTypeError(
  jsonObject,
  responseData,
  messages,
  setMessages
) {
  const lastMessage = messages[messages.length - 1];

  if (lastMessage) {
    if (jsonObject?.status_code === DEFAULT_LIMIT_TOKEN_STATUS_CODE) {
      lastMessage.content = jsonObject?.message;
    } else {
      lastMessage.content = jsonObject?.payload?.content;
    }
    messages[messages.length - 1] = lastMessage;
  }

  setMessages(messages);
  // setIsRunning(false);
}

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

export function processTypeData(
  jsonObject,
  responseData,
  messages,
  setMessages
) {
  const text = jsonObject.payload.content;
  if (text) {
    responseData.answer += text;
    //console.log(messages[messages.length - 1].content);

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

export function processTypeLastUserMessage(
  jsonObject,
  responseData,
  messages,
  setMessages
) {
  const latestUserMessageIndex = messages.length - 2;

  if (latestUserMessageIndex >= 0) {
    const currentMessages = messages;
    const userMessage = currentMessages[latestUserMessageIndex];
    userMessage.dbConversationId = parseInt(jsonObject.payload.content);
    currentMessages[latestUserMessageIndex] = userMessage;
    setMessages(currentMessages);
  }
}

export function processTypeLastAIMessage(
  jsonObject,
  responseData,
  messages,
  setMessages
) {
  const latestAiMessageIndex = messages.length - 1;

  const aiChatMessage = messages[latestAiMessageIndex];
  const userChatMessage = messages[latestAiMessageIndex - 1];

  if (aiChatMessage) {
    aiChatMessage.dbConversationId = jsonObject.payload.content;
    aiChatMessage.parentId = userChatMessage.dbConversationId;
    messages[latestAiMessageIndex] = aiChatMessage;
    setMessages(messages);
  }
}

export const convertFilesToBase64 = async (files) => {
  return Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    })
  );
};
