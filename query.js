const { TimegraphClient } = require("@analog-labs/timegraph-js");
require("dotenv").config();

(async () => {
   const timeGraphClient = new TimegraphClient({
      url: "https://timegraph.testnet.analog.one/graphql",
      sessionKey: process.env.SESSION_KEY ?? "",
   });

   let queyViewData = await getDataFromSheet();
   let name = queyViewData[1];
   let hash = queyViewData[0];
   let fields = JSON.parse(queyViewData[2]);

   const aliasResponse = await timeGraphClient.alias.add({
      name: name,
      hashId: hash,
   });
   console.log("aliasResponse: ", aliasResponse);

   const response = await timeGraphClient.view.data({
      hashId: hash,
      fields: fields,
      limit: 10,
   });
   console.log("listPublishedArtifacts: ", response);
})();

async function getDataFromSheet() {
   const url = 'https://script.google.com/macros/s/AKfycbxxh3GZvXmwUjhuadYFbyZg6SEVVePxug3BVCXu88b5urppblGuGuQq_UeLF3udpz5gDw/exec'; // Thay bằng URL của ứng dụng web Google Apps Script
   try {
      const response = await fetch(url, {
         method: 'GET'
      });
      if (!response.ok) {
         throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      console.log('Data retrieved:', data);
      return data;
   } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
   }
}
