import React, { useEffect, useState } from "react";
import RepoList from "../components/RepoList";

export default function TeamDashboard() {
  const [teamName, setTeamName] = useState("My Team");

  return (
    <div>
      <h2>Team Dashboard</h2>
      <form>
        <label>
          Team Name:
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </label>
      </form>
      <RepoList />
    </div>
  );
}
