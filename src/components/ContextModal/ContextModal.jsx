import React, { useState } from "react";
import { Button, Modal, TextInput, Textarea } from "@mantine/core";

import useModalStore from "../../store/modalStore";
import MultiStepper from "../MultiStepper/MultiStepper";
import CreateKnowledgeBase from "./CreateKnowledgeBase/CreateKnowledgeBase";
import SelectProvider from "./SelectProvider/SelectProvider";
import useKnowledgeBaseStore from "../../store/knowledgeBaseStore";

const ContextModal = () => {
  const { modals, closeModal } = useModalStore();
  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
  });
  const { knowledgeBaseName, selectedProvider, providerConfigs } =
    useKnowledgeBaseStore();

  const steps = [
    // { label: "Basic Info", content: <AddKnowledgeBase /> },
    {
      label: "Content",
      content: <CreateKnowledgeBase />,
      onNext: async () => {
        if (knowledgeBaseName.length === 0) {
          return;
        }
      },
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

  const modalTitle = {
    0: "Create Knowledge Base",
    1: "Select a provider",
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
      styles={{
        modal: {
          backgroundColor: "rgb(24 24 27)",
          color: "rgb(212 212 216)",
        },
        title: {
          color: "rgb(212 212 216)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        },
        header: {
          display: "flex",
          justifyContent: "center",
        },
      }}
      centered
    >
      <div className="space-y-6">
        <MultiStepper
          steps={steps}
          navigationClassName="flex !justify-end w-full"
          onComplete={handleComplete}
          showStepper={false}
          customNextButton={(handleNext, loading) => {
            return (
              <Button
                onClick={() => {
                  active === 0 && knowledgeBaseName.length > 0 && handleNext();
                  active === steps.length - 1 && handleComplete();
                }}
                loading={loading}
                className="!bg-textPurple  hover:!bg-textLightPurple"
              >
                {active === steps.length - 1 ? "Save" : "Next"}
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
