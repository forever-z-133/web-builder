import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <>
      <p>dashboard</p>
      <Link to="/edit">to edit</Link>
    </>
  );
}
export default Dashboard;
