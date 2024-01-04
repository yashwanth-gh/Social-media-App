import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../ui/button";

type FileUploadProp = {
  fileChange: (file: File[]) => void;
  mediaUrl: string;
  isMobile: boolean;
};

const FileUploder = ({ fileChange, mediaUrl, isMobile }: FileUploadProp) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState("");
  //FIXME: remove upload svg for mobile

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      // Do something with the files
      setFile(acceptedFiles);
      fileChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-color-hunt-1 cursor-pointer border border-dashed border-color-hunt-4"
    >
      <input {...getInputProps()} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="flex flex-1 py-4">
            <img src={fileUrl} alt="inputFile" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag image to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          {isMobile ? (
            <img src="/public/assets/icons/file-upload.svg"
            alt="file-upload"
            width={50}
            height={50} />
          ) : (
            <img
              src="/public/assets/images/uploadimage2.svg"
              alt="file-upload"
              height={100}
              width={100}
            />
          )}

          <h3 className="text-light-3 base-medium mt-2 mb-2">
            Drag and drop image here
          </h3>
          <p className="text-light-4 small-regular mt-1 mb-2">
            file type : SVG PNG JPG JPEG
          </p>
          <Button className="bg-slate-500 rounded-none mt-2 w-full">
            Click to select file
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploder;
