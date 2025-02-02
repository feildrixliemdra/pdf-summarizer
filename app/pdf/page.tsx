import FileUpload from "@/components/FileUpload";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import React from "react";

const PDFPage = () => {
  return (
    <BackgroundBeamsWithCollision className="min-h-screen">
      <section className="container mx-auto z-10">
        <div className="w-1/2 mx-auto bg-[#1A1A23] my-10 rounded-md  border-white border-[1px] p-8 flex flex-col justify-between gap-5 items-center">
          <h1 className="text-xl font-semibold">Upload your PDF</h1>
          <FileUpload />
          <Button className="w-full py-6 text-lg  bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 text-white font-semibold">
            Summarize Document
          </Button>
        </div>
      </section>
    </BackgroundBeamsWithCollision>
  );
};

export default PDFPage;
