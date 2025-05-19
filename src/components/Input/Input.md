# Input Component Props

| Name                             | Type                                             | Description                                                                                                 | Default Value                                               |
| -------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `onSendMessage`                  | `(message: string, attachments: File[]) => void` | Callback function when a message is sent.                                                                   | **Required**                                                |
| `placeholder`                    | `string`                                         | Placeholder text for the textarea.                                                                          | `"Type a message..."`                                       |
| `minRows`                        | `number`                                         | Minimum number of rows for the textarea.                                                                    | `1`                                                         |
| `maxRows`                        | `number`                                         | Maximum number of rows for the textarea.                                                                    | `6`                                                         |
| `actionComponentsConfig`         | `ActionComponentConfig[]`                        | Configuration for additional action components. See `ActionComponentConfig` typedef below for more details. | `[]`                                                        |
| `maxAttachments`                 | `number`                                         | Maximum number of attachments allowed.                                                                      | `5`                                                         |
| `acceptedDocumentTypes`          | `string`                                         | Comma-separated string of accepted document file types.                                                     | `".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"`              |
| `acceptedImageTypes`             | `string`                                         | Comma-separated string of accepted image file types.                                                        | `"image/jpeg,image/png,image/gif,image/webp,image/svg+xml"` |
| `className`                      | `string`                                         | Custom CSS class for the main container.                                                                    | `""`                                                        |
| `textAreaClassName`              | `string`                                         | Custom CSS class for the textarea.                                                                          | `""`                                                        |
| `buttonClassName`                | `string`                                         | Custom CSS class for the send button.                                                                       | `""`                                                        |
| `attachmentPreviewClassName`     | `string`                                         | Custom CSS class for the attachment preview area.                                                           | `""`                                                        |
| `actionButtonContainerClassName` | `string`                                         | Custom CSS class for the action buttons container.                                                          | `""`                                                        |

## `ActionComponentConfig` Typedef

| Name           | Type                                                            | Description                                                                                                                                           |
| -------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | `string`                                                        | A unique identifier for the action component.                                                                                                         |
| `icon`         | `React.ElementType`                                             | The icon component to display.                                                                                                                        |
| `tooltip`      | `string`                                                        | Tooltip text for the action button.                                                                                                                   |
| `actionType`   | `'imageUpload' \| 'documentUpload'` (optional)                  | If specified, provides default `onClick` behavior to open the Input component's file dialog and applies attachment limit-based disabling.             |
| `onClick`      | `() => void` (optional)                                         | Custom click handler. If `actionType` is also specified, this will override the default click behavior of the `actionType`.                           |
| `onFileSelect` | `(files: FileList) => void` (optional)                          | Handler for file input actions (typically for custom file inputs within `customRender`).                                                              |
| `accept`       | `string` (optional)                                             | Accepted file types for this action (e.g., 'image/\*'). Used by `customRender` with file inputs.                                                      |
| `disabled`     | `boolean` (optional)                                            | Explicitly disable the button. If `actionType` is 'imageUpload' or 'documentUpload', the button will also be disabled if `maxAttachments` is reached. |
| `customRender` | `(config: ActionComponentConfig) => React.ReactNode` (optional) | Optional function to render a custom component.                                                                                                       |
| `position`     | `'left' \| 'right'` (optional)                                  | Position of the action button relative to the textarea. Defaults to `'left'`.                                                                         |

## Styling

The `Input` component and its sub-elements can be styled using the following prop-based class names:

- **`className`**: Applies to the main container `div` of the component.
  - Default Tailwind classes: `flex flex-col p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm`
- **`textAreaClassName`**: Applies to the `TextareaAutosize` component.
  - Default Tailwind classes: `flex-grow resize-none p-2.5 mb-4 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500`
- **`buttonClassName`**: Applies to the main send `button`.
  - Default Tailwind classes: `p-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-150 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`
- **`attachmentPreviewClassName`**: Applies to the `div` that wraps the attachment previews.
  - Default Tailwind classes: `mb-2 flex flex-wrap gap-2 p-2 border-b border-gray-200 dark:border-gray-700`
- **`actionButtonContainerClassName`**: Applies to the `div` that wraps the left and right action buttons.
  - Default Tailwind classes: `flex gap-1 items-center`

Additional styling can be achieved by targeting the default classes or by overriding them with these props.
The attachment items and their remove buttons also have default styling:

- Attachment item: `relative group flex items-center p-1.5 pr-6 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-700 dark:text-gray-300`
- Attachment remove button: `absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 hover:bg-red-600`
- Action buttons (individual): `p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150`
