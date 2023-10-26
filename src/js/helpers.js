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

// Helper function which we have to use mostly
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([timeout(TIMEOUT_SEC), fetch(url)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data; // Resolved value that promise
  } catch (err) {
    // We don't want to handle error here, handle it into model so ->
    throw err;
  }
};
