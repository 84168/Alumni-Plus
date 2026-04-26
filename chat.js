import { Server } from 'socket.io';

export function initializeChat(httpServer, sessionMiddleware) {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.engine.use(sessionMiddleware);

    const connectedUsers = new Map();

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        const session = socket.request.session;
        const authUser = session?.authUser;

        // Use auth data passed from client handshake as primary source
        // Fall back to session only if handshake data not provided
        const handshake = socket.handshake.auth;

        const userId = handshake?.userId || authUser?.Alumni_ID || authUser?.Enrollment || authUser?.Employee_ID;
        const userName = handshake?.name || authUser?.Full_Name;
        const userRole = handshake?.role || authUser?.Role;
        const userEmail = handshake?.email || authUser?.Email_ID;

        if (userId && userName) {
            const userInfo = {
                socketId: socket.id,
                userId,
                name: userName,
                role: userRole,
                email: userEmail
            };

            connectedUsers.set(socket.id, userInfo);
            console.log(`${userInfo.name} (${userInfo.role}) joined the chat`);

            io.emit('user-status', {
                type: 'joined',
                userName: userInfo.name,
                userRole: userInfo.role,
                onlineCount: connectedUsers.size
            });

            socket.emit('online-users', Array.from(connectedUsers.values()));
        }

        // rest of your handlers stay exactly the same...
        socket.on('user-message', (data) => {
            const userInfo = connectedUsers.get(socket.id);
            if (userInfo && data.message && data.message.trim()) {
                const messageData = {
                    userName: userInfo.name,
                    userRole: userInfo.role,
                    userId: userInfo.userId,
                    message: data.message.trim(),
                    timestamp: new Date().toISOString()
                };
                io.emit('message', messageData);
            }
        });

        socket.on('typing', (isTyping) => {
            const userInfo = connectedUsers.get(socket.id);
            if (userInfo) {
                socket.broadcast.emit('user-typing', {
                    userName: userInfo.name,
                    isTyping
                });
            }
        });

        socket.on('disconnect', () => {
            const userInfo = connectedUsers.get(socket.id);
            if (userInfo) {
                console.log(`${userInfo.name} disconnected`);
                connectedUsers.delete(socket.id);
                io.emit('user-status', {
                    type: 'left',
                    userName: userInfo.name,
                    userRole: userInfo.role,
                    onlineCount: connectedUsers.size
                });
            }
        });
    });

    return io;
}