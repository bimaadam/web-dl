import React, { useState } from "react";
import { button as buttonStyles } from "@nextui-org/theme";
import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(""); // State untuk input
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State untuk error
  const [downloadData, setDownloadData] = useState<any>(null); // State untuk hasil API

  const handleDownload = async (): Promise<void> => {
    if (!inputValue.trim()) {
      setErrorMessage("Link tidak boleh kosong!");
      return;
    }
  
    setErrorMessage(null);
    setIsLoading(true);
  
    try {
      // Panggil API proxy
      const response = await fetch(`/api/proxy?url=${encodeURIComponent(inputValue)}`);
      if (!response.ok) {
        throw new Error("Gagal mengambil data dari server");
      }
  
      const result = await response.json();
      setDownloadData(result.data); // Simpan data hasil API
    } catch (error) {
      setErrorMessage(error.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {/* Header Section */}
        <div className="inline-block max-w-xl text-center">
          <span className={title()}>Social&nbsp;</span>
          <span className={title({ color: "violet" })}>Media&nbsp;</span>
          <br />
          <span className={title()}>Downloader.</span>
          <div className={subtitle({ class: "mt-4" })}>
            Instagram, Tiktok, Pinterest, and more.
          </div>
        </div>

        {/* Input and Download Button */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Update state input
            placeholder="Input your link ..."
            className="input-field border rounded-md border-purple-500 p-2 w-80"
          />
          {/* Tampilkan error message jika ada */}
          {errorMessage && (
            <span className="text-red-500 text-sm">{errorMessage}</span>
          )}
          <Button
            onClick={handleDownload}
            isLoading={isLoading}
            disabled={isLoading} // Disable button saat loading
            className="w-32"
            color="primary"
            radius="sm"
          >
            {isLoading ? "Loading..." : "Download"}
          </Button>
        </div>

        {/* Result Section */}
        {downloadData && (
  <div className="mt-6 text-center">
    <p>Author: {downloadData.author}</p>
    <p>Caption: {downloadData.caption}</p>
    
    {/* Preview Video */}
    {downloadData.video_url && (
      <video
        src={downloadData.video_url} // URL video dari API
        controls
        className="mt-4 w-80 border rounded-md shadow-md"
      >
        Browser kamu tidak mendukung video preview.
      </video>
    )}

    {/* Link Download Video */}
    <a
      href={downloadData.video_url} // Link ke video
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline mt-4 block"
    >
      Download Video
    </a>
    
    {/* Link Download Audio */}
    <a
      href={downloadData.audio_url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline mt-2 block"
    >
      Download Audio
    </a>
  </div>
)}

      </section>
    </DefaultLayout>
  );
}
