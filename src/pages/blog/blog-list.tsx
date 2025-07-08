import ListPage from "@/layouts/page-list";

export default function BlogList() {
  return (
    <ListPage
      title="Blogs"
      buttonLabel="Add Blog"
      buttonUrl="/add-blog"
      columns={["id", "title", "description", "view", "actions"]}
      data={[]}
      renderRow={() => <tr></tr>}
    />
  );
}
