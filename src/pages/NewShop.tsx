import { useNavigate } from "react-router";
import { useCampaigns } from "@/hooks/useCampaigns";
import { ShopForm } from "@/components/forms";
import type { Shop } from "@/types/campaigns";

const NewShop = () => {
  const navigate = useNavigate();
  const { createShop } = useCampaigns();

  const handleSubmit = (shopData: Omit<Shop, "id">) => {
    const newShop: Shop = {
      ...shopData,
      id: Date.now().toString(),
    };
    
    createShop(newShop);
    navigate("/shops");
  };

  const handleCancel = () => {
    navigate("/shops");
  };

  return (
    <div className="page-container">
      <ShopForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={false}
      />
    </div>
  );
};

export default NewShop;
