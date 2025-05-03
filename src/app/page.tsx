import News from "@/components/TradingViewEventsWidget";
import OptionDeltaCalculator from "@/components/OptionDeltaCalculator";

import Main from "@/components/main";


import Welcome from "@/components/welcome";
import TradingViewTechnicalWidget from "@/components/TradingViewTechnicalWidget";


export default function Home() {
  return (
    <>
      <div className=" w-full h-full">



        <Welcome />
        <News />
        <Main />
        <OptionDeltaCalculator />
        <TradingViewTechnicalWidget />


      </div>
    </>
  );
}
