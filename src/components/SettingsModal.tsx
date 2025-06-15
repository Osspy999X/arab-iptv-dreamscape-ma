import { useState } from "react";
import { X, Plus, Link, Server, Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddM3U: (url: string) => void;
  onAddXtream: (config: { url: string; username: string; password: string }) => void;
}

const SettingsModal = ({ isOpen, onClose, onAddM3U, onAddXtream }: SettingsModalProps) => {
  const [m3uUrl, setM3uUrl] = useState("");
  const [xtreamConfig, setXtreamConfig] = useState({
    url: "",
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleAddM3U = async () => {
    if (!m3uUrl.trim()) return;
    
    setIsLoading(true);
    try {
      await onAddM3U(m3uUrl.trim());
      setM3uUrl("");
      onClose();
    } catch (error) {
      console.error("خطأ في إضافة M3U:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddXtream = async () => {
    if (!xtreamConfig.url.trim() || !xtreamConfig.username.trim() || !xtreamConfig.password.trim()) {
      return;
    }
    
    setIsLoading(true);
    try {
      await onAddXtream(xtreamConfig);
      setXtreamConfig({ url: "", username: "", password: "" });
      onClose();
    } catch (error) {
      console.error("خطأ في إضافة Xtream:", error);
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
      
      {/* نافذة الإعدادات */}
      <Card className="relative w-full max-w-2xl mx-4 professional-card border-blue-500/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <Server className="w-6 h-6 mr-2 text-blue-400" />
            إعدادات القنوات
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
          <Tabs defaultValue="m3u" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800/50">
              <TabsTrigger 
                value="m3u" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Link className="w-4 h-4 mr-2" />
                M3U Playlist
              </TabsTrigger>
              <TabsTrigger 
                value="xtream" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                <Server className="w-4 h-4 mr-2" />
                Xtream Codes
              </TabsTrigger>
            </TabsList>
            
            {/* تبويب M3U */}
            <TabsContent value="m3u" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto text-blue-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    إضافة قائمة M3U
                  </h3>
                  <p className="text-gray-400 text-sm">
                    أدخل رابط قائمة M3U للحصول على قنوات إضافية
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="m3u-url" className="text-white">
                    رابط M3U
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
                
                <Button
                  onClick={handleAddM3U}
                  disabled={!m3uUrl.trim() || isLoading}
                  className="w-full iptv-gradient hover:opacity-90 disabled:opacity-50"
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
            </TabsContent>
            
            {/* تبويب Xtream */}
            <TabsContent value="xtream" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="text-center">
                  <Server className="w-12 h-12 mx-auto text-purple-400 mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    إضافة Xtream Codes
                  </h3>
                  <p className="text-gray-400 text-sm">
                    أدخل بيانات خادم Xtream Codes للحصول على القنوات
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="xtream-url" className="text-white">
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
                    <Label htmlFor="xtream-username" className="text-white">
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
                    <Label htmlFor="xtream-password" className="text-white">
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
                </div>
                
                <Button
                  onClick={handleAddXtream}
                  disabled={!xtreamConfig.url.trim() || !xtreamConfig.username.trim() || !xtreamConfig.password.trim() || isLoading}
                  className="w-full iptv-gradient-purple hover:opacity-90 disabled:opacity-50"
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
            </TabsContent>
          </Tabs>
          
          {/* معلومات إضافية */}
          <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h4 className="text-sm font-semibold text-blue-400 mb-2 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              معلومات مفيدة
            </h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• M3U: قوائم تشغيل تحتوي على روابط القنوات</li>
              <li>• Xtream Codes: خوادم IPTV متقدمة مع إدارة شاملة</li>
              <li>• يمكنك إضافة عدة مصادر للحصول على المزيد من القنوات</li>
              <li>• تأكد من صحة الروابط وبيانات الاعتماد</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsModal;
