import React, { useState, useEffect, useRef, useCallback } from "react";
import { Group, Text, Button, TextInput, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@clerk/clerk-react";
import { KNOWLEDGE_BASE_EDIT_LABEL } from "../../utils/contants";
// import { updateKnowledgeBase } from "../api/knowledgeBaseApi";

const initialErrorState = {
  knowledgeName: "",
};

// API error is separate from form validation errors
const initialApiErrorState = {
  visible: false,
  message: "",
};

export const EditKnowledgeModal = ({
  knowledge = {},
  onClose = () => {},
  onEditSubmit = () => {},
}) => {
  const nameInputRef = useRef(null);
  const abortControllerRef = useRef(null);
  const { getToken } = useAuth();
  const [opened, setOpened] = useState(Boolean(knowledge && knowledge.id));

  const [formData, setFormData] = useState({
    knowledgeName: "",
  });
  const [errors, setErrors] = useState(initialErrorState);
  const [apiError, setApiError] = useState(initialApiErrorState);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpened(false);
    onClose();
  };

  // Determine if modal is open based on whether knowledge object has an id

  // Initialize form data when knowledge changes
  useEffect(() => {
    if (opened && knowledge) {
      setFormData({
        knowledgeName: knowledge.knowledgeName || "",
      });

      setErrors(initialErrorState);
      setApiError(initialApiErrorState);

      // Focus the name input when modal opens
      setTimeout(() => {
        if (nameInputRef.current) {
          nameInputRef.current.focus();
        }
      }, 100);
    }

    // Cleanup function to abort any pending requests when component unmounts
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [opened, knowledge]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors = { ...initialErrorState };

    if (!formData.knowledgeName.trim()) {
      newErrors.knowledgeName = "Knowledge name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (validateForm()) {
      try {
        setLoading(true);

        // Create a new AbortController for this request
        abortControllerRef.current = new AbortController();

        // Get the authentication token
        const token = await getToken({
          template: "neon",
        });

        // Call the API to update the knowledge base
        // const response = await updateKnowledgeBase(
        //   token,
        //   knowledge.id,
        //   {
        //     name: formData.knowledgeName,
        //   },
        //   abortControllerRef.current.signal
        // );

        // // Show success notification
        // notifications.show({
        //   title: "Success",
        //   message: "Knowledge source updated successfully",
        //   color: "green",
        //   position: "top-right",
        //   autoClose: 3000,
        // });

        // // Call the callback with the updated knowledge base
        // onEditSubmit(response);

        // Close modal on success
        // onClose();
        handleClose();
      } catch (error) {
        // Check if this was an abort error
        if (error.message === "API call aborted") {
          console.log("API call was aborted");
        } else {
          console.error("Error updating knowledge base:", error);
          // Show API error message
          setApiError({
            visible: true,
            message: "Failed to update knowledge base. Please try again.",
          });

          notifications.show({
            title: "Error",
            message: "Failed to update knowledge source",
            color: "red",
            position: "top-right",
            autoClose: 3000,
          });
        }
      } finally {
        setLoading(false);
        // Clear the abort controller reference
        abortControllerRef.current = null;
      }
    }
  }, [validateForm, formData, knowledge, getToken, onEditSubmit, handleClose]);

  const modalClassNames = {
    header: "bg-bgDefault border-b border-borderDefault",
    title: "text-textDefault",
    body: "bg-bgDefault text-textDefault",
    close: "text-textDefault",
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={`Edit ${KNOWLEDGE_BASE_EDIT_LABEL}`}
      classNames={modalClassNames}
      centered
      trapFocus={false}
      withCloseButton={true}
      closeOnClickOutside={true}
    >
      <div className="p-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-xs/[14px] text-textTitleColor">
              Knowledge Name *
            </label>
            <input
              type="text"
              name="knowledgeName"
              value={formData.knowledgeName}
              onChange={handleChange}
              ref={nameInputRef}
              className={`w-full px-3 py-2 bg-bgCardColor border ${
                errors.knowledgeName ? "border-red-500" : "border-borderDefault"
              } rounded-md text-textDefault`}
              placeholder="Enter knowledge name"
            />
            {errors.knowledgeName && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.knowledgeName}
              </Text>
            )}
          </div>

          {apiError.visible && (
            <p className="text-xs text-red-500">{apiError.message}</p>
          )}

          <Group className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded bg-bgCardColor text-textDefault border border-borderDefault hover:bg-bgGrayLightHover"
            >
              Cancel
            </button>
            <Button
              type="submit"
              loading={loading}
              disabled={loading}
              className="px-4 py-2 rounded bg-backgroundPrimary text-white hover:bg-backgroundPrimaryHover"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Group>
        </form>
      </div>
    </Modal>
  );
};
