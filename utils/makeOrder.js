import axios from "axios"
import API_URL from "../API/ApiUrl"

axios.defaults.withCredentials = true;

const makeOrder = async (data, cart, paymentMethod, TransactionId) => {
  try {
    const res = await axios.post(`${API_URL}/orders/checkout`, {
      headers: {
        "Accept": "*/*",
      },
      address: {
        city: data.city,
        street: data.street,
        building: data.building,
        floor: data.floor,
        apartment: data.apartment,
        extraDescription: data.extraDescription,
      },
      // orderedItems: cart.products,
      // totalPrice: cart.total,
      deliveryFees: 50,
      paymentMethod,
      TransactionId
    })
    console.log(res.data)
    return res;
  } catch (e) {
    console.log(e)
  }
}
export default makeOrder;