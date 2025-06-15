import { useState } from "react";
import { X, Trash2, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClearChannelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  channelCount: number;
}

const ClearChannelsModal = ({ isOpen, onClose, onConfirm, channelCount }: ClearChannelsModalProps) => {
  const [isClearing, setIsClearing] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsClearing(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("خطأ في حذف القنوات:", error);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* خلفية مظلمة */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* نافذة التأكيد */}
      <Card className="relative w-full max-w-md mx-4 professional-card border-red-500/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold text-white flex items-center">
            <Trash2 className="w-6 h-6 mr-2 text-red-400" />
            حذف جميع القنوات
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
              <AlertTriangle className="w-16 h-16 mx-auto text-red-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">
                هل أنت متأكد من الحذف؟
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                سيتم حذف جميع القنوات المضافة ({channelCount} قناة) نهائياً
              </p>
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm font-medium">
                  ⚠️ تحذير: هذا الإجراء لا يمكن التراجع عنه
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={onClose}
                variant="ghost"
                className="flex-1 text-white hover:bg-white/10 border border-gray-600"
              >
                إلغاء
              </Button>
              <Button
                onClick={handleConfirm}
                disabled={isClearing}
                className="flex-1 iptv-gradient-red hover:opacity-90 disabled:opacity-50"
              >
                {isClearing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    جاري الحذف...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    حذف {channelCount} قناة
                  </>
                )}
              </Button>
            </div>
            
            {/* معلومات إضافية */}
            <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <h4 className="text-sm font-semibold text-yellow-400 mb-2 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                ما سيحدث بعد الحذف
              </h4>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>• سيتم حذف جميع القنوات المضافة ({channelCount} قناة)</li>
                <li>• ستعود للواجهة الترحيبية</li>
                <li>• يمكنك إضافة قنوات جديدة في أي وقت</li>
                <li>• لن تتأثر إعدادات التطبيق الأخرى</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClearChannelsModal;
