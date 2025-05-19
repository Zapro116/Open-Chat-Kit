# `Sidebar` Component Documentation

This document provides details on the props and Style API for the `Sidebar` component.

## Props

The `Sidebar` component accepts the following props:

| Name                 | Type                                     | Description                                                                                                                                |
| -------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `opened`             | `boolean`                                | **Required.** Controls whether the sidebar is visible.                                                                                     |
| `open`               | `() => void`                             | **Required.** Function to call to open the sidebar.                                                                                        |
| `close`              | `() => void`                             | **Required.** Function to call to close the sidebar.                                                                                       |
| `children`           | `React.ReactNode`                        | Content to be rendered inside the sidebar.                                                                                                 |
| `position`           | `'left' \| 'right' \| 'top' \| 'bottom'` | Side of the screen for the sidebar. Default: `'left'`.                                                                                     |
| `size`               | `string \| number`                       | Width (for left/right) or height (for top/bottom). Accepts Mantine sizes (`'xs'`-`'xl'`), number (px), or string (`'%'`). Default: `'md'`. |
| `offset`             | `string \| number`                       | Offset from the viewport edge (px). Default: `0`.                                                                                          |
| `overlayProps`       | `object`                                 | Props passed to Mantine's `Overlay` component (e.g., `backgroundOpacity`, `blur`). Default: `{ backgroundOpacity: 0.5, blur: 4 }`.         |
| `withHeader`         | `boolean`                                | If `true`, displays a header with title and close button. Default: `true`.                                                                 |
| `scrollArea`         | `boolean`                                | If `true`, wraps content in `ScrollArea.Autosize`. Default: `false`.                                                                       |
| `title`              | `string`                                 | Title text in the header (if `withHeader` is `true`). Default: `'Sidebar'`.                                                                |
| `triggerButtonLabel` | `string`                                 | Label for the default internal trigger button. Default: `'Open Sidebar'`.                                                                  |
| `showTriggerButton`  | `boolean`                                | If `true`, renders the default internal trigger button. Default: `true`.                                                                   |
| `styles`             | `object \| function`                     | Mantine styles object or function for customizing `Drawer` internal elements.                                                              |
| `classNames`         | `object`                                 | CSS class names for `Drawer` internal elements, following Mantine's API.                                                                   |

## Style API

The `Sidebar` component leverages the Mantine `Drawer` component internally. Its styling capabilities are primarily inherited from the Mantine `Drawer`. You can use the `styles` and `classNames` props to customize the look and feel of its internal elements.

The targetable parts for `styles` and `classNames` (from Mantine `Drawer`) are:

| Part Name | Description                                                               |
| --------- | ------------------------------------------------------------------------- |
| `root`    | The root element of the Drawer.                                           |
| `overlay` | The overlay element displayed behind the Drawer.                          |
| `inner`   | An inner element used for transitions and focus trapping.                 |
| `content` | The main content area of the Drawer (`Drawer.Content`).                   |
| `header`  | The header section of the Drawer (`Drawer.Header`).                       |
| `title`   | The title element within the header (`Drawer.Title`).                     |
| `close`   | The close button (`Drawer.CloseButton`).                                  |
| `body`    | The main body container for `children` inside the Drawer (`Drawer.Body`). |

### Example Usage:

```jsx
import Sidebar from "./Sidebar";
import { useDisclosure } from "@mantine/hooks";

function MyComponent() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Sidebar
      opened={opened}
      open={open}
      close={close}
      title="Custom Styled Sidebar"
      showTriggerButton={true} // Or manage with your own button
      styles={{
        root: { backgroundColor: "papayawhip" },
        header: { borderBottom: "2px solid orange" },
        title: { fontSize: "1.5rem", color: "tomato" },
        body: { padding: "2rem" },
      }}
      classNames={{
        close: "my-custom-close-button", // Add your CSS class
        content: "my-sidebar-content-area",
      }}
    >
      <p>This sidebar has custom styles applied!</p>
    </Sidebar>
  );
}
```

For more detailed information on the `styles` and `classNames` props and how they work with Mantine components, please refer to the official [Mantine Styles documentation](https://mantine.dev/styles/styles-api/).
