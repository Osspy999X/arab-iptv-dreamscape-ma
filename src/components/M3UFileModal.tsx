import { useState, useRef } from "react";
import { X, Upload, File, Plus, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface M3UFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddM3UFile: (config: { source: string; content: string }) => void;
}

const M3UFileModal = ({ isOpen, onClose, onAddM3UFile }: M3UFileModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    if (file.type !== "audio/x-mpegurl" && !file.name.endsWith(".m3u") && !file.name.endsWith(".m3u8")) {
      setError("يرجى اختيار ملف M3U صحيح (.m3u أو .m3u8)");
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError("حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت");
      return;
    }
    
    setSelectedFile(file);
    setError("");
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const content = await selectedFile.text();
      await onAddM3UFile({ source: "file", content });
      setSelectedFile(null);
      onClose();
    } catch (error: any) {
      console.error("خطأ في رفع الملف:", error);
      setError(error.message || "حدث خطأ في قراءة الملف");
    } finally {
      setIsLoading(false);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* خلفية مظلمة */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* نافذة رفع الملف */}
      <Card className="relative w-full max-w-lg mx-4 professional-card border-green-500/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <Upload className="w-6 h-6 mr-2 text-green-400" />
            رفع ملف M3U
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
              <File className="w-16 h-16 mx-auto text-green-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                اختر ملف M3U من جهازك
              </h3>
              <p className="text-gray-400 text-sm">
                ارفع ملف M3U أو M3U8 للحصول على قنوات جديدة
              </p>
            </div>
            
            {/* منطقة السحب والإفلات */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                isDragOver 
                  ? "border-green-400 bg-green-500/10" 
                  : selectedFile 
                    ? "border-green-500 bg-green-500/5"
                    : "border-gray-600 hover:border-green-500 hover:bg-green-500/5"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={openFileDialog}
            >
              {selectedFile ? (
                <div className="flex items-center justify-center space-x-3">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div className="text-right">
                    <p className="text-white font-medium">{selectedFile.name}</p>
                    <p className="text-gray-400 text-sm">
                      {(selectedFile.size / 1024).toFixed(1)} كيلوبايت
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-white mb-2">اسحب وأفلت ملف M3U هنا</p>
                  <p className="text-gray-400 text-sm">أو انقر لاختيار ملف</p>
                </div>
              )}
            </div>
            
            {/* حقل إدخال الملف المخفي */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".m3u,.m3u8,audio/x-mpegurl"
              onChange={handleFileInputChange}
              className="hidden"
            />
            
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isLoading}
              className="w-full iptv-gradient-green hover:opacity-90 disabled:opacity-50 py-3"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  جاري المعالجة...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة ملف M3U
                </>
              )}
            </Button>
            
            {/* معلومات إضافية */}
            <div className="mt-6 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
              <h4 className="text-sm font-semibold text-green-400 mb-2">
                📁 معلومات الملف
              </h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• يدعم ملفات .m3u و .m3u8</li>
                <li>• الحد الأقصى لحجم الملف: 10 ميجابايت</li>
                <li>• سيتم تحليل القنوات تلقائياً</li>
                <li>• يمكنك سحب وإفلات الملف مباشرة</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default M3UFileModal;
