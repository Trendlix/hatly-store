import axios from "axios"
import API_URL from "../../API/ApiUrl"

axios.defaults.withCredentials = true

export default async  function  handler(req, res){
  try {
    if (req.method === 'POST') {

      const email = req.body.email;
      const password = req.body.password;
      console.log(email , password);
  
      const user = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      })
      console.log(user.data)
      const cookies = user.headers['set-cookie']

      res.setHeader('Set-Cookie', cookies)
      res.status(200).json({
        ok : true,
        status : 200,
        message  : 'success',
        body : user.data
      })
    }
    else {
      res.status(400).json({
        ok: false,
        status: 400,
        message: 'invalid request'
      })
    }
  } catch (e) {
    res.status(400).json({
      ok: false,
        status: 400,
        message : e.message
        
    })
  }
}
