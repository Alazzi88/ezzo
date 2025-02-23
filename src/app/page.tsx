import News from "@/components/TradingViewEventsWidget";
import OptionDeltaCalculator from "@/components/OptionDeltaCalculator";

import Main from "@/components/main";


import Welcome from "@/components/welcome";


export default function Home() {
  return (
    <>
      <div className=" w-full h-full">



        <Welcome />
        <News />
        <Main />
        <OptionDeltaCalculator />

      </div>
    </>
  );
}
