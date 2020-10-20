import axios from 'utils/axios'

class Product {
  get(id, queryParameters) {
    if (id) {
      return axios.get(`/api/products/${id}`).then((data) => data.data)
    } else if (queryParameters) {
      return axios
        .get(`/api/products?${queryParameters}`)
        .then((data) => data.data)
    } else {
      return axios.get(`/api/products`).then((data) => data.data)
    }
  }
}

export default new Product()
