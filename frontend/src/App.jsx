import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");

  // GET users from backend
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // ADD user
  const addUser = () => {
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, age, email })
    }).then(() => {
      window.location.reload(); // refresh to see new data
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User App</h1>

      <input
        placeholder="Name"
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Age"
        onChange={e => setAge(e.target.value)}
      />
      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <button onClick={addUser}>Add User</button>

      <h2>Users List</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} - {u.age} - {u.email || "no email"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;