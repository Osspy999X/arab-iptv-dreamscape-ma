
import { useState, useEffect, useRef } from "react";
import { Play, Tv, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // تشغيل الموسيقى عند تحميل المكون
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // مستوى صوت منخفض
      audioRef.current.play().catch(console.error);
    }
  }, []);

  const handleStart = () => {
    setIsAnimating(true);
    // إيقاف الموسيقى عند الخروج
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* الموسيقى */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        muted={isMuted}
      >
        <source src="https://www.soundjay.com/misc/sounds/magic-chime-02.wav" type="audio/wav" />
        <source src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/zapsplat_multimedia_game_sound_bright_positive_musical_chime_001_44351.mp3" type="audio/mpeg" />
      </audio>

      {/* زر كتم الصوت */}
      <Button
        onClick={toggleMute}
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 text-white hover:bg-white/20 z-20"
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </Button>

      {/* خلفية متحركة محسنة */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" />
        <div className="absolute inset-0 animated-gradient opacity-30" />

        {/* نجوم متحركة */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${1 + Math.random() * 3}s`,
                opacity: Math.random()
              }}
            />
          ))}
        </div>

        {/* دوائر متحركة */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/10 animate-ping"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.5}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>

      {/* المحتوى الرئيسي */}
      <div className={`relative z-10 text-center transition-all duration-1500 ${
        isAnimating ? 'scale-110 opacity-0' : 'scale-100 opacity-100'
      }`}>
        {/* الشعار المحسن */}
        <div className="mb-8">
          <div className="relative inline-block mb-6">
            <div className="relative">
              <Tv className="w-32 h-32 text-blue-400 mx-auto mb-4 animate-bounce drop-shadow-2xl" />
              <div className="absolute inset-0 w-32 h-32 mx-auto mb-4 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
            </div>
            <Sparkles className="absolute -top-4 -right-4 w-12 h-12 text-yellow-400 animate-spin" />
            <Sparkles className="absolute -bottom-2 -left-4 w-8 h-8 text-pink-400 animate-pulse" />
          </div>

          <h1 className="text-7xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            Ra7im TV
          </h1>
          <div className="h-1 w-32 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mb-6 animate-pulse" />
          <p className="text-2xl text-gray-300 mb-4 animate-fade-in">
            تطبيق IPTV احترافي للبث المباشر
          </p>
          <p className="text-lg text-gray-400 mb-8">
            🌟 آلاف القنوات • 📺 جودة عالية • 🚀 بث سريع
          </p>
        </div>

        {/* زر البدء المحسن */}
        <Button
          onClick={handleStart}
          className="iptv-gradient hover:scale-110 transition-all duration-500 text-xl px-12 py-6 rounded-full shadow-2xl neon-glow"
          size="lg"
        >
          <Play className="w-8 h-8 mr-4" />
          ابدأ المشاهدة الآن
        </Button>

        {/* معلومات إضافية */}
        <div className="mt-8 space-y-2">
          <p className="text-sm text-gray-400">
            ✨ مجاني تماماً • 🔒 آمن ومحمي • 📱 يعمل على جميع الأجهزة
          </p>
          <p className="text-xs text-gray-500">
            اضغط على أيقونة الصوت لكتم الموسيقى
          </p>
        </div>
      </div>

      {/* تأثيرات إضافية */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent" />
    </div>
  );
};

export default IntroScreen;
