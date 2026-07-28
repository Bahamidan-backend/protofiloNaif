import Navbar from "@/components/Navbar";
import SequenceCanvas from "@/components/SequenceCanvas";
import StoryOverlays from "@/components/StoryOverlays";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import CoffeeSteam from "@/components/CoffeeSteam";
import SideNav from "@/components/SideNav";
import GrainOverlay from "@/components/GrainOverlay";
import IntroScreen from "@/components/IntroScreen";

export default function Home() {
  return (
    <main className="relative w-full text-white">
      {/* Cinematic intro */}
      <IntroScreen />

      {/* Global UI layers */}
      <CustomCursor />
      <ScrollProgress />
      <CoffeeSteam />
      <GrainOverlay />
      <SideNav />

      {/* 
        This tall container dictates the total scrollable height.
        800vh gives enough room for all 8 sections.
      */}
      <div style={{ height: "520vh" }}>
        <Navbar />

        {/* Sticky Canvas Background */}
        <SequenceCanvas />

        {/* Scroll-mapped Text Overlays */}
        <StoryOverlays />
      </div>
    </main>
  );
}
