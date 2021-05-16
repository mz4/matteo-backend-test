// server/index.js
const axios = require('axios');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  const endpoint = 'https://reference.intellisense.io/thickenernn/v1/referencia';
  axios.get(endpoint)
  .then(response => {
    const dataLoad = [];
    const tkData = response.data.current.data.TK1;
    let id = 0;
    for (const key of Object.keys(tkData)) {
      if (key.startsWith("TK1_")) {
        dataLoad.push({
          id: id,
          metric: key,
          times: tkData[key]["times"],
          values: tkData[key]["values"]
        });
        id = id + 1;
      }
    }
    res.send(dataLoad);
  })
  .catch(error => {
      console.log(error);
  });
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})
