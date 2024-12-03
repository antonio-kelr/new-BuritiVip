import { useState, useEffect } from "react";

export const useFilteredImages = (imageUrls: string[], minHeight: number) => {
  const [filteredImages, setFilteredImages] = useState<string[]>([]); // Imagens que têm altura maior que o mínimo
  const [otherImages, setOtherImages] = useState<string[]>([]); // Imagens que não atendem ao critério

  useEffect(() => {
    const fetchImageDimensions = async () => {
      try {
        const imageDimensions = await Promise.all(
          imageUrls.map((url) => {
            return new Promise<{ url: string; width: number; height: number }>(
              (resolve) => {
                const img = new Image();
                img.onload = () => {
                  resolve({ url, width: img.width, height: img.height });
                };
                img.src = url;
              }
            );
          })
        );

        // Separar as imagens em dois grupos
        const filtered = imageDimensions
          .filter((dimension) => dimension.height > minHeight)
          .map((dimension) => dimension.url);
        const others = imageDimensions
          .filter((dimension) => dimension.height <= minHeight)
          .map((dimension) => dimension.url);

        // Atualizar os estados com os dois grupos de imagens
        setFilteredImages(filtered);
        setOtherImages(others);
      } catch (error) {
        console.error("Erro ao carregar as imagens:", error);
      }
    };

    fetchImageDimensions();
  }, [imageUrls, minHeight]);

  return { filteredImages, otherImages }; // Retorna os dois grupos de imagens
};
