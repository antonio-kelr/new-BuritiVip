import { useEffect, useState } from "react";
import { BannerPhotos } from "../../servers";
import { useFilteredImages } from "../imageDimensions/imageDimensions";

const Pageanucios = () => {
  const [bannerUrls, setBannerUrls] = useState<string[]>([]);
  const [secondImages, setSecondImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bannerResponse = await BannerPhotos.getAll();
        const urls = bannerResponse.data.map((banner: any) => banner.url);
        setBannerUrls(urls);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  const { otherImages } = useFilteredImages(bannerUrls, 500);

  // Garantir que as imagens da primeira seção não se repitam na segunda
  useEffect(() => {
    if (otherImages.length > 0) {
      const firstImagesSlice = otherImages.slice(0, 4);

      // Filtra as imagens restantes para a segunda seção
      const secondImagesSlice = otherImages
        .filter((img) => !firstImagesSlice.includes(img))
        .slice(0, 4);

      setSecondImages(secondImagesSlice);
    }
  }, [otherImages]); // Atualiza quando as imagens estiverem carregadas

  return (
    <div>
      <div className="colus">
        <div className="colusn">
          {secondImages.map((url, index) => (
            <div key={index} className="col item">
              <img src={url} alt="imagem da segunda seção" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pageanucios;
