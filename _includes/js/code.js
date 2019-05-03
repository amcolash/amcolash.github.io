componentDidMount() {
  // Get movie list
  this.updateData();
  this.updateStats();

  // Get data from server
  this.updateLocation();
  this.updateDocker();

  // Update window size
  this.updateWindowDimensions();
  window.addEventListener('resize', this.updateWindowDimensions);

  // Update window scroll
  this.updateScroll();
  window.addEventListener('scroll', this.updateScroll);

  var socket = openSocket(this.server);
  socket.on('connect', data => {
    socket.emit('subscribe', 'storage');
    socket.emit('subscribe', 'files');
  });

  socket.on('storage', data => {
    if (data) this.updateStorage(data);
  });

  socket.on('files', data => {
    if (data) this.updateFiles(data);
  });
}

updateDocker() {
  axios.get(this.server + '/docker').then(response => {
      this.setState({ docker: response.data });
  }, error => {
      console.error(error);
  });
}

updateLocation() {
  axios.get(this.server + '/ip').then(response => {
      if (response.data.city && response.data.country_name) {
          this.setState({ location: response.data.city + ', ' + response.data.country_name });
      } else {
          this.setState({ location: "ERROR" });
      }
  }, error => {
      console.error(error);
      this.setState({ location: "ERROR" });
  });

  // Update every hour, don't need sockets here
  setTimeout(this.updateLocation, 60 * 60 * 1000);
}

updateStats() {
  axios.get('/status').then(response => {
      this.setState({ serverStats: response.data });
  }, error => {
      console.error(error);
  });

  // Update every hour, don't need sockets here
  setTimeout(this.updateStats, 60 * 60 * 1000);
}

updateStorage(data) {
  try {
      var percent = data.used;
      this.setState({ storage: parseFloat(percent).toFixed(1) });
  } catch (err) {
      console.error(err);
  }
}

updateFiles(data) {
  this.setState({files: data});
}

updateData() {
  const { search, page, genre, order, type } = this.state;
  
  this.setState({
      isSearching: true
  });

  const direction = order === 'title' ? '1' : '-1';
  const params = (search.length > 0 ? '&keywords=' + search : '') +
      '&sort=' + order + '&order=' + direction +
      (genre.length > 0 ? '&genre=' + genre : '');
  const ENDPOINT = 'https://tv-v2.api-fetch.website/' + type + '/' + page + '?' + params;

  if (searchCache[ENDPOINT]) {
      this.handleData(searchCache[ENDPOINT]);
  } else {
      axios.get(ENDPOINT).then(response => {
          searchCache[ENDPOINT] = response.data;
          this.handleData(response.data);
      }, error => {
          this.setState({
              error: error,
              isLoaded: true,
              isSearching: false,
          });
      });
  }
}

handleData(data) {
  // const total = data.movie_count;
  // const totalPages = Math.ceil(total / limit);

  // fix weird years (since it seems the year can vary based on region released first)
  var now = new Date().getFullYear();
  data.map(movie => {
      movie.year = Math.min(now, movie.year);
      movie.title = movie.title.replace(/&amp;/g, '&');
      return movie;
  });

  // Only show movies with enough ratings to be useful
  if (this.state.order === 'rating') {
      data = data.filter(movie => {
          return movie.rating.votes > 10;
      });
  }

  if (this.state.quality === "3D") {
      this.get3D(data);
  } else {
      this.setState({
          movies: data,
          isLoaded: true,
          isSearching: false
      });
  }
}