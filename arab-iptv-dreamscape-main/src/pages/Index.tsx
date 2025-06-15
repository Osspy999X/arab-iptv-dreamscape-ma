
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import VideoPlayer from "@/components/VideoPlayer";
import IntroScreen from "@/components/IntroScreen";
import ChannelSection from "@/components/ChannelSection";
import { useChannelData } from "@/hooks/useChannelData";
import { Channel } from "@/types";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [setupConfig, setSetupConfig] = useState<any>(null);
  
  const { channels, loadXtreamChannels, loadM3uChannels } = useChannelData();

  const handleSetupComplete = (config: any) => {
    console.log("Setup completed with config:", config);
    setSetupConfig(config);
    setIsSetupComplete(true);
    
    // محاكاة تحميل القنوات بناءً على نوع الإعداد
    if (config.type === "xtream") {
      // في التطبيق الحقيقي، سيتم استدعاء API الخاص بـ Xtream Codes
      loadXtreamChannels(config.config);
    } else if (config.type === "m3u") {
      // في التطبيق الحقيقي، سيتم تحليل ملف M3U
      loadM3uChannels(config.config);
    }
  };

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
    console.log("Selected channel:", channel.name);
  };

  const handleClosePlayer = () => {
    setSelectedChannel(null);
  };

  // عرض شاشة الانترو إذا لم يتم الإعداد بعد
  if (!isSetupComplete) {
    return <IntroScreen onSetupComplete={handleSetupComplete} />;
  }

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <div className="flex-1 flex flex-col">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <ChannelSection
          channels={channels}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          setupConfig={setupConfig}
          onChannelSelect={handleChannelSelect}
        />
      </div>

      <VideoPlayer
        channel={selectedChannel}
        onClose={handleClosePlayer}
      />
    </div>
  );
};

export default Index;
