//* Helpers, uygulamanızdaki tekrar eden veya yaygın fonksiyonları içerebilir.
//* Helpers, iş mantığını yeniden kullanılabilir ve düzenli hale getirir.

import { TIMEOUT_SEC } from './config.js';

// To reject promise after spesified seconds with Promise.race()
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

//! getJSON and sendJSON almost same, so refactor it.
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST', // GET - POST
          headers: {
            'Content-Type': 'application/json', // Sended data format is JSON we spesify
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // Resolved value that promise
  } catch (err) {
    // We don't want to handle error here, handle it into model so ->
    throw err;
  }
};


//! Helper function which we have to use mostly
// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);
//     const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data; // Resolved value that promise
//   } catch (err) {
//     // We don't want to handle error here, handle it into model so ->
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST', // GET - POST
//       headers: {
//         'Content-Type': 'application/json' // Sended data format is JSON we spesify
//       },
//       body: JSON.stringify(uploadData)
//     })
//     const res = await Promise.race([timeout(TIMEOUT_SEC), fetchPro]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} (${res.status})`);
//     return data; // Resolved value that promise
//   } catch (err) {
//     // We don't want to handle error here, handle it into model so ->
//     throw err;
//   }
// };
