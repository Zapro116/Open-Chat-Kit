import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Flex,
  Loader,
  useMantineColorScheme,
  Group,
  Text,
  Box,
  ActionIcon,
  Popover,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconMenu2,
  IconMoon,
  IconSunHigh,
  IconDots,
  IconTrash,
} from "@tabler/icons-react";
import Sidebar from "../Sidebar/Sidebar";
import List from "../List/List";
import {
  BRAND_NAME,
  CHAT_ROUTE,
  DEFAULT_CLERK_TEMPLATE,
  ENABLE_HISTORY,
  ENABLE_KNOWLEDGE_BASES,
  ENABLE_PROJECTS,
  KNOWLEDGE_BASE_LABEL,
  LOGO_URL,
  PROFILE_PROFILE_DROPDOWN_TAB,
  PROJECT_LABEL,
  PLANS_PRICING_ROUTE,
  PRODUCT_LABEL,
} from "../../utils/contants";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../utils/apiEndpoints";
import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  useAuth,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { AccordionControl } from "../AccordianControl/AccordionControl";
import Projects from "../Project/Projects";
import KnowledgeBase from "../KnowledgeBase/KnowledgeBase";
import { AddProjectModal } from "../Project/AddProjectModal";
import { clearCurrentChatData } from "../../service/ChatService";
import { deleteThread, getHistoryData } from "../../api/websiteApi";
import useHistoryStore from "../../store/historyStore";
import "./Navbar.scss";
import { notifications } from "@mantine/notifications";
// Custom HistoryItem component similar to FolderItem
const HistoryItem = ({ title, uuid, onClick, handleDeleteHistory }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Box style={{ width: "100%", maxWidth: "400px" }}>
      <Group
        justify="space-between"
        p="sm"
        className={`hover:!bg-bgSelectedColor bg-bgBodyColor cursor-pointer rounded-md `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          onClick && onClick(uuid);
          e.stopPropagation();
        }}
      >
        <Group>
          <Text size="sm" truncate style={{ maxWidth: "250px" }}>
            {title}
          </Text>
        </Group>
        {isHovered && (
          <Popover position="bottom-end">
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Popover.Target>
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <IconDots size={16} />
                </ActionIcon>
              </Popover.Target>
              <Popover.Dropdown
                className="flex gap-2 items-center !px-2 !py-2 rounded-md bg-bgBodyColor text-sm cursor-pointer text-textDangerColor"
                onClick={(e) => {
                  handleDeleteHistory(uuid, title);
                  e.stopPropagation();
                }}
              >
                Delete <IconTrash size={16} />
              </Popover.Dropdown>
            </div>
          </Popover>
        )}
      </Group>
    </Box>
  );
};

function Navbar() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { isSignedIn, getToken } = useAuth();
  const {
    historyData,
    selectedHistory,
    setSelectedHistory,
    setHistoryData,
    setHistoryLoading,
    historyLoading,
  } = useHistoryStore();
  const { user } = useUser();
  useEffect(() => {
    if (LOGO_URL) {
      const img = new Image();
      img.src = LOGO_URL;
    }
  }, [LOGO_URL]);

  const loadHistoryData = async (search = "") => {
    try {
      setHistoryLoading(true);
      const token = await getToken({
        template: DEFAULT_CLERK_TEMPLATE,
      });
      if (!token || !user?.primaryEmailAddress?.emailAddress) {
        return;
      }
      const params = {
        page: 1,
        search: search,
        user_email: user?.primaryEmailAddress?.emailAddress ?? "",
        product: PRODUCT_LABEL,
        page_size: 100,
      };
      const historyData = await getHistoryData(token, params);
      setHistoryData(historyData.data?.data ?? {});
    } catch (error) {
      console.error(error);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    if (opened) loadHistoryData();
  }, [opened]);

  const handleColorSchemeToggle = () => {
    const newColorScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newColorScheme);
  };

  const handleHomeClick = () => {
    clearCurrentChatData();
    navigate(HOME_ROUTE);
  };

  const handleHistoryItemClick = (item) => {
    setSelectedHistory(item);
    item.uuid && navigate(`/${CHAT_ROUTE}/${item.uuid}`, { replace: true });
  };

  const handleDeleteHistory = async (uuid, title) => {
    try {
      const token = await getToken({
        template: DEFAULT_CLERK_TEMPLATE,
      });

      const response = await deleteThread(
        token,
        uuid,
        user?.primaryEmailAddress?.emailAddress ?? "",
        title
      );
      if (response.status === 200) {
        loadHistoryData();
        notifications.show({
          title: "Success",
          message: "History item deleted successfully",
          color: "green",
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(`Failed to delete thread: ${error}`);
    }
  };

  return (
    <div className="flex absolute w-full top-0  z-10 justify-between items-center p-4 bg-bgBodyColor">
      <div className="flex items-center h-full gap-2">
        <Sidebar
          opened={opened}
          open={open}
          close={close}
          withHeader={true}
          classNames={{ inner: "history-container" }}
          title="History"
          triggerButtonLabel={
            <IconMenu2 size={20} stroke={2} className="w-fit" />
          }
        >
          <div className="p-2 flex flex-col gap-3">
            <div className="history-content overflow-y-auto">
              {isSignedIn && (
                <Accordion chevronPosition="right" maw={400} mx="auto">
                  {ENABLE_PROJECTS && (
                    <Accordion.Item value="projects">
                      <AccordionControl accordionType="projects">
                        {PROJECT_LABEL}
                      </AccordionControl>
                      <Accordion.Panel>
                        <Projects />
                      </Accordion.Panel>
                    </Accordion.Item>
                  )}

                  {ENABLE_KNOWLEDGE_BASES && (
                    <Accordion.Item value="knowledge">
                      <AccordionControl accordionType="knowledge">
                        {KNOWLEDGE_BASE_LABEL}
                      </AccordionControl>
                      <Accordion.Panel>
                        <KnowledgeBase />
                      </Accordion.Panel>
                    </Accordion.Item>
                  )}
                </Accordion>
              )}
            </div>
            {ENABLE_HISTORY && historyLoading ? (
              <div className="flex justify-center items-center h-full backdrop-blur-sm">
                <Loader type="oval" />
              </div>
            ) : Object.keys(historyData).length > 0 ? (
              <List
                items={historyData?.threads?.map((item) => (
                  <HistoryItem
                    key={item.uuid}
                    title={item.title}
                    uuid={item.uuid}
                    onClick={(uuid) => {
                      handleHistoryItemClick(item);
                      close();
                    }}
                    handleDeleteHistory={(uuid, title) => {
                      handleDeleteHistory(uuid, title);
                    }}
                  />
                ))}
                spacing={0}
                listStyleType="none"
              />
            ) : (
              <div className="flex justify-center items-center h-[400px]">
                <Text className="text-textDefault">No conversations found</Text>
              </div>
            )}
          </div>
        </Sidebar>
        {LOGO_URL && (
          <img
            src={LOGO_URL}
            srcSet={`${LOGO_URL} 1x, ${LOGO_URL} 2x`}
            alt="Fynix Logo"
            className="h-10 cursor-pointer"
            loading="lazy"
            onClick={handleHomeClick}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "fallback-logo.png"; // TODO: add a fallback image
            }}
          />
        )}
        <p
          className="font-bold text-xl cursor-pointer"
          onClick={handleHomeClick}
        >
          {BRAND_NAME}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <SignedIn>
          <Flex className="px-1 py-0.5 rounded-md border border-borderDefault">
            <OrganizationSwitcher
              appearance={{
                elements: {
                  organizationSwitcherTrigger: {
                    color: "var(--navbar-icons-color)",
                    "&:hover": {
                      color: "var(--text-default-color)",
                    },
                  },
                },
              }}
            />
          </Flex>
        </SignedIn>
        <Flex
          justify="center"
          align="center"
          className="border border-borderDefault p-1.5 rounded w-8 h-full hover:bg-bgSelectedColor cursor-pointer"
          onClick={handleColorSchemeToggle}
        >
          {colorScheme !== "dark" ? (
            <IconMoon stroke={2} size={20} color="var(--navbar-icons-color)" />
          ) : (
            <IconSunHigh
              stroke={2}
              size={20}
              color="var(--navbar-icons-color)"
            />
          )}
        </Flex>
        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              {PROFILE_PROFILE_DROPDOWN_TAB.items.map((item, index) => (
                <UserButton.Link
                  key={index}
                  labelIcon={item.icon}
                  label={item.label}
                  href={item.href}
                >
                  {item.label}
                </UserButton.Link>
              ))}
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
        <SignedOut>
          <Button
            variant="outline"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => navigate(LOGIN_ROUTE, { replace: true })}
          >
            Login
          </Button>
        </SignedOut>
      </div>
      <AddProjectModal />
    </div>
  );
}

export default Navbar;
