import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import axios from "axios";

function SearchForm({ onSearch }) {
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://api.github.com/search/users?q=${username}`
    );
    onSearch(response.data.items.slice(0, 5));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

function UserList({ users }) {
  return (
    <div className="user-list">
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <img src={user.avatar_url} alt={`${user.login} avatar`} />
          <div className="user-details">
            <a href={user.html_url}>{user.login}</a>
            <p>{user.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [users, setUsers] = useState([]);

  const handleSearch = (data) => {
    setUsers(data);
  };

  return (
    <div>
      <h1>GitHub User Search</h1>
      <SearchForm onSearch={handleSearch} />
      <UserList users={users} />
    </div>
  );
}