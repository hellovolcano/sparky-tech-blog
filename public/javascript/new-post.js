const newPostFormHandler = async (event) => {
    event.preventDefault()

    // get the content from the user's form
    const title = document.querySelector("#post-title").value
    const post_content = document.querySelector("#post-content").value

    console.log("title: " + title)
    console.log("content: " + post_content)
    if (title && post_content) {
        const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            post_content: post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        document.location.replace('/dashboard/')
    } else {
        alert(response.statusText)
        }
    }
    
}

document.querySelector(".new-post").addEventListener('submit', newPostFormHandler)