
import { useMemo } from "react";
import ChannelGrid from "@/components/ChannelGrid";
import { Channel } from "@/types";

interface ChannelSectionProps {
  channels: Channel[];
  selectedCategory: string;
  searchQuery: string;
  onChannelSelect: (channel: Channel) => void;
}

const ChannelSection = ({
  channels,
  selectedCategory,
  searchQuery,
  onChannelSelect
}: ChannelSectionProps) => {
  const filteredChannels = useMemo(() => {
    let filtered = channels;

    // تصفية حسب الفئة
    if (selectedCategory !== "all") {
      filtered = filtered.filter(channel => channel.category === selectedCategory);
    }

    // تصفية حسب البحث
    if (searchQuery.trim()) {
      filtered = filtered.filter(channel =>
        channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        channel.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [channels, selectedCategory, searchQuery]);

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "all": return "جميع القنوات";
      case "sports": return "القنوات الرياضية";
      case "news": return "قنوات الأخبار";
      case "entertainment": return "قنوات الترفيه";
      case "kids": return "قنوات الأطفال";
      case "movies": return "قنوات الأفلام";
      default: return "القنوات";
    }
  };

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            {getCategoryTitle(selectedCategory)}
          </h2>
          <p className="text-gray-300">
            {filteredChannels.length} قناة متوفرة
            <span className="ml-2 text-blue-400">
              • قنوات عربية ورياضية عالية الجودة
            </span>
          </p>
        </div>
        
        {channels.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">جاري تحميل القنوات...</div>
          </div>
        ) : (
          <ChannelGrid
            channels={filteredChannels}
            onChannelSelect={onChannelSelect}
          />
        )}
      </div>
    </main>
  );
};

export default ChannelSection;
