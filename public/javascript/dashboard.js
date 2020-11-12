var searchAllUsersEl = document.querySelector("#all-users")
var nameInputEl = document.querySelector("#first-name")
var usersContainerEl = document.querySelector("#users-container");

var departmentButtonsEl = document.querySelector("#department-buttons")

function formSubmitHandler(event) {
    event.preventDefault();
    var name = nameInputEl.value.trim()

    if (name) {
        
        nameInputEl.value = "";
    } else {
        alert("Please enter your co-workers first name!")
    }
};




function buttonClickHandler(event) {
    var iframeContainerEl = document.createElement("div")
    console.log("iframe container element", iframeContainerEl)
    var name = event.target.getAttribute("id")
    console.log("name", name)
    // create an iframe element
    var iframeEL = document.getElementById("myframe")

    // set src attribute
    iframeEL.setAttribute("src", '../dashboard/' + name + '/')
    // iframeEL.setAttribute("height", "100%")
    // iframeEL.setAttribute("width", '100%')
    // iframeEL.setAttribute("frameborder", '0')
    
    console.log(iframeEL)
    // iframeContainerEl.appendChild(iframeEL)
    // document.location.reload()
    
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

searchAllUsersEl.addEventListener("click", buttonClickHandler)
// userFormEl.addEventListener("submit", formSubmitHandler)
departmentButtonsEl.addEventListener("click", buttonClickHandler);
// document.querySelector('#search-all-users').addEventListener("click", getAllUsers)
