// Load posts when page loads
function loadPosts() {
    fetch('/api/posts')
        .then(function(response) {
            return response.json();
        })
        .then(function(posts) {
            var postsList = document.getElementById('postsList');

            if (posts.length === 0) {
                postsList.innerHTML = '<div class="empty-state">No posts yet. Be the first to share something!</div>';
                return;
            }

            postsList.innerHTML = '';
            posts.forEach(function(post) {
                var postElement = document.createElement('div');
                postElement.className = 'post';

                var date = new Date(post.timestamp);
                var formattedDate = date.toLocaleString();

                postElement.innerHTML =
                    '<div class="post-header">' +
                        '<span class="post-username">' + post.username + '</span>' +
                        '<span class="post-timestamp">' + formattedDate + '</span>' +
                    '</div>' +
                    '<div class="post-message">' + post.message + '</div>' +
                    '<button class="delete-btn" onclick="deletePost(' + post.id + ')">Delete</button>';

                postsList.appendChild(postElement);
            });
        })
        .catch(function(error) {
            console.error('Error loading posts:', error);
        });
}

// Handle form submission
document.getElementById('postForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var username = document.getElementById('username').value;
    var message = document.getElementById('message').value;

    if (!username || !message) {
        alert('Please fill in both username and message');
        return;
    }

    fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            message: message
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.error) {
            alert('Error: ' + data.error);
        } else {
            // Clear form
            document.getElementById('username').value = '';
            document.getElementById('message').value = '';

            // Reload posts
            loadPosts();
        }
    })
    .catch(function(error) {
        console.error('Error creating post:', error);
        alert('Error creating post');
    });
});

// Delete a post
function deletePost(postId) {
    fetch('/api/posts/' + postId, {
        method: 'DELETE'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.error) {
            alert('Error: ' + data.error);
        } else {
            // Reload posts
            loadPosts();
        }
    })
    .catch(function(error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post');
    });
}

// Load posts when page loads
loadPosts();
