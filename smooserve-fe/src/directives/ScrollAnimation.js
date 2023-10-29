// ScrollAnimation.js
const animatedScrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('enter-flip');
        }
      });
    }
  );
  
  export default {
    mounted(el) {
      el.classList.add('before-enter-flip');
      animatedScrollObserver.observe(el);
    }
  };
  