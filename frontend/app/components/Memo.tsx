"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Editor } from "@tiptap/core";
import { useEffect, useState } from "react";

const NoteEditor = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    console.log("📢 NoteEditor 컴포넌트 렌더링됨.");
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
    immediatelyRender: false,
    // parseOptions: {
    //   immediatelyRender: false,
    // },
  });

  if (!isClient || !editor) { // useMemo.isOpen 확인 추가
    return null;
  }

  return (
    <div className="absolute top-20 left-20 bg-white border border-gray-300 shadow-lg p-4 z-50">
      <EditorContent editor={editor} />
    </div>
  );
};

export default NoteEditor;
