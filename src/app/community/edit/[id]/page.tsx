import Form from "@/components/Form";

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

const Edit = async ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h2>Edit</h2>
      <Form params={params.id} isEdit={true} />
    </div>
  );
};
export default Edit;
