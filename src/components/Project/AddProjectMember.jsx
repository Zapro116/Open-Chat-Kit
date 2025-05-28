import React, { useEffect, useState } from "react";
import useModalStore from "../../store/modalStore";
import { Button, Checkbox, Input, Loader, Modal } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { getOrgMembers } from "../../api/websiteApi";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

function AddProjectMember() {
  const { closeModal, modals } = useModalStore();
  const [search, setSearch] = useState("");
  const { getToken } = useAuth();
  const { project_id } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMembers = async (signal) => {
    try {
      setLoading(true);
      const token = await getToken({
        template: "neon2",
      });

      if (!token) {
        return;
      }

      const payload = {
        query: search,
        team_id: project_id,
        limit: 10,
        offset: 0,
      };
      const response = await getOrgMembers(token, payload, signal);
      console.log({ response });
      setMembers(response.data?.data?.members ?? []);
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Error fetching members:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (modals.addProjectMemberModal) {
      fetchMembers(abortController.signal);
    }
    return () => abortController.abort();
  }, [search, modals.addProjectMemberModal]);

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
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex flex-col gap-4 py-3">
        {loading ? (
          <div className="flex justify-center items-center h-[200px]">
            <Loader
              type="bars"
              color="var(--pagination-tabs-bg-active-color)"
            />
          </div>
        ) : (
          members.map((member) => (
            <Checkbox
              key={member.id}
              label={`${member.firstName?.trim()} ${member.lastName?.trim()}`}
              className="ml-2"
              color="var(--pagination-tabs-bg-active-color)"
            />
          ))
        )}
      </div>
      <div className="w-full flex justify-end">
        <Button
          disabled={members.length === 0 || loading}
          color="var(--pagination-tabs-bg-active-color)"
        >
          Add
        </Button>
      </div>
    </Modal>
  );
}

export default AddProjectMember;
