import React, { useState } from "react";
import {
  Container,
  Title,
  Text,
  SimpleGrid,
  Card,
  Button,
  Group,
  Box,
  Divider,
  Accordion,
  Center,
  SegmentedControl,
} from "@mantine/core";
import { IconCheck, IconMail } from "@tabler/icons-react";
import Navbar from "../components/Navbar/Navbar";

const getPlans = (billing) => [
  {
    name: "Hobby",
    price: billing === "yearly" ? "$0" : "$0",
    period: billing === "yearly" ? "/year" : "/month",
    description: "100% Free to use",
    features: [
      "14-day free trial of Pro features",
      "200 requests per month with standard models",
      "Code Assistant in VS Code",
      "2500 multiline completions per month in Editor",
      "Community support",
    ],
    button: (
      <Button
        variant="outline"
        fullWidth
        radius="md"
        size="md"
        className="font-semibold"
      >
        Start For Free
      </Button>
    ),
  },
  {
    name: "Pro",
    price: billing === "yearly" ? "$100" : "$10",
    period: billing === "yearly" ? "/year" : "/month",
    description:
      billing === "yearly" ? (
        <span>
          <span className="line-through text-gray-400 mr-2">$120</span>
          $100{" "}
          <span className="text-green-400">Save 16.6% if billed annually</span>
        </span>
      ) : (
        "Billed monthly, cancel anytime"
      ),
    features: [
      "All Hobby plan features",
      "500 requests per month with standard models",
      "10 requests per day with premium models",
      "Add up to 10 Knowledge Base items",
      "Priority support",
    ],
    button: (
      <Button
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan" }}
        fullWidth
        radius="md"
        size="md"
        className="font-semibold"
        style={{ boxShadow: "0 4px 24px 0 rgba(80, 72, 229, 0.15)" }}
      >
        Subscribe
      </Button>
    ),
    highlight: true,
    strike: billing === "yearly",
    originalPrice: "$120",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Flexible pricing",
    features: [
      "All Pro Plan features",
      "Enterprise Single Sign-On (SSO)",
      "Centralized team billing",
      "Dedicated priority support",
    ],
    button: (
      <Button
        variant="outline"
        color="gray"
        fullWidth
        radius="md"
        size="md"
        className="font-semibold"
      >
        Talk to Sales
      </Button>
    ),
  },
];

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards and PayPal for Pro and Enterprise plans.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings.",
  },
  {
    question: "Is there a free trial for Pro?",
    answer: "Yes, the Hobby plan includes a 14-day free trial of Pro features.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can reach out to us via the Contact Us button below or email us at support@example.com.",
  },
];

export default function PlansPricingPage() {
  const [billing, setBilling] = useState("yearly");
  const plans = getPlans(billing);

  return (
    <div className="flex flex-col items-center justify-center relative bg-bgDefaultColor min-h-screen">
      <Navbar />
      <Container
        py="xl"
        className="mt-[72px] bg-bgDefaultColor w-full max-w-7xl"
      >
        <Title
          align="center"
          order={2}
          mb="xs"
          className="font-extrabold tracking-tight text-3xl md:text-4xl"
        >
          Plans and Pricing
        </Title>
        <Text
          align="center"
          color="dimmed"
          mb="xl"
          className="text-lg md:text-xl"
        >
          Choose the perfect plan for you
        </Text>
        <Center mb="lg">
          <SegmentedControl
            value={billing}
            onChange={setBilling}
            data={[
              { label: "Monthly", value: "monthly" },
              { label: "Annually", value: "yearly" },
            ]}
            color="indigo"
            size="md"
            radius="md"
            className="bg-bgBodyColor px-2 py-1"
          />
        </Center>
        <SimpleGrid
          cols={{ base: 1, sm: 1, md: 3 }}
          spacing="xl"
          mb="xl"
          className="w-full"
        >
          {plans.map((plan, idx) => (
            <Card
              key={plan.name}
              shadow={plan.highlight ? "lg" : "sm"}
              padding="xl"
              radius="lg"
              withBorder
              className={`transition-all duration-200 bg-bgBodyColor hover:scale-[1.025] hover:shadow-2xl ${
                plan.highlight
                  ? "border-2 border-indigo-500 ring-2 ring-indigo-200 relative z-10"
                  : "border border-gray-700"
              }`}
              style={
                plan.highlight
                  ? {
                      boxShadow:
                        "0 8px 32px 0 rgba(80, 72, 229, 0.18), 0 1.5px 0 0 #845ef7",
                      marginTop: -12,
                    }
                  : {}
              }
            >
              <Group position="apart" mb="xs">
                <Text weight={700} size="lg" className="tracking-wide">
                  {plan.name}
                </Text>
                {plan.highlight && (
                  <Text
                    color="indigo"
                    size="sm"
                    weight={600}
                    className="uppercase"
                  >
                    Most Popular
                  </Text>
                )}
              </Group>
              <Text
                size="2xl"
                weight={800}
                mb={0}
                className="mt-2 mb-1 flex items-end gap-2"
              >
                {plan.strike ? (
                  <span className="line-through text-gray-400 text-lg">
                    {plan.originalPrice}
                  </span>
                ) : null}
                {plan.price}
                <Text span size="sm" color="dimmed">
                  {plan.period}
                </Text>
              </Text>
              {plan.highlight && billing === "yearly" && (
                <Text color="green" size="sm" mb="xs" className="mb-2">
                  Save 16.6% if billed annually
                </Text>
              )}
              <Text color="teal" size="sm" mb="sm" className="mb-2">
                {plan.description}
              </Text>
              <Divider my="sm" />
              <Box mb="md">
                {plan.features.map((feature, i) => (
                  <div className="flex items-start gap-2 my-1" key={i}>
                    <IconCheck size={18} color="#51cf66" className="shrink-0" />
                    <Text size="sm" className="text-gray-200">
                      {feature}
                    </Text>
                  </div>
                ))}
              </Box>
              {plan.button}
            </Card>
          ))}
        </SimpleGrid>
        <Divider my="xl" label="FAQs" labelPosition="center" className="my-8" />
        <Box className="max-w-2xl mx-auto w-full mb-12">
          <Accordion variant="separated" mb="xl" radius="md">
            {faqs.map((faq, idx) => (
              <Accordion.Item value={faq.question} key={idx}>
                <Accordion.Control className="font-semibold text-base">
                  {faq.question}
                </Accordion.Control>
                <Accordion.Panel className="text-gray-300 text-sm">
                  {faq.answer}
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </Box>
        <Center className="mb-8">
          <Button
            size="lg"
            leftSection={<IconMail size={20} />}
            component="a"
            href="mailto:support@example.com"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            radius="md"
            className="font-semibold px-8 py-2 text-lg shadow-md"
          >
            Contact Us
          </Button>
        </Center>
      </Container>
    </div>
  );
}
