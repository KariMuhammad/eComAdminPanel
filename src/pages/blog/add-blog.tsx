import { useEffect, useState, type FormEvent } from "react";
import { CreateBlogStepsComponent } from "@/constants/create-blog-steps";
import { useGetBlogCategoriesQuery } from "@/app/redux/features/blog-categories";
import ReactQuill from "react-quill";
import { useCreateBlogMutation, useGetBlogByIdQuery, useUpdateBlogMutation } from "@/app/redux/features/blog";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

type AddBlogProps = {
  mode?: "create" | "edit";
}

export default function AddBlog({ mode = "create" }: AddBlogProps) {
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const { id } = useParams();

  const { data: currentBlog } = useGetBlogByIdQuery({ id: id! }, { skip: !id });
  const { data: blogCategories } = useGetBlogCategoriesQuery();
  const [createBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = new FormData();

    formData.append("title", title)
    formData.append("description", content)
    formData.append("category", category)

    if (mode === "create") {
      createBlog(formData).then(() => {
        toast.success("Created Blog");
        navigate("/blogs");
      }).catch(e => {
        toast.error("Error in create blog");
      })
    }

    if (mode === "edit" && id) {
      updateBlog({ id, data: formData }).then((d) => {
        toast.success("Updated blog");
        navigate("/blogs")
      }).catch(error => {
        toast.error("Error in update Blog");
      })
    }
  }

  useEffect(() => {
    if (mode === "edit" && id) {
      if (!currentBlog) return;

      setTitle(currentBlog.title);
      setContent(currentBlog.description);
    }
  }, [id, currentBlog])

  return (
    <div className="h-full container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>

      {/* Stepper */}
      <CreateBlogStepsComponent currentStep={0} />

      <form className="space-y-4" onSubmit={onSubmit}>
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
          {/* Rich Text Content ReactQuill */}
          <ReactQuill
            className="h-1/2"
            value={content}
            onChange={(d) => setContent(d)}
          />
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
            {blogCategories && blogCategories.map((blogCategory) => <option value={blogCategory._id}>{blogCategory.name}</option>)}
          </select>
        </div>
        {/* ./category input */}

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
