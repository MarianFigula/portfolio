import WebyHeader from './components/WebyHeader';
import WebyHero from './components/WebyHero';
import WebyProblem from './components/WebyProblem';
import WhatYouGet from './components/WhatYouGet';
import Showcase from './components/Showcase';
import Reviews from './components/Reviews';
import Process from './components/Process';
import Contact from '../components/Contact.tsx';
import Footer from '../components/Footer.tsx';

function WebyApp() {
    return (
        <div className="min-h-screen">
            <WebyHeader />
            <main role="main">
                <WebyHero />
                <WebyProblem />
                <WhatYouGet />
                <Showcase />
                <Reviews />
                <Process />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default WebyApp;
