"use client";
import { Captions } from "lucide-react";

// interface UploadSubtitleProps {
//   onFileSelected: (url: string) => void;
// }

// export default function UploadSubtitle() {
//   // 选择文件后，将文件的URL存储到videoUrl中
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const fileUrl = URL.createObjectURL(event.target.files[0]);
//       localStorage.setItem('uploadedCaptionUrl', fileUrl);
//     }
//   };

//   return (
//     <div className="">
//       <div className="flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
//         <div className="text-center">
//           <Captions
//             className="mx-auto h-12 w-12 text-gray-300"
//             aria-hidden="true"
//           />
//           <div className="mt-4 flex text-sm leading-6 text-gray-600">
//             <label
//               htmlFor="file-upload"
//               className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
//             >
//               <span>Upload a file</span>
//               <input
//                 id="file-upload"
//                 name="file-upload"
//                 type="file"
//                 className="sr-only"
//                 accept=".srt"
//                 onChange={handleFileChange}
//               />
//             </label>
//             <p className="pl-1">or drag and drop</p>
//           </div>
//           <p className="text-xs leading-5 text-gray-600">
//             PNG, JPG, GIF up to 10MB
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import Link from "next/link";

export default function UploadPanel() {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (event.target.files && event.target.files[0]) {
      const fileUrl = URL.createObjectURL(event.target.files[0]);
      if (type === 'video') {
        localStorage.setItem('uploadedVideoUrl', fileUrl);
      } else if (type === 'subtitle') {
        localStorage.setItem('uploadedCaptionUrl', fileUrl);
      }
    }
  };

  return (
    <>
      <input
        id="video-upload"
        name="video-upload"
        type="file"
        accept="video/*"
        onChange={(event) => handleFileChange(event, 'video')}
      />
      <input
        id="subtitle-upload"
        name="subtitle-upload"
        type="file"
        accept=".srt,.vtt"
        onChange={(event) => handleFileChange(event, 'subtitle')}
      />

      <Link as={`/episodes/${"upload"}`} href="/episodes/[slug]">
        start
      </Link>
    </>
  );
}