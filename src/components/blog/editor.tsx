import { forwardRef, useEffect, useRef } from "react";
import Quill from "quill";

// Define the shape of the props
type EditorProps = {
  readOnly?: boolean;
  defaultValue?: any; // You may replace `any` with `DeltaStatic` if using Quill types
  // onTextChange?: TextChangeHandler;
};

// Define the Quill editor reference type
type QuillEditorRef = Quill | null;

import "quill/dist/quill.snow.css"; // Import Quill styles

const Editor = forwardRef<QuillEditorRef, EditorProps>(
  ({ readOnly = false, defaultValue }, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const defaultValueRef = useRef(defaultValue);
    // const onTextChangeRef = useRef(onTextChange);
    // const onSelectionChangeRef = useRef(onSelectionChange);

    // Handle readOnly prop updates
    useEffect(() => {
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current?.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const editorContainer = container.ownerDocument.createElement("div");
      container.appendChild(editorContainer);

      const quill = new Quill(editorContainer, {
        theme: "snow",
      });

      // Set the forwarded ref
      if (typeof ref === "function") {
        ref(quill);
      } else if (ref) {
        ref.current = quill;
      }

      // Set default value if provided
      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      // Setup event listeners
      // quill.on("text-change", (...args) => {
      //   onTextChangeRef.current?.(...args);
      // });

      return () => {
        // Cleanup
        if (typeof ref === "function") {
          ref(null);
        } else if (ref) {
          ref.current = null;
        }
        container.innerHTML = "";
      };
    }, [ref]);

    return <div ref={containerRef} className="bg-white" />;
  }
);

Editor.displayName = "Editor";

export default Editor;
