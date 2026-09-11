(() => {
 const hero = document.querySelector('.hero');
 const toggle = document.querySelector('.motion-toggle');
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const pointer = matchMedia('(hover: hover) and (pointer: fine)');
 const plane = document.querySelector('.scroll-plane');
 let flightFrame = 0;
 let paused = false;
 function drawFlight() {
   flightFrame = 0;
   if (paused || document.hidden) return;
   const rect = hero.getBoundingClientRect();
   const mobile = rect.width <= 700;
   const progress = reduced.matches ? 0 : Math.min(1, Math.max(0, -rect.top / (rect.height * .8)));
   // A curved, reversible flight through the open right side of the hero.
   const x = rect.width * (mobile ? .12 : .39) * Math.sin(progress * Math.PI / 2);
   const y = rect.height * (mobile ? .34 : .64) * progress;
   const bank = 12 * Math.sin(progress * Math.PI) + 40 * progress;
   const scale = 1 - progress * .28;
   plane.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) rotate(${bank}deg) scale(${scale})`;
   plane.style.opacity = String(1 - Math.max(0, (progress - .78) / .22));
 }
 function requestFlight() {
   if (!flightFrame) flightFrame = requestAnimationFrame(drawFlight);
 }
 window.addEventListener('scroll', requestFlight, { passive: true });
 window.addEventListener('resize', requestFlight, { passive: true });
 let visible = true;
 function update() {
   requestFlight();
   hero.classList.toggle('motion-paused', paused || !visible || document.hidden || reduced.matches);
   toggle.setAttribute('aria-pressed', String(paused));
   toggle.setAttribute('aria-label', paused ? 'Resume background motion' : 'Pause background motion');
   toggle.innerHTML = paused ? '▷ <span>Resume motion</span>' : 'Ⅱ <span>Pause motion</span>';
 }
 toggle.addEventListener('click', () => { paused = !paused; update(); });
 hero.addEventListener('pointermove', event => {
   if (paused || reduced.matches || !pointer.matches) return;
   const rect = hero.getBoundingClientRect();
   hero.style.setProperty('--scene-x', `${((event.clientX - rect.left) / rect.width - .5) * 14}px`);
   hero.style.setProperty('--scene-y', `${((event.clientY - rect.top) / rect.height - .5) * 10}px`);
 });
 hero.addEventListener('pointerleave', () => {
   hero.style.setProperty('--scene-x', '0px');
   hero.style.setProperty('--scene-y', '0px');
 });
 new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }).observe(hero);
 document.addEventListener('visibilitychange', update);
 reduced.addEventListener('change', update);
 update();
})();
