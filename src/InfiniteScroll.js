import React, { Component } from "react";

class InfiniteScroll extends Component {
  state = {
    data: [],
    per: 3,
    page: 1,
    total_pages: null
  };

  loadUser = () => {
    const { per, page, data } = this.state;
    const url = `https://reqres.in/api/users?per_page=${per}&page=${page}`;
    fetch(url)
      .then(response => response.json())
      .then(json =>
        this.setState({
          data: [...data, ...json.data],
          scrolling: false,
          total_pages: json.total_pages
        })
      );
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1,
        scrolling: true
      }),
      this.loadUser
    );
  };

  handleScroll = () => {
    var lastLi = document.querySelector("ul > li:last-child");
    var lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    var pageOffset = window.pageYOffset + window.innerHeight;
    console.log(pageOffset, lastLiOffset);
    if (pageOffset > lastLiOffset) {
      this.loadMore();
    }
  };

  componentWillMount() {
    this.loadUser();
    this.scollListener = window.addEventListener("scroll", e => {
      this.handleScroll(e);
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.data.map(data => (
            <li key={data.id}>
              <div>
                <div>
                  <img src={data.avatar} />
                </div>
                <div>{data.first_name}</div>
                <div>{data.last_name}</div>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={e => {
            this.loadMore();
          }}
        >
          Load More
        </button>
      </div>
    );
  }
}

export default InfiniteScroll;
