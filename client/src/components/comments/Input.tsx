import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { IComment, RootStore } from "../../utils/TypeScript";
import LiteQuill from "../commenteditor/LiteQuill";

interface IProps {
  callback: (body: string) => void;
  edit?: IComment;
  setEdit?: (edit?: IComment) => void;
}

const Input: React.FC<IProps> = ({ callback, edit, setEdit }) => {
  const [body, setBody] = useState("");
  const divRef = useRef<HTMLDivElement>(null);
  const { auth, comments, darkMode } = useSelector((state: RootStore) => state);
  const { isdarkMode } = darkMode;
  useEffect(() => {
    if (edit) setBody(edit.content);
  }, [edit]);

  const handleSubmit = () => {
    const div = divRef.current;
    const text = div?.innerText as string;
    if (!text.trim()) {
      if (setEdit) return setEdit(undefined);
      return;
    }

    callback(body);

    setBody("");
  };

  return (
    <div>
      <LiteQuill body={body} setBody={setBody} />

      <div
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
        style={{ display: "none" }}
      />

      <button
        className="btn btn-dark ms-auto d-block px-4 mt-2 border border-light"
        onClick={handleSubmit}
      >
        {edit ? "Update" : "Send"}
      </button>
    </div>
  );
};

export default Input;
