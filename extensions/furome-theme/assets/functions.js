// Shopify API Call

const apiKey = '856f6c386e8c2ad7e66cc0097748cf2a';
const password = 'ef7700fb26f4867d0f23737f549b93a1';
const storeName = 'quickstart-b37ce774.myshopify.com';
const apiVersion = '2023-10';

const graphqlUrl = `https://${storeName}/admin/api/${apiVersion}/graphql.json`;


// const productMutation = `
//   mutation CreateProduct($input: ProductInput!) {
//     productCreate(input: $input) {
//       product {
//         id
//         title
//         handle
//         status
//         variants(first: 10) {
//           edges {
//             node {
//               id
//               price
//               barcode
//               createdAt
//             }
//           }
//         }
//       }
//     }
//   }
// `;

// const productInput = {
//   title: 'Your Product Title',
//   variants: [{ price: 99.99 }],
// };

// fetch(graphqlUrl, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'X-Shopify-Access-Token': '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',
//   },
//   body: JSON.stringify({
//     query: productMutation,
//     variables: { input: productInput },
//   }),
// })
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error('Failed to create product');
//     }
//   })
//   .then(data => {
//     console.log('Product created:', data);
//   })
//   .catch(error => {
//     console.error('Error creating product:', error);
//   });





// Function to get the current app installation ID
// async function getGraphql() {
//   const query = `
//     {
//       currentAppInstallation {
//         id
//       }
//     }
//   `;

//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'X-Shopify-Access-Token': apiKey,
//     },
//     body: JSON.stringify({ query }),
//   };

//   try {
//     const response = await fetch(graphqlUrl, requestOptions);
//     const data = await response.text();

//     if (data.errors) {
//       console.error('Error:', data.errors);
//       return null;
//     }

//     return data.data.currentAppInstallation.id;
//   } catch (error) {
//     console.error('GraphQL request error:', error);
//     return null;
//   }
// }

async function getGraphql(query) {
  let options = {
    'mode': 'no-cors',
    'async': true,
    'crossDomain': true,
    'method': 'POST',
    'headers': {
      'X-Shopify-Access-Token': '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',
      'Content-type': 'application/graphql',
    },
    'body': query
  };
  let response = (await fetch(graphqlUrl, options)).json();
  return response;
}


// // Function to update app data and Firebase
async function updateAppDataAndFirebase(petName) {
  try {
    // Update app data as an app-data metafield

    const shopifyMutationVariables = {
      input: [
        {
          namespace: 'custom',
          key: 'pet_information',
          ownerId: `gid://shopify/Product/8546018361649`,
          type: 'json_string',
          value: JSON.stringify({
            name: petName,
            yob: '',
            picture: '',
            reports: [{ id: '', date: '', status: '' }, { id: '', date: '', status: '' }],
          }),
        },
      ],
    };

    // const shopifyGql = `
    // mutation MyMutation {
    //   metafieldsSet(
    //     metafields: {ownerId: "gid://shopify/Product/8546018361649", key: "pet_information", value: "
    //     ${JSON.stringify({
    //       name: petName,
    //       yob: '',
    //       picture: '',
    //       reports: [{ id: '', date: '', status: '' }, { id: '', date: '', status: '' }],
    //     })},", namespace: "custom"}
    //   ) {
    //     metafields {
    //       id
    //       createdAt
    //       key
    //       value
    //       namespace
    //       id
    //     }
    //   }
    // }
    // `;

    // let mutation = `
    // {
    //   "query":  ${shopifyGql},
    //   "variables": ${JSON.stringify(shopifyMutationVariables)}
    // }
    
    // `
    const shopifyGql = `
    mutation MyMutation($petName: String!) {
      metafieldsSet(
        metafields: {
          ownerId: "gid://shopify/Product/8546018361649",
          key: "pet_information",
          value: "${JSON.stringify({
            name: petName,
            yob: '',
            picture: '',
            reports: [{ id: '', date: '', status: '' }, { id: '', date: '', status: '' }],
          })}",
          namespace: "custom"
        }
      ) {
        metafields {
          id
          createdAt
          key
          value
          namespace
        }
      }
    }
  `;
  
 
  

    // Update app data as an app-data metafield
    const shopifyResult = await getGraphql(shopifyGql, { petName });
    console.log('Shopify Metafield Update Result:', shopifyResult);

    // Store the petName data in Firebase Firestore
    const docRef = await addDoc(collection(db, 'pets'), { petName });
    console.log('Pet Name Metafield Updated and Data Stored in Firebase!');
    console.log('Firebase Document Reference:', docRef.id);
  } catch (error) {
    console.error('Error updating app data or storing in Firebase:', error);
  }
}

// // Event listener for when the input value changes
document.getElementById('addPetOn').addEventListener('click', async function (event) {
  const petNameValue = event.target.value;

    updateAppDataAndFirebase(petNameValue);
});


// async function fetchProduct() {
//   try {
//     const productQuery = `
//          query {
//           mutation CreateMetafieldDefinition($definition: collection.metafields.custom.add_pet) {
//             metafieldDefinitionCreate(definition: $definition) {
//               createdDefinition {
//                 id
//                 name
//                 image
//               }
//               userErrors {
//                 field
//                 message
//                 code
//               }
//             }
//           }

//         //  products(first : 10) {
//         //        edges {
//         //            node {
//         //                id
//         //                title
//         //            }
//         //        }
//         //    }
//        }
//        `;





//     console.log("My Products", await getGraphql(productQuery))
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// fetchProduct();



// Shopify API Call Ends

// async function getUserDocById(userId) {
//     const docRef = doc(db, "users");
//     docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//     } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//     }
// }

// getUserDocById();

// Login Check session and firebase

async function fetchAndDisplayUserName() {
  const userDataString = sessionStorage.getItem('user');

  if (userDataString) {
    const userData = JSON.parse(userDataString);
    const userUid = userData.uid;

    try {
      const userRef = doc(db, 'users', userUid);
      const userDoc = await getDoc(userRef);

      console.log("userRef", userRef)
      if (userDoc.exists()) {
        const displayName = userDoc.data().first_name;

        console.log(displayName)
        const userNameElement = document.getElementById("userName");
        if (userNameElement) {
          userNameElement.textContent = displayName || "Guest";
        }
      } else {
        console.log("User data not found in the database.");
      }
    } catch (error) {
      console.error('Error fetching user data from the database:', error);
    }
  }
}
document.addEventListener('DOMContentLoaded', function () {
  fetchAndDisplayUserName();
});

//Login Check End


async function getUserDocById(reportId) {
  try {
    const docRef = doc(db, "report", reportId);
    const docSnap = await getDoc(docRef);

    console.log("doc", docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
  }
}

// getUserDocById("1tisgYFkniT24Y0IPuV3");

function getQueryParams() {
  var queryParams = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    queryParams[key] = value;
  }
  return queryParams;
}

//   Asynchronous function to fetch user document by ID
async function getUserDocById(userId) {
  try {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching user document:", error);
  }
}






// Display monthly reports New
async function displayMonthlyReports(report_id) {
  try {
    const reportsContainer = document.getElementById("all-report");
    reportsContainer.innerHTML = ''; // Clear existing content

    const search = document.getElementById("addReportSearch").value;

    if (!search) {
      console.log("Search input field is empty.");
      return;
    }

    const reportCollectionRef = collection(db, "report");

    const querySnapshot = await getDocs(reportCollectionRef);
    let index = 0;
    let reportFound = false;

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log("data", data)
      if (data.report_id === search) {
        reportFound = true;
        console.log("data", data.report_id)
        const reportDiv = document.createElement("div");
        const reportTitle = data.reportTitle || `Monthly Report ${index + 1}`;
        reportDiv.className = "m-report p-4";


        let summaryPage = '/pages/summary';
        if (data.species === 'dog') {
          summaryPage = '/pages/dog_summary';
        } else if (data.species === 'cat') {
          summaryPage = '/pages/cat_summary';
        }



        reportDiv.innerHTML += `
                    <h4>${reportTitle}</h4>
                    <br/>
                    <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
                    <p><strong>Age:</strong> ${data.age || 'N/A'}</p>
                    <p><strong>Date:</strong> ${data.date ? new Date(data.date.seconds * 1000).toDateString() : 'N/A'}</p>
                    <p><strong>Species:</strong> ${data.species || 'N/A'}</p>
                    <p><strong>Month:</strong> ${data.month ? new Date(data.month.seconds * 1000).getMonth() + 1 : 'N/A'}</p>
                    <br/>
                    <a class="btn btn-primary" href="#">Download</a>
                    <a class="btn btn-secondary" href="${summaryPage}?report_id=${data.report_id}" target="_blank">Open Report</a>
                `;

        reportsContainer?.appendChild(reportDiv);
        index++;
      }
    });

    if (!reportFound) {
      console.log("No report found with the provided report ID: " + search);
      console.log("Report IDs in the Firestore collection:");
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(data);
        console.log(data.report_id);
      });
    } else {
      console.log("Report data fetched and displayed successfully");
    }
  } catch (error) {
    console.error("Error fetching report data:", error);
  }
}

// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
  // Find the search input element
  const searchInput = document.getElementById("addReportSearch");

  if (searchInput) {
    // Check if the search input element exists
    // Set its value to an empty string
    searchInput.value = "";

    // Attach an event listener to the "Save Changes" button
    const saveChangesButton = document.querySelector("#addReportModal .btn-primary");
    if (saveChangesButton) {
      saveChangesButton.addEventListener("click", function () {
        const search = searchInput.value;
        console.log("Search value: ", search);

        if (search) {
          displayMonthlyReports(search);

          // Close the modal after clicking "Save Changes"
          const addReportModal = new bootstrap.Modal(document.getElementById("addReportModal"));
          addReportModal.hide();
          console.log("Modal closed after fetching and displaying report data");
        }
      });
    }
  } else {
    console.log("Search input element with ID 'addReportSearch' not found.");
  }
});

