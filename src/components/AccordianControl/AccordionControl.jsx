import React from "react";
import { Accordion, Center, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import useModalStore from "../../store/modalStore";

export function AccordionControl(props) {
  const { accordionType, ...restProps } = props;
  const { openModal, setShowExistingKbInContextModal } = useModalStore();
  return (
    <Center classNames={{ label: "!p-0" }}>
      <Accordion.Control
        classNames={{ label: "p-2 m-0 text-sm" }}
        {...restProps}
      />
      <ActionIcon
        size="lg"
        variant="subtle"
        color="gray"
        onClick={() => {
          if (accordionType === "knowledge") {
            setShowExistingKbInContextModal(false);
            openModal("contextModal");
          } else {
            openModal("addProjectModal");
          }
        }}
      >
        <IconPlus size={16} />
      </ActionIcon>
    </Center>
  );
}
