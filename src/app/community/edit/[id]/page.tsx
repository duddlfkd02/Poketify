import Form from "@/components/Form";
import { FormType } from "@/types/FormType";
import { createClient } from "@supabase/supabase-js";

type Props = {
  params: {
    id: string;
  };
};
export function generateMetadata({ params }: Props) {
  return {
    title: params.id,
    description: `Detail 페이지 : ${params.id}`
  };
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const Edit = async ({ params }: { params: { id: string } }) => {
  const { data } = await supabase.from("posts").select().eq("id", params.id);
  const loadData: FormType = data ? data[0] : [];

  return (
    <div>
      <h2>Edit</h2>
      <Form loadData={loadData} />
    </div>
  );
};
export default Edit;
