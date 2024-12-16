import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [downloadData, setDownloadData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleDownload = async () => {
    if (!inputValue.trim()) {
      setErrorMessage("Link tidak boleh kosong!");
      return;
    }
  
    setErrorMessage(null);
    setIsLoading(true);
  
    try {
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(inputValue)}`);
      if (!response.ok) {
        throw new Error("Gagal mengambil data dari server");
      }
  
      const result = await response.json();
      const mediaData: { type: string, url: string }[] = [];
if (result.data.url && Array.isArray(result.data.url)) {
  result.data.url.forEach((url: string) => mediaData.push({ type: "image", url }));
}
if (result.data.hd_url && Array.isArray(result.data.hd_url)) {
  result.data.hd_url.forEach((url: string) => mediaData.push({ type: "video", url }));
}

  
      if (mediaData.length === 0) {
        throw new Error("Media tidak ditemukan.");
      }
  
      setDownloadData({
        author: result.data.author || "Tidak diketahui",
        caption: result.data.caption || "Tidak tersedia",
        media: mediaData,
      });
    } catch (error) {
      setErrorMessage(error.message || "Terjadi kesalahan saat mengambil media.");
    } finally {
      setIsLoading(false);
    }
  };

  const openPreview = (media) => {
    setSelectedMedia(media);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setSelectedMedia(null);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center">
          <span className={title()}>Social&nbsp;</span>
          <span className={title({ color: "violet" })}>Media&nbsp;</span>
          <br />
          <span className={title()}>Downloader.</span>
          <div className={subtitle({ class: "mt-4" })}>
            Instagram, Tiktok, Pinterest, and more.
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Input your link ..."
            className="input-field border rounded-md border-purple-500 p-2 w-80"
          />
          {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
          <Button
            onClick={handleDownload}
            isLoading={isLoading}
            disabled={isLoading}
            className="w-32 transition-transform transform hover:scale-105 active:scale-95"
            color="primary"
            radius="sm"
          >
            {isLoading ? "Loading..." : "Download"}
          </Button>
        </div>

        {downloadData && (
          <div className="mt-6 text-center">
            <p>Caption: {downloadData.caption}</p>

            {downloadData.media && downloadData.media.length > 0 ? (
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                navigation
                className="mt-4 w-80 border rounded-md shadow-md"
              >
                {downloadData.media.map((media, index) => (
                  <SwiperSlide key={index}>
                    {media.type === "image" ? (
                      <img
                        src={media.url}
                        alt={`Media ${index + 1}`}
                        className="w-full h-auto cursor-pointer rounded-md"
                        onClick={() => openPreview(media)}
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <video
                        src={media.url}
                        controls
                        autoPlay={false}
                        className="w-full h-auto rounded-md"
                        crossOrigin="anonymous"
                        preload="metadata"
                      >
                        Maaf, video tidak bisa diputar.
                      </video>
                    )}
                    <a
                      href={media.url}
                      download={`media-${index + 1}`}
                      className="block mt-2 text-center text-blue-500 hover:text-blue-600 transition"
                    >
                      Preview Media
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="text-gray-500">Tidak ada media yang dapat ditampilkan.</p>
            )}

{showPreview && selectedMedia && (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ease-in-out">
    <div className="bg-white p-4 rounded-md shadow-md w-11/12 md:w-2/3 transform scale-90 transition-transform duration-300 ease-in-out">
      <button
        onClick={closePreview}
        className="text-red-500 text-lg absolute top-4 right-4 hover:text-red-700 transition-colors"
        aria-label="Close preview"
      >
        &times;
      </button>
      {selectedMedia.type === "image" ? (
        <img
          src={selectedMedia.url}
          alt="Preview"
          className="w-full h-auto rounded-md"
        />
      ) : (
        <video
          src={selectedMedia.url}
          controls
          className="w-full h-auto rounded-md"
        >
          Browser kamu tidak mendukung video preview.
        </video>
      )}
      <a
        href={selectedMedia.url}
        download
        className="block mt-4 text-center bg-blue-500 hover:bg-blue-600 transition-colors text-white py-2 px-4 rounded-md"
      >
        Download Media
      </a>
    </div>
  </div>
)}

          </div>
        )}
      </section>
    </DefaultLayout>
  );
}
