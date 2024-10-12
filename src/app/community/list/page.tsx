import browserClient from "@/supabase/client";

const List = async () => {
  const { data } = await browserClient.from("posts").select().order("created_at", { ascending: false }).limit(2);

  return (
    <div>
      {data?.map((post) => {
        return <div key={post.id}>{post.title}</div>;
      })}
    </div>
  );
};
export default List;
