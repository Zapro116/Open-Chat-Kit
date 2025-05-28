import { create } from "zustand";

const useChatStore = create((set) => ({
  message: "",
  setMessage: (message) => set({ message }),
  webSearchEnabled: false,
  setWebSearchEnabled: (webSearchEnabled) => set({ webSearchEnabled }),
  context: null,
  setContext: (context) => set({ context: context }),
  files: [],
  setFiles: (files) => set({ files }),
}));

export default useChatStore;
