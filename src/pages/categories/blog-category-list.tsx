import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/redux/store";

import type { RootState } from "@/app/redux/store";
import ListPage from "@/layouts/page-list";
import { fetchBlogCategories, type BlogCategoryState } from "@/app/redux/features/blog-categories";
export default function BlogCategoryList() {
    const dispatch = useDispatch<AppDispatch>();

    const { blogCategories } = useSelector<RootState, BlogCategoryState>(
        (store) => store.blogCategories
    );

    useEffect(() => {
        dispatch(fetchBlogCategories());
    }, []);

    console.log("blog categories", blogCategories);

    return (
        <ListPage
            title="Blog Categories"
            buttonLabel="Add Blog Category"
            buttonUrl="/blog-category/add"
            columns={["id", "image", "name", "description", "count"]}
            data={blogCategories}
            renderRow={(category, index) => (
                <tr key={index}>
                    <td>{index}</td>
                    <td>
                        <img className="w-16 object-contain" src={category.image} />
                    </td>
                    <td>{category.name}</td>
                    <td className="line-clamp-2"><div dangerouslySetInnerHTML={{ __html: category.description }} /></td>
                    <td>{category.count}</td>
                </tr>
            )}
        />
    );
}
