import { create } from "zustand";

const useHistoryStore = create((set) => ({
  historyData: [],
  setHistoryData: (historyData) => set({ historyData }),
  selectedHistory: null,
  setSelectedHistory: (selectedHistory) => set({ selectedHistory }),
  historyLoading: false,
  setHistoryLoading: (historyLoading) => set({ historyLoading }),
}));

export default useHistoryStore;
