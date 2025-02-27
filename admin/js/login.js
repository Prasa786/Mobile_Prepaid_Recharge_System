 const storedUsername = 'leo@das.com';
 const storedPassword = 'pass123';

 document.getElementById('loginForm').addEventListener('submit', function (e) {
     e.preventDefault();

     const username = document.getElementById('username');
     const password = document.getElementById('password');
     const usernameError = document.getElementById('usernameError');
     const passwordError = document.getElementById('passwordError');
     const incorrectFeedback = document.getElementById('incorrectFeedback');

     let isValid = true;

     if (username.value.trim() === '') {
         username.classList.add('is-invalid');
         usernameError.classList.remove('d-none');
         isValid = false;
     } else {
         username.classList.remove('is-invalid');
         usernameError.classList.add('d-none');
     }

     if (password.value.trim() === '') {
         password.classList.add('is-invalid');
         passwordError.classList.remove('d-none');
         isValid = false;
     } else {
         password.classList.remove('is-invalid');
         passwordError.classList.add('d-none');
     }

     if (isValid) {
         if (username.value === storedUsername && password.value === storedPassword) {
             
             $('.toast').toast('show');
             setTimeout(() => {
                 window.location.href ='/admin/html/dashboard.html';
             }, 2000);
         } else {
             incorrectFeedback.style.display = 'block';
             setTimeout(() => {
                 incorrectFeedback.style.display = 'none';
             }, 3000);
         }
     }
 });

 
 document.getElementById('togglePassword').addEventListener('click', function () {
     const passwordField = document.getElementById('password');
     const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
     passwordField.setAttribute('type', type);
     this.classList.toggle('fa-eye-slash');
 });

 
 document.getElementById('username').addEventListener('input', function () {
     if (this.value.trim() !== '') {
         this.classList.remove('is-invalid');
         document.getElementById('usernameError').classList.add('d-none');
         document.getElementById('incorrectFeedback').style.display = 'none';
     }
 });

 document.getElementById('password').addEventListener('input', function () {
     if (this.value.trim() !== '') {
         this.classList.remove('is-invalid');
         document.getElementById('passwordError').classList.add('d-none');
         document.getElementById('incorrectFeedback').style.display = 'none';
     }
 });