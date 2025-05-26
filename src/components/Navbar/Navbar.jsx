import React, { useEffect } from "react";
import { Accordion, Button, Flex, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2, IconMoon, IconSunHigh } from "@tabler/icons-react";
import Sidebar from "../Sidebar/Sidebar";
import List from "../List/List";
import {
  BRAND_NAME,
  ENABLE_HISTORY,
  ENABLE_KNOWLEDGE_BASES,
  ENABLE_PROJECTS,
  historyData,
  KNOWLEDGE_BASE_LABEL,
  LOGO_URL,
  PROFILE_PROFILE_DROPDOWN_TAB,
  PROJECT_LABEL,
} from "../../utils/contants";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, LOGIN_ROUTE } from "../../utils/apiEndpoints";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { AccordionControl } from "../AccordianControl/AccordionControl";
import Projects from "../Project/Projects";
import KnowledgeBase from "../KnowledgeBase/KnowledgeBase";
import { AddProjectModal } from "../Project/AddProjectModal";

function Navbar() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (LOGO_URL) {
      const img = new Image();
      img.src = LOGO_URL;
    }
  }, [LOGO_URL]);

  const handleColorSchemeToggle = () => {
    const newColorScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newColorScheme);
  };

  return (
    <div className="flex absolute w-full top-0  z-10 justify-between items-center p-4 bg-bgSelectedColor">
      <div className="flex items-center h-full gap-2">
        <Sidebar
          opened={opened}
          open={open}
          close={close}
          withHeader={true}
          title="History"
          triggerButtonLabel={
            <IconMenu2 size={20} stroke={2} className="w-fit" />
          }
        >
          <div className="p-2">
            <div className="history-content overflow-y-auto">
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
            </div>
            {ENABLE_HISTORY &&
              Object.entries(historyData).map(([month, itemObjects]) => (
                <div key={month} className="mb-3">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-1 mb-1.5">
                    {month}
                  </p>
                  <List
                    items={itemObjects.map((item) => ({
                      key: item.id,
                      label: (
                        <div
                          className={`flex items-center p-1.5 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-sm ${item.className}`}
                        >
                          <span className="mr-2">{item.icon}</span>
                          <span>{item.content}</span>
                        </div>
                      ),
                    }))}
                    listStyleType="none"
                  />
                </div>
              ))}
          </div>
        </Sidebar>
        {LOGO_URL && (
          <img
            src={LOGO_URL}
            srcSet={`${LOGO_URL} 1x, ${LOGO_URL} 2x`}
            alt="Fynix Logo"
            className="h-10 cursor-pointer"
            loading="lazy"
            onClick={() => navigate(HOME_ROUTE)}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "fallback-logo.png"; // TODO: add a fallback image
            }}
          />
        )}
        <p
          className="font-bold text-xl cursor-pointer"
          onClick={() => navigate(HOME_ROUTE)}
        >
          {BRAND_NAME}
        </p>
      </div>
      <div className="flex items-center gap-2">
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
