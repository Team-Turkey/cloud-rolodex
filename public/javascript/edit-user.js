async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];
    console.log(id);

    const firstName = document.querySelector('input[name="first-name"]').value.trim()
    const lastName = document.querySelector('input[name="last-name"]').value.trim()
    const phone = document.querySelector('input[name="phone"]').value.trim()
    const email = document.querySelector('input[name="email"]').value.trim()
    // const department = document.querySelector('select[value]').value.trim()


    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            firstName,
            lastName,
            phone,
            email,
            // department
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
    if (response.ok) {
        // document.location.replace('/dashboard/');
        
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#update-btn').addEventListener('click', editFormHandler);
//   This time, you'll need to capture the id of the post as well as the value of the post-title form element. The id will be included in the URL of the PUT request (e.g., /api/posts/${id}), but the title will need to be part of the body. Remember that the body will also need to be stringified.