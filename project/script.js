// 🧠 STATE
let state = {
  notes: [],
  search: ''
};

// 🔍 DOM SELECTION
const input = document.querySelector('#noteInput');
const addBtn = document.querySelector('#addBtn');
const searchInput = document.querySelector('#searchInput');
const list = document.querySelector('#notesList');


const savedNotes = localStorage.getItem('notes');
if (savedNotes) {
  state.notes = JSON.parse(savedNotes);
}


function render() {
  list.innerHTML = '';

  const filtered = state.notes.filter(note =>
    note.toLowerCase().includes(state.search.toLowerCase())
  );

  filtered.forEach((note, index) => {
    const li = document.createElement('li');
    li.textContent = note;

    // ❌ DELETE ON CLICK
    li.addEventListener('click', () => {
      state.notes.splice(index, 1);
      saveAndRender();
    });

    list.appendChild(li);
  });
}


function saveAndRender() {
  localStorage.setItem('notes', JSON.stringify(state.notes));
  render();
}


addBtn.addEventListener('click', () => {
  const value = input.value.trim();

  if (value === '') return;

  state.notes.push(value);
  input.value = '';

  saveAndRender();
});


searchInput.addEventListener('input', (e) => {
  state.search = e.target.value;
  render();
});


render();