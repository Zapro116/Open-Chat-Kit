import React, { useMemo } from "react";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { CustomDropDown } from "@src/component/Tabs/ChatTabPage/promptAnswer/codeRender/CustomDropdown";
// import { CustomButton } from "@src/component/common/CustomButton";
import {
  vscDarkPlus,
  prism,
} from "react-syntax-highlighter/dist/esm/styles/prism";
// import {
//   buttonsList,
//   dropdownItemsList,
// } from "@src/component/Tabs/ChatTabPage/promptAnswer/codeRender/CodeRender";

import "../Markdown/Markdown.css";
import { useMantineColorScheme } from "@mantine/core";

export const MarkdownRender = ({ markdown = "" }) => {
  const { colorScheme } = useMantineColorScheme();

  const components = useMemo(
    () => ({
      code: ({ className, children }) => {
        const language = className ? className.replace("language-", "") : "";

        return className ? (
          <div className="code-block relative z-[1] mt-4">
            <div className="code-block__toolbar sticky top-0 flex items-center justify-between">
              <div className="code-block-type font-inter px-3">{language}</div>

              <div className="flex items-center">
                {/* {buttonsList.map((btn) => (
                  <CustomButton
                    key={btn.id}
                    {...btn}
                    dataInfo={`{"language":"${language}"}`}
                  />
                ))}
                <CustomDropDown
                  items={dropdownItemsList}
                  dropdownButtonText="Insert"
                /> */}
              </div>
            </div>
            <div className="code-block__content border-borderDefault border-t">
              <SyntaxHighlighter
                language={language}
                style={colorScheme === "light" ? prism : vscDarkPlus}
                PreTag="div"
                codeTagProps={{
                  style: {
                    margin: "0px",
                    fontSize: "12px",
                    lineHeight: "14px",
                  },
                }}
                customStyle={{
                  margin: 0,
                  padding: "12px",
                  fontSize: "12px",
                  background: "none",
                }}
                className="code_block_container rounded"
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          </div>
        ) : (
          <code className="text-wrap break-words bg-transparent p-0">
            {children}
          </code>
        );
      },
      h1: ({ children }) => (
        <h1 className="mb-2 mt-4 text-xl font-bold">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="mb-2 mt-3 text-lg font-semibold">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="mb-2 mt-4 text-base font-semibold">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="mb-2 ml-2 mt-4 text-[16px] font-semibold">{children}</h4>
      ),
      h5: ({ children }) => (
        <h5 className="mb-2 ml-2 mt-4 text-[14px] font-semibold">{children}</h5>
      ),
      p: ({ children }) => (
        <p className="mb-2 text-[13px] leading-5">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-borderDefault text-textDefault rounded border-l-4 pl-4 italic">
          {children}
        </blockquote>
      ),
      a: ({ href, children }) => (
        <a href={href} className="text-linkColor hover:underline">
          {children}
        </a>
      ),
      ul: ({ children }) => (
        <ul className="ml-4 mt-2 list-outside list-disc">{children}</ul>
      ),
      ol: ({ children }) => (
        <ol className="ml-4 list-outside list-decimal">{children}</ol>
      ),
      li: ({ children }) => <li className="mb-2">{children}</li>,
      table: ({ children }) => (
        <div className="w-full overflow-x-auto">
          <table className="border-borderDefault mb-2 w-full border-collapse border">
            {children}
          </table>
        </div>
      ),
      th: ({ children }) => (
        <th className="border-borderDefault bg-backgroundDefault border px-4 py-2 text-left">
          {children}
        </th>
      ),
      td: ({ children }) => (
        <td className="border-borderDefault border px-4 py-2">{children}</td>
      ),
      img: ({ src, alt }) => (
        <img className="fynix-text-img" src={src} alt={alt || "Image"} />
      ),
    }),
    [colorScheme]
  );

  return (
    <ReactMarkDown remarkPlugins={[remarkGfm]} components={components}>
      {markdown}
    </ReactMarkDown>
  );
};
