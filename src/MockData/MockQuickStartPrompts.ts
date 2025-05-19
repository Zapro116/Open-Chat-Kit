const DEFAULT_QUICK_START_PROMPTS = [
  {
    icon: "IconBook",
    prompt: "Help me create a study schedule for final exams",
  },
  {
    icon: "IconPencil",
    prompt: "Write an outline for my essay on climate change",
  },
  {
    icon: "IconMath",
    prompt: "Explain how to solve quadratic equations",
  },
  {
    icon: "IconBeaker",
    prompt: "Describe the scientific method with examples",
  },
  {
    icon: "IconHistory",
    prompt: "Summarize key events of World War II",
  },
  {
    icon: "IconLanguage",
    prompt: "Help me practice Spanish conversation",
  },
  {
    icon: "IconPresentationAnalytics",
    prompt: "Create a presentation outline for my science project",
  },
  {
    icon: "IconBulb",
    prompt: "Generate ideas for my creative writing assignment",
  },
  {
    icon: "IconUsers",
    prompt: "Tips for effective group study sessions",
  },
  {
    icon: "IconBrain",
    prompt: "Explain cognitive learning strategies for better retention",
  },
];

export const getRandomPrompts = (count = 3) => {
  // Create a copy of the array to avoid modifying the original
  const shuffled = [...DEFAULT_QUICK_START_PROMPTS];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return the first 'count' elements or all if count > array length
  return shuffled.slice(0, Math.min(count, shuffled.length));
};
