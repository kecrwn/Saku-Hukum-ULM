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
import hukum_internasional from './hukum_internasional.json';
import hukum_lingkungan from './hukum_lingkungan.json';
import hukum_pajak from './hukum_pajak.json';
import hukum_keluarga from './hukum_keluarga.json';
import hukum_perburuhan from './hukum_perburuhan.json';
import hukum_pidana_khusus from './hukum_pidana_khusus.json';
import hukum_dagang from './hukum_dagang.json';
import hukum_hki from './hukum_hki.json';
import hukum_siber from './hukum_siber.json';

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
  uud_1945,
  hukum_internasional,
  hukum_lingkungan,
  hukum_pajak,
  hukum_keluarga,
  hukum_perburuhan,
  hukum_pidana_khusus,
  hukum_dagang,
  hukum_hki,
  hukum_siber
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
  { id: 'hukum_internasional', name: 'Hukum Internasional' },
  { id: 'hukum_lingkungan', name: 'Hukum Lingkungan' },
  { id: 'hukum_pajak', name: 'Hukum Pajak' },
  { id: 'hukum_keluarga', name: 'Hukum Keluarga' },
  { id: 'hukum_perburuhan', name: 'Hukum Perburuhan' },
  { id: 'hukum_pidana_khusus', name: 'Hukum Pidana Khusus' },
  { id: 'hukum_dagang', name: 'Hukum Dagang & Bisnis' },
  { id: 'hukum_hki', name: 'Hak Kekayaan Intelektual' },
  { id: 'hukum_siber', name: 'Hukum Siber & ITE' }
];
