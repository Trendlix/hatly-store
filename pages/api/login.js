// import axios from "axios"
import API_URL from "../../API/ApiUrl"

// axios.defaults.withCredentials = true

// export default async  function  handler(req, res){
//   try {
//     if (req.method === 'POST') {

//       const email = req.body.email;
//       const password = req.body.password;
//       console.log(email , password);
  
//       const user = await axios.post(`${API_URL}/users/login`, {
//         email,
//         password,
//       })
//       console.log(user.data)
//       const cookies = user.headers['set-cookie']

//       res.setHeader('Set-Cookie', cookies)
//       res.status(200).json({
//         ok : true,
//         status : 200,
//         message  : 'success',
//         body : user.data.user
//       })
//     }
//     else {
//       res.status(400).json({
//         ok: false,
//         status: 400,
//         message: 'invalid request'
//       })
//     }
//   } catch (e) {
//     res.status(400).json({
//       ok: false,
//         status: 400,
//         message : e.message
        
//     })
//   }
// }
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    console.log('req.body', req.body)
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });

      res.setHeader('Set-Cookie', `access_token=${response.data.token}; HttpOnly; Path=/; Max-Age=3600; Secure=${process.env.NODE_ENV === 'production'}`);
      return res.status(200).json({ user: response.data.user, success: response.data.success });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
