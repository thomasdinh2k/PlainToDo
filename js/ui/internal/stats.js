export function renderStat(statEls, stats) {
    Object.keys(stats).forEach(statKey => {
        statEls[statKey].textContent = stats[statKey]
    })
}
