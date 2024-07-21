import React from "react";
import Image from "next/image";
import NotFoundImage from "../../public/404-image.png";

const notFound = () => {
  return (
    <div className="h-[85vh] flex flex-col justify-center gap-12">
      <Image
        src={NotFoundImage}
        alt="not-found-image"
        className="w-fit h-40 mx-auto"
      />
      <div className="flex gap-4 items-center justify-center">
        <p className="text-2xl font-bold">
          Sorry, the page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default notFound;
