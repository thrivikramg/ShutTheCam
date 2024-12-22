// pages/api/shodan/[ip].js
import axios from 'axios';

export default async function handler(req, res) {
  const {
    query: { ip },
  } = req;

  try {
    const response = await axios.get(`https://api.shodan.io/shodan/host/${ip}`, {
      headers: {
        'Authorization': `j7n70xA4Y32JZBLxJQ162RJBUniLogjU`,
      },
    });

    // Assuming the vulnerabilities are in the 'data' key from Shodan
    const vulnerabilities = response.data.data.map(vuln => vuln.description);
    
    res.status(200).json(vulnerabilities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch data from Shodan' });
  }
}
