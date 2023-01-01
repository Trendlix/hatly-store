import axios from "axios"
import API_URL from "../API/ApiUrl"

axios.defaults.withCredentials = True;

const makeOrder = async (data,cart,paymentMethod) => {
  try {
    const res = await axios.post(`${API_URL}/orders`, {
      headers: {
        "Accept": "*/*",
      },
      userData: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        state: data.state,
        city: data.city,
        street: data.street,
        building: data.building,
        floor: data.floor,
        apartment: data.apartment,
        extraDescription: data.extraDescription,
      },
      orderedItems : cart.products,
      totalPrice : cart.total,
      delivery: 50,
      subTotal :  cart.total + 50,
      paymentMethod
    })
    console.log(res.data)
  } catch (e) {
    console.log(e)
  }
}
export default makeOrder;