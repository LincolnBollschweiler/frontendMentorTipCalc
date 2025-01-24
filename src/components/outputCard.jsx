const OutputCard = ({ output, reset }) => {
  return (
    <div className="output-card flex">
      <div className="output-group flex">
        <div className="output-label flex">
          <label>Tip Amount</label>
          <span>/ person</span>
        </div>
        <div className="output-value">${output.tipPerPerson.toFixed(2)}</div>
      </div>
      <div className="output-group flex">
        <div className="output-label flex">
          <label>Total</label>
          <span>/ person</span>
        </div>
        <div className="output-value">${output.totalPerPerson.toFixed(2)}</div>
      </div>
      <div className="reset flex">
        <button onClick={reset}>RESET</button>
      </div>
    </div>
  );
};

export default OutputCard;
