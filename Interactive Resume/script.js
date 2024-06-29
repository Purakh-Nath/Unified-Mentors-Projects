
// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Pop-up details with a more modern approach using tooltips
    document.querySelectorAll('.education-item, .experience-item, .project-item').forEach(item => {
        item.addEventListener('click', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.innerText = 'More details about ' + item.querySelector('h3').innerText;
            document.body.appendChild(tooltip);

            const rect = item.getBoundingClientRect();
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;

            setTimeout(() => {
                tooltip.remove();
            }, 3000);
        });
    });

    // Example animation (animate name on load)
    const nameElement = document.querySelector('header h1');
    nameElement.style.opacity = 0;
    setTimeout(() => {
        nameElement.style.transition = 'opacity 1s';
        nameElement.style.opacity = 1;
    }, 500);
});
