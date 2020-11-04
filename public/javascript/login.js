// Async/await acts as "syntactic sugar" for our code, much like ES6 classes, and help make our Promises more readable. To help asynchronous code use async/await, we first add the keyword async to the function that wraps our asynchronous code.
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    //     if (username && email && password) {
    //       await fetch('/api/users', {
    //         method: 'post',
    //         body: JSON.stringify({
    //           username,
    //           email,
    //           password
    //         }),
    //         headers: { 'Content-Type': 'application/json' }
    //       }).then((response) => {console.log(response)})
    //     }
    //   }
    // When using await, we can assign the result of the promise to a variable. For example, const response = await fetch();. This way, we don't need to use catch() or then() to tell the code what to do after the Promise completes.
    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Now we can add error handling by using the .ok property on the response object. You can see that at the end of the following code block:
        // check the response status
        if (response.ok) {
            console.log('success');
        } else {
            alert(response.statusText);
        }
    }
}


document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);


// LOGIN  HANDLER
async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);