import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="border-b-[1px] border-gray-600">
      <div className="container mx-auto my-5">
        <Link
          href="/"
          className="text-3xl font-bold bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]"
        >
          PDF Summarizer
        </Link>
      </div>
    </header>
  );
};

export default Header;
