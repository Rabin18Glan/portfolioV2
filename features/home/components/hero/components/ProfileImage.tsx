import Image from "next/image";

interface ProfileImageProps {
  imageUrl?: string;
}

const FALLBACK_PROFILE =
  process.env.NEXT_PUBLIC_SUPABASE_URL +
  "/storage/v1/object/public/rabin/profile.png";

export default function ProfileImage({ imageUrl }: ProfileImageProps) {
  const profileSrc = imageUrl || FALLBACK_PROFILE;

  return (
    <div className="relative z-20 flex-shrink-0 transition-transform duration-500 hover:scale-[1.02]">
      {/* Decorative Outer Rings */}
      <div className="relative p-3 rounded-full border border-primary-500/10 dark:border-primary-500/5">
        <div className="relative p-3 rounded-full border border-primary-500/20 dark:border-primary-500/10">
          <div className="relative p-2 rounded-full border-4 border-primary-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            {/* Main Image Container */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden shadow-2xl">
              <Image
                alt="Rabin Glan"
                src={profileSrc}
                fill
                priority
                sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 400px"
                className="object-cover object-top bg-gray-50 dark:bg-dark-card"
              />
              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
