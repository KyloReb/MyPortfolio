export const useScrollToSection = () => {
    const scrollToSection = (sectionId) => {
      document.getElementById(sectionId)?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    };
  
    return scrollToSection;
  };