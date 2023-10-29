const animatedScrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('enter');
        }
      });
    }
  );
  
  export default {
    mounted(el) {
      el.classList.add('before-enter');
      animatedScrollObserver.observe(el);
    }
  };