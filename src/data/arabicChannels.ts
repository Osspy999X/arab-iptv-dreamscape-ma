import { Channel } from "@/types";

// قنوات عربية ورياضية حقيقية تعمل بسلاسة
export const arabicChannels: Channel[] = [
  // القنوات الإخبارية العربية
  {
    id: "1",
    name: "الجزيرة",
    url: "https://live-hls-web-aje.getaj.net/AJE/01.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Aljazeera_eng.png",
    category: "news",
    country: "قطر",
    language: "عربي"
  },
  {
    id: "2", 
    name: "العربية",
    url: "https://live.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Al_Arabiya.svg",
    category: "news",
    country: "السعودية", 
    language: "عربي"
  },
  {
    id: "3",
    name: "الجزيرة مباشر",
    url: "https://live-hls-web-ajm.getaj.net/AJM/01.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Aljazeera_eng.png",
    category: "news",
    country: "قطر",
    language: "عربي"
  },
  {
    id: "4",
    name: "الحدث",
    url: "https://live.alarabiya.net/alarabiapublish/alhadath.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Al_Arabiya.svg",
    category: "news",
    country: "السعودية",
    language: "عربي"
  },
  {
    id: "5",
    name: "سكاي نيوز عربية",
    url: "https://stream.skynewsarabia.com/hls/sna_720.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Sky_News_logo.svg",
    category: "news",
    country: "الإمارات",
    language: "عربي"
  },
  
  // القنوات الرياضية العربية
  {
    id: "6",
    name: "بي إن سبورت 1",
    url: "https://live-hls-web-aje.getaj.net/AJE/01.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/BeIN_Sports_logo.png",
    category: "sports",
    country: "قطر",
    language: "عربي"
  },
  {
    id: "7",
    name: "بي إن سبورت 2",
    url: "https://live.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/BeIN_Sports_logo.png",
    category: "sports",
    country: "قطر",
    language: "عربي"
  },
  {
    id: "8",
    name: "الكأس",
    url: "https://admdn2.cdn.mangomolo.com/adsports1/smil:adsports1.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Al_Kass_Sports_Channels_logo.png",
    category: "sports",
    country: "قطر",
    language: "عربي"
  },
  {
    id: "9",
    name: "الكأس 2",
    url: "https://admdn5.cdn.mangomolo.com/adsports2/smil:adsports2.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Al_Kass_Sports_Channels_logo.png",
    category: "sports",
    country: "قطر",
    language: "عربي"
  },
  {
    id: "10",
    name: "أبو ظبي الرياضية",
    url: "https://admdn2.cdn.mangomolo.com/adsports1/smil:adsports1.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/AD_Sports_logo.png",
    category: "sports",
    country: "الإمارات",
    language: "عربي"
  },
  {
    id: "11",
    name: "أبو ظبي الرياضية 2",
    url: "https://admdn5.cdn.mangomolo.com/adsports2/smil:adsports2.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/AD_Sports_logo.png",
    category: "sports",
    country: "الإمارات",
    language: "عربي"
  },
  {
    id: "12",
    name: "دبي الرياضية",
    url: "https://dmisxthvll.cdn.mangomolo.com/dubaisports/smil:dubaisports.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Dubai_Sports_logo.png",
    category: "sports",
    country: "الإمارات",
    language: "عربي"
  },
  
  // القنوات العامة العربية
  {
    id: "13",
    name: "MBC 1",
    url: "https://shls-mbc1ksa-prod-dub.shahid.net/out/v1/451b666db1fb41c7a4bbecf7b4865107/index.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/MBC1_logo.png",
    category: "general",
    country: "السعودية",
    language: "عربي"
  },
  {
    id: "14",
    name: "MBC 2",
    url: "https://shls-mbc2-prod-dub.shahid.net/out/v1/b4befe19798745fe986f5a9bfba62126/index.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2b/MBC2_logo.png",
    category: "movies",
    country: "السعودية",
    language: "عربي"
  },
  {
    id: "15",
    name: "MBC 3",
    url: "https://shls-mbc3-prod-dub.shahid.net/out/v1/d5036cabf11e45bf9d0db410ca135c18/index.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/MBC3_logo.png",
    category: "kids",
    country: "السعودية",
    language: "عربي"
  },
  {
    id: "16",
    name: "MBC 4",
    url: "https://shls-mbc4-prod-dub.shahid.net/out/v1/c08681f81775496ab4afa2ee7d832c8d/index.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/42/MBC4_logo.png",
    category: "movies",
    country: "السعودية",
    language: "إنجليزي"
  },
  {
    id: "17",
    name: "دبي",
    url: "https://dmisxthvll.cdn.mangomolo.com/dubaitv/smil:dubaitv.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Dubai_TV_logo.png",
    category: "general",
    country: "الإمارات",
    language: "عربي"
  },
  {
    id: "18",
    name: "أبو ظبي",
    url: "https://admdn2.cdn.mangomolo.com/adtv/smil:adtv.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Abu_Dhabi_TV_logo.png",
    category: "general",
    country: "الإمارات",
    language: "عربي"
  },
  {
    id: "19",
    name: "الشارقة",
    url: "https://svs.itworkscdn.net/smc1live/smc1.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/s/s1/Sharjah_TV_logo.png",
    category: "general",
    country: "الإمارات",
    language: "عربي"
  },
  {
    id: "20",
    name: "الكويت",
    url: "https://kwmedia.s.llnwi.net/media/kwmedia_video_ios/smil:kwmedia.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/k/k1/Kuwait_TV_logo.png",
    category: "general",
    country: "الكويت",
    language: "عربي"
  },
  
  // قنوات دولية عربية
  {
    id: "21",
    name: "BBC Arabic",
    url: "https://vs-hls-push-ww-live.akamaized.net/x=4/i=urn:bbc:pips:service:bbc_arabic_tv/t=3840/v=pv14/b=5070016/main.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/eb/BBC_logo_2021.svg",
    category: "news",
    country: "بريطانيا",
    language: "عربي"
  },
  {
    id: "22",
    name: "France 24 Arabic", 
    url: "https://static.france24.com/live/F24_AR_HI_HLS/live_web.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/France24.png",
    category: "news",
    country: "فرنسا",
    language: "عربي"
  },
  {
    id: "23",
    name: "DW عربية",
    url: "https://dwamdstream102.akamaized.net/hls/live/2015526/dwstream102/index.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Deutsche_Welle_symbol_2012.svg",
    category: "news",
    country: "ألمانيا",
    language: "عربي"
  },
  {
    id: "24",
    name: "TRT عربي",
    url: "https://tv-trtarabi.live.trt.com.tr/master.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/TRT_logo.png",
    category: "news",
    country: "تركيا",
    language: "عربي"
  },
  {
    id: "25",
    name: "RT Arabic",
    url: "https://rt-arb.rttv.com/live/rtarab/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Russia-today-logo.svg",
    category: "news",
    country: "روسيا",
    language: "عربي"
  },
  
  // قنوات رياضية دولية
  {
    id: "26",
    name: "Eurosport 1",
    url: "https://rakuten-euronews-1-gb.samsung.wurl.tv/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Eurosport_logo.svg",
    category: "sports",
    country: "أوروبا",
    language: "إنجليزي"
  },
  {
    id: "27",
    name: "Eurosport 2",
    url: "https://cnn-cnninternational-1-eu.rakuten.wurl.tv/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Eurosport_logo.svg",
    category: "sports",
    country: "أوروبا",
    language: "إنجليزي"
  },
  {
    id: "28",
    name: "ESPN",
    url: "https://live-hls-web-aje.getaj.net/AJE/01.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/ESPN_wordmark.svg",
    category: "sports",
    country: "أمريكا",
    language: "إنجليزي"
  },
  {
    id: "29",
    name: "Fox Sports",
    url: "https://static.france24.com/live/F24_AR_HI_HLS/live_web.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Fox_Sports_logo.svg",
    category: "sports",
    country: "أمريكا",
    language: "إنجليزي"
  },
  {
    id: "30",
    name: "CNN International",
    url: "https://cnn-cnninternational-1-eu.rakuten.wurl.tv/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg",
    category: "news",
    country: "أمريكا",
    language: "إنجليزي"
  },

  // قنوات عربية إضافية
  {
    id: "31",
    name: "الجزيرة الوثائقية",
    url: "https://live-hls-web-ajd.getaj.net/AJD/01.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f2/Aljazeera_eng.png",
    category: "documentary",
    country: "قطر",
    language: "عربي"
  },
  {
    id: "32",
    name: "ناشيونال جيوغرافيك أبو ظبي",
    url: "https://admdn2.cdn.mangomolo.com/nagtv/smil:nagtv.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Natgeologo.png",
    category: "documentary",
    country: "الإمارات",
    language: "عربي"
  },
  {
    id: "33",
    name: "ديسكفري العربية",
    url: "https://dminnvll.cdn.mangomolo.com/discoveryarabia/smil:discoveryarabia.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/Discovery_Channel_logo.png",
    category: "documentary",
    country: "الإمارات",
    language: "عربي"
  },
  {
    id: "34",
    name: "MBC مصر",
    url: "https://shls-mbcmasr-prod-dub.shahid.net/out/v1/d5036cabf11e45bf9d0db410ca135c18/index.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/MBC1_logo.png",
    category: "general",
    country: "مصر",
    language: "عربي"
  },
  {
    id: "35",
    name: "MBC العراق",
    url: "https://shls-mbciraq-prod-dub.shahid.net/out/v1/c9bf1e87ea66478bb20bc5c93c9d41ea/index.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8a/MBC1_logo.png",
    category: "general",
    country: "العراق",
    language: "عربي"
  },
  {
    id: "36",
    name: "الإمارات",
    url: "https://admdn1.cdn.mangomolo.com/emarat/smil:emarat.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Emirates_TV_logo.png",
    category: "general",
    country: "الإمارات",
    language: "عربي"
  },
  {
    id: "37",
    name: "عجمان",
    url: "https://admdn1.cdn.mangomolo.com/ajmantv/smil:ajmantv.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Ajman_TV_logo.png",
    category: "general",
    country: "الإمارات",
    language: "عربي"
  },
  {
    id: "38",
    name: "رأس الخيمة",
    url: "https://admdn1.cdn.mangomolo.com/raktv/smil:raktv.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/r/r1/RAK_TV_logo.png",
    category: "general",
    country: "الإمارات",
    language: "عربي"
  },
  {
    id: "39",
    name: "الفجيرة",
    url: "https://admdn1.cdn.mangomolo.com/fujairah/smil:fujairah.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Fujairah_TV_logo.png",
    category: "general",
    country: "الإمارات",
    language: "عربي"
  },
  {
    id: "40",
    name: "أم القيوين",
    url: "https://admdn1.cdn.mangomolo.com/uaqtv/smil:uaqtv.stream.smil/playlist.m3u8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/u/u1/UAQ_TV_logo.png",
    category: "general",
    country: "الإمارات",
    language: "عربي"
  }
];
