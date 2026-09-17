// We import the generated JSON files directly.
// The TypeScript compiler might complain if they don't exist yet during development, but they will be generated.
// @ts-ignore
import pih from './pih.json';
// @ts-ignore
import phi from './pengantar_hukum_indonesia.json';
// @ts-ignore
import ilmu_negara from './ilmu_negara.json';
// @ts-ignore
import perikatan from './hukum_perikatan.json';
// @ts-ignore
import pidana_formil from './hukum_pidana_formil.json';
// @ts-ignore
import perdata_formil from './hukum_perdata_formil.json';
// @ts-ignore
import internasional_publik from './hukum_internasional_publik.json';
// @ts-ignore
import agraria_lanjut from './hukum_agraria_lanjut.json';
// @ts-ignore
import acaraperdata from './acaraperdata.json';
// @ts-ignore
import acarapidana from './acarapidana.json';
// @ts-ignore
import sistemperadilan from './sistemperadilan.json';
// @ts-ignore
import tatanegara from './tatanegara.json';
// @ts-ignore
import administrasi from './administrasi.json';
// @ts-ignore
import pidana from './pidana.json';

export const bookKnowledgeBase: Record<string, any> = {
  pih,
  phi,
  ilmu_negara,
  perikatan,
  pidana_formil,
  perdata_formil,
  internasional_publik,
  agraria_lanjut,
  acaraperdata,
  acarapidana,
  sistemperadilan,
  tatanegara,
  administrasi,
  pidana
};
