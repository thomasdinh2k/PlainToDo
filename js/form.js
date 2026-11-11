const form = document.getElementById('add-form');

export function bindForm({ onAddTask }) {
    if (canAutoFocus) form.elements.title.focus();

    form.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(form);

        try {
            onAddTask(Object.fromEntries(formData));
            form.reset();
            // Refocus on input after form reset (non-mobile only);
            if (canAutoFocus) form.elements.title.focus();
            else form.elements.title.blur();
        } catch (e) {
            console.error('Error while submitting form', e);
        }
    })
}

// Only auto-focus on device with precise pointer
const canAutoFocus = window.matchMedia('(hover: hover) and (pointer:fine)').matches;
