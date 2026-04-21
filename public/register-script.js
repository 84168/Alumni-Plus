


// class RegistrationManager {
//     constructor() {
//         this.form = document.getElementById('registerForm');
//         this.fullNameInput = document.getElementById('fullName');
//         this.emailInput = document.getElementById('email');
//         this.batchYearSelect = document.getElementById('batchYear');
//         this.passwordInput = document.getElementById('password');
//         this.confirmPasswordInput = document.getElementById('confirmPassword');
//         this.termsCheckbox = document.getElementById('termsAccepted');
//         this.passwordToggle = document.getElementById('passwordToggle');
//         this.confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
//         this.registerBtn = document.querySelector('.register-btn');
//         this.strengthBar = document.getElementById('strengthBar');
//         this.strengthText = document.getElementById('strengthText');
        
//         this.init();
//     }

//     init() {
//         this.populateBatchYears();
//         this.bindEvents();
//         this.setupValidation();
//     }

//     populateBatchYears() {
//         const currentYear = new Date().getFullYear();
//         const startYear = 1970;
//         const endYear = currentYear + 6; // Allow future years for current students
        
//         // Clear existing options except the first one
//         this.batchYearSelect.innerHTML = '<option value="">Select your batch year</option>';
        
//         // Add years in descending order (most recent first)
//         for (let year = endYear; year >= startYear; year--) {
//             const option = document.createElement('option');
//             option.value = year;
//             option.textContent = year;
//             this.batchYearSelect.appendChild(option);
//         }
//     }

//     bindEvents() {
//         // Password toggle functionality
//         this.passwordToggle?.addEventListener('click', () => {
//             this.togglePassword(this.passwordInput, this.passwordToggle);
//         });

//         this.confirmPasswordToggle?.addEventListener('click', () => {
//             this.togglePassword(this.confirmPasswordInput, this.confirmPasswordToggle);
//         });

//         // Form submission
//         this.form.addEventListener('submit', (e) => {
//             e.preventDefault();
//             this.handleRegistration();
//         });

//         // Real-time validation
//         this.fullNameInput.addEventListener('blur', () => {
//             this.validateFullName();
//         });

//         this.emailInput.addEventListener('blur', () => {
//             this.validateEmail();
//         });

//         this.batchYearSelect.addEventListener('change', () => {
//             this.validateBatchYear();
//         });

//         this.passwordInput.addEventListener('input', () => {
//             this.validatePassword();
//             this.checkPasswordStrength();
//         });

//         this.confirmPasswordInput.addEventListener('blur', () => {
//             this.validateConfirmPassword();
//         });

//         this.termsCheckbox.addEventListener('change', () => {
//             this.validateTerms();
//         });

//         // Clear errors on input
//         this.fullNameInput.addEventListener('input', () => {
//             this.clearError('fullNameError');
//             this.fullNameInput.classList.remove('error', 'success');
//         });

//         this.emailInput.addEventListener('input', () => {
//             this.clearError('emailError');
//             this.emailInput.classList.remove('error', 'success');
//         });

//         this.confirmPasswordInput.addEventListener('input', () => {
//             this.clearError('confirmPasswordError');
//             this.confirmPasswordInput.classList.remove('error', 'success');
//         });

//         // Role selection feedback
//         const roleInputs = document.querySelectorAll('input[name="role"]');
//         roleInputs.forEach(input => {
//             input.addEventListener('change', () => {
//                 this.updateBatchYearLabel();
//             });
//         });
//     }

//     togglePassword(input, toggle) {
//         const isPassword = input.type === 'password';
//         input.type = isPassword ? 'text' : 'password';
        
//         const icon = toggle.querySelector('i');
//         icon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
//     }

//     updateBatchYearLabel() {
//         const selectedRole = document.querySelector('input[name="role"]:checked').value;
//         const label = document.querySelector('label[for="batchYear"]');
        
//         if (selectedRole === 'alumni') {
//             label.textContent = 'Graduation Year';
//         } else {
//             label.textContent = 'Expected Graduation Year';
//         }
//     }

//     validateFullName() {
//         const fullName = this.fullNameInput.value.trim();
        
//         if (!fullName) {
//             this.showError('fullNameError', 'Full name is required');
//             this.fullNameInput.classList.add('error');
//             return false;
//         }
        
//         if (fullName.length < 2) {
//             this.showError('fullNameError', 'Please enter your full name');
//             this.fullNameInput.classList.add('error');
//             return false;
//         }
        
//         // Check if name contains at least 2 words
//         const nameParts = fullName.split(' ').filter(part => part.length > 0);
//         if (nameParts.length < 2) {
//             this.showError('fullNameError', 'Please enter your first and last name');
//             this.fullNameInput.classList.add('error');
//             return false;
//         }
        
//         this.fullNameInput.classList.remove('error');
//         this.fullNameInput.classList.add('success');
//         this.clearError('fullNameError');
//         return true;
//     }

//     validateEmail() {
//         const email = this.emailInput.value.trim();
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
//         if (!email) {
//             this.showError('emailError', 'Email address is required');
//             this.emailInput.classList.add('error');
//             return false;
//         }
        
//         if (!emailRegex.test(email)) {
//             this.showError('emailError', 'Please enter a valid email address');
//             this.emailInput.classList.add('error');
//             return false;
//         }
        
//         this.emailInput.classList.remove('error');
//         this.emailInput.classList.add('success');
//         this.clearError('emailError');
//         return true;
//     }

//     validateBatchYear() {
//         const batchYear = this.batchYearSelect.value;
        
//         if (!batchYear) {
//             this.showError('batchYearError', 'Please select your batch year');
//             this.batchYearSelect.classList.add('error');
//             return false;
//         }
        
//         this.batchYearSelect.classList.remove('error');
//         this.batchYearSelect.classList.add('success');
//         this.clearError('batchYearError');
//         return true;
//     }

//     validatePassword() {
//         const password = this.passwordInput.value;
//         const errors = [];
        
//         if (!password) {
//             this.showError('passwordError', 'Password is required');
//             this.passwordInput.classList.add('error');
//             return false;
//         }
        
//         if (password.length < 8) {
//             errors.push('at least 8 characters');
//         }
        
//         if (!/[A-Z]/.test(password)) {
//             errors.push('one uppercase letter');
//         }
        
//         if (!/[a-z]/.test(password)) {
//             errors.push('one lowercase letter');
//         }
        
//         if (!/\d/.test(password)) {
//             errors.push('one number');
//         }
        
//         if (errors.length > 0) {
//             this.showError('passwordError', `Password must contain ${errors.join(', ')}`);
//             this.passwordInput.classList.add('error');
//             return false;
//         }
        
//         this.passwordInput.classList.remove('error');
//         this.passwordInput.classList.add('success');
//         this.clearError('passwordError');
//         return true;
//     }

//     validateConfirmPassword() {
//         const password = this.passwordInput.value;
//         const confirmPassword = this.confirmPasswordInput.value;
        
//         if (!confirmPassword) {
//             this.showError('confirmPasswordError', 'Please confirm your password');
//             this.confirmPasswordInput.classList.add('error');
//             return false;
//         }
        
//         if (password !== confirmPassword) {
//             this.showError('confirmPasswordError', 'Passwords do not match');
//             this.confirmPasswordInput.classList.add('error');
//             return false;
//         }
        
//         this.confirmPasswordInput.classList.remove('error');
//         this.confirmPasswordInput.classList.add('success');
//         this.clearError('confirmPasswordError');
//         return true;
//     }

//     validateTerms() {
//         if (!this.termsCheckbox.checked) {
//             this.showError('termsError', 'You must agree to the terms and conditions');
//             return false;
//         }
        
//         this.clearError('termsError');
//         return true;
//     }

//     checkPasswordStrength() {
//         const password = this.passwordInput.value;
//         let strength = 0;
//         let strengthText = 'Password strength';
        
//         if (password.length >= 8) strength++;
//         if (/[A-Z]/.test(password)) strength++;
//         if (/[a-z]/.test(password)) strength++;
//         if (/\d/.test(password)) strength++;
//         if (/[^A-Za-z0-9]/.test(password)) strength++;
        
//         // Remove existing classes
//         this.strengthBar.classList.remove('weak', 'medium', 'strong');
//         this.strengthText.classList.remove('weak', 'medium', 'strong');
        
//         if (password.length === 0) {
//             strengthText = 'Password strength';
//         } else if (strength <= 2) {
//             this.strengthBar.classList.add('weak');
//             this.strengthText.classList.add('weak');
//             strengthText = 'Weak password';
//         } else if (strength <= 3) {
//             this.strengthBar.classList.add('medium');
//             this.strengthText.classList.add('medium');
//             strengthText = 'Medium password';
//         } else {
//             this.strengthBar.classList.add('strong');
//             this.strengthText.classList.add('strong');
//             strengthText = 'Strong password';
//         }
        
//         this.strengthText.textContent = strengthText;
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

//     async handleRegistration() {
//         // Validate all fields
//         const isFullNameValid = this.validateFullName();
//         const isEmailValid = this.validateEmail();
//         const isBatchYearValid = this.validateBatchYear();
//         const isPasswordValid = this.validatePassword();
//         const isConfirmPasswordValid = this.validateConfirmPassword();
//         const isTermsValid = this.validateTerms();
        
//         if (!isFullNameValid || !isEmailValid || !isBatchYearValid || 
//             !isPasswordValid || !isConfirmPasswordValid || !isTermsValid) {
//             return
//             //window.location.href = "/job_post.html";
//         }

//         // Get form data
//         const formData = new FormData(this.form);
//         const registrationData = {
//             fullName: formData.get('fullName'),
//             email: formData.get('email'),
//             role: formData.get('role'),
//             batchYear: formData.get('batchYear'),
//             password: formData.get('password'),
//             terms: formData.get('terms') === 'on'
//         };

//         // Show loading state
//         this.setLoadingState(true);

//         try {
//             // Simulate API call (replace with actual registration logic)
//             await this.simulateRegistration(registrationData);
            
//             // Show success message
//             this.showSuccessMessage('Account created successfully! Redirecting to login...');
            
//             // Redirect to login page
//             setTimeout(() => {
//                 // window.location.href = 'login.html';
//                 // window.location.href = 'home.html';

//             }, 2000);
            
//         } catch (error) {
//             this.showError('emailError', error.message || 'Registration failed. Please try again.');
//         } finally {
//             this.setLoadingState(false);
//         }
//     }

//     setLoadingState(isLoading) {
//         if (isLoading) {
//             this.registerBtn.classList.add('loading');
//             this.registerBtn.disabled = true;
//         } else {
//             this.registerBtn.classList.remove('loading');
//             this.registerBtn.disabled = false;
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

//     async simulateRegistration(data) {
//         // Simulate network delay
//         await new Promise(resolve => setTimeout(resolve, 1500));
        
//         // Simulate email already exists scenario
//         if (data.email === 'test@example.com') {
//             throw new Error('Email address is already registered');
//         }
        
//         // Simulate successful registration
//         return { success: true, message: 'Account created successfully' };
//     }

//     setupValidation() {
//         // Set up ARIA attributes for accessibility
//         this.fullNameInput.setAttribute('aria-describedby', 'fullNameError');
//         this.emailInput.setAttribute('aria-describedby', 'emailError');
//         this.batchYearSelect.setAttribute('aria-describedby', 'batchYearError');
//         this.passwordInput.setAttribute('aria-describedby', 'passwordError');
//         this.confirmPasswordInput.setAttribute('aria-describedby', 'confirmPasswordError');
//         this.termsCheckbox.setAttribute('aria-describedby', 'termsError');
        
//         // Initialize batch year label
//         this.updateBatchYearLabel();
//     }
// }

// // Initialize the registration manager when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     new RegistrationManager();
// });

// // Handle terms and privacy links
// document.addEventListener('click', (e) => {
//     if (e.target.classList.contains('terms-link')) {
//         e.preventDefault();
//         alert('Terms and Conditions would be displayed here. This would typically open in a modal or redirect to a terms page.');
//     }
    
//     if (e.target.classList.contains('privacy-link')) {
//         e.preventDefault();
//         alert('Privacy Policy would be displayed here. This would typically open in a modal or redirect to a privacy page.');
//     }
// });

// // const submit = document.getElementById("register-btn");
// // submit.addEventListener("click" , ()=>{

// // })
