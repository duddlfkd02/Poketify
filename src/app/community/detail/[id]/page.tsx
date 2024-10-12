type Props = {
  params: {
    id: string;
  };
};
export function generateMetadata({ params }: Props) {
  return {
    title: params.id,
    description: params.id
  };
}

const Detail = ({ params }: { params: { id: string } }) => {
  return <div>Detail</div>;
};
export default Detail;
