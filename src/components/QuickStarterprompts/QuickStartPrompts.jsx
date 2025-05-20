import React from "react";
import { Button, Tooltip } from "@mantine/core";
import { DynamicTablerIcon } from "../DynamicTablerIcon/DynamicTablerIcon";

export const QuickStartPrompts = ({
  onPromptClick,
  prompts,
  columns = 3,
  className = "",
  buttonClassName = "",
  tooltipPosition = "bottom",
  tooltipDelay = 400,
  buttonProps,
}) => {
  return (
    <div className={`flex flex-col w-full gap-2 ${className}`}>
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-4 w-full`}>
        {Array.isArray(prompts) &&
          prompts.map((item, index) => (
            <Button
              key={`quick-start-prompt-${index}`}
              onClick={() => onPromptClick(item.prompt, item.data)}
              variant="outline"
              className={`whitespace-normal rounded border border-purple-500  min-h-[60px] h-[fit-content] flex justify-between items-center py-1 hover:bg-bgSelectedColor ${buttonClassName}`}
              {...buttonProps}
              styles={{
                root: {
                  borderColor: "var(--border-default-color)",
                  "&:hover": {
                    borderColor: "var(--border-default-color)",
                  },
                },
              }}
            >
              <span className="mr-3">
                <DynamicTablerIcon
                  name={item.icon}
                  size={20}
                  color="var(--date-range-endpoint-color)"
                />
              </span>
              <Tooltip
                label={item.prompt}
                position={tooltipPosition}
                openDelay={tooltipDelay}
                className="!bg-bgPopoverColor !text-textDefault p-1"
              >
                <p className="text-start text-wrap text-sm font-normal text-textDefault line-clamp-2">
                  {item.prompt}
                </p>
              </Tooltip>
            </Button>
          ))}
      </div>
    </div>
  );
};
