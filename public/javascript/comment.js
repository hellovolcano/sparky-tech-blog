const commentFormHandler = async(event) => {
    event.preventDefault()

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ]

    const comment = document.querySelector('textarea[name="comment-body"]').value

    console.log(comment)

    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                comment_body: comment,
                post_id: id
            }),
            headers: {
                'Content-Type': 'application/json'
            }

        }) 
        
        if (response.ok) {
            document.location.reload()
        } else {
            alert(response.statusText)
        }
    }
    

}

document.querySelector(".comment-form").addEventListener('submit', commentFormHandler)