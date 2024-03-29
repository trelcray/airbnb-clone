import React, { FormEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { IoCloseCircle } from "react-icons/io5";
import { TbPhotoPlus } from "react-icons/tb";

import axios from "axios";
import Image from "next/image";

import { useToast } from "@/hooks/use-toast";

import { Button } from "./button";

interface IImageUploadProps {
  className: string;
  onChange: (value: string) => void;
}

interface IFile extends File {
  preview: string;
}

export const ImageUpload: React.FC<IImageUploadProps> = ({
  className,
  onChange,
}) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg, image/jpg, image/png": [],
    },
    maxFiles: 1,
    maxSize: 1024 * 1024 * 2, // limited to 2mb
    onDrop,
  });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement>,
    name: string
  ) => {
    e.stopPropagation();

    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!files.length) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("file", file));

    const name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
    formData.append("upload_preset", name);

    const URL = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL || "";

    try {
      const response = await axios.post(URL, formData);
      const data = response.data;

      onChange(data.secure_url);
      toast({ title: "Success!" });
    } catch (error) {
      toast({ title: (error as Error).message, isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-1">
      <div
        {...getRootProps({
          className,
        })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <>
            <TbPhotoPlus size={50} />
            <p className="text-lg font-semibold">Click to load the image</p>
          </>
        )}
        {files.map((file) => (
          <>
            <Image
              key={file.name}
              fill
              src={file.preview}
              alt={file.name}
              className="pointer-events-none w-full rounded-md object-cover"
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
            />
            <Button
              size="none"
              variant="ghost"
              className="absolute -right-2 -top-2 rounded-full"
              onClick={(e) => handleRemoveFile(e, file.name)}
            >
              <IoCloseCircle className="h-7 w-7 text-rose-500" />
            </Button>
          </>
        ))}
      </div>
      <Button
        disabled={isLoading}
        isLoading={isLoading}
        type="submit"
        className="gap-2"
        variant="secondary"
      >
        <FiUploadCloud size={18} className="mt-[0.08rem]" />
        Upload Image
      </Button>
    </form>
  );
};
