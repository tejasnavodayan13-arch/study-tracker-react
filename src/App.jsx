import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Auth from "./components/Auth";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Study tracker state
  const [studies, setStudies] = useState([]);
  const [subject, setSubject] = useState("");
  const [hours, setHours] = useState("");

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Load study data (still local for now)
  useEffect(() => {
    const saved = localStorage.getItem("studies");
    if (saved) setStudies(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("studies", JSON.stringify(studies));
  }, [studies]);

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Auth onAuthSuccess={() => setUser(auth.currentUser)} />;
  }

  const addStudy = () => {
    if (!subject || !hours) return;
    setStudies([...studies, { subject, hours: Number(hours) }]);
    setSubject("");
    setHours("");
  };

  const totalHours = studies.reduce((sum, s) => sum + s.hours, 0);

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>📚 Study Tracker</h2>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>

      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 6 }}
      />

      <input
        type="number"
        placeholder="Hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 6 }}
      />

      <button onClick={addStudy} style={{ width: "100%", padding: 10 }}>
        Add Study
      </button>

      <h3>Total Hours: {totalHours}</h3>

      <ul>
        {studies.map((item, index) => (
          <li key={index}>
            {item.subject} – {item.hours} hrs
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
