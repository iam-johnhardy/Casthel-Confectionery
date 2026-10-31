import Image from "next/image";

export default function StoreLoader({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-4 px-5 py-12 text-center text-[#806a62]"
    >
       <Image
        src="/Cakeload.gif"
        alt=""
        width={320}
        height={320}
        unoptimized
        className="h-82 w-full rounded-2xl object-cover"
      />
      {/* <video
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="h-80 w-full rounded-2xl object-cover"
      >
        <source src="/mob.mp4" type="video/mp4" />
      </video> */}
      <span className="text-[#e96d91] text-2xl">{message}</span>
    </div>
  );
}
 