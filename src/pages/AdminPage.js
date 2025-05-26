import React from "react";
import { useSiteConfig } from "../contexts/SiteConfigContext";
import {
  Container,
  Title,
  TextInput,
  Switch,
  Paper,
  Stack,
  Code,
  Text,
  Box,
  Divider,
} from "@mantine/core";

const AdminPage = () => {
  const { siteConfig, setSiteConfig } = useSiteConfig();

  const handleChange = (key, value) => {
    setSiteConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  };

  if (!siteConfig) {
    return (
      <Container size="md" py="xl">
        <Text>Loading configuration...</Text>
      </Container>
    );
  }

  // Create a more readable label from a camelCase or UPPER_SNAKE_CASE key
  const formatLabel = (key) => {
    if (typeof key !== "string" || !key) {
      return "";
    }

    // Step 1: Handle underscores and add spaces around camelCase and PascalCase segments.
    let s = String(key)
      .replace(/_/g, " ") // Example: user_id -> user id, USER_ID -> USER ID
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Example: camelCase -> camel Case
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2"); // Example: XMLHttp -> XML Http, SomeAPI -> Some API

    // Step 2: Normalize spaces, convert to title case.
    return s
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space
      .trim() // Remove leading/trailing white space
      .toLowerCase() // Convert the whole string to lowercase
      .split(" ") // Split into words by space
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(" "); // Join words back with a single space
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <Title order={1} ta="center" c="white">
          Admin - Site Configuration
        </Title>

        <Paper shadow="md" p="xl" radius="md" withBorder bg="dark.7">
          <Stack gap="lg">
            {Object.keys(siteConfig).map((key) => (
              <Box key={key}>
                {typeof siteConfig[key] === "boolean" ? (
                  <>
                    <Text>{formatLabel(key)}</Text>
                    <Switch
                      checked={siteConfig[key]}
                      onChange={(event) =>
                        handleChange(key, event.currentTarget.checked)
                      }
                      size="md"
                      styles={{
                        label: { color: "var(--mantine-color-gray-4)" },
                      }}
                    />
                  </>
                ) : (
                  <TextInput
                    label={formatLabel(key)}
                    placeholder={`Enter ${formatLabel(key)}`}
                    value={siteConfig[key] || ""}
                    onChange={(event) =>
                      handleChange(key, event.currentTarget.value)
                    }
                    size="md"
                    styles={{
                      label: {
                        color: "var(--mantine-color-gray-4)",
                        marginBottom: "4px",
                      },
                      input: {
                        backgroundColor: "var(--mantine-color-dark-6)",
                        borderColor: "var(--mantine-color-dark-4)",
                        color: "var(--mantine-color-gray-0)",
                      },
                    }}
                  />
                )}
              </Box>
            ))}
          </Stack>
        </Paper>

        <Paper shadow="md" p="xl" radius="md" withBorder bg="dark.7">
          <Title order={3} mb="md" c="gray.4">
            Current Config (Live Preview)
          </Title>
          <Divider my="sm" />
          <Box
            p="md"
            style={{
              maxHeight: "400px",
              overflowY: "auto",
              backgroundColor: "var(--mantine-color-dark-8)",
              borderRadius: "var(--mantine-radius-sm)",
            }}
          >
            <Code block fz="sm" c="gray.0">
              {JSON.stringify(siteConfig, null, 2)}
            </Code>
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
};

export default AdminPage;
