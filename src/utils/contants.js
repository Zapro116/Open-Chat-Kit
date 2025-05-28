import React from "react";
import { IconPhoto, IconUserCircle } from "@tabler/icons-react";
import { SETTINGS_ROUTE } from "./apiEndpoints";

export const baseCerebrumUrl = "http://localhost:8081";

export const initialSiteConfig = {
  BRAND_NAME: process.env.REACT_APP_BRAND_NAME,
  LOGO_URL: process.env.REACT_APP_LOGO_URL,
  PROJECT_LABEL: process.env.REACT_APP_PROJECTS_LABEL ?? "Projects",
  PROJECT_EDIT_LABEL: process.env.REACT_APP_EDIT_PROJECTS_LABEL ?? "Project",
  PROJECT_ROUTE: process.env.REACT_APP_PROJECTS_ROUTE ?? "project",
  ENABLE_PROJECTS: JSON.parse(process.env.REACT_APP_ENABLE_PROJECTS ?? "false"),
  KNOWLEDGE_BASE_LABEL:
    process.env.REACT_APP_KNOWLEDGE_BASE_LABEL ?? "Knowledge Bases",
  KNOWLEDGE_BASE_EDIT_LABEL:
    process.env.REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL ?? "Knowledge Base",
  KNOWLEDGE_BASE_ROUTE:
    process.env.REACT_APP_KNOWLEDGE_BASE_ROUTE ?? "knowledge",
  ENABLE_KNOWLEDGE_BASES: JSON.parse(
    process.env.REACT_APP_ENABLE_KNOWLEDGE_BASES ?? "false"
  ),
  ENABLE_HISTORY: JSON.parse(process.env.REACT_APP_ENABLE_HISTORY ?? "false"),
  ENABLE_CHATS: JSON.parse(process.env.REACT_APP_ENABLE_CHATS ?? "false"),
  GOOGLE_ANALYTICS_ENABLE: JSON.parse(
    process.env.REACT_APP_GOOGLE_ANALYTICS_ENABLE ?? "false"
  ),
  GOOGLE_ANALYTICS_CODE: process.env.REACT_APP_GOOGLE_ANALYTICS_CODE ?? "",
  CHAT_ROUTE: process.env.REACT_APP_CHAT_ROUTE ?? "chat",
};

export const BRAND_NAME = initialSiteConfig.BRAND_NAME;
export const LOGO_URL = initialSiteConfig.LOGO_URL;

export const PROJECT_LABEL = initialSiteConfig.PROJECT_LABEL;
export const PROJECT_EDIT_LABEL = initialSiteConfig.PROJECT_EDIT_LABEL;
export const PROJECT_ROUTE = initialSiteConfig.PROJECT_ROUTE;
export const ENABLE_PROJECTS = initialSiteConfig.ENABLE_PROJECTS;

export const KNOWLEDGE_BASE_LABEL = initialSiteConfig.KNOWLEDGE_BASE_LABEL;
export const KNOWLEDGE_BASE_EDIT_LABEL =
  initialSiteConfig.KNOWLEDGE_BASE_EDIT_LABEL;
export const KNOWLEDGE_BASE_ROUTE = initialSiteConfig.KNOWLEDGE_BASE_ROUTE;
export const ENABLE_KNOWLEDGE_BASES = initialSiteConfig.ENABLE_KNOWLEDGE_BASES;
export const CHAT_ROUTE = initialSiteConfig.CHAT_ROUTE;

console.log(initialSiteConfig.ENABLE_KNOWLEDGE_BASES);

export const ENABLE_HISTORY = initialSiteConfig.ENABLE_HISTORY;
export const ENABLE_CHATS = initialSiteConfig.ENABLE_CHATS;

export const historyData = {
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

export const PROFILE_PROFILE_DROPDOWN_TAB = {
  title: "PROFILE",
  items: [
    {
      icon: <IconUserCircle color="var(--title-text-color)" size={20} />,
      label: "Settings",
      color: "var(--title-text-color)",
      href: SETTINGS_ROUTE,
    },
    // {
    //   icon: <IconBrandDiscord color="var(--title-text-color)" size={20} />,
    //   label: "Discord",
    //   color: "var(--title-text-color)",
    // },
    // {
    //   icon: <IconLogout color="red" size={20} />,
    //   label: "Logout",
    //   color: "red",
    // },
  ],
};

export const getStandardImageUploadAction = (overrideProps = {}) => ({
  id: "upload-image",
  actionType: "imageUpload",
  icon: IconPhoto,
  tooltip: "Upload Image",
  position: "left",
  ...overrideProps,
});

export const ASSISTANT_ROLE = "assistant";
export const USER_ROLE = "user";
export const DEFAULT_MODEL_SLUG_NAME = "gpt-4o";
export const DEFAULT_PRODUCT_NAME = "co_pilot";
