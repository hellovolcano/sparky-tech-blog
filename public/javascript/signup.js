const signupFormHandler = async(event) => {
    event.preventDefault()

    // get the signup values
    const email = document.querySelector("#email-signup").value.trim()
    const username = document.querySelector("#username-signup").value.trim()
    const password = document.querySelector("#password-signup").value.trim()

    console.log(`${email} ${username} ${password}`)

    // make an API call to create the user
    if (email && username && password) {

        
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            }),
            headers: {
                'Content-Type':'application/json'
            }
        })

        if (response.ok) {
            console.log('user created')
            // take them to the dashboard once they've created an account
            document.location.replace('/login')
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler)