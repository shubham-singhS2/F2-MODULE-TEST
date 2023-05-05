let students=[];

async function loadData() {
    let url="https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";
  try {
    const response = await fetch(url);
    const data = await response.json();
    students = data;
    handleSearch(); // Automatically perform initial search and display results
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

loadData();

function generateTable(data) {
    const table = document.createElement('table');
  
    const tableHeader = table.createTHead();
    const headerRow = tableHeader.insertRow();
  
    const idHeader = document.createElement('th');
    idHeader.innerHTML = 'Id';
    headerRow.appendChild(idHeader);

    const nameHeader = document.createElement('th');
    nameHeader.innerHTML = 'Name';
    headerRow.appendChild(nameHeader);

    const genderHeader = document.createElement('th');
    genderHeader.innerHTML = 'Gender';
    headerRow.appendChild(genderHeader);

    const classHeader = document.createElement('th');
    classHeader.innerHTML = 'Class';
    headerRow.appendChild(classHeader);

    const marksHeader = document.createElement('th');
    marksHeader.innerHTML = 'Marks';
    headerRow.appendChild(marksHeader);

    const passingHeader = document.createElement('th');
    passingHeader.innerHTML = 'Passing';
    headerRow.appendChild(passingHeader);
  
    const emailHeader = document.createElement('th');
    emailHeader.innerHTML = 'Email';
    headerRow.appendChild(emailHeader);
  
    

    
  
    
  
   
  
    const tableBody = table.createTBody();
  
    data.forEach((student) => {
      const row = tableBody.insertRow();
      
      const idCell = row.insertCell();
      idCell.innerHTML = student.id;

      const nameCell = row.insertCell();
      const fullName = `${student.first_name} ${student.last_name}`;
      nameCell.innerHTML = `<img src="${student.img_src}" alt="${fullName}" width="50" height="50"/> ${fullName}`;
  
      const genderCell = row.insertCell();
      genderCell.innerHTML = student.gender;

      const classCell = row.insertCell();
      classCell.innerHTML = student.class;
  
      const marksCell = row.insertCell();
      marksCell.innerHTML = student.marks;
  
      const passingCell = row.insertCell();
      passingCell.innerHTML = student.passing ? 'Passing' : 'Failed';
      
      const emailCell = row.insertCell();
      emailCell.innerHTML = student.email;
    
    });
  
    return table;
  }
  function filterData(data, searchTerm) {
    return data.filter((student) => {
      const fullName = `${student.first_name} ${student.last_name}`;
      return (
        fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }
  function sortData(data, sortOption) {
    switch (sortOption) {
      case 'ascName':
        return data.sort((a, b) => {
          const aName = `${a.first_name} ${a.last_name}`;
          const bName = `${b.first_name} ${b.last_name}`;
          return aName.localeCompare(bName);
        });
      case 'descName':
        return data.sort((a, b) => {
          const aName = `${a.first_name} ${a.last_name}`;
          const bName = `${b.first_name} ${b.last_name}`;
          return bName.localeCompare(aName);
        });
      case 'ascMarks':
        return data.sort((a, b) => a.marks - b.marks);
      case 'passing':
        return data.filter((student) => student.passing);
      case 'ascClass':
        return data.sort((a, b) => a.class - b.class);
      case 'gender':
      const femaleStudents = data.filter((student) => student.gender === 'Female');
      const maleStudents = data.filter((student) => student.gender === 'Male');
      const femaleStudentsTable = generateTable(femaleStudents);
      const maleStudentsTable = generateTable(maleStudents);
      
      return [femaleStudentsTable, maleStudentsTable];
      
      default:
        return data.sort((a, b) => a.id - b.id);;
    }
  }
  const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchInput.addEventListener('input', handleSearch);
searchButton.addEventListener('click', handleSearch);

function handleSearch() {
    const searchTerm = searchInput.value;
    const filteredData = filterData(students, searchTerm);
    const sortedData = sortData(filteredData, ''); // sort by id initially
    const table = generateTable(sortedData);
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
  }
const ascNameButton = document.getElementById('asc-name-button');
const descNameButton = document.getElementById('desc-name-button');
const ascMarksButton = document.getElementById('asc-marks-button');
const passingButton = document.getElementById('passing-button');
const ascClassButton = document.getElementById('asc-class-button');
const genderButton = document.getElementById('gender-button');

ascNameButton.addEventListener('click', handleSort);
descNameButton.addEventListener('click', handleSort);
ascMarksButton.addEventListener('click', handleSort);
passingButton.addEventListener('click', handleSort);
ascClassButton.addEventListener('click', handleSort);
genderButton.addEventListener('click', handleSort);

function handleSort(event) {
  const sortOption = event.target.dataset.sortOption;
  let sortedData;



  if (sortOption === 'gender') {
    const sortedTables = sortData(students, sortOption);
    const tableContainer = document.getElementById('table-container');
    tableContainer.innerHTML = '';
    sortedTables.forEach((table) => {
      tableContainer.appendChild(table);
    });
    return;
  }

  const searchTerm = searchInput.value;
  const filteredData = filterData(students, searchTerm);
  sortedData = sortData(filteredData, sortOption);

  const table = generateTable(sortedData);
  const tableContainer = document.getElementById('table-container');
  tableContainer.innerHTML = '';
  tableContainer.appendChild(table);
}
window.addEventListener('load', handleSearch);

  
  