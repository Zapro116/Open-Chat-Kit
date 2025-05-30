import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Modal } from "@mantine/core";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import useModalStore from "../../store/modalStore"; // Import the store
import {
  DEFAULT_CLERK_TEMPLATE,
  PROJECT_EDIT_LABEL,
  PROJECT_ROUTE,
} from "../../utils/contants";
import { createProject as apiCreateProject } from "../../api/projectApi";

const initialFormState = {
  projectName: "",
  projectDescription: "",
};

const initialErrorState = {
  projectName: "",
  projectDescription: "",
};

// API error is separate from form validation errors
const initialApiErrorState = {
  visible: false,
  message: "",
};

export const AddProjectModal = () => {
  // Remove opened and close from props
  const projectNameInputRef = useRef(null);
  const abortControllerRef = useRef(null);
  const { getToken } = useAuth();
  const { modals, closeModal } = useModalStore(); // Get state and actions from store

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState(initialErrorState);
  const [apiError, setApiError] = useState(initialApiErrorState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!modals.addProjectModal) {
      // Use store state
      // Reset all states when modal closes
      setFormData(initialFormState);
      setErrors(initialErrorState);
      setApiError(initialApiErrorState);
      setLoading(false);

      // Abort any in-progress API requests
      if (abortControllerRef.current) {
        console.log("Aborting in-progress API request");
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    } else if (modals.addProjectModal && projectNameInputRef.current) {
      // Use store state
      // Focus input when modal opens
      setTimeout(() => {
        if (projectNameInputRef.current) {
          projectNameInputRef.current.focus();
        }
      }, 500);
    }

    // Cleanup function to abort any pending requests when component unmounts
    return () => {
      if (abortControllerRef.current) {
        console.log("Cleanup: Aborting in-progress API request");
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
  }, [modals.addProjectModal]); // Use store state in dependency array

  const handleChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [id]: value,
      }));

      // Clear error when user starts typing in the project name field (only field with validation)
      if (id === "projectName" && errors.projectName) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          projectName: "",
        }));
      }
    },
    [errors.projectName]
  ); // Only depends on projectName error since description is not mandatory

  const validateForm = useCallback(() => {
    let isValid = true;
    // Only validate project name since description is not mandatory
    const newErrors = { projectName: "", projectDescription: "" };

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [formData.projectName]); // Only depends on projectName for validation

  // API call function to create a new project with abort controller support
  const createProject = useCallback(
    async (data, abortSignal) => {
      try {
        const token = await getToken({
          template: DEFAULT_CLERK_TEMPLATE,
        });

        // Use the API function to create a new project
        const createdProject = await apiCreateProject(token, data, abortSignal);
        console.log({ createdProject });

        return { success: true, data: createdProject };
      } catch (error) {
        if (error.name === "AbortError") {
          throw new Error("API call aborted");
        }
        console.error("Error creating project:", error);
        throw error;
      }
    },
    [getToken]
  ); // Add getToken as a dependency

  const handleSubmit = useCallback(async () => {
    if (validateForm()) {
      try {
        setLoading(true);
        console.log("Submitting form...");

        // Create a new AbortController for this request
        abortControllerRef.current = new AbortController();

        // Call the API to create a project
        const response = await createProject(
          formData,
          abortControllerRef.current.signal
        );
        console.log({ response });

        setFormData(initialFormState);
        setErrors(initialErrorState);
        closeModal("addProjectModal");
        if (response?.data?.id) {
          navigate(`/${PROJECT_ROUTE}/${response.data.id}`);
        }
      } catch (error) {
        // Check if this was an abort error
        if (error.message === "API call aborted") {
          console.log("API call was aborted");
        } else {
          console.error("Error submitting form:", error);
          // Show API error message
          setApiError({
            visible: true,
            message: "Failed to create project. Please try again.",
          });
        }
      } finally {
        setLoading(false);
        // Clear the abort controller reference
        abortControllerRef.current = null;
      }
    }
  }, [validateForm, formData, createProject, closeModal, navigate]); // Add closeModal to dependency array

  // Simple object for modal class names - no need for useMemo
  const modalClassNames = {
    title: "text-base text-center font-semibold text-textTitleColor",
    close: "focus:outline focus:outline-2 focus:outline-backgroundPrimary",
  };

  return (
    <Modal
      opened={modals.addProjectModal} // Use store state
      onClose={() => closeModal("addProjectModal")} // Use closeModal from store
      title={`Add a ${PROJECT_EDIT_LABEL}`}
      classNames={modalClassNames}
      centered
      trapFocus={false} // Disable Mantine's focus trap to allow our custom focus
      withCloseButton={true}
      closeOnClickOutside={true}
    >
      <div className="p-2">
        <section className="mb-4">
          <label
            htmlFor="projectName"
            className="text-xs block mb-2 font-medium text-textTitleColor"
          >
            {`${PROJECT_EDIT_LABEL} Name`} <span>*</span>
          </label>
          <input
            id="projectName"
            type="text"
            placeholder={`Enter your ${PROJECT_EDIT_LABEL} name`}
            value={formData.projectName}
            onChange={handleChange}
            ref={projectNameInputRef}
            autoFocus={modals.addProjectModal} // Use store state
            className={`text-sm w-full px-3 py-2 border ${
              errors.projectName ? "border-red-500" : "border-borderDefault"
            } rounded focus:outline-none focus:border-backgroundPrimary transition-all`}
          />
          {errors.projectName && (
            <p className="text-red-500 text-xs mt-1">{errors.projectName}</p>
          )}
        </section>
        <section className="mb-4">
          <label
            htmlFor="projectDescription"
            className="text-xs block mb-2 font-medium text-textTitleColor"
          >
            {`${PROJECT_EDIT_LABEL} Description`}
          </label>
          <textarea
            id="projectDescription"
            placeholder={`Describe your ${PROJECT_EDIT_LABEL} goals, vision, etc..`}
            value={formData.projectDescription}
            onChange={handleChange}
            rows={4}
            className="text-sm w-full px-3 py-2 border border-borderDefault rounded focus:outline-none focus:border-backgroundPrimary transition-all resize-none"
          />
        </section>
        {apiError.visible && (
          <p className="text-xs text-red-500">{apiError.message}</p>
        )}
        <div className="flex justify-end mt-6">
          <Button
            onClick={handleSubmit}
            loading={loading}
            loaderProps={{ type: "oval" }}
            className="px-4 py-2 text-sm text-white bg-backgroundPrimary hover:bg-backgroundPrimary rounded focus:outline-white"
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
};
