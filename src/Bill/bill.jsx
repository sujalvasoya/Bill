import React, { useState } from "react";

const BillCutCalculator = () => {
  const [bill, setBill] = useState("");
  const [freight, setFreight] = useState("");
  const [received, setReceived] = useState("");
  const [result, setResult] = useState("");
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    const billNum = parseFloat(bill);
    const freightNum = freight ? parseFloat(freight) : 0;
    const receivedNum = parseFloat(received);

    if (!bill || !received) {
      setResult("❗ Please enter valid Bill and Received amounts.");
      return;
    }

    if (billNum < 0 || freightNum < 0 || receivedNum < 0) {
      setResult("❗ Values cannot be negative.");
      return;
    }

    const total = billNum + freightNum;

    if (total === 0) {
      setResult("❗ Total of Bill + Freight cannot be zero.");
      return;
    }

    const cutAmount = total - receivedNum;
    const percentCut = (cutAmount / total) * 100;

    const cutDisplay =
      cutAmount > 0
        ? `🔻 Amount Cut: ₹${cutAmount.toFixed(2)}\n📉 Cut Percentage: ${percentCut.toFixed(2)}%`
        : `✅ No cut, over-received by ₹${Math.abs(cutAmount).toFixed(2)}`;

    const resultText = `
      🧾 Total (Bill + Freight): ₹${total.toFixed(2)}\n
      💸 Received: ₹${receivedNum.toFixed(2)}\n
      ${freightNum > 0 ? `🚚 Freight Included: ₹${freightNum.toFixed(2)}` : `⚠️ No Freight Included`}\n
      ${cutDisplay}
    `;

    setResult(resultText);
    setCalculated(true);
  };

  const handleRefresh = () => {
    setBill("");
    setFreight("");
    setReceived("");
    setResult("");
    setCalculated(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💰 Bill Cut % Calculator</h2>

      <label style={styles.label}>Bill Amount:</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(e.target.value)}
        style={styles.input}
        placeholder="Enter bill amount"
        min="0"
        step="0.01"
      />

      <label style={styles.label}>Freight Amount:</label>
      <input
        type="number"
        value={freight}
        onChange={(e) => setFreight(e.target.value)}
        style={styles.input}
        placeholder="Enter freight (optional)"
        min="0"
        step="0.01"
      />

      <label style={styles.label}>Received Amount:</label>
      <input
        type="number"
        value={received}
        onChange={(e) => setReceived(e.target.value)}
        style={styles.input}
        placeholder="Enter amount received"
        min="0"
        step="0.01"
      />

      <button
        onClick={handleCalculate}
        disabled={calculated}
        style={{
          ...styles.button,
          backgroundColor: calculated ? "#cccccc" : "#007acc",
          color: "white",
        }}
      >
        Calculate
      </button>

      <button
        onClick={handleRefresh}
        disabled={!calculated}
        style={{
          ...styles.button,
          backgroundColor: calculated ? "#007acc" : "#eeeeee",
          color: calculated ? "white" : "#999999",
        }}
      >
        Refresh
      </button>

      <div style={styles.result}>
        {result &&
          result.split("\n").map((line, i) => (
            <div key={i}>{line.trim()}</div>
          ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    background: "#fff",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 123, 200, 0.15)",
    margin: "2rem auto",
    fontFamily: "Segoe UI, sans-serif",
    color: "#003366",
  },
  title: {
    color: "#0055aa",
    marginBottom: "1.5rem",
    fontSize: "1.5rem",
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginTop: "1rem",
    fontSize: "1rem",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    marginTop: "0.5rem",
    border: "1px solid #007acc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    marginTop: "1rem",
    borderRadius: "4px",
    border: "none",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
  },
  result: {
    marginTop: "1.5rem",
    backgroundColor: "#e6f2ff",
    padding: "1rem",
    borderLeft: "5px solid #007acc",
    borderRadius: "4px",
    minHeight: "80px",
    whiteSpace: "pre-line",
    fontSize: "1rem",
  },
};

export default BillCutCalculator;
