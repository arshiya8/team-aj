// // ScrollAnimation.js

// observer for landing page 
const firstPageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('enter-flip');
      }
    });
  }
);

// Observer for the profile page
const secondPageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('pf');
      }
    });
  }
);

export default {
  mounted(el, { value }) {
    if (value === 'first-page') {
      el.classList.add('before-enter-flip');
      firstPageObserver.observe(el);
    } else if (value === 'second-page') {
      el.classList.add('before-pf');
      secondPageObserver.observe(el);
    }
  }
};