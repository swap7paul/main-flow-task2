// /public/login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const result = await response.json();
        
        if (response.ok) {
          // Store token in localStorage and redirect to contacts page
          localStorage.setItem('token', result.token);
          window.location.href = '/';
        } else {
          errorMessage.textContent = result.message;
        }
      } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again.';
      }
    });
  });
  