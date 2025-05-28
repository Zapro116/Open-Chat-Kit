import React, { useState, useEffect, useRef } from "react";
import { Modal, Text, Center, Loader, Checkbox, Button } from "@mantine/core";
import { useAuth, useUser } from "@clerk/clerk-react";
import { IconSearch } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import {
  fetchKnowledgeBaseStatus,
  getKnowledgeBases,
} from "../../api/knowledgeBaseApi";

export const MultiSelectKnowledgeModal = ({
  opened,
  onClose,
  teamId,
  onSubmit,
}) => {
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKnowledgeBases, setSelectedKnowledgeBases] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { getToken } = useAuth();
  const { user } = useUser();

  const abortControllerRef = useRef(null);

  // Fetch knowledge bases when the modal opens
  useEffect(() => {
    if (opened) {
      // Create a new AbortController for this request
      abortControllerRef.current = new AbortController();

      const fetchData = async () => {
        setLoading(true);
        setError(null);
        setSelectedKnowledgeBases([]);

        try {
          const token = await getToken({
            template: "neon2",
          });

          const fetchedKnowledgeBases = await getKnowledgeBases(
            token,
            abortControllerRef.current.signal
          );

          console.log({ fetchedKnowledgeBases });

          setKnowledgeBases(fetchedKnowledgeBases || []);
        } catch (error) {
          if (error.name !== "AbortError" && error.name !== "CanceledError") {
            console.error("Error fetching knowledge bases:", error);
            setError("Failed to load knowledge bases. Please try again.");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchData();

      // Cleanup function to abort the request when component unmounts or modal closes
      return () => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      };
    }
  }, [opened, getToken]);

  // Filter knowledge bases based on search query
  const filteredKnowledgeBases = knowledgeBases?.filter((kb) =>
    kb.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to check if a knowledge base is selected
  const isKnowledgeBaseSelected = (kb) => {
    const kbId = kb.id || kb.kb_id;
    return selectedKnowledgeBases.some(
      (item) => (item.id || item.kb_id) === kbId
    );
  };

  // Mock API function to add knowledge bases to a project
  const addKnowledgeBaseToProject = async (teamId, knowledgeBases) => {
    try {
      const { token } = await getToken({
        template: "neon2",
      });

      const kbIds = knowledgeBases.map((knowledgeBase) => knowledgeBase?.kb_id);

      // const response = await ingestionBaseAxios(token).post(`/kb/share`, {
      //   kb_ids: kbIds,
      //   team_id: [teamId],
      //   user_id: [user?.id],
      // });
      const response = {
        data: {
          success: true,
          data: {
            message: "Knowledge bases added to project successfully",
          },
        },
      };

      notifications.show({
        title: response.data?.data?.message || "",
        color: "green",
        position: "top-right",
        autoClose: 3000,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // Handle submit button click
  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      // Call the mock API function
      const response = await addKnowledgeBaseToProject(
        teamId,
        selectedKnowledgeBases
      );

      console.log({ response });

      if (response.data?.success) {
        onSubmit(response.data?.data);
      }

      // If onSubmit callback is provided, call it
      if (onSubmit) {
        await onSubmit(selectedKnowledgeBases);
      }

      // Close the modal on success
      onClose();
    } catch (error) {
      console.error("Error adding knowledge bases to project:", error);
      setError("Failed to add knowledge bases to project. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Select Knowledge Bases"
      size="md"
      centered
      classNames={{
        header: "bg-bgCardColor border-b border-borderDefault",
        title: "text-textDefault font-medium",
        body: "bg-bgBodyColor p-0",
        close: "text-textDefault hover:bg-bgSelectedColor rounded-full",
      }}
    >
      <div className="p-4 flex flex-col gap-4">
        {/* Search input */}
        <div className="flex items-center gap-2 w-full bg-bgCardColor py-2 px-3 rounded-md border border-borderDefault">
          <IconSearch size={16} className="text-textDimmedColor" />
          <input
            type="text"
            value={searchQuery}
            placeholder="Search knowledge bases"
            className="w-full text-textDefault focus:outline-none bg-transparent"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Knowledge bases list */}
        <div className="max-h-60 overflow-y-auto">
          {loading ? (
            <Center h={100}>
              <Loader size="sm" color="var(--text-purple-color)" />
            </Center>
          ) : error ? (
            <Text size="sm" className="text-center py-4 text-red-500">
              {error}
            </Text>
          ) : filteredKnowledgeBases?.length === 0 ? (
            <Text size="sm" className="text-center py-4 text-textDimmedColor">
              No knowledge bases found
            </Text>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredKnowledgeBases?.map((kb) => (
                <div
                  key={kb.id || kb.kb_id}
                  className="flex items-center p-2 hover:bg-bgCardColor rounded-md cursor-pointer"
                  onClick={() => {
                    // Create a new array based on whether this item is already selected
                    const kbId = kb.id || kb.kb_id;
                    setSelectedKnowledgeBases((prev) => {
                      if (
                        prev.some((item) => (item.id || item.kb_id) === kbId)
                      ) {
                        return prev.filter(
                          (item) => (item.id || item.kb_id) !== kbId
                        );
                      } else {
                        return [...prev, kb];
                      }
                    });
                  }}
                >
                  <Checkbox
                    checked={isKnowledgeBaseSelected(kb)}
                    readOnly
                    className="mr-2"
                    color="var(--text-purple-color)"
                  />
                  <div className="flex flex-col">
                    <Text size="sm" className="text-textDefault">
                      {kb.name}
                    </Text>
                    {kb.integration && (
                      <Text size="xs" className="text-textDimmedColor">
                        {kb.integration.type.toUpperCase()}
                      </Text>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={submitting}
            className="!border-borderDefault !text-textDefault hover:text-textDefault hover:bg-bgCardColor"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            loading={submitting}
            disabled={selectedKnowledgeBases.length === 0 || submitting}
            className="text-textDefault transition-transform !bg-textPurple hover:bg-bgCardColorHover cursor-pointer disabled:!bg-textDimmedColor disabled:hover:bg-bgCardColor disabled:hover:scale-100 disabled:cursor-default"
          >
            Add Selected
          </Button>
        </div>
      </div>
    </Modal>
  );
};
