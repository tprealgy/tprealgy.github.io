const dataUrl = '/data.json';
const assignmentsUrl = '/assignments.json';
const saveAssignmentUrl = '/save-assignment';
const deleteAssignmentUrl = '/delete-assignment';
const saveAssignmentsUrl = '/save-assignments';

let data = [];
let assignments = [];

async function fetchData() {
  const res = await fetch(dataUrl);
  data = await res.json();
}

async function fetchAssignments() {
  const res = await fetch(assignmentsUrl);
  assignments = await res.json();
}

function renderTable() {
  const table = document.getElementById('data-table');
  table.innerHTML = '';

  // HEADER row
  const headerRow = document.createElement('tr');
  ['E', 'C', 'A'].forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    headerRow.appendChild(th);
  });

  // Extra headers for Lock and Delete buttons
  const lockTh = document.createElement('th');
  lockTh.textContent = 'Lock';
  headerRow.appendChild(lockTh);

  const delTh = document.createElement('th');
  delTh.textContent = 'Delete';
  headerRow.appendChild(delTh);

  table.appendChild(headerRow);

  // DATA rows from data.json
  data.forEach(rowData => {
    const tr = document.createElement('tr');
    rowData.forEach(cellData => {
      const td = document.createElement('td');
      td.textContent = cellData;
      tr.appendChild(td);
    });

    // Add empty cells for Lock and Delete columns in data rows
    tr.appendChild(document.createElement('td'));
    tr.appendChild(document.createElement('td'));

    table.appendChild(tr);
  });

  // ASSIGNMENT rows - one assignment per row
  assignments.forEach((assignment, index) => {
    const tr = document.createElement('tr');

    // For each column E, C, A - display assignment name in the cell
    ['E', 'C', 'A'].forEach(col => {
      const td = document.createElement('td');
      td.textContent = assignment.name;

      // Background color for the cell, default grey
      const color = assignment.cellColors?.[col] || 'grey';
      td.style.backgroundColor = color;

      // Add color selector if not locked
      if (!assignment.locked) {
        const select = document.createElement('select');
        ['grey', 'green', 'yellow', 'red'].forEach(colorOption => {
          const option = document.createElement('option');
          option.value = colorOption;
          option.textContent = colorOption;
          if (colorOption === color) option.selected = true;
          select.appendChild(option);
        });

        select.addEventListener('change', () => {
          td.style.backgroundColor = select.value;
          assignment.cellColors = assignment.cellColors || {};
          assignment.cellColors[col] = select.value;
          saveAssignments();
        });

        td.appendChild(document.createElement('br'));
        td.appendChild(select);
      }

      tr.appendChild(td);
    });

    // LOCK button cell
    const lockTd = document.createElement('td');
    const lockButton = document.createElement('button');
    lockButton.textContent = assignment.locked ? 'Unlock' : 'Lock';
    lockButton.addEventListener('click', () => {
      assignment.locked = !assignment.locked;
      saveAssignments();
      renderTable();
    });
    lockTd.appendChild(lockButton);
    tr.appendChild(lockTd);

    // DELETE button cell
    const deleteTd = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', async () => {
      if (confirm(`Delete assignment "${assignment.name}"?`)) {
        await fetch(deleteAssignmentUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ index }),
        });
        await loadAll();
      }
    });
    deleteTd.appendChild(deleteButton);
    tr.appendChild(deleteTd);

    table.appendChild(tr);
  });
}

async function saveAssignments() {
  await fetch(saveAssignmentsUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assignments),
  });
}

async function addAssignment(event) {
  event.preventDefault();

  const nameInput = document.getElementById('assignment-name');
  const name = nameInput.value.trim();
  if (!name) {
    alert('Please enter an assignment name');
    return;
  }

  // Get selected connected values from multiselect
  const connectedSelect = document.getElementById('connected-values');
  const selectedOptions = Array.from(connectedSelect.selectedOptions);
  if (selectedOptions.length === 0) {
    alert('Please select at least one connected value');
    return;
  }
  const connectedValues = selectedOptions.map(opt => opt.value);

  // Send to server
  const res = await fetch(saveAssignmentUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, connectedValues }),
  });

  if (res.ok) {
    nameInput.value = '';
    connectedSelect.selectedIndex = -1;
    await loadAll();
  } else {
    const data = await res.json();
    alert(data.error || 'Failed to add assignment');
  }
}

function populateConnectedValuesSelect() {
  const select = document.getElementById('connected-values');
  select.innerHTML = '';

  // Flatten all values from data rows, unique
  const uniqueValues = new Set();
  data.forEach(row => {
    row.forEach(cell => uniqueValues.add(cell));
  });

  [...uniqueValues].forEach(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  });
}

async function loadAll() {
  await fetchData();
  await fetchAssignments();
  populateConnectedValuesSelect();
  renderTable();
}

document.getElementById('add-assignment-form').addEventListener('submit', addAssignment);

loadAll();
