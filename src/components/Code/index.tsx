import { createStyles } from "antd-style";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const useStyle = createStyles(({ css, cx }) => {
  const copy = cx(css`
    position: absolute;
    top: 4px;
    right: 4px;
    color: #fff;
    background-color: #999;
    padding: 4px 10px;
    border-radius: 4px;
    cursor: pointer;
    display: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `);
  return {
    codeBody: css`
      position: relative;
      &:hover .${copy} {
        display: block;
      }
    `,
    copy,
  };
});

export default ({ content }: { content: string }) => {
  const { styles } = useStyle(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (copied) return;
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {}
  };

  return (
    <div className={styles.codeBody}>
      <SyntaxHighlighter language="ts" showLineNumbers style={a11yDark}>
        {content}
      </SyntaxHighlighter>
      <div className={styles.copy} onClick={handleCopy}>
        {copied ? "已复制" : "复制"}
      </div>
    </div>
  );
};
