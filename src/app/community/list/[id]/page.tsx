import Paging from "@/components/Paging";
import browserClient from "@/supabase/client";
import Link from "next/link";

const perPage: number = 1; // 한 번에 보여 줄 게시글 개수

const List = async ({ params }: { params: { id: string } }) => {
  const nowPage = parseInt(params.id) - 1;
  const rangeStart: number = nowPage * perPage;
  const rangeEnd: number = perPage - 1 + nowPage * perPage;

  const { data, count } = await browserClient
    .from("posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(rangeStart, rangeEnd);

  return (
    <div>
      {data?.map((post) => {
        return (
          <div key={post.id}>
            <Link href={`/community/detail/${post.id}`}>{post.title}</Link>
          </div>
        );
      })}

      <div className="paging">
        <Paging nowPage={parseInt(params.id)} totalCount={Math.ceil(count! / perPage)} />
      </div>
    </div>
  );
};
export default List;
