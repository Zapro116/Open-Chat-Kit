import { chatASKApi } from "../api/websiteApi";
import useChatStore from "../store/chatStore";
import useModelStore from "../store/modelStore";
import {
  ASSISTANT_ROLE,
  CHAT_ROUTE,
  DEFAULT_MODEL_SLUG_NAME,
  DEFAULT_PRODUCT_NAME,
  USER_ROLE,
} from "../utils/contants";
import { extractJsonObjectsFromStreamUtil } from "../Utils/StreamUtils";

const handleSendMessage = async (message, attachments, token, navigate) => {
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

  console.log(message);
  console.log(promptText);

  if (promptText !== message) {
    setPromptText(message);
  }

  const latestMessageId = messages?.length ? messages?.length + 1 : 1;
  const userMessage = {
    id: latestMessageId,
    content: message,
    dbConversationId: null,
    parentId: null,
    commands: null,
    //isStreaming:false,
    lastIndex: null,
    role: USER_ROLE,
  };

  // appendMessage(userMessage);
  const exisitingMessages = messages;
  exisitingMessages.push(userMessage);
  setMessages(exisitingMessages);
  console.log(messages);

  try {
    const requestBody = await createRequestBody(
      messages,
      currentThreadId,
      false,
      selectedModel,
      ""
    );
    console.log(requestBody);
    const { controller } = useChatStore.getState();

    const response = await chatASKApi(token, requestBody, controller);
    console.log(response.status);

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
      console.log(chunk);

      await populateResponseFromStream(chunk, responseData, navigate);
    }
  } catch (e) {
    console.log(e);
  }
};

export async function populateResponseFromStream(
  lines,
  responseData,
  navigate
) {
  const parsedJsonArray = extractJsonObjectsFromStreamUtil(lines);
  const { setCurrentThreadId, currentThreadId } = useChatStore.getState();
  for (const jsonObject of parsedJsonArray) {
    // Handle thread UUID
    if (jsonObject?.type === "thread_uuid" && jsonObject?.payload?.content) {
      const threadIdFromStream = jsonObject?.payload?.content;
      if (threadIdFromStream !== currentThreadId) {
        setCurrentThreadId(jsonObject?.payload?.content);
        console.log(jsonObject);
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
      //   const params = {
      //     getCurrentChatLength,
      //     getMessages,
      //     jsonObject,
      //     setMessages,
      //   };
      //   processTypeLastUserMessage(params);
    }

    // Handle error messages
    if (jsonObject?.type === "error") {
      //   const params = {
      //     getMessages,
      //     setIsRunning,
      //     setMessages,
      //     responseData,
      //     jsonObject,
      //   };
      //   processTypeError(params);
    }

    // Handle last AI message
    if (jsonObject?.type === "last_ai_message" && jsonObject?.payload) {
      //   const params = {
      //     getCurrentChatLength,
      //     getMessages,
      //     jsonObject,
      //     setMessages,
      //   };
      //   processTypeLastAIMessage(params);
      // }
      // // Handle data content
      // if (jsonObject?.type === "data" && jsonObject?.payload?.content) {
      //   const params = {
      //     getCurrentActiveFileNameInCanvas,
      //     getCurrentChatLength,
      //     getDisplayLanguage,
      //     getMessages,
      //     getOpenedFilesInCanvas,
      //     jsonObject,
      //     responseData,
      //     setCodeContent,
      //     setCurrentActiveFileNameInCanvas,
      //     setCurrentMermaidCodeData,
      //     setDisplayCanvasPanel,
      //     setDisplayLanguage,
      //     setMessages,
      //     setOpenedFilesInCanvas,
      //     updateAssistantContent,
      //   };
      //   processTypeData(params);
    }

    // Handle error_code = MODEL_REQUEST_LIMIT_REACHED
    if (jsonObject?.error_code === "MODEL_REQUEST_LIMIT_REACHED") {
      const params = {
        getMessages,
        setIsRunning,
        setMessages,
        responseData,
        jsonObject,
      };

      //   processTypeError(params);
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
  const { selectedModel } = useModelStore.getState();
  const { promptText, setPromptText, webSearchEnabled, getFiles } =
    useChatStore.getState();

  const uploadedImages = getFiles();

  const messageIndex =
    messages.length > 1 ? messages.length - 2 : messages.length - 1;

  let latestUserMessage = messages[messageIndex];
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === USER_ROLE) {
      latestUserMessage = messages[i];
      break;
    }
  }
  const prompt = latestUserMessage.content;

  let messagesArray = [];

  let uploadedImagesBase64 = [];

  if (uploadedImages.length == 0) {
    const latestUserMessage = messages[messages.length - 1];

    uploadedImagesBase64 = latestUserMessage?.images || [];
  } else {
    uploadedImagesBase64 = await convertFilesToBase64(uploadedImages || []);
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
    requested_by: email !== "" ? email : "shubhamamande@gofynd.com",
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

export const convertFilesToBase64 = async (files) => {
  return Promise.all(
    files.map((file) => {
      return (
        new Promise() <
        string >
        ((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
      );
    })
  );
};

function getMessageTextContent(chatMessage) {
  return chatMessage?.content ? chatMessage?.content : "";
}

export { handleSendMessage };
