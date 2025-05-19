import React from "react";
import { List as MantineList, ThemeIcon } from "@mantine/core";

// Helper function to render a standard Mantine List Item from string or object data
const renderStandardMantineListItem = (itemData, index, globalListIcon) => {
  // Case 1: itemData is a string
  if (typeof itemData === "string") {
    // Use globalListIcon if provided and no specific icon for string items (usually none)
    return (
      <MantineList.Item key={index} icon={globalListIcon}>
        {itemData}
      </MantineList.Item>
    );
  }

  // Case 2: itemData is an object for a standard list item
  if (typeof itemData === "object" && itemData !== null) {
    const {
      label,
      icon: itemSpecificIconProp,
      children,
      listStyleType: itemSpecificListStyleType,
      ...restItemProps
    } = itemData;

    let iconToRender = null;
    const iconSource = itemSpecificIconProp || globalListIcon;

    if (iconSource) {
      if (
        typeof iconSource === "function" ||
        (typeof iconSource === "object" && iconSource.$$typeof)
      ) {
        // Direct ReactNode icon
        iconToRender = iconSource;
      } else if (
        typeof iconSource === "object" &&
        iconSource.iconComponent &&
        iconSource.themeIconProps
      ) {
        // Config for ThemeIcon
        const IconComponent = iconSource.iconComponent;
        iconToRender = (
          <ThemeIcon {...iconSource.themeIconProps}>
            <IconComponent size={iconSource.iconSize || 16} />
          </ThemeIcon>
        );
      }
    }

    return (
      <MantineList.Item key={index} icon={iconToRender} {...restItemProps}>
        {label}{" "}
        {/* label can be any ReactNode, allowing custom components as content */}
        {children && children.length > 0 && (
          <MantineList
            withPadding
            listStyleType={itemSpecificListStyleType || "disc"}
          >
            {/* Recursively render nested lists, passing down the globalListIcon as a fallback */}
            {children.map((child, childIndex) =>
              renderStandardMantineListItem(
                child,
                `${index}-${childIndex}`,
                globalListIcon
              )
            )}
          </MantineList>
        )}
      </MantineList.Item>
    );
  }

  console.warn(
    "List component: Unhandled item data type at index",
    index,
    itemData
  );
  return null;
};

/**
 * A flexible List component wrapping Mantine's List, with support for custom item rendering.
 *
 * Props:
 * - items: Array of (string | object | React.ReactElement).
 *   - If string: Rendered as simple text in a MantineList.Item.
 *   - If object: Follows the structure { label: React.ReactNode, icon?: ..., children?: ..., listStyleType?: ..., ...otherMantineListItemProps }.
 *     - `label` can be any ReactNode (string, custom component, etc.).
 *     - `icon` can be a ReactNode or an object { iconComponent: TablerIcon, themeIconProps: ThemeIconProps, iconSize?: number }.
 *     - `children` is an array of items for a nested list.
 *     - `listStyleType` for nested list.
 *   - If React.ReactElement: The element is rendered directly. It should be a MantineList.Item or a compatible component.
 * - ordered: (boolean) If true, renders an ordered list (<ol>). Defaults to false (<ul>).
 * - type: ('ordered' | 'unordered') Explicitly set list type. 'ordered' maps to <ol>. Overrides `ordered` prop. Defaults to 'unordered'.
 * - withPadding: (boolean) If true, nested lists will have padding (applies to standard rendered items).
 * - listStyleType: (string) Default list-style-type for the main list and nested lists if not specified per item.
 * - icon: (React.ReactNode | { iconComponent: TablerIcon, themeIconProps: ThemeIconProps, iconSize?: number }) Default icon for all standard list items.
 * - spacing: (string | number) Spacing between items.
 * - size: (string) Font size of list items.
 * - center: (boolean) If true, align items to the center.
 * - Other props will be passed to the main MantineList component.
 */
function List({
  items = [],
  ordered,
  type,
  listStyleType, // Default for the main list
  icon: defaultIconProp,
  ...rest // Spread the rest of the props to MantineList
}) {
  if (!Array.isArray(items)) {
    console.error("List component: 'items' prop must be an array.");
    return null;
  }

  const listTypeValue =
    type === "ordered" ? "ordered" : ordered ? "ordered" : "unordered";

  let globalListIcon = null;
  if (defaultIconProp) {
    if (
      typeof defaultIconProp === "function" ||
      (typeof defaultIconProp === "object" && defaultIconProp.$$typeof)
    ) {
      // Direct ReactNode
      globalListIcon = defaultIconProp;
    } else if (
      typeof defaultIconProp === "object" &&
      defaultIconProp.iconComponent &&
      defaultIconProp.themeIconProps
    ) {
      // Config for ThemeIcon
      const IconComponent = defaultIconProp.iconComponent;
      globalListIcon = (
        <ThemeIcon {...defaultIconProp.themeIconProps}>
          <IconComponent size={defaultIconProp.iconSize || 16} />
        </ThemeIcon>
      );
    }
  }

  return (
    <MantineList
      type={listTypeValue}
      listStyleType={listStyleType} // Apply default listStyleType to the root MantineList
      // Note: `icon` prop on MantineList itself is for all items if not overridden. We handle icons per item or via globalListIcon fallback in renderStandardMantineListItem.
      // If we want a blanket icon for items that are direct React elements, that's a different consideration. Current logic applies globalListIcon only to standard items.
      {...rest}
    >
      {items.map((item, index) => {
        if (React.isValidElement(item)) {
          // If item is a React element, render it directly.
          // User is responsible for providing a key if it's part of a list passed from parent.
          // If elements are created dynamically here, React.cloneElement might be needed to add a key.
          // However, map usually handles keys for elements returned from its callback.
          return item;
        }
        // Otherwise, it's data (string or object) for our standard item rendering logic.
        return renderStandardMantineListItem(item, index, globalListIcon);
      })}
    </MantineList>
  );
}

// Attach MantineList.Item to our custom List component
// This allows users to do <List.Item ... /> directly if they prefer
List.Item = MantineList.Item;

export default List;
