<script src="/socket.io/socket.io.js"></script>

    const socket = io("http://localhost:9000"); // Ensure port matches index.js
    const supportId = "<%= supportId %>";
    const senderId = "<%= userId %>";
    const senderRole = "<%= userIs %>";
    const senderName = "<%= authUser ? authUser.Full_Name : 'User' %>";

    // Join the room immediately on load
    socket.emit("join-support", supportId);

    function sendMessage() {
        const messageInput = document.getElementById('message-input');
        const message = messageInput.value.trim();

        if (message) {
            socket.emit("user-message", {
                supportId,
                senderId,
                senderRole,
                message,
                senderName
            });
            messageInput.value = ''; // Clear input
        }
    }

    // Listen for incoming messages
    socket.on("message", (data) => {
        const chatBox = document.getElementById('chat-messages-container');
        const isMe = data.senderId == senderId;
        
        const messageHtml = `
            <div class="message ${isMe ? 'sent' : 'received'}">
                <div class="msg-content">
                    <small>${data.senderName}</small>
                    <p>${data.message}</p>
                </div>
            </div>
        `;
        
        chatBox.innerHTML += messageHtml;
        chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll
    });

    // Handle Enter Key
    document.getElementById('message-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });