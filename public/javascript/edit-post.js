async function editFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];
    console.log(id);

    const title = document.querySelector('input[name="post-title"]').value.trim();

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
//   This time, you'll need to capture the id of the post as well as the value of the post-title form element. The id will be included in the URL of the PUT request (e.g., /api/posts/${id}), but the title will need to be part of the body. Remember that the body will also need to be stringified.