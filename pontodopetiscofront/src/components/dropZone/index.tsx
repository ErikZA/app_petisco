import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileUploaded: (file: File) => void;
}

const DropZone: React.FC<Props> = ({ onFileUploaded }) => {
  const [selectFile, setSelectFile] = useState("");

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      const fileUrl = URL.createObjectURL(file);
      setSelectFile(fileUrl);
      onFileUploaded(file);
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {selectFile ? (
        <img src={selectFile} alt="point" />
      ) : (
        <>
          <svg
            className="bi bi-cloud-upload mt-1 mb-2"
            width="4em"
            height="4em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.887 6.2l-.964-.165A2.5 2.5 0 1 0 3.5 11H6v1H3.5a3.5 3.5 0 1 1 .59-6.95 5.002 5.002 0 1 1 9.804 1.98A2.501 2.501 0 0 1 13.5 12H10v-1h3.5a1.5 1.5 0 0 0 .237-2.981L12.7 7.854l.216-1.028a4 4 0 1 0-7.843-1.587l-.185.96z" />
            <path
              fill-rule="evenodd"
              d="M5 8.854a.5.5 0 0 0 .707 0L8 6.56l2.293 2.293A.5.5 0 1 0 11 8.146L8.354 5.5a.5.5 0 0 0-.708 0L5 8.146a.5.5 0 0 0 0 .708z"
            />
            <path
              fill-rule="evenodd"
              d="M8 6a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 6z"
            />
          </svg>
          <h5 className="mt-4 mb-4">
            Clique ou solte a imagem do seu estabelecimento aqui...
          </h5>
        </>
      )}
    </div>
  );
};

export default DropZone;
