import { useState, useEffect } from "react";

function App() {
  const [studies, setStudies] = useState([]);
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");

  // Load saved data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("studies")) || [];
    setStudies(saved);
  }, []);

  // Save data when studies change
  useEffect(() => {
    localStorage.setItem("studies", JSON.stringify(studies));
  }, [studies]);

  const addStudy = () => {
    if (!subject || !hours) return;
    setStudies([...studies, { subject, hours: Number(hours) }]);
    setSubject("");
    setHours("");
  };

  const deleteStudy = (index) => {
    setStudies(studies.filter((_, i) => i !== index));
  };

  const totalHours = studies.reduce((sum, s) => sum + s.hours, 0);

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", fontFamily: "Arial" }}>
      <h2>📚 Study Tracker</h2>

      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "6px" }}
      />

      <input
        type="number"
        placeholder="Hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "6px" }}
      />

      <button onClick={addStudy} style={{ width: "100%", padding: "10px" }}>
        Add Study
      </button>

      <h3>Total Hours: {totalHours}</h3>

      <ul>
        {studies.map((item, index) => (
          <li key={index}>
            {item.subject} – {item.hours} hrs
            <button onClick={() => deleteStudy(index)}> ❌ </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
