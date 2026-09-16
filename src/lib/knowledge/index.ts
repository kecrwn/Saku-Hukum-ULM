import hukum_administrasi from './hukum_administrasi.json';
import hukum_agraria from './hukum_agraria.json';
import hukum_korporasi from './hukum_korporasi.json';
import kuhap from './kuhap.json';
import kuhp from './kuhp.json';
import kuhperdata from './kuhperdata.json';
import pancasila from './pancasila.json';
import sistem_peradilan from './sistem_peradilan.json';
import tata_negara from './tata_negara.json';
import uud_1945 from './uud_1945.json';

export const lawKnowledgeBase: Record<string, any> = {
  hukum_administrasi,
  hukum_agraria,
  hukum_korporasi,
  kuhap,
  kuhp,
  kuhperdata,
  pancasila,
  sistem_peradilan,
  tata_negara,
  uud_1945
};

export const availableLawTopics = [
  { id: 'pancasila', name: 'Pancasila' },
  { id: 'uud_1945', name: 'UUD 1945' },
  { id: 'kuhp', name: 'KUHP (Pidana)' },
  { id: 'kuhperdata', name: 'KUHPerdata (Perdata)' },
  { id: 'kuhap', name: 'KUHAP (Acara Pidana)' },
  { id: 'tata_negara', name: 'Hukum Tata Negara' },
  { id: 'hukum_administrasi', name: 'Hukum Administrasi Negara' },
  { id: 'sistem_peradilan', name: 'Sistem Peradilan' },
  { id: 'hukum_korporasi', name: 'Hukum Korporasi' },
  { id: 'hukum_agraria', name: 'Hukum Agraria' },
];
