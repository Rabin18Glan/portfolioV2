import { About } from "./about";
import { Hero } from "./hero";
import { MyTimeline } from "./timeline";

export function MainPage() {
    return <>
        <Hero />
        <About />
        <MyTimeline />
    </>
}