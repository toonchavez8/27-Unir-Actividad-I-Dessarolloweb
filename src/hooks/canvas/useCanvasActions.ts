import type { CanvasData } from "@/types/campaigns";

export function useCanvasActions(
  canvasData: CanvasData[],
  setCanvasData: React.Dispatch<React.SetStateAction<CanvasData[]>>,
) {
  const updateCanvasData = (campaignId: string, data: Partial<CanvasData>) => {
    setCanvasData((previousCanvasData) => {
      const existingCanvas = previousCanvasData.find(
        (canvas) => canvas.campaignId === campaignId,
      );
      if (existingCanvas) {
        return previousCanvasData.map((canvas) =>
          canvas.campaignId === campaignId ? { ...canvas, ...data } : canvas,
        );
      } else {
        return [
          ...previousCanvasData,
          {
            campaignId,
            nodes: [],
            connections: [],
            zoom: 1,
            panX: 0,
            panY: 0,
            ...data,
          },
        ];
      }
    });
  };

  const getCanvasData = (campaignId: string) => {
    return canvasData.find((canvas) => canvas.campaignId === campaignId);
  };

  return {
    updateCanvasData,
    getCanvasData,
  };
}
