(function() {
    function renderAuth() {
        const container = document.createElement('div');
        
        container.innerHTML = `
            <div class="grid grid-2" style="max-width: 900px; margin: 0 auto; align-items: center;">
                <div class="hero" style="background: transparent; color: var(--text-color); text-align: left; padding: 0;">
                    <h1 style="color: var(--primary-color);">Welcome to TravelGenie</h1>
                    <p>Your intelligent, safety-first travel companion.</p>
                    <ul style="margin-top: 1rem; list-style: none;">
                        <li><i class="fa-solid fa-check text-success"></i> Smart Medical Safety Checks</li>
                        <li><i class="fa-solid fa-check text-success"></i> Real-time AQI & Weather Alerts</li>
                        <li><i class="fa-solid fa-check text-success"></i> Multi-Currency Budgeting</li>
                        <li><i class="fa-solid fa-check text-success"></i> AI-Powered Itineraries</li>
                    </ul>
                </div>

                <div class="card">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                        <button id="btn-login-tab" class="button" style="flex: 1; margin-right: 0.5rem; background: var(--primary-color);">Login</button>
                        <button id="btn-signup-tab" class="button" style="flex: 1; margin-left: 0.5rem; background: #e5e7eb; color: #374151;">Signup</button>
                    </div>

                    <!-- LOGIN FORM -->
                    <form id="login-form">
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="login-email" placeholder="john@example.com" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="login-password" placeholder="********" required>
                        </div>
                        <button type="submit" style="width: 100%;">Login</button>
                        <p class="text-center mt-2"><a href="#" id="guest-login">Continue as Guest</a></p>
                    </form>

                    <!-- SIGNUP FORM (Hidden by default) -->
                    <form id="signup-form" style="display: none;">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="signup-name" required>
                        </div>
                        <div class="grid grid-2">
                            <div class="form-group">
                                <label>Age</label>
                                <input type="number" id="signup-age" required>
                            </div>
                            <div class="form-group">
                                <label>Gender</label>
                                <select id="signup-gender">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="signup-email" required>
                        </div>
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="tel" id="signup-phone" required>
                        </div>
                         <div class="form-group">
                            <label>Preferred Currency</label>
                            <select id="signup-currency">
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                                <option value="INR">INR (₹)</option>
                                <option value="JPY">JPY (¥)</option>
                            </select>
                        </div>
                        <button type="submit" style="width: 100%;">Create Account</button>
                    </form>
                </div>
            </div>
        `;

        const loginForm = container.querySelector('#login-form');
        const signupForm = container.querySelector('#signup-form');
        const btnLoginTab = container.querySelector('#btn-login-tab');
        const btnSignupTab = container.querySelector('#btn-signup-tab');

        // Tab Switching Logic
        btnLoginTab.addEventListener('click', () => {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
            btnLoginTab.style.background = 'var(--primary-color)';
            btnLoginTab.style.color = 'white';
            btnSignupTab.style.background = '#e5e7eb';
            btnSignupTab.style.color = '#374151';
        });

        btnSignupTab.addEventListener('click', () => {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
            btnSignupTab.style.background = 'var(--primary-color)';
            btnSignupTab.style.color = 'white';
            btnLoginTab.style.background = '#e5e7eb';
            btnLoginTab.style.color = '#374151';
        });

        // Login Handler
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (window.App.Store.login(email, password)) {
                window.location.hash = '#/';
            } else {
                alert('Invalid credentials');
            }
        });

        // Signup Handler
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userData = {
                name: document.getElementById('signup-name').value,
                age: document.getElementById('signup-age').value,
                gender: document.getElementById('signup-gender').value,
                email: document.getElementById('signup-email').value,
                phone: document.getElementById('signup-phone').value,
                preferredCurrency: document.getElementById('signup-currency').value
            };

            window.App.Store.signup(userData);
            window.location.hash = '#/';
        });

        // Guest Login
        container.querySelector('#guest-login').addEventListener('click', (e) => {
            e.preventDefault();
            const guestUser = {
                name: 'Guest User',
                preferredCurrency: 'USD'
            };
            window.App.Store.setUser(guestUser);
            window.location.hash = '#/';
        });

        return container;
    }

    window.App.Views.renderAuth = renderAuth;
})();
