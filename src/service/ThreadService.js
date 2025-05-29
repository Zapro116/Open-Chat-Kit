import { fetchThreadMessagesApi } from "../api/websiteApi";

const fetchThreadMessages = async (token, chatId) => {
  if (!token || !chatId) {
    return;
  }

  try {
    const response = await fetchThreadMessagesApi(token, chatId);
    if (response.data.data.thread_messages) {
      const threadMessages = response.data.data.thread_messages;
      return threadMessages;
    }
  } catch (e) {
    console.log(e);
  }
};

export { fetchThreadMessages };
