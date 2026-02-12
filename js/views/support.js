(function() {
    function renderSupport() {
        const container = document.createElement('div');
        container.className = 'support-view fade-in';
        
        container.innerHTML = `
            <div class="support-layout">
                <!-- 1. Hero Section -->
                <section class="support-hero mb-3">
                    <h1 class="display-1">Help & Support</h1>
                    <p class="subtitle text-secondary">Everything you need to use TravelGenie smoothly.</p>
                </section>

                <!-- 2. About Section -->
                <section class="mb-3">
                    <div class="card about-card">
                        <h3><i class="fa-solid fa-circle-info text-primary"></i> About TravelGenie</h3>
                        <p class="mt-1">TravelGenie is an AI-powered travel planning assistant designed to make your journey seamless and safe.</p>
                        <div class="grid grid-3 mt-2">
                            <div class="feature-item">
                                <i class="fa-solid fa-wand-magic-sparkles"></i>
                                <span>Itinerary Generation</span>
                            </div>
                            <div class="feature-item">
                                <i class="fa-solid fa-chart-line"></i>
                                <span>Budget Optimization</span>
                            </div>
                            <div class="feature-item">
                                <i class="fa-solid fa-shield-heart"></i>
                                <span>Safety Evaluation</span>
                            </div>
                            <div class="feature-item">
                                <i class="fa-solid fa-hotel"></i>
                                <span>Hotel & Transport</span>
                            </div>
                            <div class="feature-item">
                                <i class="fa-solid fa-cloud-sun"></i>
                                <span>Weather Insights</span>
                            </div>
                            <div class="feature-item">
                                <i class="fa-solid fa-wind"></i>
                                <span>Live AQI Data</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 3. How To Use Section -->
                <section class="mb-3">
                    <h2 class="mb-2">How To Use The App</h2>
                    <div class="grid grid-5 steps-grid">
                        <div class="step-card">
                            <div class="step-number">1</div>
                            <i class="fa-solid fa-route"></i>
                            <p>Go to Smart Planner</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">2</div>
                            <i class="fa-solid fa-location-dot"></i>
                            <p>Enter Locations</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">3</div>
                            <i class="fa-solid fa-calendar-days"></i>
                            <p>Select Dates & Budget</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">4</div>
                            <i class="fa-solid fa-users-medical"></i>
                            <p>Add Travelers</p>
                        </div>
                        <div class="step-card">
                            <div class="step-number">5</div>
                            <i class="fa-solid fa-check-double"></i>
                            <p>Generate Itinerary</p>
                        </div>
                    </div>
                </section>

                <!-- 4. FAQ Section -->
                <section class="mb-3">
                    <h2 class="mb-2">Frequently Asked Questions</h2>
                    <div class="faq-accordion">
                        <div class="faq-item">
                            <button class="faq-question">
                                Why am I redirected to login?
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                            <div class="faq-answer">
                                <p>To protect your travel data and provide personalized recommendations, we require users to be logged in before accessing planning features.</p>
                            </div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">
                                How does Smart Planner work?
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                            <div class="faq-answer">
                                <p>Our AI analyzes your preferences, budget, and real-time data to create the most efficient and enjoyable travel plan possible.</p>
                            </div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">
                                How are safety warnings calculated?
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                            <div class="faq-answer">
                                <p>We cross-reference traveler medical conditions with destination-specific risks like altitude, climate, and air quality to provide accurate safety scores.</p>
                            </div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">
                                Are hotel & transport prices real?
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                            <div class="faq-answer">
                                <p>Yes, we use simulated real-time APIs to fetch current market rates for hotels, flights, trains, and buses.</p>
                            </div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">
                                How does currency conversion work?
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                            <div class="faq-answer">
                                <p>All internal logic uses USD. We use live exchange rate data to convert prices to your selected display currency.</p>
                            </div>
                        </div>
                        <div class="faq-item">
                            <button class="faq-question">
                                Why is my destination marked NOT RECOMMENDED?
                                <i class="fa-solid fa-chevron-down"></i>
                            </button>
                            <div class="faq-answer">
                                <p>A destination is marked as not recommended if it poses a significant health risk based on the medical conditions of your traveler group.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 5. Contact Section -->
                <section class="mb-3">
                    <div class="card contact-card">
                        <h2 class="mb-2">Still need help?</h2>
                        <div class="grid grid-3">
                            <div class="contact-method">
                                <i class="fa-solid fa-envelope text-primary"></i>
                                <h4>Email Support</h4>
                                <p>support@travelgenie.com</p>
                                <button class="btn-outline mt-1">Send Email</button>
                            </div>
                            <div class="contact-method">
                                <i class="fa-solid fa-phone-flip text-danger"></i>
                                <h4>Emergency Assistance</h4>
                                <p>24/7 Hotline Available</p>
                                <button class="btn-danger mt-1">Call Now</button>
                            </div>
                            <div class="contact-method">
                                <i class="fa-solid fa-message text-secondary"></i>
                                <h4>Feedback</h4>
                                <p>Help us improve!</p>
                                <button class="btn-secondary mt-1">Give Feedback</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        `;

        // Accordion Logic
        container.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const faqItem = button.parentElement;
                const isOpen = faqItem.classList.contains('active');
                
                // Close all other items
                container.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });

                // Toggle current item
                if (!isOpen) {
                    faqItem.classList.add('active');
                }
            });
        });

        return container;
    }

    window.App.Views.renderSupport = renderSupport;
})();
