import React, { useState } from "react";
import { useRef } from "react";

interface FileUploadProps {
  setFile: Function;
  accept: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children
}): React.ReactElement => {
  const inputRef = useRef<HTMLInputElement>(null)
  const onAddFile = () => inputRef.current.click()
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files[0] && setFile(e.target.files[0])
  }
  return (
    <div onClick={onAddFile}>
      <input ref={inputRef} type="file" accept={accept} style={{ display: "none" }} onChange={onChange} />
      {children}
    </div>
  );
};
