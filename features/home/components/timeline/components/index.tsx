
import { PageWrapper } from "@/layouts"
import TimelineMapping from "./TimelineMapping"


export default function MyTimeline() {
    return (
        <PageWrapper id='timeline' title={'Timeline'} className='px-0'>
            <TimelineMapping />
        </PageWrapper>
    )
}

