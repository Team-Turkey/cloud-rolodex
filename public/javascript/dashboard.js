var userFormEl = document.querySelector("#user-form")
var nameInputEl = document.querySelector("#first-name")
var usersContainerEl = document.querySelector("#users-container");
var userSearchTerm = document.querySelector("#user-search-term");
var departmentButtonsEl = document.querySelector("#department-buttons")

function formSubmitHandler(event) {
    event.preventDefault();
    var name = nameInputEl.value.trim()

    if (name) {
        getUserInfo(name);
        nameInputEl.value = "";
    } else {
        alert("Please enter your co-workers first name!")
    }
};



async function getAllUsers(event) {
    event.preventDefault();
    
    const response = await fetch('/api/users/', {
        method: "GET"
    })
    if (response.ok) {
        console.log(response);
        response.json(response)
        
      } else {
        alert(response.statusText);
      }
};

// function displayUsers(id) {
//     console.log(id)

//     // clear old content and place new search term
//     // usersContainerEl.textContent = "";
//     // usersContainerEl.textContent = searchTerm

//     // loop over users
//     for( i=0; i < users.length; i++) {
//         // format user name
//         var userName = users[i]
//         // create a container for each user
//         var userEl = document.createElement("a")
//         userEl.classlist = "list-item flex-row justify-space-between align-center";
//         //  create a span element to hold the user's name
//         var titleEl = document.createElement("span")
//         titleEl.textContent(userName)
//         // create a status element
//         var statusEl = document.createElement("span")
//         statusEl.classList = "flex-row align-center"
//         // append to container
//         userEl.appendChild(titleEl)
//         userEl.appendChild(statusEl)

//         // append container to the dom
//         usersContainerEl.appendChild(userEl)
//     }
// }


async function getByDepartment(id) {
    
    const response = await fetch(`api/users/${id}`, {
        method: "GET",
        include: "department_id",
    
        headers: {
            "Content-Type": "application/json",
        }
    })
    if (response.ok) {
        console.log(response.body)
        response.json().then((data) => {
            document.location.reload()
        })
      } else {
        alert(response.statusText);
        document.querySelector("#comment-form").style.display = "block";
      }
    }


function buttonClickHandler(event) {
    var id = event.target.getAttribute("id")
    if(id) {
        // sort by filter
        console.log("id", id)
        document.location.reload()
        

        // clear old content
        // usersContainerEl.textContent = "";
    };
};

function UpdateButtonClickHandler(event) {
    event.preventDefault()
    document.location.replace('/account')
}

userFormEl.addEventListener("submit", formSubmitHandler)
departmentButtonsEl.addEventListener("click", buttonClickHandler);
document.querySelector("#update-btn").addEventListener("click", UpdateButtonClickHandler)
document.querySelector('#search-all-users').addEventListener("click", getAllUsers)
