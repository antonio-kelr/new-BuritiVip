import "./Visible.css";
import { useEffect, useState } from "react";
import { BannerPhotos } from "../../servers";
import { useFilteredImages } from "../imageDimensions/imageDimensions";

const Visible = () => {
  const [bannerUrls, setBannerUrls] = useState<string[]>([]);
  const [firstImages, setFirstImages] = useState<string[]>([]);

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
      // Pega as 4 primeiras imagens para a primeira seção
      const firstImagesSlice = otherImages.slice(0, 4);
      setFirstImages(firstImagesSlice);
    }
  }, [otherImages]); // Atualiza quando as imagens estiverem carregadas

  return (
    <div className="colus">
      <div className="colusn">
        {firstImages.map((url, index) => (
          <div key={index} className="col item">
            <img src={url} alt="imagem" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visible;
