import { useState } from "react";
import { X, Server, Plus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface XtreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddXtream: (config: { url: string; username: string; password: string }) => void;
}

const XtreamModal = ({ isOpen, onClose, onAddXtream }: XtreamModalProps) => {
  const [xtreamConfig, setXtreamConfig] = useState({
    url: "",
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleAddXtream = async () => {
    if (!xtreamConfig.url.trim() || !xtreamConfig.username.trim() || !xtreamConfig.password.trim()) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    
    setIsLoading(true);
    setError("");
    try {
      await onAddXtream(xtreamConfig);
      setXtreamConfig({ url: "", username: "", password: "" });
      onClose();
    } catch (error: any) {
      console.error("خطأ في إضافة Xtream:", error);
      setError(error.message || "حدث خطأ في الاتصال بخادم Xtream");
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
      
      {/* نافذة Xtream */}
      <Card className="relative w-full max-w-lg mx-4 professional-card border-purple-500/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <Server className="w-6 h-6 mr-2 text-purple-400" />
            إضافة Xtream Codes
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
              <Server className="w-16 h-16 mx-auto text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                اتصل بخادم Xtream Codes
              </h3>
              <p className="text-gray-400 text-sm">
                أدخل بيانات خادم Xtream Codes للحصول على القنوات
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="xtream-url" className="text-white mb-2 block">
                  رابط الخادم
                </Label>
                <Input
                  id="xtream-url"
                  type="url"
                  placeholder="http://server.com:8080"
                  value={xtreamConfig.url}
                  onChange={(e) => setXtreamConfig(prev => ({ ...prev, url: e.target.value }))}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                  dir="ltr"
                />
              </div>
              
              <div>
                <Label htmlFor="xtream-username" className="text-white mb-2 block">
                  اسم المستخدم
                </Label>
                <Input
                  id="xtream-username"
                  type="text"
                  placeholder="username"
                  value={xtreamConfig.username}
                  onChange={(e) => setXtreamConfig(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                  dir="ltr"
                />
              </div>
              
              <div>
                <Label htmlFor="xtream-password" className="text-white mb-2 block">
                  كلمة المرور
                </Label>
                <Input
                  id="xtream-password"
                  type="password"
                  placeholder="password"
                  value={xtreamConfig.password}
                  onChange={(e) => setXtreamConfig(prev => ({ ...prev, password: e.target.value }))}
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
                onClick={handleAddXtream}
                disabled={!xtreamConfig.url.trim() || !xtreamConfig.username.trim() || !xtreamConfig.password.trim() || isLoading}
                className="w-full iptv-gradient-purple hover:opacity-90 disabled:opacity-50 py-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    جاري الاتصال...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة Xtream Codes
                  </>
                )}
              </Button>
            </div>
            
            {/* معلومات إضافية */}
            <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <h4 className="text-sm font-semibold text-purple-400 mb-2 flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                معلومات الأمان
              </h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• بياناتك محمية ومشفرة</li>
                <li>• لا يتم حفظ كلمات المرور</li>
                <li>• اتصال آمن بالخادم</li>
                <li>• تحقق من صحة البيانات قبل الإرسال</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default XtreamModal;
