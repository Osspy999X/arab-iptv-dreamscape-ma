
import { Tv, Search, Heart, Link, Server, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onM3UClick: () => void;
  onM3UFileClick: () => void;
  onXtreamClick: () => void;
  onClearChannels: () => void;
  hasChannels: boolean;
}

const Header = ({ searchQuery, onSearchChange, onM3UClick, onM3UFileClick, onXtreamClick, onClearChannels, hasChannels }: HeaderProps) => {
  return (
    <header className="glass-effect border-b border-white/20 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="iptv-gradient p-2 rounded-lg">
            <Tv className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Ra7im TV</h1>
            <p className="text-sm text-gray-300">تطبيق IPTV احترافي</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 flex-1 max-w-md mx-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="ابحث عن القنوات..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-blue-500/20 border border-blue-500/30 transition-all duration-300 hover:scale-105"
            onClick={onM3UClick}
          >
            <Link className="w-4 h-4 mr-2" />
            M3U
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-green-500/20 border border-green-500/30 transition-all duration-300 hover:scale-105"
            onClick={onM3UFileClick}
          >
            <Upload className="w-4 h-4 mr-2" />
            ملف
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-purple-500/20 border border-purple-500/30 transition-all duration-300 hover:scale-105"
            onClick={onXtreamClick}
          >
            <Server className="w-4 h-4 mr-2" />
            Xtream
          </Button>
          {hasChannels && (
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-red-500/20 border border-red-500/30 transition-all duration-300 hover:scale-105"
              onClick={onClearChannels}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              حذف الكل
            </Button>
          )}
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Heart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
