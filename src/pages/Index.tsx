
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ExoVideoPlayer from "@/components/ExoVideoPlayer";
import ChannelSection from "@/components/ChannelSection";
import M3UModal from "@/components/M3UModal";
import M3UFileModal from "@/components/M3UFileModal";
import XtreamModal from "@/components/XtreamModal";
import ClearChannelsModal from "@/components/ClearChannelsModal";
import IntroScreen from "@/components/IntroScreen";
import { useChannelData } from "@/hooks/useChannelData";
import { Channel } from "@/types";


const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [isM3UModalOpen, setIsM3UModalOpen] = useState(false);
  const [isM3UFileModalOpen, setIsM3UFileModalOpen] = useState(false);
  const [isXtreamModalOpen, setIsXtreamModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const { channels, loadM3uChannels, loadXtreamChannels, clearAllChannels } = useChannelData();





  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
    console.log("Selected channel:", channel.name);
  };

  const handleClosePlayer = () => {
    setSelectedChannel(null);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const handleM3UClick = () => {
    setIsM3UModalOpen(true);
  };

  const handleM3UFileClick = () => {
    setIsM3UFileModalOpen(true);
  };

  const handleXtreamClick = () => {
    setIsXtreamModalOpen(true);
  };

  const handleClearChannels = () => {
    setIsClearModalOpen(true);
  };

  const handleAddM3U = async (config: { url: string }) => {
    try {
      await loadM3uChannels(config);
      console.log("تم إضافة قنوات M3U بنجاح");
    } catch (error) {
      console.error("خطأ في إضافة M3U:", error);
      throw error;
    }
  };

  const handleAddM3UFile = async (config: { source: string; content: string }) => {
    try {
      await loadM3uChannels(config);
      console.log("تم إضافة قنوات من ملف M3U بنجاح");
    } catch (error) {
      console.error("خطأ في إضافة ملف M3U:", error);
      throw error;
    }
  };

  const handleAddXtream = async (config: { url: string; username: string; password: string }) => {
    try {
      await loadXtreamChannels(config);
      console.log("تم إضافة قنوات Xtream بنجاح");
    } catch (error) {
      console.error("خطأ في إضافة Xtream:", error);
      throw error;
    }
  };

  const handleConfirmClear = () => {
    clearAllChannels();
    console.log("تم حذف جميع القنوات");
  };



  // عرض الانترو أولاً
  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <div className="min-h-screen professional-bg flex w-full relative overflow-hidden">
      {/* تأثيرات الخلفية المتحركة */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className={`${channels.length > 0 ? 'flex' : ''}`}>
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          hasChannels={channels.length > 0}
        />

        <div className="flex-1 flex flex-col">
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onM3UClick={handleM3UClick}
            onM3UFileClick={handleM3UFileClick}
            onXtreamClick={handleXtreamClick}
            onClearChannels={handleClearChannels}
            hasChannels={channels.length > 0}
          />

          <ChannelSection
            channels={channels}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onChannelSelect={handleChannelSelect}
          />
        </div>
      </div>

      <ExoVideoPlayer
        channel={selectedChannel}
        onClose={handleClosePlayer}
      />

      <M3UModal
        isOpen={isM3UModalOpen}
        onClose={() => setIsM3UModalOpen(false)}
        onAddM3U={handleAddM3U}
      />

      <M3UFileModal
        isOpen={isM3UFileModalOpen}
        onClose={() => setIsM3UFileModalOpen(false)}
        onAddM3UFile={handleAddM3UFile}
      />

      <XtreamModal
        isOpen={isXtreamModalOpen}
        onClose={() => setIsXtreamModalOpen(false)}
        onAddXtream={handleAddXtream}
      />

      <ClearChannelsModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleConfirmClear}
        channelCount={channels.length}
      />

    </div>
  );
};

export default Index;
