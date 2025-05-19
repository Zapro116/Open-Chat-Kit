# List Component Documentation

This document outlines the props for the `List` component and its `List.Item` sub-component.

## List Component Props

| Name            | Type                                                                                  | Description                                                                                                                                      | Default                             |
| --------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| `items`         | `Array<string \| object \| React.ReactElement>`                                       | Defines the content of the list. Each item can be a string, an object for structured data (see details below), or a direct React element.        | `[]`                                |
| `ordered`       | `boolean`                                                                             | If `true`, renders an ordered list (`<ol>`). Overridden by the `type` prop.                                                                      | `false`                             |
| `type`          | `"ordered" \| "unordered"`                                                            | Explicitly sets list type to ordered (`<ol>`) or unordered (`<ul>`). Overrides the `ordered` prop.                                               | `"unordered"`                       |
| `withPadding`   | `boolean`                                                                             | Determines if list items should be offset with padding. Passed to the underlying Mantine `List`.                                                 | Mantine default (typically `false`) |
| `listStyleType` | `string`                                                                              | Controls `list-style-type` (e.g., 'disc', 'decimal'). Default inferred from `type`. Passed to Mantine `List`.                                    | Mantine default                     |
| `icon`          | `React.ReactNode \| { iconComponent: FC, themeIconProps: object, iconSize?: number }` | Default icon for items generated from string/object data. Overridden by item-specific icons. This is distinct from Mantine's `List` `icon` prop. | `null`                              |
| `spacing`       | `string \| number`                                                                    | Spacing between items (e.g., 'sm', 'md', 10). Can be a Mantine spacing token or a CSS value. Passed to Mantine `List`.                           | Mantine default (e.g. `0` or `xs`)  |
| `size`          | `string`                                                                              | Font size of list items (e.g., 'sm', 'md'). Controls `font-size` and `line-height`. Passed to Mantine `List`.                                    | Mantine default (e.g. `'md'`)       |
| `center`        | `boolean`                                                                             | If `true`, items are centered (useful with icons). Passed to Mantine `List`.                                                                     | Mantine default (typically `false`) |
| `...rest`       | `object`                                                                              | Other props are passed down to the underlying `MantineList` component (e.g., Mantine's own `icon` prop, `className`, `style`).                   |                                     |

**Details for `items` object structure:**
When an item is an `object`, it can have the following properties:

```javascript
{
  label: React.ReactNode, // Required. Content of the list item.
  icon?: React.ReactNode | { iconComponent: YourIconComponent, themeIconProps: ThemeIconProps, iconSize?: number }, // Item-specific icon
  children?: Array<item>, // Array of item data for a nested list
  listStyleType?: string, // list-style-type for this item's nested list
  // ...any other props accepted by MantineList.Item (e.g., onClick, className)
}
```

## List.Item Component Props

The `List.Item` component is exposed as a static property of `List` and is an alias for `MantineList.Item`. You can use `<List.Item ... />` directly within `<List>` for more granular control, or if items in the `items` prop are React elements.

| Name       | Type              | Description                                                                                                         | Default    |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------------------------------- | ---------- |
| `children` | `React.ReactNode` | The content of the list item.                                                                                       | (required) |
| `icon`     | `React.ReactNode` | An icon to replace the list item bullet.                                                                            |            |
| `...rest`  | `object`          | Other props accepted by `MantineList.Item` (e.g., `className`, `style`, `onClick`). Refer to Mantine documentation. |            |
