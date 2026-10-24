import HeroContainer from "./HeroContainer";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";
import type { HeroData } from "@/lib/data/cached-queries";

interface HeroProps {
  heroData?: HeroData | null;
}

export default function Hero({ heroData }: HeroProps) {
  return (
    <HeroContainer>
      <ProfileImage imageUrl={heroData?.profile_image} />
      <ProfileInfo
        name={heroData?.name}
        title={heroData?.title}
        description={heroData?.description}
      />
    </HeroContainer>
  );
}
