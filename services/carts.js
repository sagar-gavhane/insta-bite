import axios from 'utils/axios'

class Cart {
  get(id) {
    if (id) {
      return axios.get(`/api/carts/${id}`).then((data) => data.data)
    }
  }

  create(products = []) {
    return axios.post(`/api/carts`, { products }).then((data) => data.data)
  }

  update(id, payload) {
    return axios.patch(`/api/carts/${id}`, payload).then((data) => data.data)
  }
}

export default new Cart()
