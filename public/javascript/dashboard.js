var userFormEl = document.querySelector("#user-form")
var nameInputEl = document.querySelector("#first-name")
var usersContainerEl = document.querySelector("#users-container");
var userSearchTerm = document.querySelector("#user-search-term");
var departmentButtonsEl = document.querySelector("#department-buttons")

function formSubmitHandler(event) {
    event.preventDefault();
    var name = nameInputEl.value.trim()

    if (name) {
        displayUsers(name);
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
        console.log(response.body)
        response.json().then((data) => {
            displayUsers(data)
        })
      } else {
        alert(response.statusText);
      }
};

function displayUsers(id) {
    console.log("Display Users per button pressed", id)
    if(id.length === 0) {
        usersContainerEl.textContent("No Users to  Display")
        return;
    }
        // document.location.reload()
    // // format the user name
    // console.log(id.first_name)
    // var userName = [id.first_name, id.last_name]
    // console.log("userName", userName)
    // // create a container for each repo
    // var userEl = document.createElement("a")
    
    // userEl.classList = "list-item flex-row justify-space-between align-center";
    // userEl.setAttribute("id", userName)
    

    // // create a span element to hold repository name
    // var titelEl = document.createElement("span");
    
    // titelEl.textContent = userName;
    
    // // create a status element
    // var statusEl = document.createElement("span");
    
    // statusEl.classList = "flex-row align-center";


    // // append to container
    // userEl.appendChild(titelEl);
    // userEl.appendChild(statusEl);
    
    // // append container to the dom
    // console.log("user element", userEl)
    // usersContainerEl.appendChild(userEl);
}


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
            displayUsers(data, id)
        })
      } else {
        alert(response.statusText);
      }
    }


function buttonClickHandler(event) {
    var id = event.target.getAttribute("id")
    if(id) {
        // sort by filter
        console.log("You pressed the number", id, " Department button")
        
        getByDepartment(id)
    };
};

// function UpdateButtonClickHandler(event) {
//     event.preventDefault()
//     document.location.replace('/edit-user')
// }

// async function editFormHandler(event) {
//     event.preventDefault();

//     const id = window.location.toString().split('/')[
//         window.location.toString().split('/').length - 1];
//     console.log(id);

//     const title = document.querySelector('input[name="post-title"]').value.trim();

//     const blog_text = document.querySelector('textarea[name="blog-body"]').value.trim();

//     const response = await fetch(`/api/posts/${id}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             title,
//             blog_text
//         }),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     console.log(response);
//     if (response.ok) {
//         document.location.replace('/dashboard/');
//     } else {
//         alert(response.statusText);
//     }
// }


// userFormEl.addEventListener("submit", formSubmitHandler)
// departmentButtonsEl.addEventListener("click", buttonClickHandler);
// document.querySelector('#search-all-users').addEventListener("click", getAllUsers)
