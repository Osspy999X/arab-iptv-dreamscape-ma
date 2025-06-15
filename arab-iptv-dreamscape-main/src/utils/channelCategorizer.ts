
export const categorizeChannel = (channelName: string): string => {
  const name = channelName.toLowerCase();
  
  // كلمات مفتاحية للرياضة
  const sportsKeywords = ['sport', 'football', 'soccer', 'basketball', 'tennis', 'رياضة', 'كرة', 'رياضي', 'الرياضة', 'بين سبورت', 'الكأس', 'دوري', 'مباراة', 'bein', 'fox sports', 'dubai sports'];
  
  // كلمات مفتاحية للأخبار
  const newsKeywords = ['news', 'aljazeera', 'cnn', 'bbc', 'alarabiya', 'أخبار', 'الأخبار', 'الجزيرة', 'العربية', 'سكاي نيوز', 'نيوز'];
  
  // كلمات مفتاحية للأطفال
  const kidsKeywords = ['kids', 'cartoon', 'disney', 'children', 'أطفال', 'كرتون', 'طيور الجنة', 'براعم', 'سبيستون', 'كوكي', 'spacetoon'];
  
  // كلمات مفتاحية للأفلام
  const moviesKeywords = ['movie', 'cinema', 'film', 'أفلام', 'سينما', 'فيلم', 'الأفلام', 'هوليوود', 'بوليوود', 'action', 'rotana'];
  
  // كلمات مفتاحية للترفيه
  const entertainmentKeywords = ['entertainment', 'music', 'variety', 'ترفيه', 'موسيقى', 'منوعات', 'فن', 'أغاني', 'الفن', 'تلفزيون', 'mbc'];

  if (sportsKeywords.some(keyword => name.includes(keyword))) {
    return 'sports';
  } else if (newsKeywords.some(keyword => name.includes(keyword))) {
    return 'news';
  } else if (kidsKeywords.some(keyword => name.includes(keyword))) {
    return 'kids';
  } else if (moviesKeywords.some(keyword => name.includes(keyword))) {
    return 'movies';
  } else if (entertainmentKeywords.some(keyword => name.includes(keyword))) {
    return 'entertainment';
  }
  
  return 'entertainment'; // الفئة الافتراضية
};
