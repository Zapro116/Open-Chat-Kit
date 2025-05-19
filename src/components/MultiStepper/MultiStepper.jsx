import React, { useState, useCallback } from "react";
import {
  Button,
  Stepper,
  Group,
  Paper,
  Loader,
  Text,
  Box,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight, IconCheck } from "@tabler/icons-react";
import PropTypes from "prop-types";

/**
 * @typedef {object} Step
 * @property {string} label - The label for the step.
 * @property {string} [description] - An optional description for the step.
 * @property {React.ReactNode} content - The React content/component to display for this step.
 * @property {() => Promise<void> | void} [onNext] - Optional async or sync function to call when proceeding from this step.
 */

/**
 * MultiStepper is a highly customizable multi-step form component built with React, Mantine, and Tabler Icons.
 * It supports various features like step indicators, async data loading, custom components, and flexible styling.
 *
 * @param {object} props - The component's props.
 * @param {Step[]} [props.steps=[]] - An array of step objects defining the stepper content and behavior.
 * @param {() => void} [props.onComplete] - Callback function invoked when the final step is completed.
 * @param {(stepIndex: number) => void} [props.onStepChange] - Callback function invoked when the active step changes.
 * @param {number} [props.initialStep=0] - The index of the step to start on.
 * @param {boolean} [props.loading=false] - If true, displays a loading state for the current step's content.
 * @param {boolean} [props.showStepper=true] - If false, the stepper UI (indicators, labels) will be hidden, but content and navigation remain.
 * @param {string} [props.className=""] - CSS class name for the root Paper component.
 * @param {object} [props.stepperProps={}] - Props to pass directly to the Mantine Stepper component.
 * @param {object} [props.buttonProps={}] - Props to pass directly to the default navigation Button components.
 * @param {object} [props.loaderProps={}] - Props to pass directly to the Mantine Loader component.
 * @param {() => React.ReactNode} [props.customLoader] - Function to render a custom loader component.
 * @param {'default' | 'numbers' | 'dots' | 'custom'} [props.stepIndicator='default'] - Type of step indicator to display.
 * @param {(index: number, isComplete: boolean, isActive: boolean) => React.ReactNode} [props.customStepIndicator] - Function to render a custom step indicator (if stepIndicator is 'custom').
 * @param {boolean} [props.showStepNumbers=true] - Whether to show step numbers next to the label (if not using 'numbers' indicator).
 * @param {boolean} [props.showStepDescriptions=true] - Whether to show step descriptions.
 * @param {boolean} [props.allowStepClick=false] - If true, allows users to click on steps to navigate.
 * @param {(stepIndex: number) => boolean} [props.stepClickValidation] - Function to validate if a step click is allowed (if allowStepClick is true).
 * @param {string} [props.containerClassName=""] - CSS class name for the main Box container wrapping stepper and content.
 * @param {string} [props.contentClassName=""] - CSS class name for the content area of the current step.
 * @param {string} [props.navigationClassName=""] - CSS class name for the Group component wrapping navigation buttons.
 * @param {string} [props.stepClassName=""] - CSS class name for the Mantine Stepper component itself.
 * @param {(onClick: () => void, disabled: boolean) => React.ReactNode} [props.customBackButton] - Function to render a custom back button.
 * @param {(onClick: () => void, isLoading: boolean, isLastStep: boolean) => React.ReactNode} [props.customNextButton] - Function to render a custom next button.
 * @param {(step: Step, index: number, isActive: boolean) => React.ReactNode} [props.customStepContent] - Function to render custom content for a step.
 * @param {(step: Step, index: number, isComplete: boolean, isActive: boolean) => React.ReactNode} [props.customStepLabel] - Function to render a custom label for a step.
 * @param {(step: Step) => React.ReactNode} [props.customStepDescription] - Function to render a custom description for a step.
 * @param {'top' | 'left' | 'right'} [props.stepperPosition='top'] - Position of the stepper relative to the content.
 * @param {object} [props.styles={}] - Object for CSS-in-JS customization of internal component parts.
 * @returns {JSX.Element}
 *
 * @example
 * const steps = [
 *   { label: 'Step 1', content: <div>Content 1</div> },
 *   { label: 'Step 2', content: <div>Content 2</div>, onNext: async () => console.log('Next from step 1') },
 * ];
 * return (
 *   <MultiStepper
 *     steps={steps}
 *     onComplete={() => alert('Stepper Completed!')}
 *     stepperProps={{ color: 'grape' }}
 *   />
 * );
 */
const MultiStepper = ({
  steps = [],
  onComplete,
  onStepChange,
  initialStep = 0,
  loading = false,
  showStepper = true,
  className = "",
  stepperProps = {},
  buttonProps = {},
  loaderProps = {},
  customLoader,
  stepIndicator = "default",
  customStepIndicator,
  showStepNumbers = true,
  showStepDescriptions = true,
  allowStepClick = false,
  stepClickValidation,
  containerClassName = "",
  contentClassName = "",
  navigationClassName = "",
  stepClassName = "",
  customBackButton,
  customNextButton,
  customStepContent,
  customStepLabel,
  customStepDescription,
  stepperPosition = "top",
  styles = {},
}) => {
  const [active, setActive] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleNext = useCallback(async () => {
    if (active === steps.length - 1) {
      if (typeof onComplete === "function") onComplete();
      return;
    }
    const currentStep = steps[active];
    if (
      currentStep &&
      currentStep.onNext &&
      typeof currentStep.onNext === "function"
    ) {
      try {
        await currentStep.onNext();
      } catch (error) {
        console.error("Error in step's onNext execution:", error);
        return; // Do not proceed if onNext fails
      }
    }
    setCompletedSteps((prev) => [...prev, active]);
    const nextStep = active + 1;
    setActive(nextStep);
    if (typeof onStepChange === "function") onStepChange(nextStep);
  }, [active, steps, onComplete, onStepChange]);

  const handleBack = useCallback(() => {
    if (active === 0) return;
    const prevStep = active - 1;
    setActive(prevStep);
    if (typeof onStepChange === "function") onStepChange(prevStep);
  }, [active, onStepChange]);

  const isStepComplete = useCallback(
    (stepIndex) => completedSteps.includes(stepIndex),
    [completedSteps]
  );

  const handleStepClick = useCallback(
    (stepIndex) => {
      if (!allowStepClick || !showStepper) return;
      if (
        typeof stepClickValidation === "function" &&
        !stepClickValidation(stepIndex)
      )
        return;
      setActive(stepIndex);
      if (typeof onStepChange === "function") onStepChange(stepIndex);
    },
    [allowStepClick, showStepper, stepClickValidation, onStepChange]
  );

  const renderStepIndicator = (index) => {
    if (typeof customStepIndicator === "function") {
      return customStepIndicator(
        index,
        isStepComplete(index),
        active === index
      );
    }

    switch (stepIndicator) {
      case "numbers":
        return (
          <Box
            sx={styles.stepIndicatorNumber}
            className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
              isStepComplete(index)
                ? "bg-green-500 text-white"
                : active === index
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {index + 1}
          </Box>
        );
      case "dots":
        return (
          <Box
            sx={styles.stepIndicatorDot}
            className={`w-3 h-3 rounded-full ${
              isStepComplete(index)
                ? "bg-green-500"
                : active === index
                ? "bg-blue-500"
                : "bg-gray-300"
            }`}
          />
        );
      default:
        return isStepComplete(index) ? (
          <IconCheck size={18} style={styles.stepIndicatorDefault} />
        ) : null;
    }
  };

  const renderLoader = () => {
    if (typeof customLoader === "function") return customLoader();
    return (
      <Box
        sx={styles.loaderWrapper}
        className="flex items-center justify-center p-8"
      >
        <Loader size="md" {...loaderProps} />
        <Text className="ml-3">Loading...</Text>
      </Box>
    );
  };

  const renderStepLabel = (step, index) => {
    if (typeof customStepLabel === "function") {
      return customStepLabel(
        step,
        index,
        isStepComplete(index),
        active === index
      );
    }

    return (
      <Box sx={styles.stepLabelWrapper} className="flex items-center space-x-2">
        {showStepNumbers && stepIndicator !== "numbers" && (
          <span className="text-sm font-medium">{index + 1}.</span>
        )}
        <span>{step.label}</span>
      </Box>
    );
  };

  const renderStepDescription = (step) => {
    if (!showStepDescriptions || !step.description) return null;
    if (typeof customStepDescription === "function")
      return customStepDescription(step);

    return (
      <Text sx={styles.stepDescriptionWrapper} size="sm" color="dimmed">
        {step.description}
      </Text>
    );
  };

  const currentActiveStep = steps[active];

  const stepContentToDisplay = currentActiveStep
    ? typeof customStepContent === "function"
      ? customStepContent(currentActiveStep, active, true)
      : loading
      ? renderLoader()
      : currentActiveStep.content
    : null;

  const renderNavigationButtons = () => (
    <Group
      sx={styles.navigation}
      position="apart"
      className={`mt-auto pt-6 ${navigationClassName}`}
    >
      {typeof customBackButton === "function" ? (
        customBackButton(handleBack, active === 0 || loading)
      ) : (
        <Button
          sx={styles.backButton}
          variant="default"
          leftIcon={<IconArrowLeft size={16} />}
          onClick={handleBack}
          disabled={active === 0 || loading}
          {...buttonProps}
        >
          Back
        </Button>
      )}
      {typeof customNextButton === "function" ? (
        customNextButton(handleNext, loading, active === steps.length - 1)
      ) : (
        <Button
          sx={styles.nextButton}
          rightIcon={
            active === steps.length - 1 ? null : <IconArrowRight size={16} />
          }
          onClick={handleNext}
          loading={loading}
          disabled={loading || !currentActiveStep}
          {...buttonProps}
        >
          {active === steps.length - 1 ? "Complete" : "Next"}
        </Button>
      )}
    </Group>
  );

  // Determine layout mode
  const isVertical = stepperProps?.orientation === "vertical";
  const isSidebar =
    showStepper &&
    isVertical &&
    (stepperPosition === "left" || stepperPosition === "right");

  let layoutMode;
  if (isSidebar) {
    layoutMode = "VERTICAL_SIDEBAR";
  } else if (showStepper) {
    layoutMode = "TOP_STEPPER";
  } else {
    layoutMode = "CONTENT_ONLY";
  }

  const containerLayoutClasses =
    layoutMode === "VERTICAL_SIDEBAR"
      ? `flex ${
          stepperPosition === "right" ? "flex-row-reverse" : "flex-row"
        } gap-x-6`
      : "flex flex-col";

  const stepperComponent = (
    <Stepper
      sx={styles.stepperWrapper}
      active={active}
      onStepClick={handleStepClick}
      allowNextStepsSelect={allowStepClick && showStepper}
      className={`${stepClassName} ${
        layoutMode === "VERTICAL_SIDEBAR" ? "flex-shrink-0 w-auto" : "mb-8"
      }`}
      {...stepperProps}
    >
      {steps?.map((step, index) => (
        <Stepper.Step
          key={step.label}
          label={renderStepLabel(step, index)}
          description={renderStepDescription(step)}
          completed={isStepComplete(index)}
          icon={renderStepIndicator(index)}
        >
          {layoutMode === "TOP_STEPPER" && active === index && (
            <Box sx={styles.contentArea} className={`mt-8 ${contentClassName}`}>
              {stepContentToDisplay}
            </Box>
          )}
        </Stepper.Step>
      ))}
    </Stepper>
  );

  const renderTopStepperLayout = () => (
    <>
      {stepperComponent}
      {currentActiveStep && renderNavigationButtons()}
    </>
  );

  const renderVerticalSidebarLayout = () => (
    <>
      {stepperComponent}
      {currentActiveStep && (
        <Box
          sx={styles.contentWrapperVertical}
          className={`flex-1 flex flex-col min-w-0`}
        >
          <Box
            sx={styles.contentArea}
            className={`flex-grow ${contentClassName}`}
          >
            {stepContentToDisplay}
          </Box>
          {renderNavigationButtons()}
        </Box>
      )}
    </>
  );

  const renderContentOnlyLayout = () => (
    <>
      {currentActiveStep && (
        <Box sx={styles.contentArea} className={`${contentClassName} w-full`}>
          {stepContentToDisplay}
        </Box>
      )}
      {currentActiveStep && renderNavigationButtons()}
    </>
  );

  return (
    <Paper sx={styles.root} className={className}>
      <Box
        sx={styles.container}
        className={`${containerClassName} ${containerLayoutClasses}`}
      >
        {layoutMode === "TOP_STEPPER" && renderTopStepperLayout()}
        {layoutMode === "VERTICAL_SIDEBAR" && renderVerticalSidebarLayout()}
        {layoutMode === "CONTENT_ONLY" && renderContentOnlyLayout()}
      </Box>
    </Paper>
  );
};

MultiStepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      description: PropTypes.string,
      content: PropTypes.node.isRequired,
      onNext: PropTypes.func,
    })
  ).isRequired,
  onComplete: PropTypes.func,
  onStepChange: PropTypes.func,
  initialStep: PropTypes.number,
  loading: PropTypes.bool,
  showStepper: PropTypes.bool,
  className: PropTypes.string,
  stepperProps: PropTypes.object,
  buttonProps: PropTypes.object,
  loaderProps: PropTypes.object,
  customLoader: PropTypes.func,
  stepIndicator: PropTypes.oneOf(["default", "numbers", "dots", "custom"]),
  customStepIndicator: PropTypes.func,
  showStepNumbers: PropTypes.bool,
  showStepDescriptions: PropTypes.bool,
  allowStepClick: PropTypes.bool,
  stepClickValidation: PropTypes.func,
  containerClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  navigationClassName: PropTypes.string,
  stepClassName: PropTypes.string,
  customBackButton: PropTypes.func,
  customNextButton: PropTypes.func,
  customStepContent: PropTypes.func,
  customStepLabel: PropTypes.func,
  customStepDescription: PropTypes.func,
  stepperPosition: PropTypes.oneOf(["top", "left", "right"]),
  styles: PropTypes.object,
};

export default MultiStepper;
