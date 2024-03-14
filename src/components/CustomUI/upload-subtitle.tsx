"use client";

import { Captions } from "lucide-react";

interface UploadSubtitleProps {
  onFileSelected: (url: string) => void;
}

export default function UploadSubtitle({
  onFileSelected,
}: UploadSubtitleProps) {
  // 选择文件后，将文件的URL存储到videoUrl中
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const fileUrl = URL.createObjectURL(event.target.files[0]);
      onFileSelected(fileUrl);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center">
          <Captions
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <span>Upload a file</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept=".srt"
                onChange={handleFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
}
