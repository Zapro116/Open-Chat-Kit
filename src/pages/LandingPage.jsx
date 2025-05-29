import React, { useState, useMemo, useEffect } from "react";
import Input from "../components/Input/Input"; // Assuming Input.jsx is in src/components/Input/
import { IconPhoto, IconWorld, IconBook, IconX } from "@tabler/icons-react";
import Navbar from "../components/Navbar/Navbar";
import ModelSelector from "../components/ModelSelector/ModelSelector";
import { QuickStartPrompts } from "../components/QuickStarterprompts/QuickStartPrompts";
import { getRandomPrompts } from "../MockData/MockQuickStartPrompts";

import { useMantineColorScheme } from "@mantine/core";

import ContextModal from "../components/ContextModal/ContextModal";
import useModalStore from "../store/modalStore";
import {
  DEFAULT_CLERK_TEMPLATE,
  ENABLE_CHATS,
  ENABLE_KNOWLEDGE_BASES,
  getStandardImageUploadAction,
} from "../utils/contants";
import { useAuth, useUser } from "@clerk/clerk-react";
import useChatStore from "../store/chatStore";
//import { logPageView } from "../utils/analytics";
import useModelStore from "../store/modelStore";
import { handleSendMessage } from "../service/ChatService";
import { useNavigate } from "react-router-dom";

// Helper functions to generate standard action configurations

function LandingPage() {
  const { colorScheme } = useMantineColorScheme();
  const { user } = useUser();
  const { getToken } = useAuth();

  const { openModal, setShowExistingKbInContextModal } = useModalStore();
  const {
    webSearchEnabled,
    setWebSearchEnabled,
    promptText,
    setPromptText,
    context,
    setContext,
    setFiles,
  } = useChatStore();
  const { selectedModel } = useModelStore();
  const navigate = useNavigate();

  const randomPrompts = useMemo(() => getRandomPrompts(), []);

  // useEffect(() => {
  //   logPageView();
  // }, []);

  const handleEnter = async (message, attachments) => {
    //navigate
    try {
      const token = await getToken({
        template: DEFAULT_CLERK_TEMPLATE,
      });
      await handleSendMessage(
        message,
        attachments,
        token,
        navigate,
        user?.emailAddresses[0].emailAddress
      );
    } catch (err) {
      console.log(err);
    }
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
            message={promptText}
            setMessage={setPromptText}
            onSendMessage={handleEnter}
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
                  setPromptText(prompt);
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
