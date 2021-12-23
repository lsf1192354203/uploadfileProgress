import axios from 'axios'
var url = 'http://localhost:3000'
axios.get(url + '/product')
  .then(function (response) {
    console.log(1)
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
