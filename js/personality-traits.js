function setTraitValue(traitIndex, value) {
    // value should be between -1 (full left) and 1 (full right)
    const fills = document.querySelectorAll('.trait-fill');
    const fill = fills[traitIndex];
    const width = Math.abs(value) * 50; // 0% to 50% of total width
    
    // Calculate the middle color
    const leftColor = '#8490ff';
    const rightColor = '#62bdfc';
    const middleColor = calculateMiddleColor(leftColor, rightColor);
    
    fill.style.width = `${width}%`;
    
    if (value < 0) {
        fill.style.right = '50%';
        fill.style.left = 'auto';
        fill.style.backgroundImage = `linear-gradient(to left, ${middleColor}, ${leftColor})`;
    } else {
        fill.style.left = '50%';
        fill.style.right = 'auto';
        fill.style.backgroundImage = `linear-gradient(to right, ${middleColor}, ${rightColor})`;
    }
}

function calculateMiddleColor(color1, color2) {
    const hex = color => parseInt(color.slice(1), 16);
    const r1 = hex(color1) >> 16;
    const g1 = (hex(color1) >> 8) & 0xff;
    const b1 = hex(color1) & 0xff;
    const r2 = hex(color2) >> 16;
    const g2 = (hex(color2) >> 8) & 0xff;
    const b2 = hex(color2) & 0xff;
    const r = Math.round((r1 + r2) / 2).toString(16).padStart(2, '0');
    const g = Math.round((g1 + g2) / 2).toString(16).padStart(2, '0');
    const b = Math.round((b1 + b2) / 2).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}

// Set the trait value when the page loads
document.addEventListener('DOMContentLoaded', function() {
    setTraitValue(0, 0.2);  // Extrovert vs Introvert
    setTraitValue(1, -0.4);   // Practical vs Creative
    setTraitValue(2, 0.1);   // Independent vs Collaborative
    setTraitValue(3, -0.5);  // Analytical vs Emotional
    setTraitValue(4, -0.3);   // Sensitive vs Tough
    setTraitValue(5, 0.4);   // Feeling vs Thinking
});