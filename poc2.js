document.addEventListener('DOMContentLoaded', function() {
    // --- 1. PRESERVE HEADER AND FOOTER ---
    // Find the original header and footer and create copies to preserve them.
    const headerElement = document.querySelector('header');
    const footerElement = document.querySelector('footer');
    const savedHeader = headerElement ? headerElement.cloneNode(true) : null;
    const savedFooter = footerElement ? footerElement.cloneNode(true) : null;

    // --- 2. CLEAR THE BODY AND HEAD STYLES ---
    // Clear the body's existing content.
    document.body.innerHTML = '';
    // Remove existing stylesheets to prevent conflicts with the card's styling.
    document.querySelectorAll('link[rel="stylesheet"], style').forEach(el => el.remove());


    // --- 3. DEFINE THE LOGIN CARD'S HTML AND CSS ---
    // The CSS for the login card and its container environment.
    const cardStyles = `
        :root {
            --background-blue: #020422;
            --card-blue: #0b0e3b;
            --input-blue: #1c2a6d;
            --accent-yellow: #d5ff2f;
            --text-primary: #ffffff;
            --text-secondary: #a0a8d4;
            --border-color: #38427e;
        }
        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--background-blue);
            background-image: radial-gradient(circle at top right, rgba(31, 52, 210, 0.2), transparent 40%);
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            margin: 0;
            color: var(--text-primary);
        }
        main#login-card-container {
            flex: 1; /* Allows the main content to grow and push the footer down */
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        .login-card {
            background-color: var(--card-blue);
            border: 1px solid var(--border-color);
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
            width: 100%;
            max-width: 420px;
            text-align: center;
            animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .login-card img { width: 140px; margin: 0 auto 24px auto; }
        .login-card h2 { font-size: 28px; font-weight: 600; margin: 0 0 8px 0; }
        .login-card p { color: var(--text-secondary); margin: 0 0 32px 0; font-size: 16px; }
        .login-form { text-align: left; }
        .login-form .input-group { margin-bottom: 20px; }
        .login-form label { display: block; margin-bottom: 8px; font-size: 14px; font-weight: 500; color: var(--text-secondary); }
        .login-form input { 
            width: 100%; padding: 14px; border-radius: 8px; 
            border: 1px solid var(--border-color); background-color: var(--input-blue); 
            color: var(--text-primary); font-size: 16px; box-sizing: border-box; 
            transition: border-color 0.3s, box-shadow 0.3s;
        }
        .login-form input::placeholder { color: #6a74a3; }
        .login-form input:focus { outline: none; border-color: var(--accent-yellow); box-shadow: 0 0 0 3px rgba(213, 255, 47, 0.2); }
        .forgot-password { display: block; text-align: right; font-size: 14px; color: var(--text-secondary); text-decoration: none; margin-top: -10px; margin-bottom: 24px; transition: color 0.3s; }
        .forgot-password:hover { color: var(--accent-yellow); }
        .login-button { width: 100%; padding: 16px; border: none; border-radius: 8px; background-color: var(--accent-yellow); color: #000; font-size: 16px; font-weight: 700; cursor: pointer; transition: transform 0.2s; }
        .login-button:hover { transform: scale(1.03); }
        .divider { display: flex; align-items: center; text-align: center; color: var(--text-secondary); margin: 32px 0; font-size: 12px; font-weight: 500; }
        .divider::before, .divider::after { content: ''; flex: 1; border-bottom: 1px solid var(--border-color); }
        .divider::before { margin-right: .5em; }
        .divider::after { margin-left: .5em; }
        .social-login { display: flex; justify-content: center; gap: 16px; margin-bottom: 32px; }
        .social-btn { display: flex; align-items: center; justify-content: center; width: 50px; height: 50px; background-color: transparent; border: 1px solid var(--border-color); border-radius: 50%; cursor: pointer; transition: background-color 0.3s, border-color 0.3s; }
        .social-btn:hover { background-color: var(--input-blue); border-color: var(--text-secondary); }
        .social-btn svg { width: 24px; height: 24px; }
        .signup-link { font-size: 14px; color: var(--text-secondary); }
        .signup-link a { color: var(--accent-yellow); font-weight: 600; text-decoration: none; }
        .signup-link a:hover { text-decoration: underline; }
    `;

    // The HTML content for the login card.
    const cardHTML = `
        <div class="login-card">
            <img src="https://www.intrusion.com/wp-content/themes/wp-intrusion/assets/images/intrusion.svg" alt="Intrusion Logo">
            <h2>Welcome Back</h2>
            <p>Sign in to access your dashboard.</p>
            <form class="login-form">
                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="you@example.com" required>
                </div>
                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="••••••••" required>
                </div>
                <a href="#" class="forgot-password">Forgot Password?</a>
                <button type="submit" class="login-button">Sign In</button>
            </form>
            <div class="divider">OR</div>
            <div class="social-login">
                <button class="social-btn" aria-label="Login with Google"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.92H12V14.4H18.06C17.74 15.93 16.89 17.27 15.58 18.15V20.72H19.38C21.43 18.84 22.56 15.83 22.56 12.25Z" fill="#4285F4"/><path d="M12 23C14.97 23 17.47 22.02 19.38 20.72L15.58 18.15C14.63 18.83 13.43 19.25 12 19.25C9.12 19.25 6.69 17.3 5.78 14.7H1.98V17.27C3.88 20.7 7.6 23 12 23Z" fill="#34A853"/><path d="M5.78 14.7C5.57 14.12 5.45 13.51 5.45 12.88C5.45 12.25 5.57 11.64 5.78 11.06V8.5H1.98C1.22 9.98 0.75 11.55 0.75 13.25C0.75 14.95 1.22 16.52 1.98 17.97L5.78 14.7V14.7Z" fill="#FBBC05"/><path d="M12 5.75C13.56 5.75 14.97 6.27 16.03 7.27L19.45 3.92C17.47 2.02 14.97 1 12 1C7.6 1 3.88 3.3 1.98 6.77L5.78 9.35C6.69 6.7 9.12 4.75 12 4.75L12 5.75Z" fill="#EA4335"/></svg></button>
                <button class="social-btn" aria-label="Login with Microsoft"><svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6"><path d="M11.235 2.113H2.113v9.122h9.122V2.113zm10.774 0h-9.122v9.122h9.122V2.113zM11.235 12.765H2.113v9.122h9.122v-9.122zm10.774 0h-9.122v9.122h9.122v-9.122z" fill="#f3f3f3"></path></svg></button>
                <button class="social-btn" aria-label="Login with Github"><svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" fill="#f3f3f3"></path></svg></button>
            </div>
            <p class="signup-link">Don't have an account? <a href="#">Sign Up</a></p>
        </div>
    `;

    // --- 4. INJECT FONTS AND STYLES ---
    // Add the Google Fonts stylesheet to the <head>.
    const googleFontLink = document.createElement('link');
    googleFontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
    googleFontLink.rel = 'stylesheet';
    document.head.appendChild(googleFontLink);
    
    // Add the card's CSS to the <head>.
    const styleSheet = document.createElement("style");
    styleSheet.innerText = cardStyles;
    document.head.appendChild(styleSheet);
    
    // --- 5. REBUILD THE BODY ---
    // Create a new <main> element to hold the login card.
    const mainContainer = document.createElement('main');
    mainContainer.id = 'login-card-container';
    mainContainer.innerHTML = cardHTML;

    // Append the preserved header, the new main content, and the preserved footer.
    if (savedHeader) {
        document.body.appendChild(savedHeader);
    }
    document.body.appendChild(mainContainer);
    if (savedFooter) {
        document.body.appendChild(savedFooter);
    }
});