const express = require('express');
const cors = require('cors');
const app = express();
const crypto = require('crypto');
const PORT = 3000;
const autoping ='https://clipbrows.onrender.com/';

app.use(express.json({ limit: '500mb' }));
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.json());
// Handle GET request to "/"
app.get('/', (req, res) => {
  res.send({status:"ok"});
});
//Post operation

app.post('/login', async (req, res) => {
  const data = req.body;
  console.log(data);
  const text =data.userid+data.pass;
  const hash = {"hash":crypto.createHash('sha256').update(text).digest('hex')};
  try {
    const response = await fetch('https://clipbrows.onrender.com/cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hash)
    });
    const result = await response.json();
    if (result.status=="ok"){
      result["hash"]=hash["hash"];
      res.status(200).json({server:"running",out:result,found:"yes"});
    }
    else{
      res.status(200).json({server:"running",found:"noUser",hash:hash["hash"]});
    }
  } catch (err) {
    res.status(200).json({server:"Down"});
  }
});

//autoping
async function ping() {
  try {
    const response = await fetch(autoping);
    const data = await response.json();
    console.log("User Server Live");
  } catch (error) {
    console.error("server offline");
  }
}
setInterval(()=>ping(),1000*60*10);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
