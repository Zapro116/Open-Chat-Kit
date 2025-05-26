import React from "react";
// import { Text, Loader, Checkbox, Badge, Alert } from "@mantine/core";
// import { IconSearch, IconInfoCircle } from "@tabler/icons-react";

/**
 * MembersTab component for displaying and selecting team members to share a knowledge base with
 * @param {Object} props - Component props
 * @param {Array} props.members - List of team members
 * @param {Array} props.selectedMembers - List of selected member IDs
 * @param {Array} props.initialSelectedMembers - List of initially selected member IDs
 * @param {boolean} props.membersLoading - Whether members are loading
 * @param {boolean} props.sharedMembersLoading - Whether shared members are loading
 * @param {boolean} props.noMembersFound - Whether no members were found
 * @param {string} props.memberSearchQuery - Search query for filtering members
 * @param {Function} props.handleMemberSearch - Function to handle member search
 * @param {Function} props.toggleMemberSelection - Function to toggle member selection
 */
const MembersTab = ({
  members,
  membersLoading,
  finalShareList,
  noMembersFound,
  memberSearchQuery,
  handleMemberSearch,
  toggleMemberSelection,
}) => {
  return (
    <div className="pt-4">
      {/* Search input for members */}
      <div className="flex items-center gap-2 w-full bg-bgCardColor rounded border border-borderDefault py-2 px-3 mb-4">
        {/* <IconSearch size={16} className="text-textDimmedColor" /> */}
        <span className="text-textDimmedColor">🔍</span>
        <input
          type="text"
          value={memberSearchQuery}
          onChange={handleMemberSearch}
          placeholder="Search name or email address"
          className="w-full border-none outline-none bg-transparent text-textDefault"
        />
      </div>

      {/* Members list */}
      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto custom-scrollbar">
        {membersLoading && members.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32">
            {/* <Loader size="sm" color="var(--text-purple-color)" /> */}
            {/* <Text size="xs" className="mt-2 text-textDimmedColor"> */}
            <p className="mt-2 text-textDimmedColor text-xs">
              {membersLoading && members.length === 0
                ? "Loading members..."
                : "Loading shared settings..."}
            </p>
            {/* </Text> */}
          </div>
        ) : members?.length > 0 ? (
          members.map((user, index) => (
            <div
              key={user.user_id}
              className="flex items-center p-2 hover:bg-bgSelectedColor rounded-md cursor-pointer transition-colors duration-200"
              onClick={() => toggleMemberSelection(user)}
            >
              {/* <Checkbox
                classNames={{ inner: "my-auto" }}
                checked={finalShareList.user_id?.some(id => id === user.user_id) || false}
                color="var(--background-primary)"
                styles={{
                  input: {
                    cursor: "pointer",
                    "&:checked": {
                      backgroundColor: "var(--text-purple-color)",
                      borderColor: "var(--text-purple-color)",
                    },
                  },
                  icon: { color: "white" },
                }}
                readOnly
              /> */}
              <input
                type="checkbox"
                checked={
                  finalShareList.user_id?.some((id) => id === user.user_id) ||
                  false
                }
                className="my-auto mr-2 cursor-pointer accent-text-purple-color"
                readOnly
              />
              <div className="flex flex-col ml-2 flex-grow">
                {/* <Text size="sm" className="text-textDefault font-medium"> */}
                <p className="text-textDefault font-medium text-sm">
                  {(user?.firstName ? user.firstName.trim() : "") +
                    " " +
                    (user?.lastName ? user.lastName.trim() : "") ||
                    user?.email ||
                    "Unknown User"}
                </p>
                {/* </Text> */}
                {user?.email && (
                  // <Text size="xs" className="text-textDimmedColor">
                  <p className="text-textDimmedColor text-xs">{user.email}</p>
                  // </Text>
                )}
              </div>
              {user.has_access && (
                // <Badge
                //   size="xs"
                //   className="ml-auto bg-textPurple text-white"
                //   variant="filled"
                // >
                <span className="ml-auto bg-textPurple text-white text-xs px-2 py-1 rounded-full">
                  Shared
                </span>
                // </Badge>
              )}
            </div>
          ))
        ) : noMembersFound && !membersLoading ? (
          <div className="flex justify-center items-center h-32 text-textDimmedColor">
            <p>No Members Found</p>
          </div>
        ) : null}
        {membersLoading && members.length > 0 && (
          <div className="flex justify-center items-center py-4">
            {/* <Loader size="sm" color="var(--text-purple-color)" /> */}
            <p className="text-textDimmedColor text-xs">Loading...</p>
          </div>
        )}
      </div>

      {/* <Alert
        variant="light"
        color="gray"
        className="px-3 py-2 mt-4 bg-bgCardColor border border-borderDefault"
        classNames={{ icon: "mr-2 text-textDimmedColor" }}
        icon={<IconInfoCircle size={16} />}
      >
        <Text size="xs" className="text-textDimmedColor">
          Note: Members must be invited in the organization first in order to be
          added in a project.
        </Text>
      </Alert> */}
      <div className="px-3 py-2 mt-4 bg-bgCardColor border border-borderDefault flex items-start">
        <span className="mr-2 text-textDimmedColor">ℹ️</span>
        <p className="text-textDimmedColor text-xs">
          Note: Members must be invited in the organization first in order to be
          added in a project.
        </p>
      </div>
    </div>
  );
};

export default MembersTab;
