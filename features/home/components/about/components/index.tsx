import AboutButtons from "./AboutButtons";
import AboutMe from "./AboutMe";
import { PageWrapper } from "@/layouts/wrappers";
import type { AboutData } from "@/lib/data/cached-queries";

interface AboutProps {
  aboutData?: AboutData | null;
}

function About({ aboutData }: AboutProps) {
  return (
    <PageWrapper id={"about"} title={aboutData?.title || "About Me"}>
      <AboutMe body={aboutData?.body} />
      <AboutButtons />
    </PageWrapper>
  );
}

export default About;
