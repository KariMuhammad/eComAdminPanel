import { useRef, useState } from "react";

import Editor from "@/components/blog/editor";
import { CreateBlogStepsComponent } from "@/constants/create-blog-steps";

export default function AddBlog() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  //   const [content, setContent] = useState<string>("");

  const QuillRef = useRef(null);

  return (
    <div className="h-full container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>

      {/* Stepper */}
      <CreateBlogStepsComponent currentStep={0} />

      <form className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            name="title"
            type="text"
            className="mt-1 p-2 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 outline-none"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* ./title input */}
        <div className="">
          <label className="block text-lg font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            rows={5}
            className="mt-1 p-2 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 outline-none"
            placeholder="Write your blog description here"
          ></textarea>
        </div>
        {/* ./description input */}
        <div className="mb-4 flex items-center space-x-4">
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            className="mt-1 p-2 w-fit block bg-white border-gray-300 rounded-md shadow-sm outline-none"
          >
            <option value="">Select a category</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="health">Health</option>
            <option value="travel">Travel</option>
          </select>
        </div>
        {/* ./category input */}

        {/* Rich Text Content ReactQuill */}
        <Editor ref={QuillRef} defaultValue="" />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
