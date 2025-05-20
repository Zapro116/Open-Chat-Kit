import React, { useMemo } from "react";
import Input from "../components/Input/Input"; // Assuming Input.jsx is in src/components/Input/
import { IconPhoto, IconWorld, IconBook } from "@tabler/icons-react";
import Navbar from "../components/Navbar/Navbar";
import ModelSelector from "../components/ModelSelector/ModelSelector";
import { QuickStartPrompts } from "../components/QuickStarterprompts/QuickStartPrompts";
import { getRandomPrompts } from "../MockData/MockQuickStartPrompts";
import ContextModal from "../components/ContextModal/ContextModal";
import useModalStore from "../store/modalStore";
import useKnowledgeBaseStore from "../store/knowledgeBaseStore";

// Helper functions to generate standard action configurations
const getStandardImageUploadAction = (overrideProps = {}) => ({
  id: "upload-image",
  actionType: "imageUpload",
  icon: IconPhoto,
  tooltip: "Upload Image",
  position: "left",
  ...overrideProps,
});

const LandingPage = () => {
  const { openModal } = useModalStore();
  const { webSearchEnabled, setWebSearchEnabled, message, setMessage } =
    useKnowledgeBaseStore();

  const randomPrompts = useMemo(() => getRandomPrompts(), []);

  const handleSendMessage = (message, attachments) => {
    console.log("Message:", message);
    console.log("Attachments:", attachments);
    alert(`Message: ${message}\nAttachments: ${attachments.length}`);
  };

  const handleWebSearchClick = () => {
    setWebSearchEnabled(!webSearchEnabled);
  };

  return (
    <>
      <div className="relative">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-2xl font-bold mb-3">Hi, Ask me anything...</p>
          {/* Variant 1: Exact Fynix UI Replica */}

          <Input
            message={message}
            setMessage={setMessage}
            onSendMessage={handleSendMessage}
            placeholder="How Fynix can help you today?"
            className="dark bg-zinc-800 border border-zinc-700 rounded-lg w-2/3"
            textAreaClassName="bg-transparent placeholder-zinc-500 text-zinc-300 !border-transparent focus:ring-0 focus:border-purple-500 rounded-md"
            buttonClassName="bg-purple-600 hover:bg-purple-700 text-white rounded-md"
            actionButtonContainerClassName="gap-1.5"
            actionComponentsConfig={[
              getStandardImageUploadAction({
                id: "image-upload-fynix",
                tooltip: "Upload Image",
              }),
              {
                id: "web-search-fynix",
                icon: IconWorld,
                tooltip: "Web Search",
                onClick: handleWebSearchClick,
                className: webSearchEnabled
                  ? "!bg-textPurple !text-textDefault"
                  : "",
                position: "left",
              },
              {
                id: "model-selector-fynix",
                tooltip: "Select Model",
                position: "left",
                customRender: () => <ModelSelector />,
              },
              {
                id: "add-context-fynix",
                tooltip: "Add Context",
                position: "right",
                customRender: (config) => (
                  <button
                    key={config.id}
                    title={config.tooltip}
                    onClick={() => openModal("contextModal")}
                    className="p-2 h-[36px] text-sm text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-md flex items-center transition-colors duration-150 border border-zinc-700"
                  >
                    <IconBook size={16} className="mr-1.5 opacity-80" />
                    Add context
                  </button>
                ),
              },
            ]}
          />
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col w-2/3 mt-5">
              <QuickStartPrompts
                prompts={randomPrompts}
                onPromptClick={(prompt) => {
                  setMessage(prompt);
                }}
                columns={3}
              />
            </div>
          </div>
        </div>
      </div>

      <ContextModal />
    </>
  );
};

export default LandingPage;
