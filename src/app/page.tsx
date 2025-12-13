import Welcome from "@/components/welcome";
import HeroImage from "@/components/HeroImage";

export default function Home() {
  return <Welcome heroImageSlot={<HeroImage />} />;
}
