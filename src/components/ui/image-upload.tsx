import React, { FormEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloseCircle } from "react-icons/io5";

import Image from "next/image";

import { Button } from "./button";

interface IImageUploadProps {
  className: string;
  onChange: (value: string) => void;
  value: string;
}

interface IFile extends File {
  preview: string;
}

export const ImageUpload: React.FC<IImageUploadProps> = ({
  className,
  onChange,
  value,
}) => {
  const [files, setFiles] = useState<IFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    }
  }, []);

  const handleRemoveFile = (name: string) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2, // limited to 2mb
    onDrop,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!files.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    const name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
    formData.append("upload_preset", name);

    const URL = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL || "";
    const data = await fetch(URL, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    onChange(data.secure_url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        {...getRootProps({
          className,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Arraste e solte uma imagem aqui, ou clique para selecionar.</p>
        )}
      </div>
      {/* Preview */}
      <section className="mt-10">
        <div className="flex gap-4">
          <h2 className="title text-3xl font-semibold">Preview</h2>
          <Button type="submit">Upload</Button>
        </div>
        {/* Accepted files */}
        <h3 className="title mt-10 border-b pb-3 text-lg font-semibold text-stone-600">
          Accepted Files
        </h3>
        <ul className="mt-6 flex">
          {files.map((file) => (
            <li
              key={file.name}
              className="relative h-32 w-full rounded-md shadow-lg"
            >
              <Image
                src={value}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                className="h-full w-full rounded-md object-contain"
              />
              <Button
                size="none"
                variant="ghost"
                className="absolute -right-3 -top-3 rounded-full"
                onClick={() => handleRemoveFile(file.name)}
              >
                <IoCloseCircle className="h-7 w-7 text-rose-500" />
              </Button>
              <p className="mt-2 text-[12px] font-medium text-stone-500">
                {file.name}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </form>
  );
};
