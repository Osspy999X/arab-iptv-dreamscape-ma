import { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  SkipBack, 
  SkipForward,
  Settings,
  X,
  AlertTriangle,
  Wifi,
  Signal,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Channel } from "@/types";
import Hls from 'hls.js';


interface ExoVideoPlayerProps {
  channel: Channel | null;
  onClose: () => void;
}

const ExoVideoPlayer = ({ channel, onClose }: ExoVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(true);


  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLive, setIsLive] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // استخدام رابط القناة الحقيقي من M3U أو Xtreme
  const getStreamUrl = (channel: Channel): string => {
    // استخدام الرابط المحفوظ في بيانات القناة
    if (channel.url && channel.url !== 'https://example.com/stream1' && !channel.url.includes('example.com')) {
      console.log("Using real stream URL:", channel.url);
      return channel.url;
    }

    // روابط بث مباشر حقيقية للاختبار
    const name = channel.name.toLowerCase();

    if (name.includes('aljazeera') || name.includes('الجزيرة')) {
      return 'https://live-hls-web-aje.getaj.net/AJE/01.m3u8';
    } else if (name.includes('france24')) {
      return 'https://static.france24.com/live/F24_AR_HI_HLS/live_web.m3u8';
    } else if (name.includes('bbc')) {
      return 'https://vs-hls-push-ww-live.akamaized.net/x=4/i=urn:bbc:pips:service:bbc_news24/t=3840/v=pv14/b=5070016/main.m3u8';
    } else if (name.includes('cnn')) {
      return 'https://cnn-cnninternational-1-eu.rakuten.wurl.tv/playlist.m3u8';
    } else if (name.includes('euronews')) {
      return 'https://rakuten-euronews-1-gb.samsung.wurl.tv/playlist.m3u8';
    } else if (name.includes('rt')) {
      return 'https://rt-glb.rttv.com/live/rtnews/playlist.m3u8';
    } else {
      // استخدام رابط القناة الأصلي حتى لو كان تجريبي
      return channel.url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    }
  };

  // تهيئة المشغل
  useEffect(() => {
    if (!channel || !videoRef.current) return;

    const video = videoRef.current;
    const streamUrl = getStreamUrl(channel);

    console.log("ExoVideoPlayer: Initializing for", channel.name, "with URL:", streamUrl);

    setIsLoading(true);
    setHasError(false);
    setErrorMessage("");

    // تحديد نوع البث (مباشر أم لا)
    const isLiveStream = streamUrl.includes('.m3u8') || streamUrl.includes('live') || streamUrl.includes('stream');
    setIsLive(isLiveStream);

    // تنظيف المشغل السابق
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // تحميل الفيديو باستخدام HLS.js أو المشغل الأصلي
    if (streamUrl.includes('.m3u8') && Hls.isSupported()) {
      // استخدام HLS.js للبث المباشر مع إعدادات محسنة للسلاسة
      const hls = new Hls({
        // إعدادات الأداء والسلاسة
        enableWorker: true,
        lowLatencyMode: false, // تعطيل الوضع منخفض التأخير لسلاسة أفضل
        backBufferLength: 90,
        maxBufferLength: 60, // زيادة حجم البافر للسلاسة
        maxMaxBufferLength: 600,
        maxBufferSize: 60 * 1000 * 1000,
        maxBufferHole: 0.5,

        // إعدادات التحميل المحسنة
        manifestLoadingTimeOut: 10000,
        manifestLoadingMaxRetry: 3, // زيادة المحاولات
        manifestLoadingRetryDelay: 500, // تقليل التأخير
        levelLoadingTimeOut: 10000,
        levelLoadingMaxRetry: 4,
        levelLoadingRetryDelay: 500,
        fragLoadingTimeOut: 20000,
        fragLoadingMaxRetry: 6,
        fragLoadingRetryDelay: 500,

        // إعدادات البث المباشر
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 10,
        liveDurationInfinity: false,

        // إعدادات الجودة التلقائية
        startLevel: -1, // بدء بأفضل جودة متاحة
        capLevelToPlayerSize: true, // تحديد الجودة حسب حجم المشغل

        // إعدادات إضافية للسلاسة
        enableSoftwareAES: true,
        startFragPrefetch: true, // تحميل مسبق للقطع
        testBandwidth: true,
        abrEwmaDefaultEstimate: 1000000, // تقدير افتراضي للسرعة
        abrEwmaFastLive: 3.0,
        abrEwmaSlowLive: 9.0,

        // تحسينات إضافية
        nudgeOffset: 0.1,
        nudgeMaxRetry: 3,
        maxFragLookUpTolerance: 0.25,
        highBufferWatchdogPeriod: 2
      });

      hlsRef.current = hls;

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("ExoVideoPlayer: HLS manifest parsed successfully");
        setIsLoading(false);

        // تشغيل تلقائي للبث المباشر
        if (isLiveStream) {
          setTimeout(() => {
            video.play().catch(error => {
              console.log("Auto-play prevented:", error);
            });
          }, 500);
        }
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        console.log("Quality switched to:", data.level);
      });

      hls.on(Hls.Events.FRAG_BUFFERED, () => {
        // تحسين التشغيل عند توفر البيانات
        if (video.paused && !hasError && !isLoading) {
          video.play().catch(error => {
            console.log("Play failed:", error);
          });
        }
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("ExoVideoPlayer: HLS Error:", data);
        if (data.fatal) {
          setIsLoading(false);
          setHasError(true);
          setErrorMessage(`خطأ في البث المباشر: ${data.details}`);
        }
      });

    } else if (video.canPlayType('application/vnd.apple.mpegurl') && streamUrl.includes('.m3u8')) {
      // دعم Safari الأصلي للـ HLS
      video.src = streamUrl;
      video.preload = 'none';

      // تشغيل تلقائي للبث المباشر في Safari
      if (isLiveStream) {
        video.addEventListener('loadedmetadata', () => {
          setTimeout(() => {
            video.play().catch(error => {
              console.log("Safari auto-play prevented:", error);
            });
          }, 500);
        }, { once: true });
      }

    } else {
      // تحميل الفيديو العادي
      video.src = streamUrl;
      video.preload = isLiveStream ? 'none' : 'metadata';

      // تشغيل تلقائي للبث المباشر
      if (isLiveStream) {
        video.addEventListener('canplay', () => {
          setTimeout(() => {
            video.play().catch(error => {
              console.log("Auto-play prevented:", error);
            });
          }, 300);
        }, { once: true });
      }
    }

    const handleLoadedMetadata = () => {
      console.log("ExoVideoPlayer: Video loaded successfully");
      setIsLoading(false);
    };

    const handleError = (e: Event) => {
      console.error("ExoVideoPlayer: Video loading error:", e);
      setIsLoading(false);
      setHasError(true);

      // رسائل خطأ مفصلة
      const videoElement = e.target as HTMLVideoElement;
      const error = videoElement.error;

      if (error) {
        switch (error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            setErrorMessage("تم إلغاء تحميل الفيديو");
            break;
          case MediaError.MEDIA_ERR_NETWORK:
            setErrorMessage("خطأ في الشبكة - تحقق من الاتصال");
            break;
          case MediaError.MEDIA_ERR_DECODE:
            setErrorMessage("خطأ في فك تشفير الفيديو");
            break;
          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            setErrorMessage("تنسيق الفيديو غير مدعوم");
            break;
          default:
            setErrorMessage("خطأ غير معروف في تحميل الفيديو");
        }
      } else {
        setErrorMessage("خطأ في تحميل البث المباشر");
      }
    };

    const handleCanPlay = () => {
      console.log("ExoVideoPlayer: Video can play");
      setIsLoading(false);

      // تشغيل تلقائي للبث المباشر
      if (isLiveStream && video.paused) {
        setTimeout(() => {
          video.play().catch(error => {
            console.log("Auto-play prevented:", error);
          });
        }, 300);
      }
    };

    const handleLoadStart = () => {
      console.log("ExoVideoPlayer: Video load started");
      setIsLoading(true);
    };

    const handleWaiting = () => {
      console.log("ExoVideoPlayer: Video waiting for data");
      // عدم إظهار التحميل للانتظار القصير
      setTimeout(() => {
        if (video.readyState < 3) {
          setIsLoading(true);
        }
      }, 1000);
    };

    const handleCanPlayThrough = () => {
      console.log("ExoVideoPlayer: Video can play through");
      setIsLoading(false);
    };

    const handleProgress = () => {
      // تحسين التخزين المؤقت
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const currentTime = video.currentTime;
        const bufferedAhead = bufferedEnd - currentTime;

        // إذا كان التخزين المؤقت كافي، إخفاء التحميل
        if (bufferedAhead > 5) {
          setIsLoading(false);
        }
      }
    };

    const handleSeeking = () => {
      setIsLoading(true);
    };

    const handleSeeked = () => {
      setIsLoading(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('seeking', handleSeeking);
    video.addEventListener('seeked', handleSeeked);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('seeking', handleSeeking);
      video.removeEventListener('seeked', handleSeeked);

      // تنظيف HLS
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [channel]);

  // تحديث الوقت
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 0);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  // إخفاء أزرار التحكم تلقائياً
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (showControls && isPlaying) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [showControls, isPlaying]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        // تحسين التشغيل
        setIsLoading(true);
        await video.play();
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("ExoVideoPlayer: Play/Pause error:", error);
      setIsLoading(false);

      // معالجة أخطاء التشغيل التلقائي
      if (error.name === 'NotAllowedError') {
        setErrorMessage("يرجى الضغط على زر التشغيل لبدء المشاهدة");
      } else {
        setHasError(true);
        setErrorMessage("خطأ في تشغيل الفيديو");
      }
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const volumeValue = newVolume[0] / 100;
    video.volume = volumeValue;
    setVolume(newVolume);
    
    if (volumeValue === 0) {
      setIsMuted(true);
      video.muted = true;
    } else if (isMuted) {
      setIsMuted(false);
      video.muted = false;
    }
  };

  const toggleFullscreen = async () => {
    const playerContainer = playerContainerRef.current;
    if (!playerContainer) return;

    try {
      if (!isFullscreen) {
        // دخول الشاشة الكاملة
        if (playerContainer.requestFullscreen) {
          await playerContainer.requestFullscreen();
        } else if ((playerContainer as any).webkitRequestFullscreen) {
          await (playerContainer as any).webkitRequestFullscreen();
        } else if ((playerContainer as any).msRequestFullscreen) {
          await (playerContainer as any).msRequestFullscreen();
        }
      } else {
        // الخروج من الشاشة الكاملة
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  };

  // مراقبة تغييرات الشاشة الكاملة
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      );
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const retryConnection = () => {
    if (!channel) return;

    console.log("ExoVideoPlayer: Retrying connection for", channel.name);
    setHasError(false);
    setErrorMessage("");
    setIsLoading(true);

    // إعادة تحميل المشغل
    const video = videoRef.current;
    if (video) {
      // تنظيف HLS إذا كان موجود
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      // إعادة تحميل الفيديو
      video.load();

      // إعادة تهيئة HLS إذا لزم الأمر
      const streamUrl = getStreamUrl(channel);
      if (streamUrl.includes('.m3u8') && Hls.isSupported()) {
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(streamUrl);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            setIsLoading(false);
            setHasError(true);
            setErrorMessage("فشل في إعادة الاتصال");
          }
        });
      }
    }
  };

  if (!channel) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card
        ref={playerContainerRef}
        className={`w-full max-w-6xl bg-black/50 border-white/20 transition-all duration-300 ${
          isFullscreen ? 'max-w-none h-full' : ''
        }`}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center space-x-4">
            <img 
              src={channel.logo} 
              alt={channel.name}
              className="w-12 h-12 rounded-lg object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div>
              <CardTitle className="text-xl font-bold text-white">{channel.name}</CardTitle>
              <p className="text-sm text-gray-300">{channel.country} • {channel.language}</p>
              <p className="text-xs text-blue-400 mt-1">
                {isLive ? "البث المباشر" : "فيديو"} • جودة عالية
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {isLive && (
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                  🔴 مباشر
                </div>
              )}
              <div className="bg-green-600/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
                HD
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20 transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-0">
          <div
            className={`relative bg-black rounded-lg overflow-hidden transition-all duration-300 ${
              isFullscreen ? 'h-full' : 'aspect-video'
            }`}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => !isPlaying && setShowControls(true)}
            onMouseMove={() => setShowControls(true)}
          >
            
            {/* مشغل الفيديو الحقيقي */}
            <video
              ref={videoRef}
              className={`w-full h-full object-contain transition-all duration-300 ${
                isFullscreen ? 'object-cover' : 'object-contain'
              }`}
              playsInline
              controls={false}
              muted={isMuted}
              preload="metadata"
              crossOrigin="anonymous"
              onPlay={() => {
                setIsPlaying(true);
                setIsLoading(false);
              }}
              onPause={() => setIsPlaying(false)}
              onLoadStart={() => setIsLoading(true)}
              onCanPlay={() => setIsLoading(false)}
              onLoadedData={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
                setErrorMessage("خطأ في تحميل الفيديو");
              }}
            />

            {/* حالة التحميل */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <div className="text-center text-white">
                  <div className="relative mb-6">
                    <Loader2 className="w-16 h-16 mx-auto animate-spin text-blue-400" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Wifi className="w-8 h-8 text-white animate-pulse" />
                    </div>
                  </div>
                  <p className="text-xl font-semibold mb-2">جاري تحميل البث المباشر</p>
                  <p className="text-sm text-gray-300 mb-2">{channel.name}</p>
                  {isLive && (
                    <div className="flex items-center justify-center space-x-2 text-red-400">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-xs">بث مباشر</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* حالة الخطأ */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                <div className="text-center text-white">
                  <div className="w-20 h-20 mx-auto bg-red-600 rounded-full flex items-center justify-center mb-6">
                    <AlertTriangle className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-xl font-semibold mb-2 text-red-400">خطأ في البث</p>
                  <p className="text-sm text-gray-300 mb-4">{errorMessage}</p>
                  <div className="space-y-2">
                    <button
                      onClick={retryConnection}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition-colors"
                    >
                      إعادة المحاولة
                    </button>
                    <p className="text-xs text-gray-400">تحقق من اتصال الإنترنت</p>
                  </div>
                </div>
              </div>
            )}

            {/* زر التشغيل الوسطي */}
            {!isLoading && !hasError && !isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={togglePlay}
                  className="iptv-gradient hover:opacity-90 w-24 h-24 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
                >
                  <Play className="w-12 h-12 ml-1" />
                </Button>
              </div>
            )}

            {/* أزرار التحكم */}
            {showControls && !isLoading && !hasError && (
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20 transition-all duration-300"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </Button>

                  <div className="flex-1" />

                  {/* معلومات الوقت */}
                  <div className="flex items-center space-x-2 text-white text-sm">
                    {isLive ? (
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span>مباشر</span>
                      </div>
                    ) : (
                      <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
                    )}
                  </div>

                  <div className="flex-1" />

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleMute}
                      className="text-white hover:bg-white/20 transition-all duration-300"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </Button>

                    <Slider
                      value={volume}
                      onValueChange={handleVolumeChange}
                      max={100}
                      step={1}
                      className="w-24"
                    />

                    <span className="text-white text-sm min-w-[3rem] font-semibold">{volume[0]}%</span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleFullscreen}
                    className="text-white hover:bg-white/20 transition-all duration-300"
                  >
                    {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExoVideoPlayer;
