// LOGIN  HANDLER
async function loginFormHandler(event) {
    event.preventDefault();

    
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    console.log(email, password)
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password,
                
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // console.log("RESPONSE", response);
        if (response.ok) {
            // const reply = await fetch('/api/users/:id', {
            //     where: {
            //         id: session.user_id
            //     },
            //     method: 'get',
            //     body: JSON.stringify({
            //         id
            //     }),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
            // console.log("ID", dbUserData);
            console.log("RESPONSE", response);
            document.location.replace(`/dashboard`);
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);