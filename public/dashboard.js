const API_URL = 'http://localhost:3000/api';

// Check authentication
const token = localStorage.getItem('token');
if (!token) {
    window.location.href = 'index.html';
}

// Display username
document.getElementById('username').textContent = localStorage.getItem('username');

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = 'index.html';
}

// Load thoughts
async function loadThoughts() {
    try {
        const response = await fetch(`${API_URL}/thoughts`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const thoughts = await response.json();
        displayThoughts(thoughts);
    } catch (error) {
        console.error('Error loading thoughts:', error);
    }
}

// Display thoughts
function displayThoughts(thoughts) {
    const thoughtsList = document.getElementById('thoughtsList');
    
    if (thoughts.length === 0) {
        thoughtsList.innerHTML = '<div class="empty-state">No thoughts yet. Share your first thought!</div>';
        return;
    }

    thoughtsList.innerHTML = thoughts.map(thought => `
        <div class="thought-card ${thought.category}">
            <div class="thought-header">
                <div>
                    <h3>${thought.title}</h3>
                </div>
                <span class="thought-badge ${thought.category}">${thought.category}</span>
            </div>
            <p class="thought-content">${thought.content}</p>
            <div class="thought-footer">
                <span>${new Date(thought.created_at).toLocaleDateString()}</span>
                <button class="delete-btn" onclick="deleteThought(${thought.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Create thought
document.getElementById('thoughtForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('thoughtTitle').value;
    const content = document.getElementById('thoughtContent').value;
    const category = document.getElementById('thoughtCategory').value;

    try {
        const response = await fetch(`${API_URL}/thoughts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, content, category })
        });

        if (response.ok) {
            document.getElementById('thoughtForm').reset();
            loadThoughts();
        }
    } catch (error) {
        console.error('Error creating thought:', error);
    }
});

// Delete thought
async function deleteThought(id) {
    if (!confirm('Are you sure you want to delete this thought?')) return;

    try {
        const response = await fetch(`${API_URL}/thoughts/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            loadThoughts();
        }
    } catch (error) {
        console.error('Error deleting thought:', error);
    }
}

// Load thoughts on page load
loadThoughts();