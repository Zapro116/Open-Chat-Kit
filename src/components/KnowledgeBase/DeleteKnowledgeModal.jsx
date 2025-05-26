import React from "react";
import { Button, Group, Modal, Text } from "@mantine/core";
import { KNOWLEDGE_BASE_EDIT_LABEL } from "../../utils/contants";

function DeleteKnowledgeModal({ opened, setOpened, knowledge, onDelete }) {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={`Delete ${KNOWLEDGE_BASE_EDIT_LABEL}`}
      centered
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Text size="sm" mb="lg">
        Do you want to delete "{knowledge?.name}" knowledge base?
      </Text>
      <Group justify="flex-end" mt="md">
        <Button
          variant="outline"
          onClick={(e) => {
            setOpened(false);
          }}
          color="gray"
        >
          Cancel
        </Button>
        <Button
          color="red"
          onClick={() => {
            onDelete(knowledge);
          }}
        >
          Delete
        </Button>
      </Group>
    </Modal>
  );
}

export default DeleteKnowledgeModal;
