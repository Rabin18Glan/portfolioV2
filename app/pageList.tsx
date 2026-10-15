import { ReactNode } from 'react';

import {
 MainPage
} from '@/features/home/components';
import PrivacyPolicy from '@/features/privacy/PrivacyPolicy';
import TermsOfUse from '@/features/terms/TermsOfUse';
import { Services } from '@/features/services';
import { Projects } from '@/features/projects';
import { Contact } from '@/features/contact';

interface Page {
    id: string;
    title: string;
    page: string;
    pageSection: ReactNode;
    showInHeader?: boolean;
    isRoute?: boolean;
}
export const pageList: Page[] = [
    { id: 'home', title: 'About Me', page: 'home', pageSection: <MainPage />, showInHeader: true, isRoute: false },
    { id: 'services', title: 'Services', page: 'services', pageSection: <Services />, showInHeader: true, isRoute: true },
    { id: 'projects', title: 'Projects', page: 'projects', pageSection: <Projects />, showInHeader: true, isRoute: true },
    { id: 'contact', title: 'Contact', page: 'contact', pageSection: <Contact />, showInHeader: true, isRoute: true },
    { id: 'chat', title: 'Chat', page: 'chat', pageSection: null, showInHeader: false, isRoute: true },
    { id: 'privacy', title: 'Privacy Policy', page: 'privacy', pageSection: <PrivacyPolicy />, showInHeader: false, isRoute: true },
    { id: 'terms', title: 'Terms of Use', page: 'terms', pageSection: <TermsOfUse />, showInHeader: false, isRoute: true },
];
