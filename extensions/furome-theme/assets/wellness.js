
const urlParams = new URLSearchParams(window.location.search);
const reportID = urlParams.get('report_id');

if (reportID) {
  console.log('Report ID:', reportID);

  fetchMetabolites(reportID);
} else {
  console.log('No report ID found in the URL.');
}

async function fetchMetabolites(reportID) {
  const storeName = 'quickstart-b37ce774.myshopify.com';

  const baseUrl = `https://${storeName}/apps/express-proxy`

  function resolveUrl(path) {
    return `${baseUrl}${path}`;
  }

  try {
    let { data: metabolitesSnapshot = [] } = await (await fetch(resolveUrl(`/report/metabolites/${reportID}`), {
      headers: {
        "ngrok-skip-browser-warning": true,
        "Content-Type": "application/json"
      },
    }))?.json();


    displayMetabolitesTable(metabolitesSnapshot);
    enableSearch();

  } catch (error) {
    console.error('Error fetching report:', error);
  }
}

function displayMetabolitesTable(metabolitesSnapshot = []) {
  const tableBody = document.querySelector('.table tbody');

  console.log({ tableBody })
  metabolitesSnapshot.map((metaboliteData) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${metaboliteData.name}</td>
      <td>${metaboliteData.category}</td>
      <td>${metaboliteData.score || "N/A"}</td>
    `;

    tableBody?.appendChild(row);
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
