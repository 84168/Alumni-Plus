// class LoginManager {
//     constructor() {
//         this.form = document.getElementById('loginForm');
//         this.emailInput = document.getElementById('email');
//         this.passwordInput = document.getElementById('password');
//         this.passwordToggle = document.getElementById('passwordToggle');
//         this.loginBtn = document.querySelector('.login-btn');
        
//         this.init();
//     }

//     init() {
//         this.bindEvents();
//         this.setupValidation();
//     }

//     bindEvents() {
//         // Password toggle functionality
//         this.passwordToggle?.addEventListener('click', () => {
//             this.togglePassword();
//         });

//         // Form submission
//         this.form.addEventListener('submit', (e) => {
//             e.preventDefault();
//             this.handleLogin();
//         });

//         // Real-time validation
//         this.emailInput.addEventListener('blur', () => {
//             this.validateEmail();
//         });

//         this.passwordInput.addEventListener('blur', () => {
//             this.validatePassword();
//         });

//         // Clear errors on input
//         this.emailInput.addEventListener('input', () => {
//             this.clearError('emailError');
//             this.emailInput.classList.remove('error', 'success');
//         });

//         this.passwordInput.addEventListener('input', () => {
//             this.clearError('passwordError');
//             this.passwordInput.classList.remove('error', 'success');
//         });
//     }

//     togglePassword() {
//         const isPassword = this.passwordInput.type === 'password';
//         this.passwordInput.type = isPassword ? 'text' : 'password';
        
//         const icon = this.passwordToggle.querySelector('i');
//         icon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
//     }

//     validateEmail() {
//         const email = this.emailInput.value.trim();
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
//         if (!email) {
//             this.showError('emailError', 'Email is required');
//             this.emailInput.classList.add('error');
//             return false;
//         }
        
//         if (!emailRegex.test(email) && !this.isValidUsername(email)) {
//             this.showError('emailError', 'Please enter a valid email or username');
//             this.emailInput.classList.add('error');
//             return false;
//         }
        
//         this.emailInput.classList.remove('error');
//         this.emailInput.classList.add('success');
//         this.clearError('emailError');
//         return true;
//     }

//     validatePassword() {
//         const password = this.passwordInput.value;
        
//         if (!password) {
//             this.showError('passwordError', 'Password is required');
//             this.passwordInput.classList.add('error');
//             return false;
//         }
        
//         if (password.length < 6) {
//             this.showError('passwordError', 'Password must be at least 6 characters');
//             this.passwordInput.classList.add('error');
//             return false;
//         }
        
//         this.passwordInput.classList.remove('error');
//         this.passwordInput.classList.add('success');
//         this.clearError('passwordError');
//         return true;
//     }

//     isValidUsername(username) {
//         // Basic username validation (alphanumeric, underscore, hyphen)
//         const usernameRegex = /^[a-zA-Z0-9_-]+$/;
//         return usernameRegex.test(username) && username.length >= 3;
//     }

//     showError(elementId, message) {
//         const errorElement = document.getElementById(elementId);
//         if (errorElement) {
//             errorElement.textContent = message;
//         }
//     }

//     clearError(elementId) {
//         const errorElement = document.getElementById(elementId);
//         if (errorElement) {
//             errorElement.textContent = '';
//         }
//     }

//     async handleLogin() {
//         // Validate all fields
//         const isEmailValid = this.validateEmail();
//         const isPasswordValid = this.validatePassword();
        
//         if (!isEmailValid || !isPasswordValid) {
//             return;
//         }

//         // Get form data
//         const formData = new FormData(this.form);
//         const loginData = {
//             email: formData.get('email'),
//             password: formData.get('password'),
//             role: formData.get('role'),
//             remember: formData.get('remember') === 'on'
//         };

//         // Show loading state
//         this.setLoadingState(true);

//         try {
//             // Simulate API call (replace with actual login logic)
//             await this.simulateLogin(loginData);
            
//             // Show success message
//             this.showSuccessMessage('Login successful! Redirecting...');
            
//             // Redirect based on role
//             setTimeout(() => {
//                 if (loginData.role === 'alumni') {
//                     window.location.href = '/alumni-dashboard';
//                 } else {
//                     window.location.href = '/student-dashboard';
//                 }
//             }, 1500);
            
//         } catch (error) {
//             this.showError('emailError', error.message || 'Login failed. Please try again.');
//         } finally {
//             this.setLoadingState(false);
//         }
//     }

//     setLoadingState(isLoading) {
//         if (isLoading) {
//             this.loginBtn.classList.add('loading');
//             this.loginBtn.disabled = true;
//         } else {
//             this.loginBtn.classList.remove('loading');
//             this.loginBtn.disabled = false;
//         }
//     }

//     showSuccessMessage(message) {
//         // Remove existing success message
//         const existingMessage = document.querySelector('.success-message');
//         if (existingMessage) {
//             existingMessage.remove();
//         }

//         // Create new success message
//         const successDiv = document.createElement('div');
//         successDiv.className = 'success-message';
//         successDiv.textContent = message;
        
//         // Insert before the form
//         this.form.parentNode.insertBefore(successDiv, this.form);
//     }

//     async simulateLogin(data) {
//         // Simulate network delay
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         // Simulate different scenarios
//         if (data.email === 'demo@example.com' && data.password === 'demo123') {
//             return { success: true };
//         } else {
//             throw new Error('Invalid email or password');
//         }
//     }

//     setupValidation() {
//         // Set up any additional validation rules
//         this.emailInput.setAttribute('aria-describedby', 'emailError');
//         this.passwordInput.setAttribute('aria-describedby', 'passwordError');
//     }
// }

// // Initialize the login manager when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     new LoginManager();
// });

// // Handle forgot password
// document.addEventListener('click', (e) => {
//     if (e.target.classList.contains('forgot-link')) {
//         e.preventDefault();
//         alert('Password reset functionality would be implemented here. You would typically redirect to a password reset page or show a modal.');
//     }
    
//     if (e.target.classList.contains('register-link')) {
//         e.preventDefault();
//         alert('Registration functionality would be implemented here. You would typically redirect to a registration page.');
//     }
// });
