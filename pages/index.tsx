import React, { useState } from "react";
import { button as buttonStyles } from "@nextui-org/theme";
import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(""); // State untuk input
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State untuk error

  const handleDownload = (): void => {
    // Validasi input kosong
    if (!inputValue.trim()) {
      setErrorMessage("Link tidak boleh kosong!");
      return;
    }

    // Reset error message jika input valid
    setErrorMessage(null);
    setIsLoading(true);

    // Simulasi proses download
    setTimeout(() => {
      setIsLoading(false);
      alert("Download selesai!");
    }, 3000); // Simulasi 3 detik
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
      </section>
    </DefaultLayout>
  );
}
