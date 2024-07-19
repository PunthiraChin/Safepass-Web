/// ยังใช้งานไม่ได้ ///

// import React from "react";

// export default function InputImage({ label, name, ref, onChange, src }) {
//   return (
//     <div className="flex flex-col">
//       <label htmlFor="cover-image-input" className="text-md font-semibold">
//         Cover Image
//       </label>
//       <input
//         type="file"
//         id="cover-image-input"
//         ref={fileCoverImage}
//         className="hidden"
//         name="coverImage"
//         onChange={handleUploadFile}
//       ></input>
//       <Button onClick={() => fileCoverImage.current.click()}>
//         Upload Photo
//       </Button>
//       <div>
//         <img
//           className="w-full"
//           src={
//             input.coverImage ? URL.createObjectURL(input.coverImage) : undefined
//           }
//         />
//       </div>
//     </div>
//   );
// }
