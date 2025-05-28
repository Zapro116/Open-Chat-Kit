import React, { useEffect, useState } from "react";
import useModalStore from "../../store/modalStore";
import { Input, Modal } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { getOrgMembers } from "../../api/websiteApi";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

function AddProjectMember() {
  const { closeModal, modals } = useModalStore();
  const [search, setSearch] = useState("");
  const { getToken } = useAuth();
  const { project_id } = useParams();

  const fetchMembers = async (signal) => {
    try {
      const { token } = await getToken({
        template: "neon2",
      });
      const payload = {
        query: "",
        team_id: project_id,
        limit: 10,
        offset: 0,
      };
      const response = await getOrgMembers(token, payload, signal);
      console.log({ response });
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Error fetching members:", error);
      }
    }
  };
  useEffect(() => {
    const abortController = new AbortController();
    fetchMembers(abortController.signal);
    return () => abortController.abort();
  }, [search]);

  return (
    <Modal
      opened={modals.addProjectMemberModal}
      onClose={() => closeModal("addProjectMemberModal")}
      title="Add Member"
      centered
    >
      <Input
        placeholder="Search for members"
        leftSection={<IconSearch size={16} />}
      />
    </Modal>
  );
}

export default AddProjectMember;
