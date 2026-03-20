// import { Server } from 'socket.io';

// export function initializeChat(httpServer, sessionMiddleware) {
//     const io = new Server(httpServer, {
//         cors: {
//             origin: "*",
//             methods: ["GET", "POST"]
//         }
//     });

//     // Share session with socket.io
//     io.engine.use(sessionMiddleware);

//     // Store connected users
//     const connectedUsers = new Map();

//     io.on('connection', (socket) => {
//         console.log('A user connected:', socket.id);

//         // Get user info from session
//         const session = socket.request.session;
//         const authUser = session?.authUser;

//         if (authUser) {
//             const userInfo = {
//                 socketId: socket.id,
//                 userId: authUser.Alumni_ID || authUser.Enrollment || authUser.Employee_ID,
//                 name: authUser.Full_Name,
//                 role: authUser.Role,
//                 email: authUser.Email_ID
//             };

//             connectedUsers.set(socket.id, userInfo);
//             console.log(`${userInfo.name} (${userInfo.role}) joined the chat`);

//             // Broadcast user joined
//             io.emit('user-status', {
//                 type: 'joined',
//                 userName: userInfo.name,
//                 userRole: userInfo.role,
//                 onlineCount: connectedUsers.size
//             });

//             // Send online users list to the newly connected user
//             socket.emit('online-users', Array.from(connectedUsers.values()));
//         }

//         // Handle user messages
//         socket.on('user-message', (data) => {
//             const userInfo = connectedUsers.get(socket.id);
            
//             if (userInfo && data.message && data.message.trim()) {
//                 const messageData = {
//                     userName: userInfo.name,
//                     userRole: userInfo.role,
//                     userId: userInfo.userId,
//                     message: data.message.trim(),
//                     timestamp: new Date().toISOString()
//                 };

//                 console.log('Message received:', messageData);

//                 // Broadcast to all users including sender
//                 io.emit('message', messageData);
//             }
//         });

//         // Handle typing indicator
//         socket.on('typing', (isTyping) => {
//             const userInfo = connectedUsers.get(socket.id);
//             if (userInfo) {
//                 socket.broadcast.emit('user-typing', {
//                     userName: userInfo.name,
//                     isTyping: isTyping
//                 });
//             }
//         });

//         // Handle disconnection
//         socket.on('disconnect', () => {
//             const userInfo = connectedUsers.get(socket.id);
            
//             if (userInfo) {
//                 console.log(`${userInfo.name} disconnected`);
//                 connectedUsers.delete(socket.id);

//                 // Broadcast user left
//                 io.emit('user-status', {
//                     type: 'left',
//                     userName: userInfo.name,
//                     userRole: userInfo.role,
//                     onlineCount: connectedUsers.size
//                 });
//             }
//         });
//     });

//     return io;
// }