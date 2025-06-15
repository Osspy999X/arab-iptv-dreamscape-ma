
import { useState } from "react";
import { Tv, Play, Settings, Upload, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IntroScreenProps {
  onSetupComplete: (config: any) => void;
}

const IntroScreen = ({ onSetupComplete }: IntroScreenProps) => {
  const [xtreamConfig, setXtreamConfig] = useState({
    url: "",
    username: "",
    password: ""
  });
  const [m3uUrl, setM3uUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleXtreamSetup = async () => {
    if (!xtreamConfig.url || !xtreamConfig.username || !xtreamConfig.password) {
      alert("يرجى ملء جميع الحقول المطلوبة");
      return;
    }
    
    setIsLoading(true);
    // محاكاة التحقق من الاتصال
    setTimeout(() => {
      setIsLoading(false);
      onSetupComplete({
        type: "xtream",
        config: xtreamConfig
      });
    }, 2000);
  };

  const handleM3uSetup = async () => {
    if (!m3uUrl) {
      alert("يرجى إدخال رابط M3U");
      return;
    }
    
    setIsLoading(true);
    // محاكاة تحميل قائمة M3U
    setTimeout(() => {
      setIsLoading(false);
      onSetupComplete({
        type: "m3u",
        config: { url: m3uUrl }
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo and Welcome */}
        <div className="text-center mb-8">
          <div className="iptv-gradient p-4 rounded-full w-24 h-24 mx-auto mb-6">
            <Tv className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">مرحباً بك في IPTV Pro</h1>
          <p className="text-xl text-gray-300 mb-2">أفضل تطبيق لمشاهدة القنوات والأفلام</p>
          <p className="text-gray-400">قم بإعداد خدمة IPTV الخاصة بك للبدء</p>
        </div>

        {/* Setup Cards */}
        <Card className="glass-effect border-white/20 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">إعداد الخدمة</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="xtream" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="xtream" className="text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Xtream Codes
                </TabsTrigger>
                <TabsTrigger value="m3u" className="text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  M3U Playlist
                </TabsTrigger>
              </TabsList>

              <TabsContent value="xtream" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="xtream-url" className="text-white">رابط الخادم</Label>
                    <Input
                      id="xtream-url"
                      type="url"
                      placeholder="http://example.com:8080"
                      value={xtreamConfig.url}
                      onChange={(e) => setXtreamConfig({...xtreamConfig, url: e.target.value})}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="xtream-username" className="text-white">اسم المستخدم</Label>
                    <Input
                      id="xtream-username"
                      type="text"
                      placeholder="username"
                      value={xtreamConfig.username}
                      onChange={(e) => setXtreamConfig({...xtreamConfig, username: e.target.value})}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="xtream-password" className="text-white">كلمة المرور</Label>
                    <Input
                      id="xtream-password"
                      type="password"
                      placeholder="password"
                      value={xtreamConfig.password}
                      onChange={(e) => setXtreamConfig({...xtreamConfig, password: e.target.value})}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                  <Button 
                    onClick={handleXtreamSetup}
                    disabled={isLoading}
                    className="w-full iptv-gradient hover:opacity-90"
                  >
                    {isLoading ? "جاري الاتصال..." : "الاتصال بالخادم"}
                    <Play className="w-4 h-4 mr-2" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="m3u" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="m3u-url" className="text-white">رابط M3U</Label>
                    <Input
                      id="m3u-url"
                      type="url"
                      placeholder="http://example.com/playlist.m3u8"
                      value={m3uUrl}
                      onChange={(e) => setM3uUrl(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                  <Button 
                    onClick={handleM3uSetup}
                    disabled={isLoading}
                    className="w-full iptv-gradient hover:opacity-90"
                  >
                    {isLoading ? "جاري تحميل القائمة..." : "تحميل قائمة M3U"}
                    <Link className="w-4 h-4 mr-2" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="glass-effect border-white/20 text-center">
            <CardContent className="pt-6">
              <Tv className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <h3 className="text-white font-semibold mb-2">قنوات عالية الجودة</h3>
              <p className="text-gray-300 text-sm">مشاهدة آلاف القنوات بجودة HD و 4K</p>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/20 text-center">
            <CardContent className="pt-6">
              <Play className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-white font-semibold mb-2">أفلام ومسلسلات</h3>
              <p className="text-gray-300 text-sm">مكتبة ضخمة من الأفلام والمسلسلات</p>
            </CardContent>
          </Card>
          
          <Card className="glass-effect border-white/20 text-center">
            <CardContent className="pt-6">
              <Settings className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-white font-semibold mb-2">سهولة الاستخدام</h3>
              <p className="text-gray-300 text-sm">واجهة مستخدم بسيطة ومتطورة</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;
