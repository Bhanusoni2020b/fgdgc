document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('guideModal');
    const closeBtn = document.getElementById('closeGuide');
    const readButtons = document.querySelectorAll('.read-guide');
    const tocLinks = document.querySelectorAll('.toc-list a');

    // Open guide modal
    readButtons.forEach(button => {
        button.addEventListener('click', function() {
            const guideCard = this.closest('.guide-card');
            const title = guideCard.querySelector('h3').textContent;
            const difficulty = guideCard.querySelector('.difficulty').textContent;
            
            // Update modal content
            modal.querySelector('.modal-title h2').textContent = title;
            modal.querySelector('.guide-badges .difficulty').textContent = difficulty;
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Table of Contents navigation
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            tocLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll spy for TOC
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                tocLinks.forEach(link => {
                    link.parentElement.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.parentElement.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.guide-content section').forEach(section => {
        observer.observe(section);
    });
}); 