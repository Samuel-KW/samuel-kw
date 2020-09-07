let timeline = gsap.timeline(), 
    chars = document.querySelectorAll('.header-animation > div > div'); 


timeline.from(chars, { duration: 0.5, opacity: 0, scale: 0, y: 80, rotationX: 180, transformOrigin: '0% 50% -50',  ease: 'back', stagger: 0.1 });

