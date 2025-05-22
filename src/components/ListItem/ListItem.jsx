import React, { useState } from "react";
import {
  Box,
  Group,
  Text,
  ThemeIcon,
  ActionIcon,
  Popover,
} from "@mantine/core";
import {
  IconFolder,
  IconDots,
  IconTrash,
  IconPencil,
} from "@tabler/icons-react";

const ListItem = ({
  name,
  icon,
  onClick = () => {},
  onEdit = () => {},
  onDelete = () => {},
  knowledge,
}) => {
  const [isMoreOptions, setIsMoreOptions] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);

  return (
    <Box
      className="w-full max-w-[400px] hover:bg-bgCardColor cursor-pointer"
      onMouseOver={() => setIsMoreOptions(true)}
      onMouseLeave={() => setIsMoreOptions(false)}
    >
      <Group justify="space-between" className="mr-2" onClick={onClick}>
        <Group className="p-1" classNames={{ root: "!gap-2" }}>
          <ThemeIcon variant="light" color="gray">
            {icon ? icon : <IconFolder size={20} />}
          </ThemeIcon>
          <Text>{name}</Text>
        </Group>
        {isMoreOptions && (
          <Popover opened={optionsOpen} offset={0} position="bottom-end">
            <div
              onClick={(e) => {
                setOptionsOpen(true);
                e.stopPropagation();
              }}
              onMouseLeave={() => setOptionsOpen(false)}
            >
              <Popover.Target>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  onClick={(e) => {
                    setOptionsOpen(true);
                    e.stopPropagation();
                  }}
                >
                  <IconDots size={18} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown className="!p-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(knowledge);
                    setOptionsOpen(false);
                  }}
                  className="flex gap-2 items-center w-full px-3 py-2 text-textDefault text-sm"
                >
                  <IconPencil size={14} />
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(knowledge);
                  }}
                  className="flex gap-2 items-center w-full px-3 py-2 text-textDangerColor text-sm"
                >
                  <IconTrash size={14} />
                  Delete
                </button>
              </Popover.Dropdown>
            </div>
          </Popover>
        )}
      </Group>
    </Box>
  );
};

export default ListItem;
