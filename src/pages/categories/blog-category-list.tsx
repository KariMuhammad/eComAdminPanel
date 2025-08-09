import { useDeleteBlogCategoryMutation, useGetBlogCategoriesQuery } from "@/app/redux/features/blog-categories";
import { DeleteModal } from "@/components/modal-templates/DeleteModal";
import { useModal } from "@/hooks/useModal";
import ListPage from "@/layouts/page-list";
import { ModalSizes } from "@/types";
import { Link } from "react-router-dom";
export default function BlogCategoryList() {

    const { openModal } = useModal();

    const { data: blogCategories } = useGetBlogCategoriesQuery();

    const [deleteBlogCategory] = useDeleteBlogCategoryMutation();

    const handleDelete = (id: string) => {
        openModal({
            title: "Delete Blog Cateogry?",
            children: <DeleteModal onConfirm={() => deleteBlogCategory({ _id: id })} />,
            size: ModalSizes.lg
        })
    }

    console.log("blog categories", blogCategories);

    return (
        <ListPage
            title="Blog Categories"
            buttonLabel="Add Blog Category"
            buttonUrl="/blog-category/add"
            columns={["id", "image", "name", "description", "count", "actions"]}
            data={blogCategories || []}
            renderRow={(category, index) => (
                <tr key={index}>
                    <td>{index}</td>
                    <td>
                        <img className="w-16 object-contain" src={category.image} />
                    </td>
                    <td>{category.name}</td>
                    <td className="line-clamp-2"><div dangerouslySetInnerHTML={{ __html: category.description }} /></td>
                    <td>{category.count}</td>
                    <td className="px-4 py-2">
                        <div className="flex items-center justify-center">
                            <button className="bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 mr-2">
                                <Link to={`/blog-category/edit/${category._id}`}>Edit</Link>
                            </button>

                            <button
                                className="bg-red-600 text-white py-1 px-2 rounded-md hover:bg-red-700"
                                onClick={() => handleDelete(category._id)}
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
