import HeroContainer from "./HeroContainer";
import ProfileImage from "./ProfileImage";
import ProfileInfo from "./ProfileInfo";

function Hero() {
    return (
        <HeroContainer>
            <ProfileImage />
            <ProfileInfo />
        </HeroContainer>
    );
}

export default Hero