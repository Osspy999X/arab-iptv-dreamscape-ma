
import { useState } from "react";
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {channels.map((channel) => (
        <Card
          key={channel.id}
          className="iptv-card-hover glass-effect border-white/20 overflow-hidden group cursor-pointer"
          onClick={() => onChannelSelect(channel)}
        >
          <CardContent className="p-0">
            <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900">
              <img
                src={channel.logo}
                alt={channel.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
                <Signal className="w-12 h-12 text-white" />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <Button 
                    size="sm" 
                    className="w-full iptv-gradient hover:opacity-90"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChannelSelect(channel);
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    مشاهدة مباشرة
                  </Button>
                </div>
              </div>

              {/* Top controls */}
              <div className="absolute top-2 left-2 right-2 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Badge variant="secondary" className="bg-green-500/80 text-white border-none">
                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></div>
                  مباشر
                </Badge>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(channel.id);
                    }}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.has(channel.id) ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-blue-300 transition-colors">
                {channel.name}
              </h3>
              <div className="flex items-center justify-between text-sm text-gray-300">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  {channel.language}
                </span>
                <Badge variant="outline" className="border-white/30 text-gray-300">
                  {channel.category}
                </Badge>
              </div>
              <div className="mt-2 text-xs text-gray-400">
                {channel.country}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ChannelGrid;
