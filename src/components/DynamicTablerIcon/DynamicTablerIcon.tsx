import React from "react";
import * as TablerIcons from "@tabler/icons-react";

export const DynamicTablerIcon = ({
  name,
  size = 12,
  color = "currentColor",
  ...props
}) => {
  let Icon = TablerIcons[name];

  if (Icon === undefined) {
    Icon = TablerIcons["IconCode"];
    return <Icon stroke={1} size={size} color={color} {...props} />;
  }

  return <Icon stroke={1} size={size} color={color} {...props} />;
};
