import React from "react";
import {
  Accordion,
  Center,
  ActionIcon,
  AccordionControlProps,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

// interface AccordionControlComponentProps extends AccordionControlProps {
//   setOpenedAccordian: (
//     value: () => { knowledge: boolean; projects: boolean }
//   ) => void;
//   accordionType: "knowledge" | "projects";
// }

export function AccordionControl(props) {
  const { accordionType, setOpenedAccordian, ...restProps } = props;
  // const { setCurrentPopup, setAddKnowledgeDetails } = useKnowledgeSourceStore();
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
          // if (accordionType === "knowledge") {
          //   setCurrentPopup("addKnowledgeThroughName");
          //   setAddKnowledgeDetails({
          //     sendProjectId: false,
          //   });
          // } else {
          //   setOpenedAccordian(() => ({
          //     knowledge: false,
          //     projects: true,
          //   }));
          // }
        }}
      >
        <IconPlus size={16} />
      </ActionIcon>
    </Center>
  );
}
