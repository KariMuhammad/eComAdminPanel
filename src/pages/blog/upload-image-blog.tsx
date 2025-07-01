// import { useState } from "react";

import { CreateBlogStepsComponent } from "@/constants/create-blog-steps";
import UploadImageInput from "@/components/shared/upload-image-input";

export default function UploadImageBlog() {
  // const [image, setImage] = useState<string>("");

  return (
    <div className="h-full container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload image for blog</h1>

      {/* Stepper */}
      <CreateBlogStepsComponent currentStep={1} />

      <form className="space-y-4">
        <UploadImageInput />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Upload image
        </button>
      </form>
    </div>
  );
}
