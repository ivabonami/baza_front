import {reactive} from "vue";
import psrms from '/src/assets/images/footerLogos/fhq7nd49.png'
import bhf from '/src/assets/images/footerLogos/bhf.jpg'
import dm from '/src/assets/images/footerLogos/dm.png'
import bdf from '/src/assets/images/footerLogos/bdf_logo.png'
import way from '/src/assets/images/footerLogos/w_logo.png'
import dc from '/src/assets/images/footerLogos/logo.png'
import bb from '/src/assets/images/footerLogos/bstore.png'
import skynet from '/src/assets/images/footerLogos/golova_1-2-3-4.png'
import youhack from '/src/assets/images/footerLogos/youhack.png'
import pirate from '/src/assets/images/footerLogos/logo (1).png'

export const footerLinks = reactive([
    {
      link: 'https://psrms.rs/d/43038-bazaws-aktualnaya-baza-tenevyh-resursov',
      icon: psrms
    },{
      link: 'https://bhf.pro/threads/692813/',
      icon: bhf
    },{
      link: 'https://darkmarket.sx/threads/baza-ws-obnovlennaja-baza-darknet-resursov.59064/',
      icon: dm
    },{
      link: 'https://ru.bdf.vc/threads/baza-ws-obnovlennaja-baza-darknet-resursov.156811/',
      icon: bdf
    },{
      link: 'https://wayaway.tk/threads/baza-ws-aktualnaja-baza-darknet-resursov.107226/',
      icon: way
    },{
      link: 'https://darkclub.cc/threads/baza-ws-aktualnaja-baza-tenevyx-resursov.7001/',
      icon: dc
    },{
      link: 'https://s1.blackbiz.store/threads/baza-ws-%D0%B0%D0%BA%D1%82%D1%83%D0%B0%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F-%D0%B1%D0%B0%D0%B7%D0%B0-%D1%82%D0%B5%D0%BD%D0%B5%D0%B2%D1%8B%D1%85-%D1%80%D0%B5%D1%81%D1%83%D1%80%D1%81%D0%BE%D0%B2.116012/',
      icon: bb
    },{
      link: 'https://skynetzone.org/threads/baza-ws-aktualnaja-baza-tenevyx-resursov.33162/',
      icon: skynet
    },{
      link: 'https://youhack.co/threads/935287/',
      icon: youhack
    },{
      link: 'https://bazaproject.piratehub.cc/threads/baza-ws-katalog-darknet-resursov.220790/#post-675037',
      icon: pirate
    },
])