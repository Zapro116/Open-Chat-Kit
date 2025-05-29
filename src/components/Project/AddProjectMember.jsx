import React, { useEffect, useState } from "react";
import useModalStore from "../../store/modalStore";
import { Button, Checkbox, Input, Loader, Modal } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { getOrgMembers } from "../../api/websiteApi";
import { useAuth } from "@clerk/clerk-react";
import { useParams } from "react-router-dom";

import { addMembersToProject } from "../../api/projectApi";
import { notifications } from "@mantine/notifications";

import { DEFAULT_CLERK_TEMPLATE } from "../../utils/contants";

function AddProjectMember({ loadTeamMembers }) {
  const { closeModal, modals } = useModalStore();
  const [search, setSearch] = useState("");
  const { getToken } = useAuth();
  const { project_id } = useParams();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [addingMembers, setAddingMembers] = useState(false);

  const fetchMembers = async (signal) => {
    try {
      setLoading(true);

      const { token } = await getToken({
        template: DEFAULT_CLERK_TEMPLATE,
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
    return () => {
      abortController.abort();
      setSelectedMembers([]);
    };
  }, [search, modals.addProjectMemberModal]);

  const handleAddMembers = async () => {
    try {
      setAddingMembers(true);
      const token = await getToken({ template: "neon2" });
      const addMembersParams = selectedMembers.map((user) => ({
        user_id: user.id,
        role_slug: "member",
      }));
      const response = await addMembersToProject(
        token,
        project_id,
        addMembersParams
      );
      if (response.data.success) {
        closeModal("addProjectMemberModal");
        notifications.show({
          title: "Members added successfully",
          message: "Members added successfully",
          color: "green",
          position: "top-right",
          autoClose: 3000,
        });
        setSelectedMembers([]);
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        loadTeamMembers();
      } else {
        notifications.show({
          title: "Failed to add members",
          message: response.data?.errors ?? "Failed to add members",
          color: "red",
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.log(err);
      notifications.show({
        title: "Failed to add members",
        message: err.message ?? "Failed to add members",
        color: "red",
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setAddingMembers(false);
    }
  };

  const toggleMemberSelection = (member) => {
    setSelectedMembers((prevSelectedMembers) => {
      const isSelected = prevSelectedMembers.some((m) => m.id === member.id);

      if (isSelected) {
        return prevSelectedMembers.filter((m) => m.id !== member.id);
      } else {
        return [...prevSelectedMembers, member];
      }
    });
  };

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
              checked={selectedMembers.some(
                (selectedMember) => selectedMember.id === member.id
              )}
              onChange={() => toggleMemberSelection(member)}
            />
          ))
        )}
      </div>
      <div className="w-full flex justify-end">
        <Button
          disabled={members.length === 0 || loading}
          color="var(--pagination-tabs-bg-active-color)"
          onClick={handleAddMembers}
          loading={addingMembers}
          loaderProps={{ type: "dots" }}
        >
          Add
        </Button>
      </div>
    </Modal>
  );
}

export default AddProjectMember;
