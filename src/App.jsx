import { useState, useEffect } from "react";
import OutputCard from "./components/outputCard";

function App() {
  const zeroInput = {
    people: "",
    bill: "",
    tip: "",
  };

  const zeroOutput = {
    tipPerPerson: 0,
    totalPerPerson: 0,
  };

  const [input, setInput] = useState(zeroInput);
  const [output, setOutput] = useState(zeroOutput);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    if (!reset) return;
    setInput(zeroInput);
    setOutput(zeroOutput);
    setReset(false);
  }, [reset]);

  useEffect(() => {
    const entries = Object.entries(input);
    const values = Object.values(input);
    if (values.every((value) => value === "")) return;

    for (const [key, value] of entries) {
      if (value !== "" && value <= 0) {
        setInput({ ...input, [key]: "" });
        setOutput(zeroOutput);
        return;
      }
      if (key === "people" && value % 1 !== 0) {
        setInput({ ...input, [key]: Math.floor(value) });
        return;
      }
    }

    if (values.some((value) => value === "")) return;
    const tipAmount = (input.bill * input.tip) / 100;
    const totalAmount = input.bill + tipAmount;
    const tipPerPerson = tipAmount / input.people;
    const totalPerPerson = totalAmount / input.people;
    setOutput({ tipPerPerson, totalPerPerson });
  }, [input]);

  return (
    <>
      <header>
        <h1>
          <div>S P L I</div>
          <div>T T E R</div>
        </h1>
      </header>
      <main className="flex">
        <div className="input-card flex">
          <div className="bill-group flex">
            <label htmlFor="bill">Bill</label>
            <div className="input-icon"></div>
            <input
              type="number"
              id="bill"
              value={input.bill}
              placeholder="0"
              onChange={(e) =>
                setInput({ ...input, bill: Number(e.target.value) })
              }
            />
          </div>
          <div className="tip-group flex">
            <label htmlFor="tip">Select Tip %</label>
            <div className="tip-buttons">
              <button onClick={() => setInput({ ...input, tip: 5 })}>5%</button>
              <button
                onClick={() => setInput({ ...input, tip: 10 })}
                className={input.tip === 10 ? "active" : ""}
              >
                10%
              </button>
              <button
                onClick={() => setInput({ ...input, tip: 15 })}
                className={input.tip === 15 ? "active" : ""}
              >
                15%
              </button>
              <button
                onClick={() => setInput({ ...input, tip: 20 })}
                className={input.tip === 25 ? "active" : ""}
              >
                25%
              </button>
              <button
                onClick={() => setInput({ ...input, tip: 50 })}
                className={input.tip === 50 ? "active" : ""}
              >
                50%
              </button>
              <input
                type="number"
                id="custom"
                value={[5, 10, 15, 25, 50].includes(input.tip) ? "" : input.tip}
                placeholder="Custom"
                onChange={(e) =>
                  setInput({ ...input, tip: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <div className="people-group flex">
            <label htmlFor="people">Number of People</label>
            <div className="input-icon person-icon"></div>
            <input
              type="number"
              min="1"
              id="people"
              placeholder="0"
              value={input.people}
              onChange={(e) =>
                setInput({ ...input, people: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <OutputCard output={output} reset={setReset} />
      </main>
      <footer>
        <div className="attribution">
          Challenge by&nbsp;
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            rel="noreferrer noopener"
          >
            Frontend Mentor
          </a>
          . Coded by&nbsp;
          <a href="#" target="_blank" rel="noreferrer noopener">
            Lincoln Bollschweiler
          </a>
          .
        </div>
      </footer>
    </>
  );
}

export default App;
