import React, { useState, useEffect } from "react";


const Pagination = () => {
  const [users, setUsers] = useState([]);
  const data = async () => {
    const res = await fetch("https://reqres.in/api/users?page=2");
    const json = await res.json();
    setUsers(json.data);
  };
  useEffect(() => {
    data();
  }, []);
  return (
    <div className="App">
      <h1>Hello</h1>
      <div className="flex">
        {users.length &&
          users.map((user) => {
            return (
              <div className="card">
                <div key={user.id}>
                  <p>
                    <h4>{user.first_name} {user.last_name}</h4>
                  </p>
                  <p>{user.email}</p>
                  <img key={user.avatar} src={user.avatar} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Pagination;