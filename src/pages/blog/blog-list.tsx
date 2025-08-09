import { useDeleteBlogMutation, useGetBlogsQuery } from "@/app/redux/features/blog";
import { DeleteModal } from "@/components/modal-templates/DeleteModal";
import { useModal } from "@/hooks/useModal";
import ListPage from "@/layouts/page-list";
import { ModalSizes } from "@/types";
import { Link } from "react-router-dom";

export default function BlogList() {

  const { openModal } = useModal();

  const { data } = useGetBlogsQuery({});
  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = (id: string) => {
    openModal({
      title: "Delete this blog?",
      children: <DeleteModal onConfirm={() => deleteBlog({ id })} />,
      size: ModalSizes.lg
    })
  }

  return (
    <ListPage
      title="Blogs"
      buttonLabel="Add Blog"
      buttonUrl="/blogs/add"
      columns={["id", "title", "description", "view", "actions"]}
      data={data?.blogs || []}
      renderRow={(blog, index) => (
        <tr className="text-center">
          <td>{index + 1}</td>
          <td>{blog.title}</td>
          <td className="line-clamp-2">{blog.description}</td>
          <td className="font-bold">{blog.views}</td>
          <td className="px-4 py-2">
            <div className="flex items-center justify-center">
              <button className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 mr-2">
                <Link to={`/blogs/edit/${blog._id}`}>Edit</Link>
              </button>

              <button
                className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      )}
    />
  );
}
