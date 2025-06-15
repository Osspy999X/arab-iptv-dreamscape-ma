
import { useState } from "react";
import { Channel } from "@/types";
import { categorizeChannel } from "@/utils/channelCategorizer";

export const useChannelData = () => {
  const [channels, setChannels] = useState<Channel[]>([]);

  const loadXtreamChannels = async (config: any) => {
    // محاكاة تحميل القنوات من Xtream Codes API
    setTimeout(() => {
      const mockChannels: Channel[] = [
        {
          id: "xtream_1",
          name: "قناة تجريبية 1",
          logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=200&fit=crop",
          category: "news",
          url: `${config.url}/live/${config.username}/${config.password}/1.m3u8`,
          language: "العربية",
          country: "مصر"
        },
        {
          id: "xtream_2",
          name: "قناة رياضية تجريبية",
          logo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=200&fit=crop",
          category: "sports",
          url: `${config.url}/live/${config.username}/${config.password}/2.m3u8`,
          language: "العربية",
          country: "السعودية"
        }
      ];
      console.log("Xtream Channels loaded:", mockChannels);
      setChannels(mockChannels);
    }, 1000);
  };

  const loadM3uChannels = async (config: any) => {
    console.log("Loading M3U channels from config:", config);
    // محاكاة تحليل ملف M3U وتصنيف القنوات
    setTimeout(() => {
      const mockM3uChannels = [
        { name: "BeIN Sports 1 HD", url: config.url || "https://example.com/stream1", country: "قطر" },
        { name: "Al Jazeera News", url: config.url || "https://example.com/stream2", country: "قطر" },
        { name: "MBC Action Movies", url: config.url || "https://example.com/stream3", country: "الإمارات" },
        { name: "Cartoon Network Arabic", url: config.url || "https://example.com/stream4", country: "الإمارات" },
        { name: "Dubai Sports", url: config.url || "https://example.com/stream5", country: "الإمارات" },
        { name: "Al Arabiya News", url: config.url || "https://example.com/stream6", country: "السعودية" },
        { name: "Rotana Cinema", url: config.url || "https://example.com/stream7", country: "السعودية" },
        { name: "Spacetoon", url: config.url || "https://example.com/stream8", country: "الإمارات" },
        { name: "MBC 1 Entertainment", url: config.url || "https://example.com/stream9", country: "الإمارات" },
        { name: "Fox Sports", url: config.url || "https://example.com/stream10", country: "الإمارات" }
      ];

      const processedChannels: Channel[] = mockM3uChannels.map((channel, index) => ({
        id: `m3u_${index + 1}`,
        name: channel.name,
        logo: `https://images.unsplash.com/photo-${1522869635100 + index}?w=300&h=200&fit=crop`,
        category: categorizeChannel(channel.name),
        url: channel.url,
        language: "العربية",
        country: channel.country
      }));

      console.log("M3U Channels loaded and categorized:", processedChannels);
      setChannels(processedChannels);
    }, 1000);
  };

  return {
    channels,
    setChannels,
    loadXtreamChannels,
    loadM3uChannels
  };
};
