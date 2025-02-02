import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen">
      <BackgroundBeamsWithCollision className="min-h-screen dark:bg-black flex flex-col items-center">
        <h2 className="text-2xl md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          <div className="mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">AI-Powered PDF Summarization</span>
            </div>
            <div className="bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">AI-Powered PDF Summarization</span>
            </div>
          </div>
          <TextGenerateEffect
            className="text-lg md:text-xl lg:text-2xl font-semibold text-center text-gray-500"
            words="Saves your time by extracting key insights from your PDF"
          />
        </h2>
        <Link href="/pdf">
          <Button
            className="mt-10 text-xl bg-transparent p-6"
            variant={"outline"}
          >
            Try It
          </Button>
        </Link>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
