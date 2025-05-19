import React from "react";
import PropTypes from "prop-types";
import { Drawer, Button, ScrollArea } from "@mantine/core";

const defaultProps = {
  position: "left",
  size: "md",
  offset: 0,
  overlayProps: { backgroundOpacity: 0.5, blur: 4 },
  withHeader: true,
  scrollArea: false,
  title: "Sidebar",
  triggerButtonLabel: "Open Sidebar",
  showTriggerButton: true,
  styles: {},
  classNames: {},
};

/**
 * A customizable Sidebar component that uses Mantine Drawer.
 * It can be used with or without internal state management for `opened`, `open`, and `close`.
 */
function Sidebar(props) {
  const {
    opened,
    open,
    close,
    position,
    size,
    offset,
    overlayProps,
    withHeader,
    scrollArea,
    title,
    children,
    triggerButtonLabel,
    showTriggerButton,
    styles,
    classNames,
  } = { ...defaultProps, ...props };

  if (opened === undefined || open === undefined || close === undefined) {
    console.error(
      "Sidebar: `opened`, `open`, and `close` props are required when not using internal state management."
    );
  }

  const DrawerContent = scrollArea ? ScrollArea.Autosize : React.Fragment;
  const scrollAreaProps = scrollArea ? { mah: "100vh" } : {};

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title={withHeader ? title : undefined}
        position={position}
        size={size}
        offset={offset}
        overlayProps={overlayProps}
        withCloseButton={withHeader}
        scrollAreaComponent={scrollArea ? ScrollArea.Autosize : undefined}
        styles={styles}
        classNames={classNames}
      >
        <DrawerContent {...scrollAreaProps}>{children}</DrawerContent>
      </Drawer>

      {showTriggerButton && (
        <Button variant="default" onClick={open}>
          {triggerButtonLabel}
        </Button>
      )}
    </>
  );
}

Sidebar.propTypes = {
  /** Controls the opened state of the Drawer. Required if not using internal state. */
  opened: PropTypes.bool,
  /** Function to open the Drawer. Required if not using internal state. */
  open: PropTypes.func,
  /** Function to close the Drawer. Required if not using internal state. */
  close: PropTypes.func,
  /** Position of the Drawer. Defaults to 'left'. */
  position: PropTypes.oneOf(["left", "right", "top", "bottom"]),
  /** Size of the Drawer. Defaults to 'md'. */
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Offset from the edge of the screen. Defaults to 0. */
  offset: PropTypes.number,
  /** Props for the overlay. Defaults to { backgroundOpacity: 0.5, blur: 4 }. */
  overlayProps: PropTypes.object,
  /** Whether to show the header with title and close button. Defaults to true. */
  withHeader: PropTypes.bool,
  /** Whether to enable scroll area for content. Defaults to false. */
  scrollArea: PropTypes.bool,
  /** Title for the Drawer header. Defaults to 'Sidebar'. */
  title: PropTypes.node,
  /** Content of the Sidebar. */
  children: PropTypes.node.isRequired,
  /** Label for the trigger button. Defaults to 'Open Sidebar'. */
  triggerButtonLabel: PropTypes.string,
  /** Whether to show the trigger button. Defaults to true. */
  showTriggerButton: PropTypes.bool,
  /** Inline styles for the Drawer components. */
  styles: PropTypes.object,
  /** Class names for the Drawer components. */
  classNames: PropTypes.object,
};

export default Sidebar;
