import React, { Component } from 'react';
import './App.css';
class App extends Component {

  state = {
    users: null,
    total: null,
    per_page: null,
    current_page: 1
  }

  componentDidMount() {
    this.makeHttpRequestWithPage(1);
  }


  makeHttpRequestWithPage = async pageNumber => {
    const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    this.setState({
      users: data.data,
      total: data.total,
      per_page: data.per_page,
      current_page: data.page
    });
  }


  render() {

    let users, renderPageNumbers;

    if (this.state.users !== null) {
      users = this.state.users.map(user => (
        <div className="card">
          <div key={user.id}>
            <img key={user.avatar} src={user.avatar} />
            <p>
              <h4>{user.first_name} {user.last_name}</h4>
            </p>
            <p>{user.email}</p>
          </div>
        </div>

      ));
    }

    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
        pageNumbers.push(i);
      }


      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.current_page === number;

        return (
          <button key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</button>
        );
      });
    }
    return (


      <div>

        {users}

        <div class='fixx'>
          <span onClick={() => this.makeHttpRequestWithPage(1)}>&laquo;</span>
          {renderPageNumbers}
          <span onClick={() => this.makeHttpRequestWithPage(2)}>&raquo;</span>
        </div>
      </div>
    );
  }
}
export default App;
