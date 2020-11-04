// async function upvoteClickHandler(event) {
//     event.preventDefault();

//     console.log('button clicked');
// }

// We'll define the click handler as an async function, because it will eventually be making an asynchronous PUT request with fetch(). However, we need to provide two things to the PUT request for an upvote to go through: the post_id and the user_id. Fortunately, the user_id will be available on the session on the back end, but where is the post_id?

// Look at the URL on the single-post page. It includes the id! You can take a URL string like http://localhost:3001/post/1, split it into an array based on the / character, and then grab the last item in the array.

// Update the function in upvote.js to look like the following code block:
async function upvoteClickHandler(event) {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
          post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
  }

  document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);