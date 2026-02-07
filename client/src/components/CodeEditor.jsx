import Editor, { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { LoadingComponent } from "./LoadingComponent";

export const CodeEditor = ({ language, code, setCode }) => {
  const [themeLoaded, setThemeLoaded] = useState(false);
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme("nightshift-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "keyword", foreground: "FF79C6", fontStyle: "bold" },
          { token: "string", foreground: "50FA7B" },
          { token: "comment", foreground: "6272A4", fontStyle: "italic" },
        ],
        scrollbar: {
          vertical: "visible",
          horizontal: "auto",
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10,
          arrowSize: 12,
          handleMouseWheel: true,
        },
        colors: {
          "editor.background": "#00000000",
          "editor.foreground": "#F8F8F2",
          "editorLineNumber.foreground": "#6272A4",
          "editorCursor.foreground": "#FF79C6",
          "editor.selectionBackground": "#44475AAA",
        },
      });
      setThemeLoaded(true);
    }
  }, [monaco]);

  if (!themeLoaded) {
    return <LoadingComponent />;
  }

  return (
    <Editor
      height="500px"
      language={language == "js" ? "javascript" : language || "javascript"}
      value={code}
      theme="nightshift-dark"
      onChange={(value) => setCode(value)}
      options={{
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false },
      }}
    />
  );
};
