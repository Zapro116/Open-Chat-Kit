import React, { useState } from "react";
import { Modal, TextInput, Textarea } from "@mantine/core";

import useModalStore from "../../store/modalStore";
import MultiStepper from "../MultiStepper/MultiStepper";
import AddKnowledgeBase from "./AddKnowledgeBase/AddKnowledgeBase";
import CreateKnowledgeBase from "./CreateKnowledgeBase/CreateKnowledgeBase";

const ContextModal = () => {
  const { modals, closeModal } = useModalStore();
  const [active, setActive] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
  });

  const steps = [
    // { label: "Basic Info", content: <AddKnowledgeBase /> },
    { label: "Content", content: <CreateKnowledgeBase /> },
    { label: "Review", content: <div>Review</div> },
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

  const renderStepContent = () => {
    switch (active) {
      case 0:
        return (
          <div className="space-y-4">
            <TextInput
              label="Title"
              placeholder="Enter context title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              styles={{
                input: {
                  backgroundColor: "rgb(39 39 42)",
                  borderColor: "rgb(63 63 70)",
                  color: "rgb(212 212 216)",
                },
                label: {
                  color: "rgb(212 212 216)",
                },
              }}
            />
            <Textarea
              label="Description"
              placeholder="Enter context description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              styles={{
                input: {
                  backgroundColor: "rgb(39 39 42)",
                  borderColor: "rgb(63 63 70)",
                  color: "rgb(212 212 216)",
                },
                label: {
                  color: "rgb(212 212 216)",
                },
              }}
            />
          </div>
        );
      case 1:
        return (
          <Textarea
            label="Content"
            placeholder="Enter context content"
            minRows={5}
            value={formData.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            styles={{
              input: {
                backgroundColor: "rgb(39 39 42)",
                borderColor: "rgb(63 63 70)",
                color: "rgb(212 212 216)",
              },
              label: {
                color: "rgb(212 212 216)",
              },
            }}
          />
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <h3 className="text-zinc-300 font-medium">Title</h3>
              <p className="text-zinc-400">{formData.title}</p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium">Description</h3>
              <p className="text-zinc-400">{formData.description}</p>
            </div>
            <div>
              <h3 className="text-zinc-300 font-medium">Content</h3>
              <p className="text-zinc-400">{formData.content}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleComplete = () => {
    console.log("Form submitted:", formData);
    // closeModal("contextModal");
  };

  return (
    <Modal
      opened={modals.contextModal}
      onClose={() => closeModal("contextModal")}
      title={<div className="flex justify-center w-full">HI</div>}
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
          onComplete={handleComplete}
          showStepper={false}
          initialStep={active}
          onStepChange={setActive}
        />
      </div>
    </Modal>
  );
};

export default ContextModal;
