// Tabler Icons (https://tabler.io/icons) — MIT license.
// Every icon draws in `currentColor`, so set the CSS `color` on the icon
// or on its parent to change its colour.

const ICON_OUTLINE_ATTRS =
    'class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

const ICON_FILLED_ATTRS =
    'class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"';

const ICONS = {
    // Tabler: checklist (logo)
    checklist: `<svg ${ICON_OUTLINE_ATTRS}>
        <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
        <path d="M14 19l2 2l4 -4" />
        <path d="M9 8h4" />
        <path d="M9 12h2" />
    </svg>`,

    // Tabler: clock
    clock: `<svg ${ICON_OUTLINE_ATTRS}>
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        <path d="M12 7v5l3 3" />
    </svg>`,

    // Tabler: clipboard-check (empty state)
    clipboard: `<svg ${ICON_OUTLINE_ATTRS}>
        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
        <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
        <path d="M9 14l2 2l4 -4" />
    </svg>`,

    // Tabler: plus
    plus: `<svg ${ICON_OUTLINE_ATTRS}>
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
    </svg>`,

    // Tabler: trash
    trash: `<svg ${ICON_OUTLINE_ATTRS}>
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>`,

    // Tabler: circle (task not done)
    circle: `<svg ${ICON_OUTLINE_ATTRS}>
        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    </svg>`,

    // Tabler: circle-check-filled (done task). The tick is a hole cut out of
    // the circle, so whatever is behind the icon shows through it.
    circleCheck: `<svg ${ICON_FILLED_ATTRS}>
        <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
    </svg>`,
};

export function renderIcons(root = document) {
    root.querySelectorAll('[data-icon]').forEach((el) => {
        const svg = ICONS[el.dataset.icon];

        if (!svg) {
            console.warn(`Unknown icon "${el.dataset.icon}"`);
            return;
        }

        el.innerHTML = svg;
    });
}

renderIcons();
