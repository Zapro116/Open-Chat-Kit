import { create } from "zustand";

const useKnowledgeBaseStore = create((set) => ({
  // Knowledge base form data
  knowledgeBaseName: "",
  description: "",
  content: "",
  files: [],
  // Form state
  isSubmitting: false,
  error: null,

  // Provider configuration
  selectedProvider: null,
  providerConfigs: {
    quip: {
      cloneUrl: "",
      personalAccessToken: "",
    },
  },

  // Provider actions
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
  setProviderConfig: (provider, config) =>
    set((state) => ({
      providerConfigs: {
        ...state.providerConfigs,
        [provider]: {
          ...state.providerConfigs[provider],
          ...config,
        },
      },
    })),
  resetProviderConfig: (provider) =>
    set((state) => ({
      providerConfigs: {
        ...state.providerConfigs,
        [provider]: {
          cloneUrl: "",
          personalAccessToken: "",
        },
      },
    })),

  // Actions
  setKnowledgeBaseName: (name) => set({ knowledgeBaseName: name }),
  setDescription: (description) => set({ description }),
  setContent: (content) => set({ content }),
  setFiles: (files) => set({ files }),
  setSelectedModel: (model) => set({ selectedModel: model }),

  addFile: (file) =>
    set((state) => ({
      files: [...state.files, file],
    })),

  removeFile: (fileId) =>
    set((state) => ({
      files: state.files.filter((file) => file.id !== fileId),
    })),

  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setError: (error) => set({ error }),

  // Reset form
  resetForm: () =>
    set({
      knowledgeBaseName: "",
      description: "",
      content: "",
      files: [],
      selectedModel: "gpt-4",
      selectedProvider: null,
      providerConfigs: {
        azure_devops: {
          cloneUrl: "",
          branch: "",
          personalAccessToken: "",
        },
        github: {
          cloneUrl: "",
          branch: "",
          personalAccessToken: "",
        },
        gitlab: {
          cloneUrl: "",
          branch: "",
          personalAccessToken: "",
        },
        quip: {
          cloneUrl: "",
          branch: "",
          personalAccessToken: "",
        },
        google_docs: {
          cloneUrl: "",
          branch: "",
          personalAccessToken: "",
        },
      },
      isSubmitting: false,
      error: null,
    }),
}));

const providers = [
  { value: "azure_devops", label: "Azure DevOps" },
  { value: "github", label: "GitHub" },
  { value: "gitlab", label: "GitLab" },
  { value: "quip", label: "Quip" },
  { value: "google_docs", label: "Google Docs" },
];

export default useKnowledgeBaseStore;
