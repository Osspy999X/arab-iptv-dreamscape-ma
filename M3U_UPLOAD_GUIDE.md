# دليل رفع ملفات M3U

## نظرة عامة
تم إضافة ميزة رفع ملفات M3U المحلية إلى تطبيق Arab IPTV Dreamscape. هذه الميزة تسمح للمستخدمين برفع ملفات M3U أو M3U8 من أجهزتهم المحلية بدلاً من الاعتماد على الروابط فقط.

## الملفات المعدلة

### 1. `src/components/IntroScreen.tsx`
- إضافة حالة جديدة `m3uFile` لتخزين الملف المرفوع
- إضافة `fileInputRef` للتحكم في عنصر رفع الملف
- إضافة دالة `handleFileUpload` للتعامل مع رفع الملفات
- إضافة دالة `handleFileSetup` لمعالجة الملف وقراءة محتواه
- إضافة دالة `removeSelectedFile` لإزالة الملف المختار
- تحسين واجهة المستخدم مع عرض معلومات الملف

### 2. `src/hooks/useChannelData.ts`
- إضافة دالة `parseM3uContent` لتحليل محتوى ملفات M3U
- تحديث `loadM3uChannels` لدعم الملفات المحلية
- استخراج معلومات القنوات من تنسيق M3U (الاسم، الشعار، المجموعة)

## كيفية عمل الميزة

### 1. رفع الملف
```typescript
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file && (file.name.endsWith('.m3u') || file.name.endsWith('.m3u8'))) {
    setM3uFile(file);
  }
};
```

### 2. قراءة محتوى الملف
```typescript
const reader = new FileReader();
reader.onload = (e) => {
  const content = e.target?.result as string;
  // معالجة المحتوى
};
reader.readAsText(m3uFile);
```

### 3. تحليل تنسيق M3U
```typescript
const parseM3uContent = (content: string) => {
  const lines = content.split('\n');
  // تحليل كل سطر واستخراج معلومات القنوات
};
```

## تنسيق M3U المدعوم

### مثال على ملف M3U:
```m3u
#EXTM3U
#EXTINF:-1 tvg-id="bein1" tvg-logo="logo.png" group-title="رياضة",BeIN Sports 1 HD
https://example.com/stream1.m3u8
#EXTINF:-1 tvg-id="aljazeera" tvg-logo="logo2.png" group-title="أخبار",الجزيرة
https://example.com/stream2.m3u8
```

### العناصر المستخرجة:
- **الاسم**: من النص بعد الفاصلة في سطر EXTINF
- **الشعار**: من `tvg-logo` attribute
- **المجموعة**: من `group-title` attribute
- **الرابط**: من السطر التالي لـ EXTINF

## التحسينات المضافة

### 1. واجهة المستخدم
- زر أنيق لاختيار الملف
- عرض معلومات الملف (الاسم، الحجم، التاريخ)
- زر لإزالة الملف المختار
- رسائل تعليمية للمستخدم

### 2. التحقق من صحة الملف
- فحص امتداد الملف (.m3u أو .m3u8)
- رسائل خطأ واضحة
- إعادة تعيين المدخل عند الخطأ

### 3. تجربة المستخدم
- تحديث فوري للواجهة
- معاينة الملف قبل التحميل
- رسائل تأكيد وتحميل

## الاستخدام

1. انتقل إلى تبويب "M3U Playlist"
2. اختر "اختر ملف M3U"
3. حدد ملف M3U من جهازك
4. اضغط "تحميل" لبدء المعالجة
5. ستظهر القنوات مصنفة تلقائياً

## ملاحظات للمطورين

- الميزة تستخدم File API للقراءة المحلية
- التحليل يتم في المتصفح بدون إرسال للخادم
- يمكن توسيع المحلل لدعم تنسيقات إضافية
- الكود قابل للتوسع لإضافة ميزات أخرى

## ملف تجريبي
تم إنشاء ملف `public/sample.m3u` كمثال للاختبار.
