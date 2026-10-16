import HeroContainer from "./HeroContainer";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";

interface HeroProps {
  heroData?: {
    name?: string;
    title?: string;
    description?: string;
    profile_image?: string;
  } | null;
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
