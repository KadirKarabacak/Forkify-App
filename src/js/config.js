//* Genellikle uygulama boyunca aynı değere sahip sabitler bu dosyada tanımlanabilir.
//* Uygulamanızın ayarlarını içerir ve farklı çevrelerde çalışacak şekilde yapılandırılabilir.
//* Uygulamanızın farklı çevreler için gerekli olan çevresel değişkenlerini içerir.
//* Veritabanı bağlantı dizesi, API anahtarları, port numarası gibi değişkenler bu dosyada bulunur.
//* Uygulama genelinde kullanılacak yapılandırma ayarları burada bulunur.
//* Oturum süreleri, dil ayarları, log düzeyleri gibi ayarlar bu dosyada tanımlanır.

export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
export const TIMEOUT_SEC = 15;
export const RES_PER_PAGE = 10;
export const START_PAGE = 1
