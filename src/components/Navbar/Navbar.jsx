import { Button, Flex, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2, IconMoon, IconSunHigh } from "@tabler/icons-react";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import List from "../List/List";

function Navbar() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [opened, { open, close }] = useDisclosure(false);

  const handleColorSchemeToggle = () => {
    const newColorScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newColorScheme);
  };

  // Mock grouped history data
  const historyData = {
    April: [
      {
        id: "a1",
        content: "Java E-commerce Website Guide",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "a2",
        content: "Java Portfolio Website",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "a3",
        content: "Vue.js Quiz App Guide",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "a4",
        content: "Casual Greeting Exchange",
        type: "chat",
        icon: "💬",
        className: "italic text-gray-700 dark:text-gray-300",
      },
      {
        id: "a5",
        content: "Currency Converter CLI Tool",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "a6",
        content: "C# Music Player Development",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "a7",
        content: "Go REST API Setup",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "a8",
        content: "Multi-language Merge Sort",
        type: "algorithm",
        icon: "🧮",
        className: "font-medium text-purple-600 dark:text-purple-400",
      },
      {
        id: "a9",
        content: "Rust Location Reminder App",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "a10",
        content: "Rust Music Player Guide",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "a11",
        content: "D3.js Data Visualization",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "a12",
        content: "Python Machine Learning Basics",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "a13",
        content: "React Native Mobile App",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "a14",
        content: "GraphQL API Integration",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "a15",
        content: "Docker Container Setup",
        type: "devops",
        icon: "🔧",
        className: "font-medium text-orange-600 dark:text-orange-400",
      },
    ],
    March: [
      {
        id: "m1",
        content: "User Authentication System",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "m2",
        content: "Database Optimization Guide",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "m3",
        content: "AWS Lambda Functions",
        type: "devops",
        icon: "🔧",
        className: "font-medium text-orange-600 dark:text-orange-400",
      },
      {
        id: "m4",
        content: "CSS Animation Effects",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "m5",
        content: "Redux State Management",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "m6",
        content: "MongoDB Schema Design",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "m7",
        content: "TypeScript Conversion Project",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "m8",
        content: "CI/CD Pipeline Setup",
        type: "devops",
        icon: "🔧",
        className: "font-medium text-orange-600 dark:text-orange-400",
      },
      {
        id: "m9",
        content: "Kubernetes Cluster Management",
        type: "devops",
        icon: "🔧",
        className: "font-medium text-orange-600 dark:text-orange-400",
      },
      {
        id: "m10",
        content: "Microservices Architecture",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
    ],
    February: [
      {
        id: "f1",
        content: "Neural Network Implementation",
        type: "algorithm",
        icon: "🧮",
        className: "font-medium text-purple-600 dark:text-purple-400",
      },
      {
        id: "f2",
        content: "Blockchain Smart Contract",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "f3",
        content: "iOS Swift UI Development",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "f4",
        content: "Angular Component Library",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "f5",
        content: "WebSocket Real-time Chat",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "f6",
        content: "Serverless Architecture",
        type: "devops",
        icon: "🔧",
        className: "font-medium text-orange-600 dark:text-orange-400",
      },
      {
        id: "f7",
        content: "Progressive Web App",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "f8",
        content: "GraphQL vs REST Discussion",
        type: "chat",
        icon: "💬",
        className: "italic text-gray-700 dark:text-gray-300",
      },
      {
        id: "f9",
        content: "Accessibility Best Practices",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "f10",
        content: "SEO Optimization Techniques",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
    ],
    January: [
      {
        id: "j1",
        content: "Binary Search Tree Implementation",
        type: "algorithm",
        icon: "🧮",
        className: "font-medium text-purple-600 dark:text-purple-400",
      },
      {
        id: "j2",
        content: "OAuth2 Authentication Flow",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "j3",
        content: "Flutter Mobile Development",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "j4",
        content: "Elasticsearch Integration",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "j5",
        content: "Webpack Configuration Guide",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "j6",
        content: "A/B Testing Implementation",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "j7",
        content: "Functional Programming Concepts",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "j8",
        content: "Design Patterns in Java",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "j9",
        content: "Responsive Design Techniques",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "j10",
        content: "Unit Testing Best Practices",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
    ],
    December: [
      {
        id: "d1",
        content: "Dijkstra's Algorithm Implementation",
        type: "algorithm",
        icon: "🧮",
        className: "font-medium text-purple-600 dark:text-purple-400",
      },
      {
        id: "d2",
        content: "Next.js Server Components",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
      {
        id: "d3",
        content: "Svelte Interactive Dashboard",
        type: "project",
        icon: "💼",
        className: "font-medium text-green-600 dark:text-green-400",
      },
      {
        id: "d4",
        content: "Terraform Infrastructure as Code",
        type: "devops",
        icon: "🔧",
        className: "font-medium text-orange-600 dark:text-orange-400",
      },
      {
        id: "d5",
        content: "WebAssembly Performance Optimization",
        type: "tutorial",
        icon: "📚",
        className: "font-medium text-blue-600 dark:text-blue-400",
      },
    ],
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
            {Object.entries(historyData).map(([month, itemObjects]) => (
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
        <img src="/logo.png" alt="Fynix Logo" className="h-10" />
        <p className="font-bold text-xl">AI School</p>
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
        <Button
          variant="outline"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
