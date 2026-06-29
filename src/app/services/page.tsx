// import ScrollExpandHero from '@/components/blocks/ScrollExpandHero';
import FramePreview from '@/components/FramePreview/FramePreview';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/ui/Footer';
import ServicesPage from '@/components/sections/ServicesPage';



export default function Home() {
  return (
        <>
    <ServicesPage/>
        {/* Content revealed after hero expands  and the Services below is the framing tool Preview */}
        <FramePreview /> 
        <FAQ />
        <Footer />
       </>
  );
}