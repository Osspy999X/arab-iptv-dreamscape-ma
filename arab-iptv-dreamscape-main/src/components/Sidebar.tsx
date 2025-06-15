
import { useState } from "react";
import { 
  Home, 
  Tv, 
  Film, 
  Radio, 
  Globe, 
  Heart, 
  History, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const menuItems = [
  { id: "all", name: "جميع القنوات", icon: Home, count: 250 },
  { id: "sports", name: "الرياضة", icon: Tv, count: 45 },
  { id: "movies", name: "الأفلام", icon: Film, count: 120 },
  { id: "news", name: "الأخبار", icon: Radio, count: 30 },
  { id: "entertainment", name: "الترفيه", icon: Globe, count: 85 },
  { id: "kids", name: "الأطفال", icon: Heart, count: 25 },
];

const Sidebar = ({ selectedCategory, onCategoryChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "glass-effect border-r border-white/20 transition-all duration-300 relative",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-6 z-10 bg-white/20 hover:bg-white/30 text-white border border-white/20 rounded-full"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </Button>

      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedCategory === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              onClick={() => onCategoryChange(item.id)}
              className={cn(
                "w-full justify-start text-white hover:bg-white/20 transition-all duration-200",
                isActive && "iptv-gradient hover:opacity-90",
                isCollapsed && "justify-center"
              )}
            >
              <Icon className={cn("w-5 h-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-right">{item.name}</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                </>
              )}
            </Button>
          );
        })}
      </div>

      {!isCollapsed && (
        <div className="p-4 border-t border-white/20 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white/20"
          >
            <History className="w-5 h-5 mr-3" />
            <span className="text-right">المشاهدة الأخيرة</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white/20"
          >
            <Settings className="w-5 h-5 mr-3" />
            <span className="text-right">الإعدادات</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
