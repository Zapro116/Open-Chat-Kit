import { chatASKApi } from "../api/websiteApi";
import useChatStore from "../store/chatStore";
import useModelStore from "../store/modelStore";
import { getDisplayTextFromMessage } from "../utils/commonUtils";
import {
  ASSISTANT_ROLE,
  CHAT_ROUTE,
  DEFAULT_MODEL_SLUG_NAME,
  DEFAULT_PRODUCT_NAME,
  USER_ROLE,
} from "../utils/contants";
import {
  convertFilesToBase64,
  extractJsonObjectsFromStreamUtil,
  processTypeData,
  processTypeError,
  processTypeLastAIMessage,
  processTypeLastUserMessage,
} from "../utils/StreamUtils";

const handleSendMessage = async (
  message,
  attachments,
  token,
  navigate,
  email
) => {
  const { selectedModel } = useModelStore.getState();
  const {
    messages,
    promptText,
    setPromptText,
    appendMessage,
    currentThreadId,
    setMessages,
    setController,
  } = useChatStore.getState();
  setController(new AbortController());

  // if (promptText !== message) {
  //   setPromptText(message);
  // }
  setPromptText("");

  const userMessageAttachment = {
    images: [],
    pdf: [],
    files: [],
  };

  for (const attachment of attachments) {
    if (attachment.type.indexOf("image") !== -1) {
      userMessageAttachment.images.push(attachment);
    }
  }

  const userMessage = {
    id: Math.floor((new Date().getMilliseconds() + Math.random()) * 100000),
    content: message,
    dbConversationId: null,
    parentId: null,
    commands: null,
    isStreaming: false,
    lastIndex: null,
    role: USER_ROLE,
    attachments: userMessageAttachment,
  };

  const assistantMessage = {
    id: Math.floor((new Date().getMilliseconds() + Math.random()) * 100000),
    content: "",
    dbConversationId: null,
    parentId: null,
    commands: null,
    isStreaming: false,
    lastIndex: null,
    role: ASSISTANT_ROLE,
  };

  let exisitingMessages = messages;
  exisitingMessages.push(userMessage);
  const requestBody = await createRequestBody(
    exisitingMessages,
    currentThreadId,
    false,
    selectedModel,
    email
  );

  exisitingMessages.push(assistantMessage);
  setMessages(exisitingMessages);

  try {
    const { controller } = useChatStore.getState();

    const response = await chatASKApi(token, requestBody, controller);

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    const responseData = {
      answer: "",
      backTickCount: 0,
      streamCodeContent: "",
      codeContentArray: [],
      latestBlackTickIndex: -1,
      currentCodefileName: "",
      fileIndex: 1,
      isCurrentCodeFileNameSet: false,
      isLanguageDefinitionRemoved: false,
    };

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      // console.log(chunk);

      await populateResponseFromStream(
        chunk,
        responseData,
        navigate,
        messages,
        setMessages
      );
    }
  } catch (e) {
    console.log(e);
  }
};

export async function populateResponseFromStream(
  lines,
  responseData,
  navigate,
  messages,
  setMessages
) {
  const parsedJsonArray = extractJsonObjectsFromStreamUtil(lines);
  const { setCurrentThreadId, currentThreadId } = useChatStore.getState();
  for (const jsonObject of parsedJsonArray) {
    // console.log(jsonObject);

    // Handle thread UUID
    if (jsonObject?.type === "thread_uuid" && jsonObject?.payload?.content) {
      const threadIdFromStream = jsonObject?.payload?.content;
      if (threadIdFromStream !== currentThreadId) {
        setCurrentThreadId(jsonObject?.payload?.content);

        navigate(`/${CHAT_ROUTE}/${jsonObject?.payload?.content}`, {
          replace: true,
        });
      }
    }

    // Handle last user message ID
    if (
      jsonObject?.type === "last_user_message_id" &&
      jsonObject?.payload?.content
    ) {
      processTypeLastUserMessage(
        jsonObject,
        responseData,
        messages,
        setMessages
      );
    }

    // Handle error messages
    if (jsonObject?.type === "error") {
      processTypeError(jsonObject, responseData, messages, setMessages);
    }

    // Handle last AI message
    if (jsonObject?.type === "last_ai_message_id" && jsonObject?.payload) {
      // // Handle data content
      processTypeLastAIMessage(jsonObject, responseData, messages, setMessages);
    }
    if (jsonObject?.type === "data" && jsonObject?.payload?.content) {
      processTypeData(jsonObject, responseData, messages, setMessages);
    }

    // Handle error_code = MODEL_REQUEST_LIMIT_REACHED
    if (jsonObject?.error_code === "MODEL_REQUEST_LIMIT_REACHED") {
      processTypeError(jsonObject, responseData, messages, setMessages);
    }
  }
}

async function createRequestBody(
  messages,
  currentThreadUUID,
  isRegeneratedMessage,
  modelName,
  email
) {
  console.log(messages.length);

  const { selectedModel } = useModelStore.getState();
  const { webSearchEnabled, getFiles } = useChatStore.getState();
  let messagesArray = [];
  let uploadedImagesBase64 = [];

  const messageIndex = messages.length - 1;

  let latestUserMessage = messages[messageIndex];
  const prompt = latestUserMessage.content;

  if (latestUserMessage.attachments.images.length > 0) {
    uploadedImagesBase64 = await convertFilesToBase64(
      latestUserMessage.attachments.images || []
    );
  }

  for (let i = 0; i < messages.length; i++) {
    const chatMessage = messages[i];
    const textContent = getMessageTextContent(chatMessage);

    let mObj = {
      id: messages[i].dbConversationId, // db id
      role: messages[i].role,
      content: `${textContent}\n\n question_meta:${JSON.stringify({
        references: {
          web: false,
          jira: {},
          selectedCode: messages[i].codeContent || "",
          replyingToCode: "",
          replyingToPara: "",
          query: textContent,
          questionDOM: textContent,
          code:
            messages[i].role === ASSISTANT_ROLE ? messages[i].codeDetails : "",
        },
        ...(messages[i].role === USER_ROLE && { images: messages[i].images }),
      })}`,
      displayText:
        messages[i].displayText !== undefined ? messages[i].displayText : "",
      conversationId: currentThreadUUID !== null ? currentThreadUUID : "",
      parentId:
        messages[i].parentId !== undefined ? messages[i].parentId : null, // previous chat db id
      firstMessage: i === 0, // Use === for comparison
    };

    // Add displayText only for user messages
    if (messages[i].role === USER_ROLE) {
      mObj = {
        ...mObj,
        displayText: `\n ${textContent}`,
      };
    }

    messagesArray.push(mObj);
  }

  return {
    action_id: 1,
    requested_by: email,
    product: DEFAULT_PRODUCT_NAME,
    data: {
      messages: messagesArray,
    },
    model:
      modelName !== null
        ? modelName
        : selectedModel?.slug ?? DEFAULT_MODEL_SLUG_NAME,
    stream: true,
    metadata: {
      reply: false,
      selectedText: "",
      references: {
        web: webSearchEnabled,
        selectedCode:
          messages[messages.length - 1].codeContent != ""
            ? messages[messages.length - 1].codeContent
            : "",
        replyingToCode: "",
        replyingToPara: "",
        // kb_ids: useKnowledgeSourceStore.getState().sendKnowledgeDetails?.kb_id
        //   ? [
        //       Number(
        //         useKnowledgeSourceStore.getState().sendKnowledgeDetails?.kb_id
        //       ),
        //     ]
        //   : "",
        query: prompt,
        questionDOM: prompt,
        // ...(messages[0].commands && {
        //   commands: [
        //     {
        //       command: messages[0].commands,
        //     },
        //   ],
        // }),
      },
      images: uploadedImagesBase64,
      additional_rules: "",
      // surface: DEFAULT_SURFACE,
    },
    regenerate: isRegeneratedMessage,
  };
}

function populateChatWithThreadMessage(threadMessages) {
  const { setMessages } = useChatStore.getState();
  const messageArray = [];
  let messageIndex = 1;
  for (let i = 0; i < threadMessages.length; i++) {
    const displayText = getDisplayTextFromMessage(
      threadMessages[i].display_text
    );
    const message = {
      id: messageIndex,
      content: displayText,
      dbConversationId: threadMessages[i].id,
      parentId: threadMessages[i].parent_message_id,
      role: threadMessages[i].role,
      lastIndex: null,
      isStreaming: false,
      commands: null,
    };

    messageArray.push(message);
    messageIndex++;
  }
  setMessages(messageArray);
}

function clearCurrentChatData() {
  const { setInitialState } = useChatStore.getState();
  try {
    setInitialState();
  } catch (e) {
    console.log(e);
  }
}
function getMessageTextContent(chatMessage) {
  return chatMessage?.content ? chatMessage?.content : "";
}

export {
  handleSendMessage,
  clearCurrentChatData,
  populateChatWithThreadMessage,
};
