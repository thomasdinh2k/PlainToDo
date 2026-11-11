const form = document.getElementById('add-form');

export function bindForm({ onAddTask }) {
    form.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(form);

        try {
            onAddTask(Object.fromEntries(formData));
            form.reset();
            // Refocus on input after form reset
            form.elements.title.focus();
        } catch (e) {
            console.error('Error while submitting form', e);
        }
    })
}