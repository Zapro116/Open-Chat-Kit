import React from "react";
// import { Button } from "@mantine/core";

/**
 * ModalFooter component for the ShareKnowledgeBaseModal
 * @param {Object} props - Component props
 * @param {string} props.activeTab - The currently active tab ("projects" or "members")
 * @param {Array} props.selectedProjects - List of selected project IDs
 * @param {Array} props.initialSelectedProjects - List of initially selected project IDs
 * @param {Array} props.selectedMembers - List of selected member IDs
 * @param {Array} props.initialSelectedMembers - List of initially selected member IDs
 * @param {boolean} props.submitting - Whether the form is submitting
 * @param {Function} props.onClose - Function to close the modal
 * @param {Function} props.handleShare - Function to handle the share action
 * @param {Function} props.onReset - Function to reset selections to initial state
 */
const ModalFooter = ({
  activeTab,
  finalShareList,
  submitting,
  orgState,
  onClose,
  handleShare,
  onReset,
}) => {
  // Check if selections have changed from initial state
  const hasProjectChanges = finalShareList.team_id.length > 0; // || finalShareList.org_id.length > 0;

  const hasMemberChanges = finalShareList.user_id.length > 0;

  // Determine if the reset button should be shown
  const showResetButton =
    (activeTab === "projects" && hasProjectChanges) ||
    (activeTab === "members" && hasMemberChanges);
  return (
    <div className="flex justify-between gap-2 mt-2">
      <div>
        {/* Reset button - only show if selections have changed from initial state */}
        {showResetButton && (
          // <Button
          //   variant="subtle"
          //   onClick={() => {
          //     onReset && onReset(activeTab);
          //   }}
          //   className="text-textDimmedColor hover:bg-bgSelectedColor hover:text-textDefault transition-colors"
          // >
          <button
            onClick={() => {
              onReset && onReset(activeTab);
            }}
            className="text-textDimmedColor hover:bg-bgSelectedColor hover:text-textDefault transition-colors px-3 py-1.5 rounded-md text-sm"
          >
            Reset
          </button>
          // </Button>
        )}
      </div>

      <div className="flex gap-2">
        {/* <Button
          variant="outline"
          onClick={onClose}
          className="border-borderDefault text-textDefault hover:bg-bgSelectedColor transition-colors"
        >
          Cancel
        </Button> */}
        <button
          onClick={onClose}
          className="border border-borderDefault text-textDefault hover:bg-bgSelectedColor transition-colors px-4 py-1.5 rounded-md text-sm"
        >
          Cancel
        </button>
        {/* <Button
          variant="filled"
          loading={submitting}
          onClick={handleShare}
          className={`transition-transform ${
            submitting
              ? "bg-backgroundDisabled cursor-not-allowed hover:transform-none"
              : "bg-backgroundPrimary hover:bg-backgroundPrimaryHover"
          }`}
        >
          Save
        </Button> */}
        <button
          disabled={submitting}
          onClick={handleShare}
          className={`transition-transform px-4 py-1.5 rounded-md text-sm text-white ${
            submitting
              ? "bg-backgroundDisabled cursor-not-allowed hover:transform-none"
              : "bg-backgroundPrimary hover:bg-backgroundPrimaryHover"
          }`}
        >
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ModalFooter;
