import React from "react";
import { Button, Group, Modal, Text } from "@mantine/core";
import { PROJECT_EDIT_LABEL } from "../../utils/contants";

function DeleteProjectModal({ opened, setOpened, project, onDelete }) {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(null)}
      title={`Delete ${PROJECT_EDIT_LABEL}`}
      centered
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Text size="sm" mb="lg">
        Do you want to delete "{project?.name}" project?
      </Text>
      <Group justify="flex-end" mt="md">
        <Button
          variant="outline"
          onClick={(e) => {
            setOpened(null);
          }}
          color="gray"
        >
          Cancel
        </Button>
        <Button
          color="red"
          onClick={() => {
            onDelete(project);
          }}
        >
          Delete
        </Button>
      </Group>
    </Modal>
  );
}

export default DeleteProjectModal;
