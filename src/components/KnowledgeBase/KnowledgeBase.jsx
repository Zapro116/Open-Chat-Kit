import React, { useState, useEffect } from "react";
import ListItem from "../ListItem/ListItem";
import { IconBook } from "@tabler/icons-react";
import { getKnowledgeBases } from "../../api/knowledgeBaseApi";
import { EditKnowledgeModal } from "./EditKnowledgeModal";
import DeleteKnowledgeModal from "./DeleteKnowledgeModal";
import { useNavigate } from "react-router-dom";
import { KNOWLEDGE_BASE_ROUTE } from "../../utils/contants";

function KnowledgeBase() {
  const [knowledgeBase, setKnowledgeBase] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editKnowledge, setEditKnowledge] = useState(null);
  const [deleteKnowledge, setDeleteKnowledge] = useState(null);

  const navigate = useNavigate();

  const fetchKnowledgeBases = async () => {
    try {
      //   const response = await axios.get(API_ENDPOINTS.PROJECTS);
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await getKnowledgeBases();
      console.log({ response });
      setKnowledgeBase(response);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKnowledgeBases();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col w-full cursor-default max-h-[200px] overflow-y-auto">
      {knowledgeBase?.map((knowledge) => (
        <ListItem
          key={knowledge.kb_id}
          name={knowledge.name}
          icon={<IconBook size={20} />}
          knowledge={knowledge}
          onClick={() => {
            navigate(`/${KNOWLEDGE_BASE_ROUTE}/${knowledge.kb_id}`);
          }}
          onEdit={(knowledge) => {
            setEditKnowledge(knowledge);
          }}
          onDelete={(knowledge) => {
            setDeleteKnowledge(knowledge);
          }}
        />
      ))}
      {editKnowledge && (
        <EditKnowledgeModal
          knowledge={{
            knowledgeName: editKnowledge.name,
            id: editKnowledge.kb_id,
          }}
          onClose={() => {
            setEditKnowledge(null);
          }}
          onEditSubmit={() => {
            setEditKnowledge(null);
          }}
        />
      )}
      {deleteKnowledge && (
        <DeleteKnowledgeModal
          opened={deleteKnowledge}
          setOpened={setDeleteKnowledge}
          knowledge={deleteKnowledge}
          onDelete={(knowledge) => {
            console.log(knowledge);
            // setDeleteKnowledge(null);
          }}
        />
      )}
    </div>
  );
}

export default KnowledgeBase;
