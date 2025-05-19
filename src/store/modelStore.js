import { create } from "zustand";

const useModelStore = create((set) => ({
  selectedModel: "gpt-4o",
  setSelectedModel: (model) => set({ selectedModel: model }),
}));

export default useModelStore;
