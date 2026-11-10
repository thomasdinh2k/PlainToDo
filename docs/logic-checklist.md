# Logic checklist

Everything needed to make the app fully work, in a sensible build order.
Tick items off as you go. The OOP refactor comes after this, so the last section lists
habits that will make that refactor easy.

Legend: **[decide]** = a choice you should make (and be able to defend) before coding that part.

---

## 0. Decisions to make first

- [ ] **[decide]** First visit (nothing in localStorage): start with an empty list, or seed it with `initialTaskList`?
  - Tip: tell "first visit" apart from "user deleted every task". `getItem` returns `null` for the first one and `"[]"` for the second. Only seed on `null`.
- [ ] **[decide]** Do the 4 stat cards show numbers for **all** tasks, or only for the **selected category**?
- [ ] **[decide]** Do the sidebar badges count done tasks too? (Screenshot: Work = 2 with one of them done, so **yes**.)
- [ ] **[decide]** "High" stat = active high tasks only? (Screenshot: 2 high tasks, 1 done, card says 1, so **yes**. Your `getStat()` already does this.)
- [ ] **[decide]** Sort order of the list. (Screenshot: newest `createdAt` first.)
- [ ] **[decide]** Should the selected category filter survive a refresh? (README only requires the *tasks* to survive.)
- [ ] **[decide]** When the "Work" filter is on and the user adds a "Personal" task, what happens? (Task is hidden / switch to "All" / switch to "Personal".)
- [ ] **[decide]** Should the form's category dropdown follow the selected sidebar category?
- [ ] **[decide]** Max title length? (Pick one, e.g. 200, and enforce it in both the `<input maxlength>` and `addTask`.)

---

## 1. Fix gaps in the current core (`js/index.js`)

- [x] `addTask`, `toggleTask`, `deleteTask`, `resetTaskList` change the list but **never save**. Every change must 
  be saved.
  - Pick one place for this so you can't forget it (e.g. one `commit()` / `setTasks()` function that updates the list, saves, then renders).
- [x] `addTask` crashes if `title` is not a string (`title.trim` on `undefined`). Guard it.
- [x] `deleteTask`: the `[...masterTaskList]` copy is not needed; `filter` already returns a new array. You also 
  don't need the index, you can filter by `id`.
- [x] `getTaskListFromStorage` throws on bad JSON, which stops the whole app at startup. Decide: catch it, log it, 
  and fall back (empty list or seed) instead.
- [ ] Check each loaded task has the right shape (string `id`, non-empty `title`, valid `category`/`priority`, boolean `isCompleted`, number `createdAt`). Drop bad ones. localStorage can be edited by hand in DevTools.
- [x] `writeToStorage`: `setItem` can throw (storage full, some private modes). Wrap it in `try/catch` so the UI 
  does not die.
- [x] Put the storage key in one constant (e.g. `STORAGE_KEY = 'plaintodo.tasks'`) instead of typing `'tasks'` in 
  many places. A prefixed key also avoids clashing with other apps on the same origin (e.g. `localhost`).
- [x] Freeze the constant lists (`Object.freeze(CATEGORIES)`) so nothing can change them by accident.
- [x] Remove the leftover `taskObj` example and the `'STS Angular Assessment 1'` log before handing in (or turn 
  `taskObj` into a JSDoc `@typedef`).

---

## 2. State and render flow (the backbone)

- [x] Keep all app state in one place: the task list + the selected category (`'all'` by default).
- [x] Data only flows one way: **user action -> change state -> save -> render**. Never change the DOM directly in 
  an event handler (except focus).
- [ ] One `render()` that redraws everything from state: sidebar badges, active category, stats, task count text, task list.
  - Fine to start with "redraw all". Only optimise if it feels slow (it won't with 50 tasks).
- [ ] Never trust the DOM as the source of truth. Read from state, not from classes or text in the page.

---

## 3. Startup

- [ ] Load tasks from storage (with the fallback from section 1).
- [ ] Apply the first-visit rule from section 0.
- [ ] Read saved filter (if you chose to keep it).
- [ ] Call `render()` once.
- [ ] Start the clock (section 4).
- [ ] Attach event listeners once (sections 5, 7, 9, 10). Not inside `render()`, or you get duplicate listeners.
- [ ] Delete the hard-coded sample tasks, badge numbers, stat numbers, date and time from `index.html`. Leave empty containers for JS to fill.

---

## 4. Header: date and live clock

- [ ] Day name ("Sunday"), full date ("November 8, 2026"), time with seconds ("7:25:10 PM").
- [ ] Use `toLocaleDateString` / `toLocaleTimeString` (or `Intl.DateTimeFormat`) with options, not hand-built strings. Pass `'en-US'` so it matches the screenshot on any machine.
  - Create the formatter once and reuse it; don't rebuild it every second.
- [ ] Update every second with `setInterval`.
- [ ] Update the day/date in the same tick, so it changes correctly at midnight.
- [ ] Run the update once straight away at startup, so the page doesn't show an empty clock for 1 second.
- [ ] Wrap the time in a `<time datetime="...">` element (nice semantic touch).
- [ ] Don't add `aria-live` to the clock. A screen reader would read it out every second.

---

## 5. Sidebar categories (filter + counts)

- [ ] Badge counts: All = total, Work/Personal/Study = count per category (includes done tasks, see section 0).
- [ ] Clicking a category sets the selected category in state, then `render()`.
- [ ] Highlight the selected item (class + `aria-current="true"` or `aria-pressed`).
- [ ] The items are `<div>`s now. Make them `<button>`s so keyboard users can Tab to them and press Enter/Space. (Also fixes part of your "keyboard tabbing" UI item.)
- [ ] Use one click listener on the parent (event delegation) and read the category from a `data-category` attribute, not from the class name.
- [ ] Save the filter if you chose to (section 0).

---

## 6. Stats cards

- [ ] Total, Active, Done, High from `getStat()`.
- [ ] Follow your section 0 choice (all tasks vs selected category).
- [ ] Check: Active + Done = Total, always.

---

## 7. Add task form

- [ ] Listen to the form's `submit` event (not the button's `click`), so the Enter key works for free.
- [ ] `event.preventDefault()` so the page doesn't reload.
- [ ] Read values with `new FormData(form)` (or the elements by `name`).
- [ ] Empty / spaces-only title: do **not** add. Show a message to the user instead of throwing an uncaught error.
  - Set `aria-invalid="true"` on the input and link the message with `aria-describedby`.
  - Clear the error when the user starts typing again.
- [ ] `addTask` still throws on bad input (that's fine, it guards the core). The form handler catches it and shows the message.
- [ ] After a successful add: clear the title, keep focus in the title input so the user can type the next one.
- [ ] **[decide]** Keep or reset the category/priority dropdowns after adding.
- [ ] Apply the section 0 rule for "added task is hidden by the current filter".
- [ ] The text input and both selects have no visible or hidden label text. Add `aria-label` or visually-hidden label text (a11y; your manager may check this).

---

## 8. Render the task list

- [ ] Show the tasks for the selected category, sorted by your section 0 rule.
- [ ] "N tasks" text: handle "0 tasks", "1 task", "2 tasks" (singular vs plural).
- [ ] Empty state: when the list is empty show a short message (e.g. "No tasks yet" / "No Work tasks").
- [ ] Build each task from data. Set the title with **`textContent`, never `innerHTML`**. A title like `<img src=x onerror=alert(1)>` must show as plain text.
  - Good options: `<template>` + `cloneNode(true)`, or `document.createElement`.
- [ ] Each task gets: `data-id`, category class (left border colour), `done` class when completed.
- [ ] Priority badge and category badge text ("High", "Work"). Use a small lookup map for labels instead of capitalising strings by hand.
- [ ] "Added Sun, Nov 8, 2026, 6:39 PM" from `createdAt`, using a date formatter (again: create once, reuse).
- [ ] Icons: `icons.js` only fills `[data-icon]` once at page load. After you render new tasks, call `renderIcons(listElement)` so the new icons appear.
- [ ] Consider building into a `DocumentFragment` and appending once, instead of appending tasks one by one.
- [ ] Use a list element (`<ul>` / `<li>`) for the tasks instead of `<div>`s (semantic HTML is in the README rules).

---

## 9. Toggle done

- [ ] One click listener on the task list (event delegation). Use `event.target.closest('.checkbox')` then `closest('[data-id]')` to get the id.
- [ ] Call `toggleTask(id)` -> save -> render.
- [ ] Update `aria-pressed` to match `isCompleted`.
- [x] Keep the `aria-label` the same in both states ("Done: “title”"). With `aria-pressed`, the screen reader already says "pressed" / "not pressed", so a changing label would say the state twice.
- [ ] Swap icon `circle` <-> `circleCheck`.
- [ ] Keep keyboard focus on the same checkbox after re-render (re-render replaces the element, so focus is lost). Find the new button by `data-id` and call `.focus()`.

---

## 10. Delete

- [ ] Same delegated listener: `closest('.btn-delete')`.
- [ ] Call `deleteTask(id)` -> save -> render.
- [ ] Focus after delete: move focus to the next task's delete button, or the previous one, or the title input if the list is now empty. Otherwise keyboard users get thrown back to the top of the page.
- [ ] **[decide]** Ask for confirmation or not? (The screenshot has none. An "Undo" is nicer than `confirm()` but is extra work.)

---

## 11. Extra (only if time allows)

- [ ] Sync between two open tabs with the `storage` event (`window.addEventListener('storage', ...)`).
- [ ] A dev-only way to load `mock/tasks.js` (50 tasks) to test a long list. Don't ship it switched on.
- [ ] Keyboard shortcut to focus the title input (e.g. `/`).

---

## 12. Manual test list (run before you call it done)

- [ ] Fresh browser (clear localStorage): first-visit rule works.
- [ ] Add, toggle, delete, then **refresh**: everything is still the same.
- [ ] Delete every task, refresh: list stays empty (not re-seeded).
- [ ] Put broken JSON in localStorage by hand, refresh: app still opens.
- [ ] Put a task with `category: "xyz"` in localStorage by hand, refresh: it's dropped or handled, no crash.
- [ ] Title with only spaces: not added, message shown.
- [ ] Title `<b>hi</b>` and `<img src=x onerror=alert(1)>`: shows as plain text, no alert.
- [ ] Very long title with spaces, and one very long word with no spaces: wraps, layout doesn't break.
- [ ] Each filter: list, "N tasks" text and badges are correct. 0 / 1 / many tasks text is correct.
- [ ] Stats: Active + Done = Total. High ignores done tasks.
- [ ] Clock ticks every second; leave it a minute and compare with system time.
- [ ] Whole app with **keyboard only**: Tab to every control, Enter/Space works, focus never disappears after toggle/delete.
- [ ] No errors in the DevTools console at any point.
- [ ] Load `mock/tasks.js` (50 tasks): still fast, still looks right.

---

## 13. Habits that make the OOP refactor easy later

- [ ] Keep 3 groups of functions apart, even now in one file:
  1. **Data** (tasks list, add/toggle/delete/filter/stats) — no `document`, no `localStorage`.
  2. **Storage** (read/write/validate) — no `document`.
  3. **UI** (render, event handlers, clock) — the only part that touches `document`.
- [ ] Data functions take input and return output; they don't reach into the DOM. If a data function needs a DOM element, that's a sign it's in the wrong group.
- [ ] UI only talks to data through a few functions (add, toggle, delete, getVisibleTasks, getStat, getCounts). These become your class's public methods later.
- [ ] This also answers your open questions in `docs/oop.md`:
  - Q1 (how tasks get from Storage into the task class): the startup code reads from Storage and passes the list into the task class (or the task class is given a storage object and calls it). Neither needs to "know" the other's insides.
  - Q2 (separate filtering/stats?): think about it once the logic works. If the stats code grows, it's a good sign it wants its own place.
