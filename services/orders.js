import axios from 'utils/axios'

class Order {
  get(id, queryParameters) {
    if (id) {
      return axios.get(`/api/orders/${id}`).then((data) => data.data)
    } else if (queryParameters) {
      return axios
        .get(`/api/orders?${queryParameters}`)
        .then((data) => data.data)
    }
  }

  create(cartId) {
    return axios.post(`/api/orders`, { cartId }).then((data) => data.data)
  }

  update(id, payload) {
    return axios.patch(`/api/orders/${id}`, payload).then((data) => data.data)
  }
}

export default new Order()
