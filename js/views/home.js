(function() {
    function renderHome() {
        const container = document.createElement('div');
        
        container.innerHTML = `
            <section class="hero-section">
                <h1>Plan Your Perfect Trip <br><span style="color: var(--primary-color)">with AI Intelligence</span></h1>
                <p>Experience personalized travel planning powered by advanced algorithms. Optimize your budget, ensure safety, and discover hidden gems tailored just for you.</p>
                <div class="hero-actions">
                    <a href="#/planner" class="btn-primary">Start Planning <i class="fa-solid fa-arrow-right"></i></a>
                    <a href="#/destinations" class="btn-outline">Explore Destinations</a>
                </div>
            </section>

            <div class="grid grid-2 mt-4">
                <div class="feature-card">
                    <div class="icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                    <h3>Smart Planner</h3>
                    <p>Tell us your preferences and let our AI craft a detailed day-by-day itinerary including transport and stay suggestions.</p>
                </div>
                <div class="feature-card">
                    <div class="icon"><i class="fa-solid fa-chart-line"></i></div>
                    <h3>Budget Optimization</h3>
                    <p>Real-time currency conversion and cost estimation based on your comfort level and group size.</p>
                </div>
                <div class="feature-card">
                    <div class="icon"><i class="fa-solid fa-shield-heart"></i></div>
                    <h3>Medical & Safety</h3>
                    <p>Get instant insights on local health requirements, emergency contacts, and safety ratings for your destination.</p>
                </div>
                <div class="feature-card">
                    <div class="icon"><i class="fa-solid fa-cloud-sun"></i></div>
                    <h3>Weather Awareness</h3>
                    <p>Smart weather forecasting that suggests the best time to visit and what to pack for your specific trip dates.</p>
                </div>
            </div>
        `;

        return container;
    }

    window.App.Views.renderHome = renderHome;
})();
