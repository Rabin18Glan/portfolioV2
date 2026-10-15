import { PageWrapper } from "@/layouts"
import ContactContainer from "./ContactContainer"
import ContactInfo from "./ContactInfo"
import ContactForm from "./ContactForm"

function Contacts() {
    return (
        <PageWrapper id='contact' title={'Contact'} >
            <ContactContainer>
                <ContactInfo />
                <ContactForm />
            </ContactContainer>
        </PageWrapper>
    )
}

export default Contacts
