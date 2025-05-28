import React from "react";
import useChatStore from "../../store/chatStore";
import {
  ENABLE_KNOWLEDGE_BASES,
  getStandardImageUploadAction,
} from "../../utils/contants";
import { useParams } from "react-router-dom";
import Input from "../Input/Input";
import { IconBook, IconWorld, IconX } from "@tabler/icons-react";
import ModelSelector from "../ModelSelector/ModelSelector";
import { useMantineColorScheme } from "@mantine/core";
import Navbar from "../Navbar/Navbar";
import "./ChatPanel.scss";

function ChatPanel() {
  const { message, setMessage, webSearchEnabled, context, setContext } =
    useChatStore();
  const { colorScheme } = useMantineColorScheme();
  const { chatId } = useParams();

  const handleSendMessage = () => {};

  const handleWebSearchClick = () => {};

  return (
    <div className="relative h-full">
      <Navbar />
      <div className="flex flex-col h-[inherit] bg-bgCardColor">
        <div className="pt-[72px] h-full">
          <div className="chat-container"></div>
          <div className="flex justify-center">
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
                              <IconBook
                                size={16}
                                className="mr-1.5 opacity-80"
                              />
                              Add context
                            </button>
                          ),
                      },
                    ]
                  : []),
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPanel;
