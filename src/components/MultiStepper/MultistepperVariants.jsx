import React, { useState } from "react";
import {
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Badge,
  Paper,
  Text,
} from "@mantine/core";
import {
  IconPlayerSkipBack,
  IconPlayerPlay,
  IconMail,
  IconUserCircle,
  IconCheck,
} from "@tabler/icons-react";
import MultiStepper from "./MultiStepper";

function MultistepperVariants() {
  const [loading, setLoading] = useState(false);
  const [activeStepVariant7, setActiveStepVariant7] = useState(0);

  const handleAsyncOperation = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const commonStepProps = {
    onComplete: () => {
      alert("Form completed successfully!");
    },
    loading: loading,
  };

  // A simple component for step content to demonstrate state persistence if needed
  const NameEmailForm = ({ stepNumber }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    return (
      <div className="space-y-4 p-1">
        <Text size="sm" color="dimmed" mb="md">
          Fields for Step {stepNumber}
        </Text>
        <TextInput
          label="Full Name"
          placeholder="Enter your full name"
          required
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
        <TextInput
          label="Email"
          placeholder="Enter your email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </div>
    );
  };

  const steps = [
    {
      label: "Personal Info",
      description: "Basic Information",
      content: <NameEmailForm stepNumber={1} />,
      onNext: handleAsyncOperation,
    },
    {
      label: "Address Details",
      description: "Your Location",
      content: (
        <div className="space-y-4 p-1">
          <TextInput
            label="Street Address"
            placeholder="Enter your street address"
            required
          />
          <TextInput label="City" placeholder="Enter your city" required />
          <Select
            label="Country"
            placeholder="Select your country"
            data={[
              { value: "us", label: "United States" },
              { value: "ca", label: "Canada" },
              { value: "uk", label: "United Kingdom" },
            ]}
            required
          />
        </div>
      ),
    },
    {
      label: "Confirmation",
      description: "Review & Submit",
      content: (
        <div className="space-y-4 p-1">
          <Textarea
            label="Additional Comments"
            placeholder="Any extra notes?"
            minRows={3}
          />
          <p className="text-sm text-gray-600">
            Please review all information before completing.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-screen bg-gray-100 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
          MultiStepper Component Variants
        </h1>

        {/* Variant 1: Default Horizontal Stepper */}
        <Paper shadow="sm" p="lg" radius="md">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Variant 1: Default Horizontal Stepper
          </h2>
          <MultiStepper
            steps={steps}
            {...commonStepProps}
            onStepChange={(step) => console.log(`V1 Active step: ${step + 1}`)}
          />
        </Paper>

        {/* Variant 2: Vertical Stepper - Left Sidebar (Numbered) */}
        <Paper shadow="sm" p="lg" radius="md">
          <h2 className="text-xl font-semibold mb-4 text-green-700">
            Variant 2: Vertical Stepper - Left Sidebar (Numbered)
          </h2>
          <MultiStepper
            steps={steps}
            {...commonStepProps}
            onStepChange={(step) => console.log(`V2 Active step: ${step + 1}`)}
            stepperProps={{
              orientation: "vertical",
              size: "md",
              classNames: { stepBody: "ml-4", separator: "!min-h-[50px]" },
            }}
            stepperPosition="left"
            stepIndicator="numbers"
            containerClassName="border rounded-lg p-4 bg-green-50"
            contentClassName="min-h-[300px]"
          />
        </Paper>

        <MultiStepper
          steps={steps}
          {...commonStepProps}
          onStepChange={(step) => console.log(`V3 Active step: ${step + 1}`)}
          stepperProps={{ orientation: "vertical" }}
          stepperPosition="left"
        />

        {/* Variant 3: Vertical Stepper - Right Sidebar (Default Indicator) */}
        <Paper shadow="sm" p="lg" radius="md">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">
            Variant 3: Vertical Stepper - Right Sidebar (No Descriptions)
          </h2>
          <MultiStepper
            steps={steps}
            {...commonStepProps}
            onStepChange={(step) => console.log(`V3 Active step: ${step + 1}`)}
            stepperProps={{
              orientation: "vertical",
              size: "sm",
              classNames: { stepBody: "ml-3", separator: "!min-h-[40px]" },
            }}
            stepperPosition="right"
            stepIndicator="default"
            containerClassName="border rounded-lg p-4 bg-purple-50"
            contentClassName="min-h-[300px]"
            showStepDescriptions={false}
          />
        </Paper>

        {/* Variant 4: Horizontal Stepper - Dots Indicator */}
        <Paper shadow="sm" p="lg" radius="md">
          <h2 className="text-xl font-semibold mb-4 text-teal-700">
            Variant 4: Horizontal Stepper - Dots Indicator (Clickable)
          </h2>
          <MultiStepper
            steps={steps}
            {...commonStepProps}
            onStepChange={(step) => console.log(`V4 Active step: ${step + 1}`)}
            stepIndicator="dots"
            showStepDescriptions={false}
            allowStepClick={true}
            stepperProps={{ classNames: { steps: "justify-center" } }}
            className="py-3"
          />
        </Paper>

        {/* Variant 5: Highly Customized Horizontal Stepper */}
        <Paper shadow="sm" p="lg" radius="md" className="bg-slate-200">
          <h2 className="text-xl font-semibold mb-4 text-orange-700">
            Variant 5: Highly Customized Horizontal Stepper
          </h2>
          <MultiStepper
            steps={steps}
            {...commonStepProps}
            onStepChange={(step) => console.log(`V5 Active step: ${step + 1}`)}
            className="bg-white rounded-xl shadow-lg"
            stepIndicator="custom"
            customStepIndicator={(index, isComplete, isActive) => (
              <Badge
                variant={isComplete ? "filled" : "outline"}
                color={isActive ? "orange" : "gray"}
                size="xl"
                radius="xl"
              >
                {isComplete ? <IconCheck size={16} /> : index + 1}
              </Badge>
            )}
            customLoader={() => (
              <div className="flex flex-col items-center justify-center p-10 space-y-3">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-dashed border-orange-500" />
                <Text color="orange" weight={500}>
                  Loading next amazing step...
                </Text>
              </div>
            )}
            customBackButton={(onClick, disabled) => (
              <Button
                onClick={onClick}
                disabled={disabled}
                variant="outline"
                color="gray"
                leftIcon={<IconPlayerSkipBack size={18} />}
              >
                Previous
              </Button>
            )}
            customNextButton={(onClick, isLoading, isLastStep) => (
              <Button
                onClick={onClick}
                loading={isLoading}
                color="orange"
                rightIcon={<IconPlayerPlay size={18} />}
              >
                {isLastStep ? "Submit Application" : "Continue"}
              </Button>
            )}
            buttonProps={{ size: "md", radius: "lg" }}
            navigationClassName="mt-12 border-t border-gray-300 pt-6"
          />
        </Paper>

        {/* Variant 6: Content-Only Stepper (No Stepper UI) */}
        <Paper shadow="sm" p="lg" radius="md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Variant 6: Content-Only (No Stepper UI)
          </h2>
          <MultiStepper
            steps={steps}
            {...commonStepProps}
            onStepChange={(step) => console.log(`V6 Active step: ${step + 1}`)}
            showStepper={false}
            contentClassName="border border-dashed border-gray-300 p-4 rounded-md"
          />
        </Paper>

        {/* Variant 7: Vertical Stepper with Custom Step Click Logic */}
        <Paper shadow="sm" p="lg" radius="md">
          <h2 className="text-xl font-semibold mb-4 text-cyan-700">
            Variant 7: Vertical Stepper - Controlled Click
          </h2>
          <MultiStepper
            steps={steps}
            {...commonStepProps}
            initialStep={activeStepVariant7}
            onStepChange={(step) => {
              console.log(`V7 Active step: ${step + 1}`);
              setActiveStepVariant7(step);
            }}
            stepperProps={{ orientation: "vertical" }}
            stepperPosition="left"
            allowStepClick={true}
            stepClickValidation={(stepIndex) => {
              // Allow clicking only on completed steps or the current/next step
              const isCompleted = steps
                .slice(0, stepIndex)
                .every((s, i) => i < activeStepVariant7);
              return (
                isCompleted ||
                stepIndex === activeStepVariant7 ||
                stepIndex === activeStepVariant7 + 1
              );
            }}
            containerClassName="p-3 bg-cyan-50 rounded-lg"
          />
        </Paper>

        {/* Variant 8: Horizontal Stepper with Styles API */}
        <Paper shadow="sm" p="lg" radius="md">
          <h2 className="text-xl font-semibold mb-4 text-lime-700">
            Variant 8: Horizontal Stepper with Styles API
          </h2>
          <MultiStepper
            steps={steps}
            {...commonStepProps}
            onStepChange={(step) => console.log(`V8 Active step: ${step + 1}`)}
            styles={{
              root: {
                backgroundColor: "#f0f9ff",
                border: "1px solid #0ea5e9",
                borderRadius: "12px",
              },
              stepperWrapper: { paddingBottom: "20px" },
              navigation: {
                marginTop: "30px",
                paddingTop: "20px",
                borderTop: "1px dashed #9ca3af",
              },
              nextButton: {
                background: "linear-gradient(to right, #34d399, #10b981)",
                color: "white",
              },
              stepLabelWrapper: (theme) => ({
                fontWeight: 600,
                color: theme.colors.lime[8],
              }),
              stepDescriptionWrapper: { fontStyle: "italic" },
            }}
          />
        </Paper>

        {/* Variant 9: Minimal Horizontal Stepper (No Numbers/Descriptions) */}
        <Paper shadow="sm" p="lg" radius="md">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">
            Variant 9: Minimal Horizontal Stepper
          </h2>
          <MultiStepper
            steps={steps.map((s) => ({ ...s, description: undefined }))} // Remove descriptions for this variant
            {...commonStepProps}
            onStepChange={(step) => console.log(`V9 Active step: ${step + 1}`)}
            showStepNumbers={false}
            showStepDescriptions={false} // Explicitly false, though steps lack descriptions
            stepIndicator="dots"
            stepperProps={{ classNames: { step: "items-center" } }} // Center label with dot
          />
        </Paper>

        {/* Variant 10: Vertical Stepper with Custom Label/Description Rendering */}
        <Paper shadow="sm" p="lg" radius="md">
          <h2 className="text-xl font-semibold mb-4 text-pink-700">
            Variant 10: Vertical Stepper - Custom Text Rendering
          </h2>
          <MultiStepper
            steps={steps}
            {...commonStepProps}
            onStepChange={(step) => console.log(`V10 Active step: ${step + 1}`)}
            stepperProps={{ orientation: "vertical" }}
            stepperPosition="left"
            containerClassName="bg-pink-50 p-4 rounded-lg"
            customStepLabel={(step, index, isComplete, isActive) => (
              <Group gap="xs">
                {isComplete ? (
                  <IconCheck size={20} color="green" />
                ) : isActive ? (
                  <IconUserCircle size={20} color="pink" />
                ) : (
                  <IconMail size={20} color="gray" />
                )}
                <Text
                  fw={isActive ? 700 : 500}
                  color={isActive ? "pink" : "dark"}
                >
                  {index + 1}. {step.label} {isActive && "(Current)"}
                </Text>
              </Group>
            )}
            customStepDescription={(step) => (
              <Text size="xs" color="pink" className="text-uppercase" ml={28}>
                -- {step.description} --
              </Text>
            )}
          />
        </Paper>
      </div>
    </div>
  );
}

export default MultistepperVariants;
