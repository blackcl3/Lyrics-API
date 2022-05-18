const lyricProm = () => new Promise((resolve, reject) => {
  axios.get(url)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error))
}); 
