import { useState } from "react";
import { X, Link, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface M3UModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddM3U: (config: { url: string }) => void;
}

const M3UModal = ({ isOpen, onClose, onAddM3U }: M3UModalProps) => {
  const [m3uUrl, setM3uUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleAddM3U = async () => {
    if (!m3uUrl.trim()) return;
    
    setIsLoading(true);
    setError("");
    try {
      await onAddM3U({ url: m3uUrl.trim() });
      setM3uUrl("");
      onClose();
    } catch (error: any) {
      console.error("خطأ في إضافة M3U:", error);
      setError(error.message || "حدث خطأ في تحميل قائمة M3U");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* خلفية مظلمة */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* نافذة M3U */}
      <Card className="relative w-full max-w-lg mx-4 professional-card border-blue-500/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <Link className="w-6 h-6 mr-2 text-blue-400" />
            إضافة قائمة M3U
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <Upload className="w-16 h-16 mx-auto text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                أضف قائمة M3U الخاصة بك
              </h3>
              <p className="text-gray-400 text-sm">
                أدخل رابط قائمة M3U للحصول على قنوات إضافية
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="m3u-url" className="text-white mb-2 block">
                  رابط قائمة M3U
                </Label>
                <Input
                  id="m3u-url"
                  type="url"
                  placeholder="https://example.com/playlist.m3u"
                  value={m3uUrl}
                  onChange={(e) => setM3uUrl(e.target.value)}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                  dir="ltr"
                />
              </div>
              
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
              
              <Button
                onClick={handleAddM3U}
                disabled={!m3uUrl.trim() || isLoading}
                className="w-full iptv-gradient-blue hover:opacity-90 disabled:opacity-50 py-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    جاري التحميل...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة قائمة M3U
                  </>
                )}
              </Button>
            </div>
            
            {/* معلومات إضافية */}
            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <h4 className="text-sm font-semibold text-blue-400 mb-2">
                💡 نصائح مفيدة
              </h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• تأكد من صحة رابط M3U</li>
                <li>• يدعم التطبيق جميع تنسيقات M3U</li>
                <li>• سيتم تحليل القنوات تلقائياً</li>
                <li>• يمكنك إضافة عدة قوائم M3U</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default M3UModal;
