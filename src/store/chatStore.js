import { create } from "zustand";

const useChatStore = create((set, get) => ({
  messages: [],
  webSearchEnabled: false,
  context: null,
  files: [],
  promptText: "",
  currentThreadId: null,
  isRunning: false,
  controller: null,

  setMessages: (messages) => set({ messages }),
  getMessages: () => {
    return get().messages;
  },
  appendMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setPromptText: (text) => set({ promptText: text }),
  getPromptText: () => {
    return get().promptText;
  },

  setWebSearchEnabled: (webSearchEnabled) => set({ webSearchEnabled }),

  setContext: (context) => set({ context: context }),

  setFiles: (files) => set({ files }),
  getFiles: () => {
    return get().files;
  },

  getCurrentThreadId: () => {
    return get().currentThreadId;
  },
  setCurrentThreadId: (value) => {
    set({ currentThreadId: value });
  },

  setController: (controller) => {
    set({ controller });
  },
  getController: () => {
    return get().controller;
  },

  setInitialState: () => {
    set({
      messages: [],
      promptText: "",
      files: [],
      isRunning: false,
      controller: null,
      currentThreadId: null,
    });
  },
}));

export default useChatStore;
