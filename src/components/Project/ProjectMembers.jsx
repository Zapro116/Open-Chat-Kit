import React, { useEffect, useState } from "react";
import {
  IconPencil,
  IconPlus,
  IconTrash,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Button, Select, Loader } from "@mantine/core";
import useModalStore from "../../store/modalStore";
import { deleteTeamMember, updateTeamMembers } from "../../api/projectApi";
import { notifications } from "@mantine/notifications";
/**
 * ProjectMembers component for displaying and managing project members
 * @param {Array} members - List of project members
 */
export const ProjectMembers = ({
  members = [],
  isOwner = false,
  setMembers,
  loadTeamMembers,
  teamMembersLoading = false,
}) => {
  const params = useParams();
  const [editMode, setEditMode] = useState(false);
  const [updatedUsers, setUpdatedUsers] = useState({});
  const { getToken } = useAuth();
  const { user } = useUser();
  const { openModal, closeModal, modals } = useModalStore();
  const [teamId, setTeamId] = useState("");
  const [deletingMember, setDeletingMember] = useState(false);
  const OWNER_SLUG = "owner";

  // Handle add member button click
  const handleAddMemberClick = async () => {
    openModal("addProjectMemberModal");
  };

  useEffect(() => {
    setTeamId(params.project_id);
    return () => {
      setTeamId("");
    };
  }, []);

  const handleDeleteMember = async (member) => {
    try {
      setDeletingMember(true);
      const token = await getToken({
        template: "neon2",
      });
      const deletedUser = await deleteTeamMember(
        token,
        params.project_id,
        member.id
      );
      if (deletedUser.data.success) {
        const membersData = await loadTeamMembers(token);
        setMembers(membersData ?? []);
        notifications.show({
          title: "Member removed successfully",
          color: "green",
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        notifications.show({
          title: "Failed to remove member",
          message: deletedUser.data?.errors ?? "Failed to remove member",
          color: "red",
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.log(err);
      notifications.show({
        title: "Failed to remove member",
        message: err.message ?? "Failed to remove member",
        color: "red",
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setDeletingMember(false);
    }
  };

  const saveUpdatedRoles = async () => {
    try {
      const token = await getToken({
        template: "neon2",
      });
      const payload = Object.entries(updatedUsers).map(([userId, role]) => ({
        user_id: userId,
        role_slug: role,
      }));
      const response = await updateTeamMembers(token, params.project_id, {
        members: payload,
      });
      console.log(response);
      await loadTeamMembers(token);
      setEditMode(false);
      setUpdatedUsers({});
    } catch (err) {
      console.log(err);
    }
  };

  const handleRoleChange = (role, userId) => {
    setUpdatedUsers((prev) => ({
      ...prev,
      [userId]: role?.toLowerCase(),
    }));
  };

  return (
    <div className="border border-solid border-borderDefault rounded-md p-4 flex flex-col h-full overflow-hidden">
      <div className="flex items-start border-b border-borderDefault border-solid pb-4">
        <div className="flex gap-2">
          <IconUsers size={20} stroke={2} />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-textDefault">
              Shared With
            </p>
            <p className="text-xs text-textDimmedColor text-wrap">
              You can only add those members within this organization
            </p>
          </div>
        </div>
        {isOwner && (
          <button
            className="flex items-center bg-bgCardColor border border-borderDefault  hover:text-textDefault border-solid text-textDefault px-3 py-1 w-fit rounded text-sm ml-auto"
            onClick={handleAddMemberClick}
            disabled={teamMembersLoading}
          >
            <IconPlus size={16} className="mr-1" />
            Add Member
          </button>
        )}
      </div>

      <div
        className="overflow-y-auto flex-grow pr-2 mt-3"
        style={{
          maxHeight: "calc(100% - 60px)",
          scrollbarWidth: "thin",
        }}
      >
        <div className="mt-2 flex justify-between mb-4">
          <span className="text-sm text-textTitleColor">Members</span>
          {editMode ? (
            <div className="flex gap-2">
              <Button
                variant="outline"
                color="gray"
                size="compact-xs"
                className="text-xs"
                onClick={() => setEditMode(false)}
                disabled={teamMembersLoading}
              >
                Cancel
              </Button>
              <Button
                variant="filled"
                size="compact-xs"
                color="var(--text-purple-color)"
                className="text-xs"
                onClick={saveUpdatedRoles}
                disabled={teamMembersLoading}
              >
                Save
              </Button>
            </div>
          ) : (
            members.some(
              (member) =>
                member?.id === user?.id &&
                member?.role?.toLowerCase() === OWNER_SLUG
            ) && (
              <Button
                variant="transparent"
                className="px-1 !text-textDefault hover:text-textDefault"
                classNames={{
                  label: "text-xs",
                  inner: "h-fit",
                  section: "mr-1",
                }}
                leftSection={<IconPencil size={16} stroke={2} />}
                onClick={() => setEditMode(true)}
                size="compact-xs"
                disabled={teamMembersLoading}
              >
                Edit
              </Button>
            )
          )}
        </div>
        {!teamMembersLoading ? (
          members.length > 0 ? (
            <div className="space-y-2">
              {members.map((member, index) => (
                <div
                  key={`${member.id}-${index}`}
                  className="p-2 mb-1 rounded hover:bg-bgSelectedColor transition-colors flex justify-between items-center"
                >
                  <div className="flex items-center">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.firstName}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-textPurple text-white flex items-center justify-center mr-2 text-xs">
                        {member?.firstName?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm text-textDefault truncate">
                      {member?.firstName}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    {editMode ? (
                      <Select
                        classNames={{ input: "text-xs max-w-[120px]" }}
                        checkIconPosition="right"
                        data={["Owner", "Member"]}
                        defaultValue={member.role || "Member"}
                        size="xs"
                        onChange={(value) => handleRoleChange(value, member.id)}
                        disabled={teamMembersLoading}
                        allowDeselect={false}
                      />
                    ) : (
                      <span className="text-sm text-textDimmedColor px-2 py-1 bg-bgSelectedColor rounded">
                        {member?.role || "Member"}
                      </span>
                    )}
                    {isOwner && (
                      <span
                        className="cursor-pointer"
                        onClick={() =>
                          !teamMembersLoading &&
                          !deletingMember &&
                          handleDeleteMember(member)
                        }
                        disabled={teamMembersLoading || deletingMember}
                      >
                        <IconTrash size={16} stroke={2} />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-sm text-textDimmedColor mb-4">
                No members have been added to this project yet.
              </p>
              {isOwner && (
                <button
                  className="flex items-center bg-textPurple text-white px-3 py-2 rounded transition-transform"
                  onClick={handleAddMemberClick}
                >
                  <IconUserPlus size={16} className="mr-2" />
                  Add First Member
                </button>
              )}
            </div>
          )
        ) : (
          <div className="flex justify-center items-center h-full">
            <Loader size="md" color="var(--text-purple-color)" />
          </div>
        )}
      </div>
    </div>
  );
};
