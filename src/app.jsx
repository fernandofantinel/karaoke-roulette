import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { Sponsor } from "./sponsor";

const musicGenres = [
  "Rock",
  "Samba e Pagode",
  "Sertanejo",
  "MPB",
  "Axé",
  "Brega",
  "Reggaeton",
  "Pop",
  "Funk",
  "Você Escolhe",
];

const rouletteOptions = [
  {
    option: musicGenres[0],
  },
  {
    option: musicGenres[1],
  },
  {
    option: musicGenres[2],
  },
  {
    option: musicGenres[3],
  },
  {
    option: musicGenres[4],
  },
  {
    option: musicGenres[5],
  },
  {
    option: musicGenres[6],
  },
  {
    option: musicGenres[7],
  },
  {
    option: musicGenres[8],
  },
  {
    option: musicGenres[9],
    style: { backgroundColor: "#b45309" },
  },
];

const easterEggSponsorMaxProbability = 19;

export function App() {
  const [rouletteMustSpin, setRouletteMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [easterEggSponsor, setEasterEggSponsor] = useState(false);

  function spinRoulette(rouletteTotalOptions) {
    if (rouletteMustSpin) {
      return;
    }

    const drawnOption = Math.floor(Math.random() * rouletteTotalOptions);
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

  return (
    <>
      <div className="items-center flex flex-col mt-8">
        <div>
          <h1 className="text-8xl">Karaoke Roulette</h1>
        </div>
        <div className="flex flex-col gap-8 mt-12">
          <div>
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
          </div>
          <button
            onClick={() => spinRoulette(musicGenres.length)}
            className="bg-amber-300 text-amber-950 text-xl font-bold py-3 rounded-xl hover:bg-amber-400"
          >
            Sortear
          </button>
        </div>
      </div>

      {easterEggSponsor && <Sponsor />}
    </>
  );
}
