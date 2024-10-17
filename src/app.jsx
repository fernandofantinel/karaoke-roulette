import { useState } from "react";
import { Sponsor } from "./sponsor";
import { Wheel } from "react-custom-roulette";
import { useHotkeys } from "react-hotkeys-hook";
import { motion } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/react";

const rouletteOptions = [
  {
    option: "Rock",
  },
  {
    option: "Samba e Pagode",
  },
  {
    option: "Sertanejo",
  },
  {
    option: "MPB",
  },
  {
    option: "Axé",
  },
  {
    option: "Brega",
  },
  {
    option: "Reggaeton",
  },
  {
    option: "Pop",
  },
  {
    option: "Funk",
  },
  {
    option: "Você Escolhe",
    style: { backgroundColor: "#b45309" },
  },
];

const easterEggSponsorMaxProbability = 19;

export function App() {
  const [rouletteMustSpin, setRouletteMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [easterEggSponsor, setEasterEggSponsor] = useState(false);

  function spinRoulette() {
    if (rouletteMustSpin) {
      return;
    }

    const drawnOption = Math.floor(Math.random() * rouletteOptions.length);
    setPrizeNumber(drawnOption);
    setRouletteMustSpin(true);

    const easterEggSponsorDrawnProbability = Math.floor(
      Math.random() * easterEggSponsorMaxProbability,
    );

    if (easterEggSponsorDrawnProbability === 1) {
      setEasterEggSponsor(true);

      setTimeout(() => {
        setEasterEggSponsor(false);
      }, 1000);
    }
  }

  useHotkeys(["space", "enter"], () =>
    document.getElementById("spinButton").click(),
  );

  return (
    <>
      <div className="items-center flex flex-col mt-8">
        <div>
          <h1 className="text-4xl md:text-7xl">Karaoke Roulette</h1>
        </div>
        <div className="flex flex-col gap-8 mt-12">
          <Wheel
            mustStartSpinning={rouletteMustSpin}
            prizeNumber={prizeNumber}
            data={rouletteOptions}
            backgroundColors={["#fcd34d", "#f59e0b"]}
            textColors={["#451a03"]}
            fontFamily="Inter"
            spinDuration={0.6}
            onStopSpinning={() => {
              setRouletteMustSpin(false);
            }}
          />
          <motion.button
            type="button"
            onClick={() => spinRoulette()}
            id="spinButton"
            className="bg-amber-300 text-amber-950 text-xl font-bold py-3 rounded-xl hover:bg-amber-400"
            whileTap={{ scale: 0.9 }}
          >
            Sortear
          </motion.button>
        </div>
      </div>

      {easterEggSponsor && <Sponsor />}
      <SpeedInsights />
    </>
  );
}
