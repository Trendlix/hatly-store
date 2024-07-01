import axios from 'axios';
import API_URL from '../../API/ApiUrl';

export default async function handler(req, res) {
  const token = req.cookies.access_token;
  console.log('token', token);

  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    console.log('just before request', token);

    const response = await axios.post(
      `${API_URL}/users/auth`, 
      { token }, // Send token in the body
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Set headers correctly
        }
      }
    );
    console.log('response', response.data);

    return res.status(200).json({ user: response.data.body });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
}


// import axios from 'axios';

// export default async function handler(req, res) {
//   const token = req.cookies.access_token;
//   try {
//     const response = await axios.post(`http://localhost:8000/api/v1/users/auth`, { token: token }, {headers: { 'Authorization': 'Bearer ' + token }});
//     console.log('Server response:', response.data);
//     return res.status(200).json({ message: 'Request received' });
//   } catch (error) {
//     console.error('Error:', error.message);
//     return res.status(500).json({ message: 'Error sending request' });
//   }
// }
