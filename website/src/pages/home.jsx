import Header from '../components/Header';
import Footer from '../components/Footer';
import Feature from '../components/Feature';
import Banner from '../components/Banner';

import '../styles/Home/Home.css';

function HomePage() {
    return (
        <>
            <Header />
            
            <main>
                <Banner />

                <section className="features">
                    <h2 className="sr-only">Features</h2>
                    
                    <Feature 
                        title="You are our #1 priority" 
                        text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
                        imageSrc="src/assets/img/icon-chat.webp" 
                        imageAlt="Chat Icon" 
                    />

                    <Feature 
                        title="More savings means higher rates" 
                        text="The more you save with us, the higher your interest rate will be!"
                        imageSrc="src/assets/img/icon-money.webp" 
                        imageAlt="Money Icon" 
                    />

                    <Feature 
                        title="Security you can trust" 
                        text="We use top of the line encryption to make sure your data and money is always safe."
                        imageSrc="src/assets/img/icon-security.webp" 
                        imageAlt="Security Icon" 
                    />

                </section>
            </main>

            <Footer />
        </>
    );
}

export default HomePage;