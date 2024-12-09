import React, { useState } from "react";
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import DefaultLayout from "@/layouts/default";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { Button } from "@nextui-org/button";

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDownload = (): void => {
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

        {/* Documentation Link */}
        {/* <div className="flex gap-3">
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={siteConfig.links.docs}
          >
            Documentation
          </Link>
        </div> */}

        {/* Input and Download Button */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <input
            type="text"
            placeholder="input your link ..."
            className="input-field border rounded-md p-2 w-80"
          />
          <Button
            onClick={handleDownload}
            disabled={isLoading}
            className="w-32"
            color="primary"
            radius="sm"
          >
            {isLoading ? (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="spinner"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "5px",
                    animation: "spin 1s linear infinite",
                  }}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              "Download"
            )}
          </Button>
        </div>
      </section>

      {/* Inline CSS */}
      <style jsx>{`
        .input-field {
          outline: none;
          border: 1px solid #ddd;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </DefaultLayout>
  );
}
