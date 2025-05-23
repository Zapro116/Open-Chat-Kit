import React, {
  useState,
  useRef,
  // useCallback, FC, ChangeEvent, KeyboardEvent are TS-specific, not needed in JS or handled by JSDoc
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import {
  IconPaperclip,
  IconPhoto,
  IconSend,
  IconSend2,
  IconX,
} from "@tabler/icons-react";
import PropTypes from "prop-types"; // For runtime prop type validation

// Helper function to render an individual action component or button
/**
 * Renders an individual action button based on its configuration.
 * @param {ActionComponentConfig} config - The configuration for the action component.
 * @param {(isImage: boolean) => void} openFileDialogFn - Function to open the file dialog.
 * @param {File[]} currentAttachments - Array of currently attached files.
 * @param {number} maxAttachmentsCount - Maximum number of attachments allowed.
 * @returns {JSX.Element} The rendered button or custom component.
 */
const renderActionComponentButton = (
  config,
  openFileDialogFn,
  currentAttachments,
  maxAttachmentsCount
) => {
  if (config.customRender) {
    // The customRender function is responsible for its own content.
    // The key is applied here to the Fragment for safety.
    return (
      <React.Fragment key={config.id}>
        {config.customRender(config)}
      </React.Fragment>
    );
  }

  let effectiveOnClick = config.onClick;
  if (!config.onClick) {
    if (config.actionType === "imageUpload") {
      effectiveOnClick = () => openFileDialogFn(true);
    } else if (config.actionType === "documentUpload") {
      effectiveOnClick = () => openFileDialogFn(false);
    }
  }

  let effectiveDisabled = !!config.disabled;
  if (
    config.actionType === "imageUpload" ||
    config.actionType === "documentUpload"
  ) {
    effectiveDisabled =
      effectiveDisabled || currentAttachments.length >= maxAttachmentsCount;
  }

  const defaultClasses =
    "p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150";
  const buttonClasses = config.className
    ? `${defaultClasses} ${config.className}`
    : defaultClasses;

  return (
    <button
      key={config.id}
      type="button"
      title={config.tooltip}
      onClick={effectiveOnClick}
      disabled={effectiveDisabled}
      className={buttonClasses}
    >
      <config.icon size={20} />
    </button>
  );
};

// Default configuration for the textarea
const DEFAULT_TEXTAREA_MIN_ROWS = 1;
const DEFAULT_TEXTAREA_MAX_ROWS = 6;

/**
 * @typedef {Object} ActionComponentConfig
 * @property {string} id - A unique identifier for the action component.
 * @property {React.ElementType} icon - The icon component to display.
 * @property {string} tooltip - Tooltip text for the action button.
 * @property {'imageUpload' | 'documentUpload'} [actionType] - If specified, provides default onClick behavior to open the Input component's file dialog and applies attachment limit-based disabling.
 * @property {() => void} [onClick] - Custom click handler. If actionType is also specified, this will override the default click behavior of the actionType.
 * @property {(files: FileList) => void} [onFileSelect] - Handler for file input actions (typically for custom file inputs within customRender).
 * @property {string} [accept] - Accepted file types for this action (e.g., 'image/*'). Used by customRender with file inputs.
 * @property {boolean} [disabled] - Explicitly disable the button. If actionType is 'imageUpload' or 'documentUpload', the button will also be disabled if maxAttachments is reached.
 * @property {(config: ActionComponentConfig) => React.ReactNode} [customRender] - Optional function to render a custom component.
 * @property {'left' | 'right'} [position] - Position of the action button relative to the textarea. Defaults to 'left'.
 * @property {string} [className] - Custom CSS class for the action button. Will be merged with default classes.
 */

/**
 * An extendible input component with support for text, file uploads, and custom action buttons.
 * @param {InputProps} props - The props for the Input component.
 * @returns {JSX.Element} The rendered Input component.
 */
function Input({
  onSendMessage,
  placeholder = "Type a message...",
  minRows = DEFAULT_TEXTAREA_MIN_ROWS,
  maxRows = DEFAULT_TEXTAREA_MAX_ROWS,
  actionComponentsConfig = [],
  maxAttachments = 5,
  acceptedDocumentTypes = ".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx",
  acceptedImageTypes = "image/jpeg,image/png,image/gif,image/webp,image/svg+xml",
  className = "",
  textAreaClassName = "",
  buttonClassName = "",
  attachmentPreviewClassName = "",
  actionButtonContainerClassName = "",
  message = "",
  setMessage = () => {},
}) {
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null); // Combined file input ref

  /** @param {React.ChangeEvent<HTMLTextAreaElement>} event */
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessageInternal = () => {
    if (message.trim() === "" && attachments.length === 0) {
      return;
    }
    onSendMessage(message.trim(), attachments);
    setMessage("");
    setAttachments([]);
  };

  /** @param {React.KeyboardEvent<HTMLTextAreaElement>} event */
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessageInternal();
    }
  };

  /** @param {React.ChangeEvent<HTMLInputElement>} event */
  const handleFileSelected = (event) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(
        0,
        maxAttachments - attachments.length
      );
      if (newFiles.length > 0) {
        setAttachments((prev) => [...prev, ...newFiles]);
      }
    }
    if (event.target) {
      event.target.value = ""; // Reset file input
    }
  };

  /** @param {boolean} isImage */
  const openFileDialog = (isImage) => {
    if (attachments.length >= maxAttachments) return;
    if (fileInputRef.current) {
      // Dynamically set the accept attribute based on the type of file to upload
      fileInputRef.current.accept = isImage
        ? acceptedImageTypes
        : acceptedDocumentTypes;
      fileInputRef.current.click();
    }
  };

  /** @param {number} indexToRemove */
  const removeAttachment = (indexToRemove) => {
    setAttachments((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const allActionComponents = actionComponentsConfig; // Use prop directly

  const leftActionComponents = allActionComponents.filter(
    (config) => !config.position || config.position === "left"
  );
  const rightActionComponents = allActionComponents.filter(
    (config) => config.position === "right"
  );

  /** @param {React.ClipboardEvent<HTMLTextAreaElement>} event */
  const handlePaste = (event) => {
    const items = event.clipboardData?.items;
    if (!items) return;

    const imageFiles = Array.from(items)
      .filter((item) => item.type.startsWith("image/"))
      .map((item) => item.getAsFile())
      .filter(Boolean);

    if (imageFiles.length > 0) {
      event.preventDefault();
      const newFiles = imageFiles.slice(0, maxAttachments - attachments.length);
      if (newFiles.length > 0) {
        setAttachments((prev) => [...prev, ...newFiles]);
      }
    }
  };

  return (
    <div
      className={`flex flex-col p-3 border  rounded-lg  shadow-sm ${className}`}
    >
      {/* Attachment Previews */}
      {attachments.length > 0 && (
        <div
          className={`mb-2 flex flex-wrap gap-2 p-2 border-b  ${attachmentPreviewClassName}`}
        >
          {attachments.map((file, index) => (
            <div key={index} className="relative group flex items-center">
              {file.type.startsWith("image/") ? (
                <div className="flex items-center gap-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </div>
              ) : (
                <>
                  <IconPaperclip size={16} className="mr-1.5 " />
                  <span className="truncate max-w-xs" title={file.name}>
                    {file.name}
                  </span>
                </>
              )}

              <button
                onClick={() => removeAttachment(index)}
                title="Remove attachment"
                className="absolute top-1 right-1 -mt-2.5 -mr-2.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-red-600"
              >
                <IconX size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      <TextareaAutosize
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        minRows={minRows}
        maxRows={maxRows}
        placeholder={placeholder}
        className={`flex-grow resize-none mb-4 focus:border-transparent outline-none bg-transparent ${textAreaClassName}`}
      />

      <div className="flex justify-between items-end gap-2">
        {/* Action Buttons: Render default and custom action components */}
        {leftActionComponents.length > 0 && (
          <div
            className={`flex gap-1 items-center ${actionButtonContainerClassName}`}
          >
            {leftActionComponents.map((config) =>
              renderActionComponentButton(
                config,
                openFileDialog,
                attachments,
                maxAttachments
              )
            )}
          </div>
        )}

        {/* Hidden file inputs */}
        <input
          type="file"
          ref={fileInputRef} // Use the combined ref
          multiple
          // Accept attribute will be set dynamically in openFileDialog
          // but we can provide a sensible default or combined one here if desired.
          // For now, relying on dynamic setting.
          // accept={`${acceptedImageTypes},${acceptedDocumentTypes}`}
          onChange={handleFileSelected}
          className="hidden"
          disabled={attachments.length >= maxAttachments}
        />

        <div className="flex gap-1 items-center">
          {rightActionComponents.length > 0 && (
            <div
              className={`flex gap-1 items-center ${actionButtonContainerClassName}`}
            >
              {rightActionComponents.map((config) =>
                renderActionComponentButton(
                  config,
                  openFileDialog,
                  attachments,
                  maxAttachments
                )
              )}
            </div>
          )}

          <button
            type="button"
            onClick={handleSendMessageInternal}
            disabled={message.trim() === "" && attachments.length === 0}
            className={`p-2  disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 ${buttonClassName}`}
          >
            <IconSend2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * @typedef {object} InputProps
 * @property {(message: string, attachments: File[]) => void} onSendMessage - Callback function when a message is sent.
 * @property {string} [placeholder] - Placeholder text for the textarea.
 * @property {number} [minRows] - Minimum number of rows for the textarea.
 * @property {number} [maxRows] - Maximum number of rows for the textarea.
 * @property {ActionComponentConfig[]} [actionComponentsConfig] - Configuration for additional action components.
 * @property {number} [maxAttachments] - Maximum number of attachments allowed.
 * @property {string} [acceptedDocumentTypes] - Comma-separated string of accepted document file types.
 * @property {string} [acceptedImageTypes] - Comma-separated string of accepted image file types.
 * @property {string} [className] - Custom CSS class for the main container.
 * @property {string} [textAreaClassName] - Custom CSS class for the textarea.
 * @property {string} [buttonClassName] - Custom CSS class for the send button.
 * @property {string} [attachmentPreviewClassName] - Custom CSS class for the attachment preview area.
 * @property {string} [actionButtonContainerClassName] - Custom CSS class for the action buttons container.
 * @property {string} [message] - The current message value.
 * @property {(message: string) => void} [setMessage] - Function to update the message value.
 */
Input.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  actionComponentsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
      tooltip: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      onFileSelect: PropTypes.func,
      actionType: PropTypes.oneOf(["imageUpload", "documentUpload"]),
      accept: PropTypes.string,
      disabled: PropTypes.bool,
      customRender: PropTypes.func,
      position: PropTypes.oneOf(["left", "right"]),
      className: PropTypes.string,
    })
  ),
  maxAttachments: PropTypes.number,
  acceptedDocumentTypes: PropTypes.string,
  acceptedImageTypes: PropTypes.string,
  className: PropTypes.string,
  textAreaClassName: PropTypes.string,
  buttonClassName: PropTypes.string,
  attachmentPreviewClassName: PropTypes.string,
  actionButtonContainerClassName: PropTypes.string,
  message: PropTypes.string,
  setMessage: PropTypes.func,
};

export default Input;
