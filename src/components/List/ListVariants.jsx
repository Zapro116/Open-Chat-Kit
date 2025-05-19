import React from "react";
// import { useDisclosure } from "@mantine/hooks"; // No longer used, can be removed if not needed elsewhere
// import { Button } from "@mantine/core"; // No longer used, can be removed if not needed elsewhere
// import Sidebar from "./Sidebar/Sidebar"; // No longer used, can be removed if not needed elsewhere
import {
  ThemeIcon,
  Text,
  Paper,
  MantineProvider,
  Badge,
  Progress,
  Avatar,
  ActionIcon,
  Group,
  Stack,
  Box,
} from "@mantine/core"; // Added MantineProvider, Badge, Progress, Avatar, ActionIcon, Group, Stack, Box
import {
  IconCircleCheck,
  IconCircleDashed,
  IconAlertCircle,
  IconStar,
  IconX,
  IconCoffee,
  IconListNumbers,
  IconBulb,
  IconFish,
  IconCheese,
  IconBook, // Added for Knowledge Source
  IconTrash, // Added for delete actions
  IconUserCircle, // Added for Member
  IconFolder, // Added for Folder
  IconDots, // Added for more options
} from "@tabler/icons-react";
import List from "./List/List"; // Import your custom List component

// Custom components for demonstration
const CustomLabelComponent = ({ text, color }) => (
  <Text span c={color} fw={700}>
    {text}
  </Text>
);

const CustomListItemComponent = ({ children, icon }) => (
  <MantineProvider>
    {" "}
    {/* Ensure Mantine context if used standalone and needs it */}
    <Paper
      shadow="xs"
      p="xs"
      withBorder
      style={{ display: "flex", alignItems: "center" }}
    >
      {icon && <span style={{ marginRight: "8px" }}>{icon}</span>}
      {children}
    </Paper>
  </MantineProvider>
);

// --- New Custom Item Components for Image-Based Examples ---

// 1. Knowledge Source Item
const KnowledgeSourceItem = ({
  title,
  status,
  createdDate,
  progress,
  onDelete,
}) => (
  <Paper
    p="md"
    withBorder
    shadow="sm"
    style={{ width: "100%", maxWidth: "400px" }}
  >
    <Group justify="space-between" mb="xs">
      <Group gap="sm">
        <ThemeIcon variant="light" size="lg">
          <IconBook size={20} />
        </ThemeIcon>
        <Text fw={500}>{title}</Text>
        <Badge color={status === "ERROR" ? "red" : "green"} variant="light">
          {status}
        </Badge>
      </Group>
      {onDelete && (
        <ActionIcon variant="subtle" color="gray" onClick={onDelete}>
          <IconTrash size={18} />
        </ActionIcon>
      )}
    </Group>
    <Text size="xs" c="dimmed">
      Created: {createdDate}
    </Text>
    <Text size="xs" mt="sm">
      Indexing Progress: {progress}%
    </Text>
    <Progress
      value={progress}
      mt="xs"
      size="sm"
      color={status === "ERROR" ? "red" : "blue"}
    />
  </Paper>
);

// 2. Member Item
const MemberItem = ({ avatarChar, name, role, onDelete }) => (
  <Box style={{ width: "100%", maxWidth: "400px" }}>
    <Group
      justify="space-between"
      p="sm"
      style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
    >
      <Group>
        <Avatar color="blue" radius="xl">
          {avatarChar}
        </Avatar>
        <Text fw={500}>{name}</Text>
      </Group>
      <Group>
        <Badge color={role === "Owner" ? "orange" : "gray"}>{role}</Badge>
        {onDelete && (
          <ActionIcon variant="subtle" color="gray" onClick={onDelete}>
            <IconTrash size={18} />
          </ActionIcon>
        )}
      </Group>
    </Group>
  </Box>
);

// 3. Folder Item
const FolderItem = ({ name, onMoreOptions }) => (
  <Box style={{ width: "100%", maxWidth: "400px" }}>
    <Group
      justify="space-between"
      p="sm"
      style={{ borderBottom: "1px solid var(--mantine-color-gray-2)" }}
    >
      <Group>
        <ThemeIcon variant="light" color="gray">
          <IconFolder size={20} />
        </ThemeIcon>
        <Text>{name}</Text>
      </Group>
      {onMoreOptions && (
        <ActionIcon variant="subtle" color="gray" onClick={onMoreOptions}>
          <IconDots size={18} />
        </ActionIcon>
      )}
    </Group>
  </Box>
);

function ListVariants() {
  const simpleItems = ["Apples", "Bananas", "Cherries"];

  const objectItemsWithIcons = [
    {
      label: "Task 1",
      icon: {
        iconComponent: IconCircleCheck,
        themeIconProps: { color: "green" },
      },
    },
    {
      label: "Task 2",
      icon: {
        iconComponent: IconCircleDashed,
        themeIconProps: { color: "blue" },
      },
    },
    {
      label: "Task 3 - High Priority",
      icon: (
        <ThemeIcon color="red" size={24} radius="xl">
          <IconAlertCircle size={16} />
        </ThemeIcon>
      ),
    },
  ];

  const nestedItems = [
    {
      label: "Fruits",
      children: [
        "Apple",
        "Banana",
        { label: "Berries", children: ["Strawberry", "Blueberry"] },
      ],
    },
    { label: "Vegetables", children: ["Carrot", "Broccoli"] },
  ];

  const customLabelItems = [
    { label: <CustomLabelComponent text="Custom Success" color="green" /> },
    { label: <CustomLabelComponent text="Custom Warning" color="orange" /> },
  ];

  const directCustomElementItems = [
    <CustomListItemComponent key="custom1" icon={<IconStar size={20} />}>
      Direct Custom Element 1 (Star)
    </CustomListItemComponent>,
    <CustomListItemComponent key="custom2" icon={<IconCoffee size={20} />}>
      Direct Custom Element 2 (Coffee)
    </CustomListItemComponent>,
    // You can also pass MantineList.Item directly if you want full control from here
    <List.Item
      key="mantineItem"
      icon={
        <ThemeIcon color="grape">
          <IconFish size={16} />
        </ThemeIcon>
      }
    >
      Direct Mantine List.Item
    </List.Item>,
  ];

  // --- Data for New Image-Based Examples ---
  const knowledgeSourceData = [
    {
      id: "ks1",
      title: "Azure 2",
      status: "ERROR",
      createdDate: "May 12 at 2025, 10:25 PM",
      progress: 0,
    },
    {
      id: "ks2",
      title: "Sharepoint Docs",
      status: "Indexed",
      createdDate: "May 10 at 2025, 08:15 AM",
      progress: 100,
    },
  ];

  const memberData = [
    { id: "m1", avatarChar: "M", name: "Mitanshu", role: "Member" },
    { id: "h1", avatarChar: "H", name: "Hariom", role: "Owner" },
    { id: "a1", avatarChar: "A", name: "Alex", role: "Member" },
  ];

  const folderData = [
    { id: "f1", name: "Testing 00", hasMoreOptions: true },
    { id: "f2", name: "hariom test", hasMoreOptions: false },
    { id: "f3", name: "Project Alpha", hasMoreOptions: true },
  ];

  return (
    <div className="w-full h-[calc(100vh-100px)] p-4 md:p-8 overflow-y-auto">
      <h2 style={{ marginTop: "20px" }}>1. Simple List</h2>
      <List items={simpleItems} />

      <h2 style={{ marginTop: "20px" }}>2. Ordered List</h2>
      <List items={simpleItems} ordered />

      <h2 style={{ marginTop: "20px" }}>
        3. List with Global Icon (ThemeIcon config)
      </h2>
      <List
        items={["Global Check 1", "Global Check 2"]}
        icon={{
          iconComponent: IconCircleCheck,
          themeIconProps: { color: "teal", size: 24, radius: "xl" },
          iconSize: 16,
        }}
        spacing="sm"
      />

      <h2 style={{ marginTop: "20px" }}>
        4. List with Global Icon (Direct ReactNode)
      </h2>
      <List
        items={["Global Bulb 1", "Global Bulb 2"]}
        icon={
          <ThemeIcon color="yellow" size={24} radius="xl">
            <IconBulb size={16} />
          </ThemeIcon>
        }
        spacing="sm"
      />

      <h2 style={{ marginTop: "20px" }}>5. List with Item-Specific Icons</h2>
      <List items={objectItemsWithIcons} spacing="xs" size="sm" center />

      <h2 style={{ marginTop: "20px" }}>6. Nested List</h2>
      <List items={nestedItems} listStyleType="disc" withPadding />

      <h2 style={{ marginTop: "20px" }}>
        7. List with Custom Component Labels
      </h2>
      <List items={customLabelItems} icon={<IconX size={16} />} />

      <h2 style={{ marginTop: "20px" }}>
        8. List with Direct Custom Element Items
      </h2>
      <List items={directCustomElementItems} spacing="md" />

      <h2 style={{ marginTop: "20px" }}>
        9. Large List, Centered, with Padding and Custom Default Icon
      </h2>
      <List
        items={["Item A", "Item B", "Item C"]}
        size="lg"
        spacing="md"
        center
        withPadding
        icon={{
          iconComponent: IconListNumbers,
          themeIconProps: { color: "cyan" },
        }}
      />

      <h2 style={{ marginTop: "20px" }}>
        10. Mixed Advanced List (Ordered, Nested with Icons, Custom items)
      </h2>
      <List
        ordered
        withPadding
        spacing="sm"
        listStyleType="decimal" // Default for top level
        items={[
          {
            label: "Chapter 1: Basics",
            icon: {
              iconComponent: IconBulb,
              themeIconProps: { color: "orange" },
            },
            children: [
              "Introduction",
              {
                label: "Core Concepts",
                icon: {
                  iconComponent: IconStar,
                  themeIconProps: { color: "yellow" },
                },
              },
            ],
          },
          "Simple String Item in Ordered List",
          <CustomListItemComponent
            key="advCustom"
            icon={<IconCheese size={20} color="gold" />}
          >
            Advanced Custom Item
          </CustomListItemComponent>,
          {
            label: "Chapter 2: Advanced Topics",
            icon: {
              iconComponent: IconCircleCheck,
              themeIconProps: { color: "indigo" },
            },
            listStyleType: "lower-alpha", // Override for this nested list
            children: [
              { label: "Sub-topic A.1" },
              { label: "Sub-topic A.2", icon: <IconAlertCircle color="red" /> },
            ],
          },
        ]}
      />

      {/* --- New Examples Based on Images --- */}
      <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>
        11. List of Knowledge Sources
      </h2>
      <List
        items={knowledgeSourceData.map((item) => (
          // Here, we pass the custom component directly as a React Element
          // Our List component will render it as is.
          // We ensure it has a key for React's reconciliation.
          <KnowledgeSourceItem
            key={item.id}
            title={item.title}
            status={item.status}
            createdDate={item.createdDate}
            progress={item.progress}
            onDelete={() => alert(`Delete ${item.title}?`)}
          />
        ))}
        spacing="md" // Add some spacing between these card-like items
      />

      <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>
        12. List of Members
      </h2>
      <List
        items={memberData.map((member) => (
          <MemberItem
            key={member.id}
            avatarChar={member.avatarChar}
            name={member.name}
            role={member.role}
            onDelete={() => alert(`Delete ${member.name}?`)}
          />
        ))}
        spacing={0} // Keeps items compact, MemberItem handles internal padding/borders
        listStyleType="none" // MemberItem is a full row, no default list markers needed
      />

      <h2 style={{ marginTop: "40px", marginBottom: "20px" }}>
        13. List of Folders
      </h2>
      <List
        items={folderData.map((folder) => (
          // Passing the custom component directly as a React Element
          <FolderItem
            key={folder.id}
            name={folder.name}
            onMoreOptions={
              folder.hasMoreOptions
                ? () => alert(`More options for ${folder.name}`)
                : undefined
            }
          />
        ))}
        // No bullets/numbers by default.
        // spacing="xs"
      />
    </div>
  );
}

export default ListVariants;
