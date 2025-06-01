import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, Button, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@clerk/clerk-react";
import { DEFAULT_CLERK_TEMPLATE } from "../../utils/contants";
import { updateProject } from "../../api/projectApi";

const initialErrorState = {
  projectName: "",
  projectDescription: "",
};

// API error is separate from form validation errors
const initialApiErrorState = {
  visible: false,
  message: "",
};

export const EditProjectModal = ({
  project = {},
  onClose = () => {},
  onEditSubmit = () => {},
}) => {
  const nameInputRef = useRef(null);
  const abortControllerRef = useRef(null);
  const { getToken } = useAuth();
  const [opened, setOpened] = useState(Boolean(project && project.team_id));

  const [formData, setFormData] = useState({
    projectName: project.name || "",
    projectDescription: project.description || "",
  });
  const [errors, setErrors] = useState(initialErrorState);
  const [apiError, setApiError] = useState(initialApiErrorState);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpened(false);
    onClose();
  };

  // Initialize form data when project changes
  useEffect(() => {
    if (opened && project) {
      setFormData({
        projectName: project.name || "",
        projectDescription: project.description || "",
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
  }, [opened, project]);

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

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
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
          template: DEFAULT_CLERK_TEMPLATE,
        });

        // Call the API to update the project
        const response = await updateProject(
          token,
          project.team_id,
          {
            name: formData.projectName,
            description: formData.projectDescription,
          },
          abortControllerRef.current.signal
        );

        console.log({ response });

        if (response.data?.status === "success") {
          // Show success notification
          notifications.show({
            title: "Success",
            message: "Project updated successfully",
            color: "green",
            position: "top-right",
            autoClose: 3000,
          });

          // Call the callback with the updated project
          onEditSubmit();

          // Close modal on success
          handleClose();
        }
      } catch (error) {
        // Check if this was an abort error
        if (error.message === "API call aborted") {
          console.log("API call was aborted");
        } else {
          console.error("Error updating project:", error);
          // Show API error message
          setApiError({
            visible: true,
            message: "Failed to update project. Please try again.",
          });

          notifications.show({
            title: "Error",
            message: "Failed to update project",
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
  }, [validateForm, formData, project, getToken, onEditSubmit, handleClose]);

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
      title="Edit Project"
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
              Project Name *
            </label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              ref={nameInputRef}
              className={`w-full px-3 py-2 bg-bgCardColor border ${
                errors.projectName ? "border-red-500" : "border-borderDefault"
              } rounded-md text-textDefault`}
              placeholder="Enter project name"
            />
            {errors.projectName && (
              <Text className="text-red-500 text-xs mt-1">
                {errors.projectName}
              </Text>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs/[14px] text-textTitleColor">
              Project Description
            </label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-bgCardColor border border-borderDefault rounded-md text-textDefault resize-none"
              placeholder="Enter project description (optional)"
              rows={3}
            />
          </div>

          {apiError.visible && (
            <p className="text-xs text-red-500">{apiError.message}</p>
          )}

          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="px-4 py-2 rounded !bg-textPurple text-textDefault hover:!bg-textLightPurple w-fit self-end"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditProjectModal;
