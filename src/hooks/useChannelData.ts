
import { useState, useEffect } from "react";
import { Channel } from "@/types";
import { categorizeChannel } from "@/utils/channelCategorizer";
import { arabicChannels } from "@/data/arabicChannels";

export const useChannelData = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  // تحميل القنوات العربية تلقائياً عند بدء التطبيق
  useEffect(() => {
    loadArabicChannels();
  }, []);

  const loadArabicChannels = () => {
    console.log("تحميل القنوات العربية والرياضية...");
    setChannels(arabicChannels);
  };

  const loadXtreamChannels = async (config: any) => {
    // محاكاة تحميل القنوات من Xtream Codes API
    setTimeout(() => {
      const mockChannels: Channel[] = [
        {
          id: "xtream_1",
          name: "Al Jazeera Live",
          logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Aljazeera_eng.svg/240px-Aljazeera_eng.svg.png",
          category: "news",
          url: config.url ? `${config.url}/live/${config.username}/${config.password}/1.m3u8` : "https://live-hls-web-aje.getaj.net/AJE/01.m3u8",
          language: "العربية",
          country: "قطر"
        },
        {
          id: "xtream_2",
          name: "France 24 Arabic",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/France24.png/240px-France24.png",
          category: "news",
          url: config.url ? `${config.url}/live/${config.username}/${config.password}/2.m3u8` : "https://static.france24.com/live/F24_AR_HI_HLS/live_web.m3u8",
          language: "العربية",
          country: "فرنسا"
        },
        {
          id: "xtream_3",
          name: "BBC News HD",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/BBC_News_%28TV_channel%29_logo.svg/240px-BBC_News_%28TV_channel%29_logo.svg.png",
          category: "news",
          url: config.url ? `${config.url}/live/${config.username}/${config.password}/3.m3u8` : "https://vs-hls-push-ww-live.akamaized.net/x=4/i=urn:bbc:pips:service:bbc_news24/t=3840/v=pv14/b=5070016/main.m3u8",
          language: "الإنجليزية",
          country: "بريطانيا"
        },
        {
          id: "xtream_4",
          name: "CNN International",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/240px-CNN.svg.png",
          category: "news",
          url: config.url ? `${config.url}/live/${config.username}/${config.password}/4.m3u8` : "https://cnn-cnninternational-1-eu.rakuten.wurl.tv/playlist.m3u8",
          language: "الإنجليزية",
          country: "أمريكا"
        },
        {
          id: "xtream_5",
          name: "Euronews",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Euronews_logo.svg/240px-Euronews_logo.svg.png",
          category: "news",
          url: config.url ? `${config.url}/live/${config.username}/${config.password}/5.m3u8` : "https://rakuten-euronews-1-gb.samsung.wurl.tv/playlist.m3u8",
          language: "متعدد",
          country: "أوروبا"
        }
      ];
      console.log("Xtream Channels loaded:", mockChannels);
      setChannels(mockChannels);
    }, 1000);
  };

  const parseM3uContent = (content: string) => {
    const lines = content.split('\n');
    const channels = [];
    let currentChannel: any = {};

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (line.startsWith('#EXTINF:')) {
        // استخراج معلومات القناة من سطر EXTINF
        const nameMatch = line.match(/,(.+)$/);
        const logoMatch = line.match(/tvg-logo="([^"]+)"/);
        const groupMatch = line.match(/group-title="([^"]+)"/);

        currentChannel = {
          name: nameMatch ? nameMatch[1].trim() : `قناة ${channels.length + 1}`,
          logo: logoMatch ? logoMatch[1] : '',
          group: groupMatch ? groupMatch[1] : 'عام'
        };
      } else if (line && !line.startsWith('#') && currentChannel.name) {
        // هذا هو رابط القناة
        currentChannel.url = line;
        channels.push({ ...currentChannel });
        currentChannel = {};
      }
    }

    return channels;
  };

  const loadM3uChannels = async (config: any) => {
    console.log("Loading M3U channels from config:", config);

    setTimeout(() => {
      let mockM3uChannels;

      if (config.source === "file" && config.content) {
        // تحليل محتوى الملف الفعلي
        const parsedChannels = parseM3uContent(config.content);
        mockM3uChannels = parsedChannels.map(channel => ({
          name: channel.name,
          url: channel.url,
          country: channel.group || "غير محدد",
          logo: channel.logo
        }));

        console.log("Parsed channels from file:", parsedChannels);
      } else {
        // البيانات التجريبية مع روابط بث مباشر حقيقية
        mockM3uChannels = [
          {
            name: "Al Jazeera English",
            url: config.url || "https://live-hls-web-aje.getaj.net/AJE/01.m3u8",
            country: "قطر",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Aljazeera_eng.svg/240px-Aljazeera_eng.svg.png"
          },
          {
            name: "France 24 Arabic",
            url: config.url || "https://static.france24.com/live/F24_AR_HI_HLS/live_web.m3u8",
            country: "فرنسا",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/France24.png/240px-France24.png"
          },
          {
            name: "BBC News",
            url: config.url || "https://vs-hls-push-ww-live.akamaized.net/x=4/i=urn:bbc:pips:service:bbc_news24/t=3840/v=pv14/b=5070016/main.m3u8",
            country: "بريطانيا",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/BBC_News_%28TV_channel%29_logo.svg/240px-BBC_News_%28TV_channel%29_logo.svg.png"
          },
          {
            name: "CNN International",
            url: config.url || "https://cnn-cnninternational-1-eu.rakuten.wurl.tv/playlist.m3u8",
            country: "أمريكا",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/CNN.svg/240px-CNN.svg.png"
          },
          {
            name: "Euronews",
            url: config.url || "https://rakuten-euronews-1-gb.samsung.wurl.tv/playlist.m3u8",
            country: "أوروبا",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Euronews_logo.svg/240px-Euronews_logo.svg.png"
          },
          {
            name: "RT News",
            url: config.url || "https://rt-glb.rttv.com/live/rtnews/playlist.m3u8",
            country: "روسيا",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Russia-today-logo.svg/240px-Russia-today-logo.svg.png"
          },
          {
            name: "DW Arabic",
            url: config.url || "https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8",
            country: "ألمانيا",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Deutsche_Welle_symbol_2012.svg/240px-Deutsche_Welle_symbol_2012.svg.png"
          },
          {
            name: "TRT World",
            url: config.url || "https://tv-trtworld.live.trt.com.tr/master.m3u8",
            country: "تركيا",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/TRT_World.svg/240px-TRT_World.svg.png"
          },
          {
            name: "Sky News",
            url: config.url || "https://skynews2-plutolive-vo.akamaized.net/cdnAkamaiLive/1013/latest.m3u8",
            country: "بريطانيا",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/6/65/Sky-news-logo.svg/240px-Sky-news-logo.svg.png"
          },
          {
            name: "CGTN",
            url: config.url || "https://live.cgtn.com/1000/prog_index.m3u8",
            country: "الصين",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/CGTN.svg/240px-CGTN.svg.png"
          }
        ];
      }

      const processedChannels: Channel[] = mockM3uChannels.map((channel, index) => ({
        id: `m3u_${index + 1}`,
        name: channel.name,
        logo: channel.logo || `https://images.unsplash.com/photo-${1522869635100 + index}?w=300&h=200&fit=crop`,
        category: categorizeChannel(channel.name),
        url: channel.url,
        language: "العربية",
        country: channel.country
      }));

      console.log("M3U Channels loaded and categorized:", processedChannels);
      setChannels(processedChannels);
    }, 1000);
  };

  const clearAllChannels = () => {
    console.log("حذف جميع القنوات");
    setChannels([]);
  };

  return {
    channels,
    setChannels,
    loadXtreamChannels,
    loadM3uChannels,
    clearAllChannels
  };
};
