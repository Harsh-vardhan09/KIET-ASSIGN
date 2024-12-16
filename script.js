/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
 
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const collegeList = document.getElementById('collegeList');

// search-engine set
const colleges = [
  'KIET Group Of Institution',
  'Sri Ram University',
  'ABES College',
  'G.L Bajaj',
  'A.K.G College',
];

// Load saved colleges from localStorage
document.addEventListener('DOMContentLoaded', loadSavedColleges);

// Event Listener for Input (to show recommendations dynamically)
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  searchResults.innerHTML = ''; // Clear previous results

  if (query) {
    const filteredColleges = colleges.filter((college) =>
      college.toLowerCase().includes(query)
    );

    filteredColleges.forEach((college) => {
      const li = document.createElement('li');
      li.textContent = college;
      li.classList.add('search-item');

      // Add to list on click
      li.addEventListener('click', () => {
        addToCollegeList(college);
        navigateToCollegePage(college); // Navigate to the college page
      });

      searchResults.appendChild(li);
    });

    if (filteredColleges.length === 0) {
      const noResults = document.createElement('p');
      noResults.textContent = 'No results found.';
      searchResults.appendChild(noResults);
    }
  }
});

// Add College to List
function addToCollegeList(college) {
  const existingColleges = Array.from(collegeList.children).map(
    (item) => item.textContent.split('↑')[0].trim()
  );
  if (existingColleges.includes(college)) return;

  const li = document.createElement('li');
  li.textContent = college;

  // Move Up Button
  const moveUpButton = document.createElement('button');
  moveUpButton.textContent = '↑';
  moveUpButton.classList.add('move-up');
  moveUpButton.addEventListener('click', () => moveItem(li, 'up'));

  // Move Down Button
  const moveDownButton = document.createElement('button');
  moveDownButton.textContent = '↓';
  moveDownButton.classList.add('move-down');
  moveDownButton.addEventListener('click', () => moveItem(li, 'down'));

  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete');
  deleteButton.addEventListener('click', () => {
    li.remove();
    saveColleges();
  });

  li.appendChild(moveUpButton);
  li.appendChild(moveDownButton);
  li.appendChild(deleteButton);

  // Prevent-propagation
  preventButtonClickPropagation(li);

  // next page on click on college
  li.addEventListener('click', () => {
    switch (college) {
      case 'KIET Group Of Institution':
        window.location.href = 'kiet.html';
        break;
      case 'ABES College':
        window.location.href = 'abes.html';
        break;
      case 'A.K.G College':
        window.location.href = 'akg.html';
        break;
      default:
        window.location.href = `details.html?college=${encodeURIComponent(college)}`;
    }
  });

  collegeList.appendChild(li);

  // Save local-Storage
  saveColleges();

  // Clear search results after adding
  searchResults.innerHTML = '';
  searchInput.value = '';
}

// Navigate to the associated page
function navigateToCollegePage(college) {
  switch (college) {
    case 'KIET Group Of Institution':
      window.location.href = 'kiet.html';
      break;
    case 'ABES College':
      window.location.href = 'abes.html';
      break;
    case 'A.K.G College':
      window.location.href = 'akg.html';
      break;
    default:
      window.location.href = `details.html?college=${encodeURIComponent(college)}`;
  }

  // Save the selected college to localStorage
  const savedColleges = JSON.parse(localStorage.getItem('selectedColleges')) || [];
  if (!savedColleges.includes(college)) {
    savedColleges.push(college);
    localStorage.setItem('selectedColleges', JSON.stringify(savedColleges));
  }
}

// Prevent event propagation for buttons inside a list item
function preventButtonClickPropagation(li) {
  const buttons = li.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });
}

// Move Item Up or Down
function moveItem(item, direction) {
  if (direction === 'up' && item.previousElementSibling) {
    collegeList.insertBefore(item, item.previousElementSibling);
  } else if (direction === 'down' && item.nextElementSibling) {
    collegeList.insertBefore(item.nextElementSibling, item);
  }
  saveColleges();
}

// local-storage
function saveColleges() {
  const colleges = Array.from(collegeList.children).map((item) =>
    item.textContent.split('↑')[0].trim()
  );
  localStorage.setItem('selectedColleges', JSON.stringify(colleges));
}

// call-local storage
function loadSavedColleges() {
  const savedColleges = JSON.parse(localStorage.getItem('selectedColleges')) || [];
  savedColleges.forEach((college) => addToCollegeList(college));
}
