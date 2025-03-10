"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";

const NoteEditor = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 렌더링하도록 설정
  }, []);

  const editor: Editor | null = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World!</p>",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl m-5 focus:outline-none",
      },
    },
    // 🔥 이 부분 추가
    injectCSS: false,
    // parseOptions: {
    //   immediatelyRender: false,
    // },
  });

  if (!isClient || !editor) {
    return null;
  }

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default NoteEditor;
