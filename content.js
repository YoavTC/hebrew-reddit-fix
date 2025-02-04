// Regex to detect Hebrew characters
const hebrewRegex = /[\u0590-\u05FF]/;

document.querySelectorAll('p, h1, h2, h3').forEach(v => {
    if (hebrewRegex.test(v.textContent)) {
        v.style.direction = 'rtl';
    }
});
