# MultiStepper Component

MultiStepper is a highly customizable multi-step form component built with React, Mantine, and Tabler Icons. It supports various features like step indicators, async data loading, custom components, and flexible styling.

## Props

| Name                   | Type                                                                                   | Default     | Description                                                                                                             |
|------------------------|----------------------------------------------------------------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------|
| `steps`                | `Step[]`                                                                               | `[]`        | An array of step objects defining the stepper content and behavior.                                                       |
| `onComplete`           | `() => void`                                                                           |             | Callback function invoked when the final step is completed.                                                               |
| `onStepChange`         | `(stepIndex: number) => void`                                                          |             | Callback function invoked when the active step changes.                                                                   |
| `initialStep`          | `number`                                                                               | `0`         | The index of the step to start on.                                                                                      |
| `loading`              | `boolean`                                                                              | `false`     | If true, displays a loading state for the current step\'s content.                                                         |
| `showStepper`          | `boolean`                                                                              | `true`      | If false, the stepper UI (indicators, labels) will be hidden, but content and navigation remain.                        |
| `className`            | `string`                                                                               | `""`        | CSS class name for the root Paper component.                                                                              |
| `stepperProps`         | `object`                                                                               | `{}`        | Props to pass directly to the Mantine Stepper component.                                                                  |
| `buttonProps`          | `object`                                                                               | `{}`        | Props to pass directly to the default navigation Button components.                                                       |
| `loaderProps`          | `object`                                                                               | `{}`        | Props to pass directly to the Mantine Loader component.                                                                   |
| `customLoader`         | `() => React.ReactNode`                                                                |             | Function to render a custom loader component.                                                                             |
| `stepIndicator`        | `'default' \| 'numbers' \| 'dots' \| 'custom'`                                       | `'default'` | Type of step indicator to display.                                                                                      |
| `customStepIndicator`  | `(index: number, isComplete: boolean, isActive: boolean) => React.ReactNode`           |             | Function to render a custom step indicator (if `stepIndicator` is 'custom').                                            |
| `showStepNumbers`      | `boolean`                                                                              | `true`      | Whether to show step numbers next to the label (if not using 'numbers' indicator).                                      |
| `showStepDescriptions` | `boolean`                                                                              | `true`      | Whether to show step descriptions.                                                                                      |
| `allowStepClick`       | `boolean`                                                                              | `false`     | If true, allows users to click on steps to navigate.                                                                      |
| `stepClickValidation`  | `(stepIndex: number) => boolean`                                                       |             | Function to validate if a step click is allowed (if `allowStepClick` is true).                                          |
| `containerClassName`   | `string`                                                                               | `""`        | CSS class name for the main Box container wrapping stepper and content.                                                   |
| `contentClassName`     | `string`                                                                               | `""`        | CSS class name for the content area of the current step.                                                                  |
| `navigationClassName`  | `string`                                                                               | `""`        | CSS class name for the Group component wrapping navigation buttons.                                                       |
| `stepClassName`        | `string`                                                                               | `""`        | CSS class name for the Mantine Stepper component itself.                                                                  |
| `customBackButton`     | `(onClick: () => void, disabled: boolean) => React.ReactNode`                          |             | Function to render a custom back button.                                                                                  |
| `customNextButton`     | `(onClick: () => void, isLoading: boolean, isLastStep: boolean) => React.ReactNode`    |             | Function to render a custom next button.                                                                                  |
| `customStepContent`    | `(step: Step, index: number, isActive: boolean) => React.ReactNode`                    |             | Function to render custom content for a step.                                                                           |
| `customStepLabel`      | `(step: Step, index: number, isComplete: boolean, isActive: boolean) => React.ReactNode` |             | Function to render a custom label for a step.                                                                           |
| `customStepDescription`| `(step: Step) => React.ReactNode`                                                      |             | Function to render a custom description for a step.                                                                     |
| `stepperPosition`      | `'top' \| 'left' \| 'right'`                                                           | `'top'`     | Position of the stepper relative to the content.                                                                        |
| `styles`               | `object`                                                                               | `{}`        | Object for CSS-in-JS customization of internal component parts. See Styles API section for available keys.            |

### `Step` Object Properties

Each object in the `steps` array can have the following properties:

| Name          | Type                          | Description                                                                            |
|---------------|-------------------------------|----------------------------------------------------------------------------------------|
| `label`       | `string`                      | **Required.** The label for the step.                                                        |
| `description` | `string`                      | An optional description for the step.                                                  |
| `content`     | `React.ReactNode`             | **Required.** The React content/component to display for this step.                        |
| `onNext`      | `() => Promise<void> \| void` | Optional async or sync function to call when proceeding from this step.                  |

## Styles API

The `MultiStepper` component supports style customization through the `styles` prop, which accepts an object of CSS-in-JS styles. You can target specific internal parts of the component using the following keys:

| Key                       | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| `root`                    | Styles for the root `Paper` component.                                      |
| `container`               | Styles for the main `Box` container wrapping the stepper and content.       |
| `stepperWrapper`          | Styles for the `Stepper` component wrapper.                                 |
| `stepIndicatorNumber`     | Styles for the step indicator when `stepIndicator` is 'numbers'.            |
| `stepIndicatorDot`        | Styles for the step indicator when `stepIndicator` is 'dots'.               |
| `stepIndicatorDefault`    | Styles for the default step indicator (check icon).                         |
| `loaderWrapper`           | Styles for the wrapper of the loading indicator.                            |
| `stepLabelWrapper`        | Styles for the wrapper around a step's label.                               |
| `stepDescriptionWrapper`  | Styles for the wrapper around a step's description.                         |
| `navigation`              | Styles for the `Group` component containing navigation buttons.             |
| `backButton`              | Styles for the default "Back" button.                                       |
| `nextButton`              | Styles for the default "Next"/"Complete" button.                            |
| `contentArea`             | Styles for the `Box` that wraps the content of the active step.             |
| `contentWrapperVertical`  | Styles for the content wrapper when `stepperPosition` is 'left' or 'right'. |

**Example Usage:**

```jsx
<MultiStepper
  steps={mySteps}
  styles={{
    root: { backgroundColor: '#f0f0f0', borderRadius: '8px' },
    nextButton: { backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } },
     stepLabelWrapper: { fontWeight: 500 }
  }}
/>
```