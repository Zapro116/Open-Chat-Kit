import { create } from "zustand";

const useModalStore = create((set) => ({
  modals: {
    contextModal: false,
    addKnowledgeModal: false,
    addProjectModal: false,
    multiSelectKnowledgeModal: false,
    shareKnowledgeBaseModal: false,
    deleteKnowledgeBaseModal: false,
    addProjectMemberModal: false,
  },
  showExistingKbInContextModal: false,

  // Action to set the showExistingKbInContextModal state
  setShowExistingKbInContextModal: (value) =>
    set(() => ({ showExistingKbInContextModal: value })),

  // Open a specific modal
  openModal: (modalName) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalName]: true,
      },
    })),

  // Close a specific modal
  closeModal: (modalName) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalName]: false,
      },
    })),

  // Close all modals
  closeAllModals: () =>
    set((state) => ({
      modals: Object.keys(state.modals).reduce(
        (acc, key) => ({ ...acc, [key]: false }),
        {}
      ),
    })),
}));

export default useModalStore;
