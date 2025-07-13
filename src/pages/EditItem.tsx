import { useParams } from "react-router";
import ItemForm from "@/components/ItemForm/ItemForm";

const EditItem = () => {
  const { itemId } = useParams<{ itemId: string }>();

  return <ItemForm itemId={itemId} />;
};

export default EditItem;
