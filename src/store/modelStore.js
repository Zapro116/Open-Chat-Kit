import { create } from "zustand";

const useModelStore = create((set) => ({
  selectedModel: "",
  setSelectedModel: (model) => set({ selectedModel: model }),
  models: [],
  setModels: (models) => set({ models }),
}));

export default useModelStore;
