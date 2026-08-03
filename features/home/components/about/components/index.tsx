import  AboutButtons  from './AboutButtons';
import  AboutMe  from './AboutMe';
import { PageWrapper } from '@/layouts/wrappers';

function About() {
  return (
    <PageWrapper id={'about'} title={'About Me'}>
      <AboutMe />
      <AboutButtons />
    </PageWrapper>
  )
}

export default About