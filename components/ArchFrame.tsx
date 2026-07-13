import Image from "next/image";
import { PlayIcon } from "@/components/icons";

type Props = {
  image?: string;
  video?: string | null;
  alt?: string;
  label?: string;
  compact?: boolean;
  tag?: string;
};

export function ArchFrame({ image, video, alt = "Création Tatorh Fashion", label, compact, tag }: Props) {
  return (
    <div className={`arch-frame ${compact ? "rounded-t-[150px] rounded-b-xl" : ""}`}>
      {video ? (
        <video className="absolute inset-0 h-full w-full object-cover" controls preload="none" poster={image} aria-label={alt}>
          <source src={video} type="video/mp4" />
        </video>
      ) : image ? (
        <Image src={image} alt={alt} fill sizes={compact ? "220px" : "(max-width: 880px) 100vw, 48vw"} className="object-cover" />
      ) : (
        <>
          <div className="arch-pattern" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-sand">
            <span className={`${compact ? "h-12 w-12" : "h-16 w-16"} flex items-center justify-center rounded-full bg-card/95 text-green shadow-xl`}>
              <PlayIcon size={compact ? 16 : 20} />
            </span>
            {label && <span className="px-5 text-center text-[13px] tracking-wide opacity-85">{label}</span>}
          </div>
        </>
      )}
      {tag && (
        <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-[13px] font-semibold text-ink">
          <span className="h-[7px] w-[7px] rounded-full bg-wine" /> {tag}
        </span>
      )}
    </div>
  );
}
