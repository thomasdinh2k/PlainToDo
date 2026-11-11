export function renderCategoryCounts(badgeEls, counts) {
    Object.keys(counts).forEach(countKey => {
        badgeEls[countKey].textContent = counts[countKey];
    })
}
