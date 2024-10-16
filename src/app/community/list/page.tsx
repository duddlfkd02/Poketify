"use client";

import CommunityListCard from "@/components/CommunityListCard";
import Paging from "@/components/Paging";
import WriteButton from "@/components/WriteButton";
import { supabase } from "@/supabase/supabase";
import { FormType } from "@/types/FormType";
import { useEffect, useState } from "react";

const perPage: number = 20; // 한 번에 보여 줄 게시글 개수

type ListType = {
  data?: FormType[];
  count: number;
};

const List = ({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) => {
  const page = searchParams?.page ?? "1";

  const [listData, setListData] = useState<ListType>({ count: 0 });

  const nowPage = parseInt(page) - 1;
  const rangeStart: number = nowPage * perPage;
  const rangeEnd: number = perPage - 1 + nowPage * perPage;

  const getList = async () => {
    const { data, count } = await supabase
      .from("posts")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(rangeStart, rangeEnd);

    setListData({ data: data!, count: count! });
  };

  useEffect(() => {
    getList();
  }, [page]);

  return (
    <div className="wrap">
      <div className="flex flex-wrap gap-4 gap-y-6">
        {listData?.data?.map((post) => {
          return <CommunityListCard key={post.id} post={post} />;
        })}
      </div>

      <div className="flex justify-end my-6">
        <WriteButton />
      </div>

      <div className="flex items-center justify-center font-cafe24meongi text-3xl font-thin">
        <Paging nowPage={parseInt(page)} totalCount={Math.ceil(listData?.count / perPage)} />
      </div>
    </div>
  );
};
export default List;
