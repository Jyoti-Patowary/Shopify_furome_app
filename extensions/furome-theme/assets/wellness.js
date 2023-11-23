
const urlParams = new URLSearchParams(window.location.search);
const reportID = urlParams.get('report_id');

if (reportID) {
  console.log('Report ID:', reportID);

  fetchMetabolites(reportID);
} else {
  console.log('No report ID found in the URL.');
}

async function fetchMetabolites(reportID) {
  try {
    const reportQuery = query(collection(db, 'report'), where('report_id', '==', reportID));
    const reportSnapshot = await getDocs(reportQuery);

    if (!reportSnapshot.empty) {
      reportSnapshot.forEach((reportDoc) => {
        const reportData = reportDoc.data();
        console.log('Report found:', reportDoc.id, reportData);

        const metabolitesRef = collection(reportDoc.ref, 'metabolites');
        getDocs(metabolitesRef).then((metabolitesSnapshot) => {
          if (!metabolitesSnapshot.empty) {
            displayMetabolitesTable(metabolitesSnapshot); 
            enableSearch(); 
          } else {
            console.log('No metabolites found for this report.');
          }
        }).catch((error) => {
          console.error('Error fetching metabolites:', error);
        });
      });
    } else {
      console.log('No report with provided ID found.');
    }
  } catch (error) {
    console.error('Error fetching report:', error);
  }
}

function displayMetabolitesTable(metabolitesSnapshot) {
  const tableBody = document.querySelector('.table tbody');

  metabolitesSnapshot.forEach((metaboliteDoc) => {
    const metaboliteData = metaboliteDoc.data();

 
    const row = document.createElement('tr');

  
    row.innerHTML = `
      <td>${metaboliteData.name}</td>
      <td>${metaboliteData.category}</td>
      <td>${metaboliteData.score || "N/A"}</td>
    `;

  
    tableBody.appendChild(row);
  });
}

function enableSearch() {
  const searchInput = document.getElementById('search-input');
  const tableRows = document.querySelectorAll('.table tbody tr');

  searchInput.addEventListener('input', function () {
    const searchText = this.value.toLowerCase();

    tableRows.forEach((row) => {
      const text = row.textContent.toLowerCase();
      if (text.includes(searchText)) {
        row.style.display = ''; 
      } else {
        row.style.display = 'none';
      }
    });
  });
}
