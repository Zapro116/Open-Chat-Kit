import React, { useState, useEffect, useRef } from "react";
import {
  Badge,
  Progress,
  Tooltip,
  Modal,
  Text,
  Group,
  Button,
} from "@mantine/core";
import { IconBook, IconTrash, IconLoader } from "@tabler/icons-react";
import { useAuth } from "@clerk/clerk-react";
import { fetchKnowledgeBaseStatus } from "../../api/knowledgeBaseApi";

/**
 * ProjectDetailCard component for displaying knowledge base details
 * @param {Object} knowledgeBase - The knowledge base data to display
 * @param {Function} onClick - Function to call when the card is clicked
 * @param {Function} onDelete - Function to call when the delete button is clicked
 * @param {String} deletingKbId - ID of the knowledge base currently being deleted
 * @param {String} projectId - ID of the project this knowledge base belongs to
 */
export const ProjectDetailCard = ({
  knowledgeBase,
  onDelete,
  deletingKbId,
  projectId,
}) => {
  const {
    kb_id,
    name,
    state: initialState,
    created_at,
    last_indexed_at,
    success_percentage: initialSuccessPercentage,
    integration,
    is_creator,
  } = knowledgeBase;

  // State to track the current success percentage and state
  const [currentSuccessPercentage, setCurrentSuccessPercentage] = useState(
    initialSuccessPercentage
  );
  const [currentState, setCurrentState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [pollCount, setPollCount] = useState(0);

  // State for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Refs for cleanup
  const timerRef = useRef(null);
  const abortControllerRef = useRef(null);
  const { getToken } = useAuth();

  // Function to fetch the knowledge base status
  const fetchStatus = async () => {
    if (!kb_id) return;

    try {
      setIsLoading(true);

      // Cancel any previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create a new AbortController
      abortControllerRef.current = new AbortController();

      // Get the authentication token
      let token;
      try {
        token = await getToken({
          template: "neon2",
        });
      } catch (tokenError) {
        console.error("Error getting authentication token:", tokenError);
        return;
      }

      if (!token) {
        console.error("No authentication token received");
        return;
      }

      // Fetch the knowledge base status
      const updatedKnowledgeBase = await fetchKnowledgeBaseStatus(
        token?.token ?? token,
        kb_id,
        abortControllerRef.current.signal
      );

      // Update the state if we got a valid response
      if (updatedKnowledgeBase) {
        console.log(
          `Updated status for ${name} (${kb_id}):`,
          updatedKnowledgeBase
        );
        setCurrentSuccessPercentage(updatedKnowledgeBase.success_percentage);
        setCurrentState(updatedKnowledgeBase.state);

        // Increment the poll count
        setPollCount((prevCount) => prevCount + 1);

        // If we've reached 60 polls or the state is no longer "indexing", stop polling
        if (pollCount >= 59 || updatedKnowledgeBase.state !== "indexing") {
          console.log(
            `Stopping polling for ${name} (${kb_id}) after ${
              pollCount + 1
            } polls`
          );
          return;
        }

        // Schedule the next poll
        timerRef.current = setTimeout(fetchStatus, 10000);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching knowledge base status:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Set up polling when the component mounts
  useEffect(() => {
    // Only start polling if the knowledge base is in the "indexing" state
    if (initialState === "indexing") {
      fetchStatus();
    }

    return () => {
      // Clean up timer and abort controller on unmount
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kb_id]); // Only re-run if kb_id changes

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);

    // Format: May 5, 2023 at 12:17 PM
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleDateString("en-US", options).replace(",", " at");
  };

  // Get appropriate badge color based on state
  const getBadgeColor = (state) => {
    switch (state) {
      case "indexing":
        return "blue";
      case "ready":
        return "green";
      case "failed":
        return "red";
      default:
        return "gray";
    }
  };

  // Function to handle delete confirmation
  const confirmDelete = () => {
    if (onDelete && deletingKbId !== kb_id) {
      onDelete(knowledgeBase, projectId);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div
      className={`project-detail-card bg-bgBodyColor rounded-md p-4 mb-4 relative ${
        deletingKbId === kb_id ? "opacity-70" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-[var(--stat-icon-theme-color)] flex items-center justify-center mr-2">
            <IconBook size={20} stroke={2} />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--title-text-color)]">
              {name}
            </span>
            <Badge color={getBadgeColor(currentState)} size="sm">
              {currentState}{" "}
            </Badge>
          </div>
        </div>
        {is_creator && (
          <div className="flex items-center gap-2">
            <button
              className={`p-1 rounded transition-colors ${
                deletingKbId === kb_id
                  ? "bg-bgSelectedColor cursor-not-allowed"
                  : "hover:bg-selectedColor hover:text-white"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                // Open delete confirmation modal instead of direct deletion
                console.log("Delete clicked for:", name);
                if (deletingKbId !== kb_id) {
                  setIsDeleteModalOpen(true);
                }
              }}
              disabled={deletingKbId === kb_id}
              title={deletingKbId === kb_id ? "Deleting..." : "Delete"}
            >
              {deletingKbId === kb_id ? (
                <IconLoader
                  size={16}
                  className="text-textDangerColor animate-spin"
                />
              ) : (
                <IconTrash size={16} className="text-textDangerColor" />
              )}
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 ml-10">
        <div className="flex justify-between">
          <span className="text-sm text-[var(--card-title-color)]">
            Created:
          </span>
          <span className="text-sm text-[var(--text-default-color)]">
            {formatDate(created_at)}
          </span>
        </div>

        {currentSuccessPercentage !== null && (
          <>
            <div className="flex justify-between">
              <span className="text-sm text-[var(--card-title-color)]">
                Indexing Progress:
              </span>
              <span className="text-sm text-[var(--text-default-color)]">
                {currentSuccessPercentage}%{" "}
              </span>
            </div>
            <Progress
              value={currentSuccessPercentage}
              size="sm"
              color="green"
              className="mt-1"
              striped={isLoading}
              animated={isLoading}
            />
          </>
        )}
      </div>

      {/* Delete confirmation modal */}
      <Modal
        opened={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title={<Text fw={600}>Delete Knowledge Base</Text>}
        centered
      >
        <Text size="sm" mb="xs">
          Do you want to delete "{name}" knowledge base?
        </Text>
        <Group justify="flex-end" mt="md">
          <Button
            variant="outline"
            onClick={() => setIsDeleteModalOpen(false)}
            color="gray"
          >
            Cancel
          </Button>
          <Button
            color="red"
            loading={deletingKbId === kb_id}
            loaderProps={{ type: "oval" }}
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </Group>
      </Modal>
    </div>
  );
};
