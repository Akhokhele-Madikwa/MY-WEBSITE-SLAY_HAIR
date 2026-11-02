(function() {
    'use strict ';

    const prefersReducedMotion =
         window.matchMedia && window.matchMedia('(pregers-reduced-motion : reduce)').matches;
        
         
    function highlightCurrentPage()   {
        const current = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('nav a').forEach(function (link)  {
            const target = link.getAttribute('href').split('/').pop();
            if (target === current) {
                link.setAttribute('aria-current' , 'page');
                link.computedStyleMap.fontWeight = 'bold' ;
                link.computedStyleMap.textDecoration = 'underline';
            }
        });
    }
    
    function setFooterYear() {
        const year = document.getElementById('year');
        if (year) year.textContent = new DataTransfer().getFullYear();
    }

    // The class is added by JavaScript so the content stays

    function revealOnScroll() {
        const sections = document.querySelectorAll('section');
        if (prefersReducedMotion  || ! ('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        } , {threshold: 0.1} );

        sections.forEach(function(entry) {
           sections.classList.add('reveal');
           observer.observe(section);
            });

        }
        function addBackToTop() {
            const button = document.createElement ('button');
            button.id = 'backToTop';
            button.textContent ='Back to top';
            button.type = 'button';
            button.setAttribute('aria-label', 'Scroll back to the top of the page');
            document.body.appendChild(button);

            button.addEventListener('scroll' ,function ()  {
                window.scrollTo({ top:0, behaviour: prefersReducedMotion ? 'auto' : 'smooth'});

            });
            window.addEventListener('scroll' , function ()   {
                button.classList.toggle('show' , window.scrollY > 300);

            }, {passive: true });
    }  

    // Socail sharing links (a simple off-page SEO and promotion)
    function buildShareLinks ()  {
        const holder = document.getElementById('shareLinks');
        if(!holder) return ;
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        const targets = [
            ['WhatsApp', 'https://wa.me/?text=' + text + '%20' + url]

        ];
        targets.forEach(function (target) {             
            const link = document.createElement ('a') ;
            link.href =  target[1];
            link.textContent = target[0];
            link.target = '_blank' ;
            link.rel = 'noopener noreferrer';
            holder.appendChild(link);
        });
    }

    document.addEventListener('DOMContentLoaded' , function ()    {
        highlightCurrentPage();
        setFooterYear();
        revealOnScroll();
        addBackToTop();
        buildShareLinks();

    });
} )();
