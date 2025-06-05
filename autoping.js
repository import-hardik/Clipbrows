const express = require('express');
const cors = require('cors');
const app = express();
const crypto = require('crypto');
const PORT = 4000;
const autoping ='https://newserv-mrot.onrender.com/';
const { Pool } = require('pg');
require('dotenv').config({ path: '/etc/secrets/.env' });
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // needed if you're using a hosted server like Heroku or Render
  }
});

app.use(express.json({ limit: '500mb' }));
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.json());


let watermark=`HEllo<center><div><br></div><div>\n<a href=\"https://giphy.com/gifs/sesamestreet-sesame-street-cookie-monster-GRPy8MKag9U1U88hzY\" data-giphy-id=\"GRPy8MKag9U1U88hzY\" data-giphy-is-sticker=\"false\" class=\"sc-qZruQ ducTeV giphy-gif \" tabindex=\"0\" style=\"--tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59,130,246,.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; border-radius: 4px; border: 0px; outline: none; text-decoration-line: none; -webkit-font-smoothing: antialiased; color: rgb(255, 255, 255); position: relative; display: block; font-family: __Interface_97f6a1, __Interface_Fallback_97f6a1; letter-spacing: normal; background-color: rgb(18, 18, 18); width: 251px; overflow: hidden; aspect-ratio: 1 / 1;\"><picture style=\"--tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59,130,246,.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; border-radius: 0px; border: 0px; outline: none; -webkit-font-smoothing: antialiased; display: block; width: 251px; height: 251px;\"><img class=\"giphy-gif-img giphy-img-loaded\" src=\"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjMwMTBwdWIyM2pkdTNkbW10M2o5N290YWtkMThucGgzYjNoODdvciZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GRPy8MKag9U1U88hzY/giphy.gif\" width=\"100%\" height=\"100%\" alt=\"Sesame Street gif. Cookie Monster jumps and waves, saying, &quot;Hi, ya!&quot;\" style=\"--tw-border-spacing-x: 0; --tw-border-spacing-y: 0; --tw-translate-x: 0; --tw-translate-y: 0; --tw-rotate: 0; --tw-skew-x: 0; --tw-skew-y: 0; --tw-scale-x: 1; --tw-scale-y: 1; --tw-pan-x: ; --tw-pan-y: ; --tw-pinch-zoom: ; --tw-scroll-snap-strictness: proximity; --tw-gradient-from-position: ; --tw-gradient-via-position: ; --tw-gradient-to-position: ; --tw-ordinal: ; --tw-slashed-zero: ; --tw-numeric-figure: ; --tw-numeric-spacing: ; --tw-numeric-fraction: ; --tw-ring-inset: ; --tw-ring-offset-width: 0px; --tw-ring-offset-color: #fff; --tw-ring-color: rgba(59,130,246,.5); --tw-ring-offset-shadow: 0 0 #0000; --tw-ring-shadow: 0 0 #0000; --tw-shadow: 0 0 #0000; --tw-shadow-colored: 0 0 #0000; --tw-blur: ; --tw-brightness: ; --tw-contrast: ; --tw-grayscale: ; --tw-hue-rotate: ; --tw-invert: ; --tw-saturate: ; --tw-sepia: ; --tw-drop-shadow: ; --tw-backdrop-blur: ; --tw-backdrop-brightness: ; --tw-backdrop-contrast: ; --tw-backdrop-grayscale: ; --tw-backdrop-hue-rotate: ; --tw-backdrop-invert: ; --tw-backdrop-opacity: ; --tw-backdrop-saturate: ; --tw-backdrop-sepia: ; --tw-contain-size: ; --tw-contain-layout: ; --tw-contain-paint: ; --tw-contain-style: ; border-radius: 0px; border: 0px; outline: none; -webkit-font-smoothing: antialiased; display: block; background: unset;\"></picture></a></div><div><h1 style=\"font-size: 2.5rem; color: rgb(56, 189, 248); text-align: center; margin-bottom: 0.5rem; font-family: &quot;Segoe UI&quot;, sans-serif; letter-spacing: normal;\">Hello! This is your every time text editor</h1><div>Ones Read this then Remove this It will Apper only ones</div><p class=\"sub\" style=\"color: rgb(203, 213, 225); text-align: center; margin-bottom: 1rem; font-family: &quot;Segoe UI&quot;, sans-serif; letter-spacing: normal;\">Created by&nbsp;<strong>Hardik Verma</strong><br>Visit:&nbsp;<a href=\"https://hardikverma.tech/\" target=\"_blank\" style=\"color: rgb(250, 204, 21); text-decoration-line: none;\">hardikverma.tech</a></p><div class=\"features\" style=\"background: rgb(30, 41, 59); border-radius: 12px; padding: 2rem; width: 600px; max-width: 600px; box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 25px; color: rgb(248, 250, 252); font-family: &quot;Segoe UI&quot;, sans-serif; letter-spacing: normal;\"><h2 style=\"margin-bottom: 1rem; color: rgb(34, 211, 238);\">🚀 Feature List</h2><ul style=\"list-style: none; padding: 0px;\"><li style=\"background: rgb(51, 65, 85); margin: 0.5rem 0px; padding: 0.75rem 1rem; border-radius: 8px; transition: transform 0.2s;\">📂 Drag &amp; Drop GIFs, Images, even Website Elements</li><li style=\"background: rgb(51, 65, 85); margin: 0.5rem 0px; padding: 0.75rem 1rem; border-radius: 8px; transition: transform 0.2s;\">🌈 Syntax-highlighted Code Snippets (e.g.,&nbsp;<code style=\"background: rgb(15, 23, 42); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: &quot;Courier New&quot;, monospace; color: rgb(250, 204, 21);\">&lt;code&gt;</code>)</li><li style=\"background: rgb(51, 65, 85); margin: 0.5rem 0px; padding: 0.75rem 1rem; border-radius: 8px; transition: transform 0.2s;\">🖼️ Supports Screenshot Storage for later editing (UI-based)</li><li style=\"background: rgb(51, 65, 85); margin: 0.5rem 0px; padding: 0.75rem 1rem; border-radius: 8px; transition: transform 0.2s;\">📱 Responsive layout on all screen sizes</li></ul></div><footer style=\"margin-top: 2rem; font-size: 0.9rem; color: rgb(148, 163, 184); font-family: &quot;Segoe UI&quot;, sans-serif; letter-spacing: normal;\">© 2025 Hardik Verma. All rights reserved.</footer></div></center>`;





//preload data
let cached={
"57ok1":{
"userid":"Admin",
"data":"For API TESTING ONLY",
"lastused":"34:efer:rwef"
}};


// Handle GET request to "/"
app.get('/', (req, res) => {
  res.send({status:"ok"});
});

app.get('/cacheview', (req, res) => {
  res.send(cached);
  // savecache();
});


app.post('/cache', async (req, res) => {
  const data = req.body;

  let response = {};
    if (data.hash && cached[data.hash] !== undefined) {
      response = cached[data.hash];
      response["status"]="ok";
      res.status(200).json(response);
    } else {
      try{
        const userData = await getUser(data.hash);
        console.log(userData);
        if (userData.status=="yes"){
          response = cached[data.hash];
          response["status"]="ok";
          res.status(200).json(response);
        }
        else{
          res.status(200).json({status:"No user"});
        }
      }
      catch(err){
        res.status(200).json({status:"Fuck OFF"});
      }
    }
});

app.post('/save', async (req, res) => {
  const data = req.body;
  //hash data timestamp packetno
  cached[data.hash]={"data":data.data,"lastused":data.lastused};
  res.status(200).json({status:"Received","pc":data.pc});
});

//newusercreation
app.post('/newuser', async (req, res) => {
  const data = req.body;
  console.log(data)
  console.log("A--Data Entered");
  try {
    const response = await fetch('https://newserv-mrot.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    console.log(result);
    console.log("A--Responce we got");
    console.log(result.found=='yes')
    if (result.found=='yes'){
      console.log("already a user");
      res.status(200).json({status:"RegisteredUser"});
    }
    else{
      console.log("Update");
      cached[result.hash]={"userid":data.userid,"data":watermark,"lastused":(new Date())};
      res.status(200).json({status:"Created","hash":result.hash});
    }
  } catch (err) {
    res.status(200).json({server:"Down"});
  }
});

//db access
async function getUser(hash) {
  let stats = "no";

  try {
    const client = await pool.connect();
    const query = "SELECT * FROM browsdb WHERE hash=$1";
    const result = await client.query(query, [hash]);
    client.release();

    const chachedata = result.rows[0];

    if (chachedata !== undefined) {
      cached[chachedata.hash] = {
        data: chachedata.data,
        lastused: new Date()
      };
      stats = "yes";
    }

    return { status: stats };
  } catch (err) {
    console.error("❌ DB Error:", err);
    return { status: "error" };
  }
}

async function savecache() {
  // let stats = "no";
  console.log("hardcoding db started");
  Object.keys(cached).forEach(async hashv => {
      try {
        const client = await pool.connect();
        const query = "INSERT INTO browsdb (hash,userid,data,lastused) VALUES ($1,$2,$3,$4) ON CONFLICT (hash) DO UPDATE SET data = EXCLUDED.data,lastused=EXCLUDED.lastused;";
        const result = await client.query(query, [hashv,cached[hashv]["userid"],cached[hashv]["data"],cached[hashv]["lastused"]]);
        client.release();

        // const chachedata = result.rows[0];

        // if (chachedata !== undefined) {
        //   cached[chachedata.hash] = {
        //     data: chachedata.data,
        //     lastused: new Date()
        //   };
        //   stats = "yes";
        // }

        // return { status: stats };
      } catch (err) {
        console.error("❌ DB Error:", err);
        // return { status: "error" };
      }
});
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


//repeating job
async function ping() {
  try {
    const response = await fetch(autoping);
    const data = await response.json();
    console.log("Cache Server Running");
  } catch (error) {
    console.error("server offline");
  }
}
setInterval(()=>ping(),1000*60*10);//10min
setInterval(()=>savecache(),1000*60*60);//1 hour
