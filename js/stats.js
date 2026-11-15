function getStats() {
    const stats = {
        total: 0,
        status: { complete: 0, incomplete: 0 },
        category: {
            work: 0,
            personal: 0,
            study: 0,
        },
        priority: {
            low: 0,
            medium: 0,
            high: 0,
        }
    }

    taskList.forEach(t => {
        stats.total++;
        if (t.isCompleted) {
            stats.status.complete++;
        } else {
            stats.status.incomplete++;
        }

        stats['category'][t.category]++;
        stats['priority'][t.priority]++;
    })
    return stats;
}

function renderStats() {
    const stats = getStats();

    const statsElement = {
        "stats.all": {selector: [".stat-total > dd", ".cat-total > .badge", "#task-quantity"], value: stats.total},
        "stats.active": {selector: ".stat-active > dd", value: stats.status.incomplete},
        "stats.done": {selector: ".stat-done > dd", value: stats.status.complete},
        "stats.high": {selector: ".stat-high > dd", value: stats.priority.high},
        "category.work": {selector: ".cat-work > .badge", value: stats.category.work},
        "category.personal": {selector: ".cat-personal > .badge", value: stats.category.personal},
        "category.study": {selector: ".cat-study > .badge", value: stats.category.study}
    };

    function findElementAndApplyRender(selector, value) {
        const el = document.querySelector(selector);
        el.textContent = value;
    }

    Object.values(statsElement).forEach(({ selector, value }) => {
        if (Array.isArray(selector)) {
            selector.forEach(s => {
                if (s === '#task-quantity') {
                    const specialCaseValue = value > 1 ? `${value} tasks` : `${value} task`;
                    findElementAndApplyRender(s, specialCaseValue);
                    return;
                }

                findElementAndApplyRender(s, value);
            })
        }

        findElementAndApplyRender(selector, value);
    })
};
