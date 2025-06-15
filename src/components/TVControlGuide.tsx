import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  CornerDownLeft, 
  X,
  Play,
  Pause,
  Volume2,
  Maximize
} from "lucide-react";

const TVControlGuide = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [autoHideTimer, setAutoHideTimer] = useState<NodeJS.Timeout | null>(null);

  // إظهار الدليل عند بدء التطبيق
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // إخفاء تلقائي بعد 10 ثوان
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      
      setAutoHideTimer(hideTimer);
    }, 2000);

    return () => {
      clearTimeout(timer);
      if (autoHideTimer) clearTimeout(autoHideTimer);
    };
  }, []);

  // إظهار الدليل عند الضغط على مفتاح المساعدة
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'F1' || event.key === 'Help' || event.key === '?') {
        event.preventDefault();
        setIsVisible(!isVisible);
        
        if (autoHideTimer) {
          clearTimeout(autoHideTimer);
          setAutoHideTimer(null);
        }
      } else if (event.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, autoHideTimer]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-gray-900/95 border-blue-500/30 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-blue-400">📺 دليل التحكم بالريموت</h2>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* التنقل الأساسي */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-300 border-b border-blue-500/30 pb-2">
                التنقل الأساسي
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <ArrowUp className="w-5 h-5 text-blue-400" />
                    <ArrowDown className="w-5 h-5 text-blue-400" />
                    <ArrowLeft className="w-5 h-5 text-blue-400" />
                    <ArrowRight className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-sm">التنقل بين العناصر</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <CornerDownLeft className="w-5 h-5 text-green-400" />
                  <span className="text-sm">تأكيد الاختيار (Enter)</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <X className="w-5 h-5 text-red-400" />
                  <span className="text-sm">العودة للخلف (Escape)</span>
                </div>
              </div>
            </div>

            {/* أزرار المشغل */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-300 border-b border-blue-500/30 pb-2">
                أزرار المشغل
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Play className="w-5 h-5 text-green-400" />
                  <span className="text-sm">تشغيل/إيقاف (Space)</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm">كتم الصوت (M)</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Maximize className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">شاشة كاملة (F)</span>
                </div>
              </div>
            </div>

            {/* أزرار الريموت الخاصة */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-300 border-b border-blue-500/30 pb-2">
                أزرار الريموت الخاصة
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-red-500 rounded text-xs flex items-center justify-center font-bold">
                    ●
                  </div>
                  <span className="text-sm">تسجيل (غير متاح)</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-blue-500 rounded text-xs flex items-center justify-center font-bold">
                    ■
                  </div>
                  <span className="text-sm">إيقاف البث</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded text-xs flex items-center justify-center font-bold">
                    ▶
                  </div>
                  <span className="text-sm">تشغيل/إيقاف</span>
                </div>
              </div>
            </div>

            {/* نصائح */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-300 border-b border-blue-500/30 pb-2">
                نصائح مفيدة
              </h3>
              
              <div className="space-y-2 text-sm text-gray-300">
                <p>• استخدم الأسهم للتنقل بين القنوات</p>
                <p>• اضغط Enter لمشاهدة القناة</p>
                <p>• اضغط Escape للعودة للقائمة</p>
                <p>• اضغط F1 لإظهار هذا الدليل</p>
                <p>• يختفي مؤشر الماوس تلقائياً</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-700 text-center">
            <p className="text-sm text-gray-400">
              اضغط <span className="text-blue-400 font-semibold">F1</span> في أي وقت لإظهار هذا الدليل
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TVControlGuide;
