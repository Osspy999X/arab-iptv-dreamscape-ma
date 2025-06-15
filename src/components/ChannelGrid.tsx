
import { useState, useEffect } from "react";
import { Play, Heart, MoreVertical, Signal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Channel } from "@/types";

interface ChannelGridProps {
  channels: Channel[];
  onChannelSelect: (channel: Channel) => void;
}

const ChannelGrid = ({ channels, onChannelSelect }: ChannelGridProps) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());



  const toggleFavorite = (channelId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(channelId)) {
      newFavorites.delete(channelId);
    } else {
      newFavorites.add(channelId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="tv-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {channels.map((channel) => (
        <Card
          key={channel.id}
          className="professional-card overflow-hidden group cursor-pointer transform transition-all duration-300 hover:scale-105"
          onClick={() => onChannelSelect(channel)}
        >
          <CardContent className="p-0">
            <div className="relative h-52 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
              <img
                src={channel.logo}
                alt={channel.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex items-center justify-center iptv-gradient">
                <Signal className="w-16 h-16 text-white animate-pulse" />
              </div>

              {/* تأثير التدرج العلوي */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="absolute bottom-4 left-4 right-4">
                  <Button
                    size="lg"
                    className="w-full iptv-gradient hover:opacity-90 shadow-2xl transform hover:scale-105 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChannelSelect(channel);
                    }}
                  >
                    <Play className="w-5 h-5 mr-2" />
                    مشاهدة مباشرة
                  </Button>
                </div>
              </div>

              {/* Top controls */}
              <div className="absolute top-3 left-3 right-3 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-500">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none shadow-lg neon-glow text-green-400">
                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                  مباشر
                </Badge>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 glass-effect hover:bg-white/30 text-white transition-all duration-300 hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(channel.id);
                    }}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        favorites.has(channel.id) ? "fill-red-500 text-red-500 scale-125" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 glass-effect hover:bg-white/30 text-white transition-all duration-300 hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-bold text-white text-xl mb-3 group-hover:text-blue-300 transition-colors leading-tight">
                {channel.name}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
                <span className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  {channel.language}
                </span>
                <Badge className="iptv-gradient-blue text-white border-none shadow-md">
                  {channel.category}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  📍 {channel.country}
                </div>
                <div className="text-xs text-blue-400 font-semibold">
                  HD
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChannelGrid;
