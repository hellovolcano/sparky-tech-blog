const editPostFormHandler = async (event) => {
    event.preventDefault()

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    const title = document.querySelector("#post-title").value
    const post_content = document.querySelector("#post-content").value

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            post_content: post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        alert(response.statusText)
    }

  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editPostFormHandler)

