import { useState, useEffect, useCallback } from 'react';

interface NavigationState {
  currentSection: 'intro' | 'channels' | 'player';
  currentIndex: number;
  maxIndex: number;
  isVisible: boolean;
}

export const useTVNavigation = () => {
  const [navigation, setNavigation] = useState<NavigationState>({
    currentSection: 'intro',
    currentIndex: 0,
    maxIndex: 0,
    isVisible: true
  });

  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);

  // تحديث العنصر المحدد
  const updateSelectedElement = useCallback(() => {
    // إزالة التحديد من العنصر السابق
    if (selectedElement) {
      selectedElement.classList.remove('tv-selected');
      selectedElement.blur();
    }

    // العثور على العنصر الجديد
    let newElement: HTMLElement | null = null;
    
    if (navigation.currentSection === 'intro') {
      const buttons = document.querySelectorAll('.tv-intro-button');
      newElement = buttons[navigation.currentIndex] as HTMLElement;
    } else if (navigation.currentSection === 'channels') {
      const channels = document.querySelectorAll('.tv-channel-card');
      newElement = channels[navigation.currentIndex] as HTMLElement;
    } else if (navigation.currentSection === 'player') {
      const controls = document.querySelectorAll('.tv-player-control');
      newElement = controls[navigation.currentIndex] as HTMLElement;
    }

    if (newElement) {
      newElement.classList.add('tv-selected');
      newElement.focus();
      newElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'center'
      });
      setSelectedElement(newElement);
    }
  }, [navigation, selectedElement]);

  // التنقل للأعلى
  const navigateUp = useCallback(() => {
    if (navigation.currentSection === 'channels') {
      // التنقل في الشبكة (4 أعمدة)
      const newIndex = Math.max(0, navigation.currentIndex - 4);
      setNavigation(prev => ({ ...prev, currentIndex: newIndex }));
    } else {
      const newIndex = Math.max(0, navigation.currentIndex - 1);
      setNavigation(prev => ({ ...prev, currentIndex: newIndex }));
    }
  }, [navigation]);

  // التنقل للأسفل
  const navigateDown = useCallback(() => {
    if (navigation.currentSection === 'channels') {
      // التنقل في الشبكة (4 أعمدة)
      const newIndex = Math.min(navigation.maxIndex, navigation.currentIndex + 4);
      setNavigation(prev => ({ ...prev, currentIndex: newIndex }));
    } else {
      const newIndex = Math.min(navigation.maxIndex, navigation.currentIndex + 1);
      setNavigation(prev => ({ ...prev, currentIndex: newIndex }));
    }
  }, [navigation]);

  // التنقل لليسار
  const navigateLeft = useCallback(() => {
    const newIndex = Math.max(0, navigation.currentIndex - 1);
    setNavigation(prev => ({ ...prev, currentIndex: newIndex }));
  }, [navigation]);

  // التنقل لليمين
  const navigateRight = useCallback(() => {
    const newIndex = Math.min(navigation.maxIndex, navigation.currentIndex + 1);
    setNavigation(prev => ({ ...prev, currentIndex: newIndex }));
  }, [navigation]);

  // تأكيد الاختيار
  const confirmSelection = useCallback(() => {
    if (selectedElement) {
      selectedElement.click();
    }
  }, [selectedElement]);

  // العودة للخلف
  const goBack = useCallback(() => {
    if (navigation.currentSection === 'player') {
      setNavigation(prev => ({ 
        ...prev, 
        currentSection: 'channels',
        currentIndex: 0 
      }));
    } else if (navigation.currentSection === 'channels') {
      setNavigation(prev => ({ 
        ...prev, 
        currentSection: 'intro',
        currentIndex: 0 
      }));
    }
  }, [navigation]);

  // معالجة أحداث لوحة المفاتيح والريموت
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      
      switch (event.key) {
        case 'ArrowUp':
          navigateUp();
          break;
        case 'ArrowDown':
          navigateDown();
          break;
        case 'ArrowLeft':
          navigateLeft();
          break;
        case 'ArrowRight':
          navigateRight();
          break;
        case 'Enter':
        case ' ':
          confirmSelection();
          break;
        case 'Escape':
        case 'Backspace':
          goBack();
          break;
        // أزرار ريموت التلفزيون
        case 'MediaPlayPause':
          confirmSelection();
          break;
        case 'MediaStop':
          goBack();
          break;
        // أزرار إضافية للتلفزيون
        case 'F1':
        case 'Help':
          // سيتم التعامل معها في TVControlGuide
          break;
        case 'Home':
          // العودة للصفحة الرئيسية
          if (navigation.currentSection !== 'intro') {
            setNavigation(prev => ({
              ...prev,
              currentSection: 'channels',
              currentIndex: 0
            }));
          }
          break;
      }
    };

    // إضافة مستمع الأحداث
    document.addEventListener('keydown', handleKeyDown);
    
    // تنظيف المستمع عند إلغاء التحميل
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigateUp, navigateDown, navigateLeft, navigateRight, confirmSelection, goBack]);

  // تحديث العنصر المحدد عند تغيير التنقل
  useEffect(() => {
    updateSelectedElement();
  }, [updateSelectedElement]);

  // تحديث القسم والفهرس الأقصى
  const setSection = useCallback((section: 'intro' | 'channels' | 'player', maxIndex: number = 0) => {
    setNavigation(prev => ({
      ...prev,
      currentSection: section,
      currentIndex: 0,
      maxIndex: maxIndex
    }));
  }, []);

  // تحديث الفهرس الأقصى
  const setMaxIndex = useCallback((maxIndex: number) => {
    setNavigation(prev => ({ ...prev, maxIndex }));
  }, []);

  // إظهار/إخفاء التنقل
  const setVisible = useCallback((visible: boolean) => {
    setNavigation(prev => ({ ...prev, isVisible: visible }));
  }, []);

  return {
    navigation,
    setSection,
    setMaxIndex,
    setVisible,
    navigateUp,
    navigateDown,
    navigateLeft,
    navigateRight,
    confirmSelection,
    goBack
  };
};

export default useTVNavigation;
