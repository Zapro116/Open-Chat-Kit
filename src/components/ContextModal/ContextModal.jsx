import React, { useState } from "react";
import { Button, Modal, TextInput, Textarea } from "@mantine/core";

import useModalStore from "../../store/modalStore";
import MultiStepper from "../MultiStepper/MultiStepper";
import CreateKnowledgeBase from "./CreateKnowledgeBase/CreateKnowledgeBase";
import SelectProvider from "./SelectProvider/SelectProvider";
import useKnowledgeBaseStore from "../../store/knowledgeBaseStore";
import SearchKnowledgeBase from "../KnowledgeBase/SearchKnowledgeBase";
import { KNOWLEDGE_BASE_EDIT_LABEL } from "../../utils/contants";

const ContextModal = () => {
  const { modals, closeModal, showExistingKbInContextModal } = useModalStore();
  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
  });
  const { knowledgeBaseName, selectedProvider, providerConfigs } =
    useKnowledgeBaseStore();

  const steps = [
    ...(showExistingKbInContextModal
      ? [
          {
            content: <SearchKnowledgeBase />,
          },
        ]
      : []),
    {
      label: "Content",
      content: <CreateKnowledgeBase />,
    },
    {
      label: "Select a provider",
      content: <SelectProvider />,
      onNext: () => {
        if (!selectedProvider) {
          return;
        }

        const config = providerConfigs[selectedProvider];
        if (!config.cloneUrl || !config.personalAccessToken) {
          return;
        }

        console.log(
          "Saving knowledge base with provider:",
          selectedProvider,
          config
        );
      },
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (active < steps.length - 1) {
      setActive((prev) => prev + 1);
    } else {
      // Handle form submission
      console.log("Form submitted:", formData);
      closeModal("contextModal");
    }
  };

  const handleBack = () => {
    if (active > 0) {
      setActive((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    // closeModal("contextModal");
  };

  const modalTitle = showExistingKbInContextModal
    ? {
        0: `Add a ${KNOWLEDGE_BASE_EDIT_LABEL}`,
        1: `Create ${KNOWLEDGE_BASE_EDIT_LABEL}`,
        2: `Select a ${KNOWLEDGE_BASE_EDIT_LABEL} provider`,
      }
    : {
        0: `Create ${KNOWLEDGE_BASE_EDIT_LABEL}`,
        1: `Select a ${KNOWLEDGE_BASE_EDIT_LABEL} provider`,
      };

  const nextButtonText = showExistingKbInContextModal
    ? {
        0: `Create new ${KNOWLEDGE_BASE_EDIT_LABEL}`,
        1: "Next",
        2: "Save",
      }
    : {
        0: "Next",
        1: "Save",
      };

  const handleNextButtonClick = (handleNext, active, loading) => {
    if (showExistingKbInContextModal) {
      switch (active) {
        case 0:
          handleNext();
          break;
        case 1:
          if (!knowledgeBaseName?.trim()) {
            return;
          }
          handleNext();
          break;
        case 2:
          handleComplete();
          break;
      }
    } else {
      switch (active) {
        case 0:
          if (!knowledgeBaseName?.trim()) {
            return;
          }
          handleNext();
          break;
        case 1:
          handleComplete();
          break;
      }
    }
  };

  return (
    <Modal
      opened={modals.contextModal}
      onClose={() => closeModal("contextModal")}
      title={
        <div className="flex justify-center w-full text-textDefault">
          {modalTitle[active]}
        </div>
      }
      classNames={{
        body: "bg-bgCardColor",
        header: "!bg-bgCardColor",
      }}
      centered
    >
      <div className="space-y-6">
        <MultiStepper
          steps={steps}
          className="!bg-bgCardColor"
          navigationClassName="flex !justify-end w-full"
          onComplete={handleComplete}
          showStepper={false}
          customNextButton={(handleNext, loading) => {
            return (
              <Button
                onClick={() =>
                  handleNextButtonClick(handleNext, active, loading)
                }
                loading={loading}
                className="!bg-textPurple  hover:!bg-textLightPurple"
              >
                {nextButtonText[active]}
              </Button>
            );
          }}
          initialStep={active}
          onStepChange={setActive}
        />
      </div>
    </Modal>
  );
};

export default ContextModal;
