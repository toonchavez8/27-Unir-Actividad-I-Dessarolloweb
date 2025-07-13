import { useParams } from "react-router";
import ItemForm from "@/components/ItemForm/ItemForm";

const NewItem = () => {
  const { campaignId } = useParams<{ campaignId?: string }>();

  return <ItemForm campaignId={campaignId} />;
};

export default NewItem;
