import React, { useEffect, useState } from "react";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { getKnowledgeBases } from "../../api/knowledgeBaseApi";
import useModalStore from "../../store/modalStore";
import useChatStore from "../../store/chatStore";

function SearchKnowledgeBase() {
  const [search, setSearch] = useState("");
  const [knowledgeBases, setKnowledgeBases] = useState([]);
  const { closeModal } = useModalStore();

  const { setContext } = useChatStore();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const fetchKnowledgeBases = async () => {
    const response = await getKnowledgeBases();
    setKnowledgeBases(response);
  };

  useEffect(() => {
    fetchKnowledgeBases();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        <Input
          leftSection={<IconSearch size={16} />}
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="py-1 border-b border-borderDefault"></div>
      <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
        {knowledgeBases
          ?.filter((kb) => kb.name.toLowerCase().includes(search.toLowerCase()))
          ?.map((kb) => (
            <div
              key={kb.id}
              onClick={() => {
                console.log("kb", kb);
                setContext(kb);
                closeModal("contextModal");
              }}
              className="flex items-center gap-2 px-2 border-b border-borderDefault p-1 hover:bg-bgSelectedColor cursor-pointer"
            >
              <span className="text-sm text-textDefault">{kb.name}</span>
              <span className="text-xs text-textDimmedColor bg-bgCardColor rounded-md px-2 py-1 border border-borderDefault">
                {kb.integration.type.toUpperCase()}
              </span>
              <span className="text-xs text-textDimmedColor bg-bgSelectedColor rounded-md px-2 py-1">
                {kb.state.toUpperCase()}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchKnowledgeBase;
