import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchKnowledgeBaseStatus } from "../../api/knowledgeBaseApi";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "../Navbar/Navbar";
import {
  IconArrowLeft,
  IconPencil,
  IconRefresh,
  IconShare,
  IconTrash,
} from "@tabler/icons-react";
import { Button } from "@mantine/core";
import { KNOWLEDGE_BASE_EDIT_LABEL } from "../../utils/contants";
import { KnowledgeBaseDetailCard } from "./KnowledgeBaseDetailCard";
import useModalStore from "../../store/modalStore";
import { ShareKnowledgeBaseModal } from "./share/ShareKnowledgeBaseModal";
import DeleteKnowledgeModal from "./DeleteKnowledgeModal";

function KnowledgeBaseDetails() {
  const { kb_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [knowledgeBase, setKnowledgeBase] = useState(null);
  const navigate = useNavigate();

  const abortControllerRef = useRef(null);

  const { openModal, modals, closeModal } = useModalStore();
  const { getToken } = useAuth();

  const loadKnowledgeBase = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Create a new AbortController for this request
      abortControllerRef.current = new AbortController();

      // Get the authentication token
      const token = await getToken();

      // Use the API function to fetch knowledge base status
      const knowledgeBaseData = await fetchKnowledgeBaseStatus(
        token,
        kb_id,
        abortControllerRef.current.signal
      );

      console.log({ knowledgeBaseData });

      if (knowledgeBaseData) {
        setKnowledgeBase(knowledgeBaseData);
      } else {
        setError("Knowledge base not found");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching knowledge base:", error);
        setError("Failed to load knowledge base");
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [getToken, kb_id]);

  useEffect(() => {
    loadKnowledgeBase();
  }, [loadKnowledgeBase]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleResyncKnowledgeBase = () => {
    // navigate(-1);
  };

  const handleEditKnowledgeBase = () => {
    // navigate(-1);
  };

  const handleShareKnowledgeBase = () => {
    // navigate(-1);
    openModal("shareKnowledgeBaseModal");
  };

  const handleDeleteKnowledgeBase = () => {
    // navigate(-1);
    openModal("deleteKnowledgeBaseModal");
  };

  return (
    <div className="w-full h-full bg-bgCardColor">
      <Navbar />
      <div className="container mx-auto px-4 py-4 knowledge-base-details">
        {/* Header with back button and knowledge base name */}
        <div className="flex items-center mb-4 mt-[72px]">
          <button
            className="text-textDefault mr-2 hover:bg-bgSelectedColor p-1 rounded"
            onClick={handleBackClick}
          >
            <IconArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-semibold text-textDefault">
            {knowledgeBase?.name ?? "Loading..."}
          </h2>
          {knowledgeBase?.name && (
            <button
              className="text-textDefault ml-2 hover:bg-bgSelectedColor p-1 rounded"
              onClick={handleEditKnowledgeBase}
              title="Edit Knowledge Base"
            >
              <IconPencil size={16} />
            </button>
          )}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 gap-6">
          {/* Knowledge base details */}
          <div className="bg-transparent rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-textDefault">
                {KNOWLEDGE_BASE_EDIT_LABEL} Information
              </h3>
              {knowledgeBase?.is_creator && (
                <div className="flex gap-2">
                  <button
                    className="text-white bg-backgroundPrimary hover:bg-backgroundPrimaryHover transition-transform p-1.5 rounded"
                    onClick={handleResyncKnowledgeBase}
                    title="Resync Knowledge Base"
                    // disabled={isResyncing}
                  >
                    <IconRefresh size={16} />
                  </button>
                  <button
                    className="text-white bg-backgroundPrimary hover:bg-backgroundPrimaryHover transition-transform p-1.5 rounded"
                    onClick={handleShareKnowledgeBase}
                    title="Share Knowledge Base"
                  >
                    <IconShare size={16} />
                  </button>
                  <button
                    className="text-white bg-backgroundPrimary hover:bg-backgroundPrimaryHover transition-transform p-1.5 rounded"
                    onClick={handleDeleteKnowledgeBase}
                    title="Delete Knowledge Base"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              )}
            </div>
            <KnowledgeBaseDetailCard knowledgeBase={knowledgeBase} />
            {knowledgeBase?.update_token && (
              <div className="mt-4">
                <Button
                  color="var(--pagination-tabs-bg-active-color)"
                  onClick={() => {
                    // setUpdateTokenModalOpen(true);
                  }}
                >
                  Update PAT Token
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <ShareKnowledgeBaseModal
        opened={modals?.shareKnowledgeBaseModal}
        onClose={() => closeModal("shareKnowledgeBaseModal")}
        knowledgeBase={knowledgeBase}
      />
      <DeleteKnowledgeModal
        opened={modals?.deleteKnowledgeBaseModal}
        setOpened={() => closeModal("deleteKnowledgeBaseModal")}
        knowledge={knowledgeBase}
        onDelete={(knowledge) => {
          console.log(knowledge);
          // setDeleteKnowledge(null);
        }}
      />
    </div>
  );
}

export default KnowledgeBaseDetails;
