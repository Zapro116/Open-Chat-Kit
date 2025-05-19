import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Button } from "@mantine/core";
import Sidebar from "./Sidebar/Sidebar";

function SideBarVariant() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="w-full h-screen p-4 md:p-8 overflow-y-auto">
      <Button onClick={open}>Open Sidebar from Test</Button>

      <Sidebar
        opened={opened}
        open={open}
        close={close}
        title="Test Controlled Sidebar"
        showTriggerButton={false}
      >
        <p>This sidebar is controlled by the Test component.</p>
        <Button onClick={close} color="red" fullWidth mt="md">
          Close from inside
        </Button>
      </Sidebar>

      <div style={{ marginTop: "20px" }}>
        <p>Main content of the Test component.</p>
        <p>The sidebar state (opened: {opened.toString()}) is managed here.</p>
      </div>
    </div>
  );
}

export default SideBarVariant;
