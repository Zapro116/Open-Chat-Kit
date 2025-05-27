import React, { useState, useMemo } from "react";
import Input from "../components/Input/Input"; // Assuming Input.jsx is in src/components/Input/
import { IconPhoto, IconWorld, IconBook, IconX } from "@tabler/icons-react";
import Navbar from "../components/Navbar/Navbar";
import ModelSelector from "../components/ModelSelector/ModelSelector";
import { QuickStartPrompts } from "../components/QuickStarterprompts/QuickStartPrompts";
import { getRandomPrompts } from "../MockData/MockQuickStartPrompts";

import { useMantineColorScheme } from "@mantine/core";

import ContextModal from "../components/ContextModal/ContextModal";
import useModalStore from "../store/modalStore";
import useKnowledgeBaseStore from "../store/knowledgeBaseStore";
import { ENABLE_CHATS, ENABLE_KNOWLEDGE_BASES } from "../utils/contants";
import { useUser } from "@clerk/clerk-react";

// Helper functions to generate standard action configurations
const getStandardImageUploadAction = (overrideProps = {}) => ({
  id: "upload-image",
  actionType: "imageUpload",
  icon: IconPhoto,
  tooltip: "Upload Image",
  position: "left",
  ...overrideProps,
});

function LandingPage() {
  const { colorScheme } = useMantineColorScheme();
  const { user } = useUser();

  const { openModal, setShowExistingKbInContextModal } = useModalStore();
  const {
    webSearchEnabled,
    setWebSearchEnabled,
    message,
    setMessage,
    context,
    setContext,
  } = useKnowledgeBaseStore();

  const randomPrompts = useMemo(() => getRandomPrompts(), []);

  const handleSendMessage = (message, attachments) => {
    console.log("Message:", message);
    console.log("Attachments:", attachments);
    alert(`Message: ${message}\nAttachments: ${attachments.length}`);
  };

  const handleWebSearchClick = () => {
    setWebSearchEnabled(!webSearchEnabled);
  };

  if (!ENABLE_CHATS) {
    return (
      <div className="relative">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen bg-bgCardColor">
          <p className="text-2xl font-bold mb-3">Chat is not enabled</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen bg-bgCardColor">
          <p className="text-2xl font-bold mb-3">
            Hi{user?.firstName && ` ${user?.firstName}`}, Ask me anything...
          </p>

          <Input
            message={message}
            setMessage={setMessage}
            onSendMessage={handleSendMessage}
            placeholder="How can I help you today?"
            className="dark bg-bgCardColor border border-borderDefault rounded-lg w-2/3"
            textAreaClassName="bg-transparent text-textDefault !border-transparent focus:!ring-0 rounded-md"
            buttonClassName="bg-purple-600 hover:bg-purple-700 text-white rounded-md !p-2"
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
              ...(ENABLE_KNOWLEDGE_BASES
                ? [
                    {
                      id: "add-context-fynix",
                      tooltip: "Add Context",
                      position: "right",
                      customRender: (config) =>
                        context && context?.name ? (
                          <div className="flex items-center gap-1 border border-borderDefault rounded-md pl-3">
                            <div className="text-sm text-textDefault py-2">
                              {context.name}
                            </div>
                            <div
                              className="flex items-center p-2 hover:text-textDangerColor h-full cursor-pointer"
                              onClick={() => setContext(null)}
                            >
                              <IconX size={16} className="opacity-80" />
                            </div>
                          </div>
                        ) : (
                          <button
                            key={config.id}
                            title={config.tooltip}
                            onClick={() => {
                              openModal("contextModal");
                              setShowExistingKbInContextModal(true);
                            }}
                            className={`p-2 h-[36px] text-sm  rounded-md flex items-center transition-colors duration-150 border  ${
                              colorScheme === "dark" ? "border-zinc-700" : ""
                            }`}
                          >
                            <IconBook size={16} className="mr-1.5 opacity-80" />
                            Add context
                          </button>
                        ),
                    },
                  ]
                : []),
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
}

export default LandingPage;
