import React from "react";

function Canvas({ blocks, activeTabId }) {
  const currentBlock = blocks.find((b) => b.id === activeTabId);

  if (!currentBlock) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        No matching tab found.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden px-4 pt-3 pb-4">
      <div className="flex justify-between px-1 bg-codeHeader items-center rounded-t-lg border border-borderDefault border-b-0 max-w-3/4">
        {currentBlock.navbar}
      </div>

      <div className="flex-1 overflow-hidden rounded-b-lg bg-bgCardColor border border-borderDefault border-t-0">
        {currentBlock.content}
      </div>
    </div>
  );
}

export default Canvas;
