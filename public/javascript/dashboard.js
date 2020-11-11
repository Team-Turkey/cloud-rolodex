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

function displayUsers(data, searchTerm) {
    console.log("Display Users per button pressed", data)
    if(data.length === 0) {
        usersContainerEl.textContent("No Users to  Display")
        return;
    }

    usersContainerEl.textContent = ""
    userSearchTerm.textContent = searchTerm
   
    // for(i = 0; i < data.length; i++) {
       
        console.log(data.first_name)
         // format the user name
        var userName = [data.first_name, data.last_name];
        var email = [data.email];
        var phone = [data.phone];
        var department = [data.role_id];


        
        // create a container for each user
        var userEl = document.createElement("a")
        var phoneEl = document.createElement("a")
        var emailEl = document.createElement("a")
        var departmentEl = document.createElement("a")
        
        userEl.classList = "list-item flex-row justify-space-between align-center";
        phoneEl.classList = "list-item flex-row justify-space-between align-center";
        emailEl.classList = "list-item flex-row justify-space-between align-center";
        departmentEl.classList = "list-item flex-row justify-space-between align-center";

        userEl.setAttribute("id", userName)
        phoneEl.setAttribute("id", phone)
        emailEl.setAttribute("id", email)
        departmentEl.setAttribute("id", department)
    
        // create a span element to hold content
        var titelEl = document.createElement("span");
        var phoneTextEl = document.createElement("span")
        var emailTextEl = document.createElement("span")
        var departmentTextEl = document.createElement("span")

        console.log("username being loaded", userName)
        console.log("phone being loaded", phone)
        console.log("email being loaded", email)
        console.log("department being loaded", department)

        // assign elements to text content
        titelEl.textContent = userName;
        phoneTextEl.textContent = phone
        emailTextEl.textContent = email
        departmentTextEl.textContent = email

        // create a status element
        // var statusEl = document.createElement("span");
        
        // statusEl.classList = "flex-row align-center";


        // append html elements to container
        userEl.appendChild(titelEl);
        phoneEl.appendChild(phoneTextEl)
        emailEl.appendChild(emailTextEl);
        departmentEl.appendChild(departmentTextEl);
        // userEl.appendChild(statusEl);
        
        // append container to the dom
        
        usersContainerEl.appendChild(userEl, phoneEl, emailEl, departmentEl);
        console.log("users container element", usersContainerEl)
    // }
}


async function getByDepartment(id) {
    
    // const response = await fetch(`api/users/${id}`, {
    //     method: "GET",
    //     include: "department_id",
    
    //     headers: {
    //         "Content-Type": "application/json",
    //     }
    // })
    // if (response.ok) {
    //     console.log(response.body)
    //     response.json().then((data) => {
    //         console.log("data", data)
    //         displayUsers(data)
    //         // document.location.reload()
    //     })
    //   } else {
    //     alert(response.statusText);
    //   }
    }


function buttonClickHandler(event) {
    var id = event.target.getAttribute("id")
    if(id) {
        // sort by filter
        console.log("You pressed the number", id, " Department button")
        
        getByDepartment(id)
    };
};

function UpdateButtonClickHandler(event) {
    event.preventDefault()
    document.location.replace('/edit-user')
}

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


userFormEl.addEventListener("submit", formSubmitHandler)
departmentButtonsEl.addEventListener("click", buttonClickHandler);
document.querySelector('#search-all-users').addEventListener("click", getAllUsers)
