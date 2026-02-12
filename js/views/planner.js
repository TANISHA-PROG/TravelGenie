(function() {
    function renderPlanner() {
        const store = window.App.Store;
        const state = store.getState();
        const container = document.createElement('div');
        
        container.innerHTML = `
            <div class="planner-layout">
                <!-- Left Panel: Input -->
                <div class="input-panel">
                    <div class="card">
                        <h2 class="mb-2"><i class="fa-solid fa-wand-magic-sparkles" style="color: var(--primary-color)"></i> Smart Trip Planner</h2>
                        <form id="planner-form">
                            <div class="form-group">
                                <label>Where are you starting from?</label>
                                <input type="text" id="start-location" value="${state.travelDetails.startLocation}" placeholder="e.g., London, New York" required>
                            </div>

                            <div class="form-group">
                                <label>Destination (Leave empty for AI suggestion)</label>
                                <input type="text" id="location" value="${state.travelDetails.destination}" placeholder="e.g., Tokyo, Swiss Alps">
                            </div>

                            <div class="grid grid-2">
                                <div class="form-group">
                                    <label>Travel Date</label>
                                    <input type="date" id="travel-date" value="${state.travelDetails.travelDate || new Date().toISOString().split('T')[0]}" required>
                                </div>
                                <div class="form-group">
                                    <label>Duration (Days)</label>
                                    <input type="number" id="days" value="${state.travelDetails.days}" min="1" max="30" required>
                                </div>
                            </div>

                            <div class="grid grid-2">
                                <div class="form-group">
                                    <label>Total Budget (${state.currentCurrency})</label>
                                    <input type="number" id="budget" value="${state.travelDetails.rawBudgetInput || ''}" placeholder="e.g., 15000" step="any" required>
                                </div>
                                <div class="form-group">
                                    <label>Comfort Level</label>
                                    <select id="comfort">
                                        <option value="cheap" ${state.travelDetails.comfortPreference === 'cheap' ? 'selected' : ''}>Cheap (Backpacker)</option>
                                        <option value="balanced" ${state.travelDetails.comfortPreference === 'balanced' ? 'selected' : ''}>Balanced (Standard)</option>
                                        <option value="comfortable" ${state.travelDetails.comfortPreference === 'comfortable' ? 'selected' : ''}>Comfortable (Premium)</option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Primary Transport</label>
                                <select id="transport">
                                    <option value="flight" ${state.travelDetails.transportMode === 'flight' ? 'selected' : ''}>Flight</option>
                                    <option value="train" ${state.travelDetails.transportMode === 'train' ? 'selected' : ''}>Train</option>
                                    <option value="bus" ${state.travelDetails.transportMode === 'bus' ? 'selected' : ''}>Bus</option>
                                    <option value="car" ${state.travelDetails.transportMode === 'car' ? 'selected' : ''}>Car Rental</option>
                                </select>
                            </div>

                            <div class="mt-2">
                                <h3><i class="fa-solid fa-users"></i> Travelers & Medical Conditions</h3>
                                <div id="travelers-container"></div>
                                <button type="button" id="add-traveler" class="btn-secondary mt-1"><i class="fa-solid fa-plus"></i> Add Traveler</button>
                            </div>

                            <button type="submit" class="btn-primary w-100 mt-2">
                                Generate My Itinerary <i class="fa-solid fa-magic"></i>
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Right Panel: Helper/Info -->
                <div class="helper-panel">
                    <div class="helper-card">
                        <h4><i class="fa-solid fa-lightbulb"></i> AI Pro-Tip</h4>
                        <p class="text-secondary" style="font-size: 0.9rem;">
                            Leaving the destination empty allows our AI to suggest a place based on your budget and preferred travel style!
                        </p>
                    </div>

                    <div class="helper-card">
                        <h4><i class="fa-solid fa-star"></i> Popular Right Now</h4>
                        <ul class="text-secondary" style="font-size: 0.9rem; list-style: none; padding-left: 0;">
                            <li class="mt-1"><i class="fa-solid fa-location-dot"></i> <strong>Kyoto, Japan</strong> - Cherry Blossom Season</li>
                            <li class="mt-1"><i class="fa-solid fa-location-dot"></i> <strong>Reykjavik, Iceland</strong> - Northern Lights</li>
                            <li class="mt-1"><i class="fa-solid fa-location-dot"></i> <strong>Santorini, Greece</strong> - Summer Escape</li>
                        </ul>
                    </div>

                    <div class="helper-card">
                        <h4><i class="fa-solid fa-circle-info"></i> Why use Smart Planner?</h4>
                        <p class="text-secondary" style="font-size: 0.9rem;">
                            Our engine analyzes over 10,000 data points including local prices, seasonal weather, and safety ratings to ensure your trip is perfect.
                        </p>
                    </div>

                    <div class="feature-card mt-2" style="padding: 1.5rem; background: #EEF2FF; border: none;">
                        <h4 style="margin-bottom: 0.5rem; color: var(--primary-color);">Need Inspiration?</h4>
                        <p class="text-secondary" style="font-size: 0.85rem; margin-bottom: 1rem;">Browse our curated collection of expert-approved destinations.</p>
                        <a href="#/destinations" class="btn-outline w-100" style="background: white;">View All Destinations</a>
                    </div>
                </div>
            </div>
        `;

        const travelersContainer = container.querySelector('#travelers-container');
        
        function renderTravelers() {
            const currentTravelers = store.getState().travelers;
            travelersContainer.innerHTML = currentTravelers.map((traveler, index) => `
                <div class="card" style="border: 1px solid #ddd; padding: 1rem; margin-top: 1rem;">
                    <div style="display:flex; justify-content:space-between;">
                        <h4>Traveler ${index + 1}</h4>
                        ${currentTravelers.length > 1 ? `<button type="button" class="btn-danger remove-traveler" data-id="${traveler.id}" style="padding: 2px 8px; font-size: 0.8rem;">Remove</button>` : ''}
                    </div>
                    
                    <div class="form-group mt-1">
                        <label>Age Group</label>
                        <select class="traveler-age" data-id="${traveler.id}">
                            <option value="adult" ${traveler.ageGroup === 'adult' ? 'selected' : ''}>Adult (18-60)</option>
                            <option value="child" ${traveler.ageGroup === 'child' ? 'selected' : ''}>Child (<18)</option>
                            <option value="senior" ${traveler.ageGroup === 'senior' ? 'selected' : ''}>Senior (60+)</option>
                        </select>
                    </div>

                    <label class="mt-1">Medical Conditions:</label>
                    <div class="grid grid-3" style="font-size: 0.9rem;">
                        ${['asthma', 'heart_disease', 'bp', 'diabetes', 'allergy', 'pregnancy', 'walking_difficulty', 'anxiety'].map(cond => `
                            <label>
                                <input type="checkbox" class="traveler-condition" data-id="${traveler.id}" value="${cond}" 
                                ${traveler.medicalConditions.includes(cond) ? 'checked' : ''}> ${cond.replace('_', ' ')}
                            </label>
                        `).join('')}
                    </div>
                </div>
            `).join('');

            // Attach listeners for dynamic inputs
            container.querySelectorAll('.traveler-age').forEach(select => {
                select.addEventListener('change', (e) => {
                    store.updateTraveler(parseInt(e.target.dataset.id), { ageGroup: e.target.value });
                });
            });

            container.querySelectorAll('.traveler-condition').forEach(checkbox => {
                checkbox.addEventListener('change', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    const traveler = store.getState().travelers.find(t => t.id === id);
                    let newConditions = [...traveler.medicalConditions];
                    if (e.target.checked) {
                        newConditions.push(e.target.value);
                    } else {
                        newConditions = newConditions.filter(c => c !== e.target.value);
                    }
                    store.updateTraveler(id, { medicalConditions: newConditions });
                });
            });

            container.querySelectorAll('.remove-traveler').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    store.removeTraveler(parseInt(e.target.dataset.id));
                    renderTravelers();
                });
            });
        }

        renderTravelers();

        container.querySelector('#add-traveler').addEventListener('click', () => {
            store.addTraveler();
            renderTravelers();
        });

        container.querySelector('#planner-form').addEventListener('submit', (e) => { 
            e.preventDefault(); 
 
            const budgetInput = container.querySelector('#budget'); 
            const startInput = container.querySelector('#start-location'); 
            const locationInput = container.querySelector('#location'); 
            const dateInput = container.querySelector('#travel-date'); 
            const daysInput = container.querySelector('#days'); 
            const transportInput = container.querySelector('#transport'); 
            const comfortInput = container.querySelector('#comfort'); 
 
            if (!budgetInput || !startInput || !daysInput) { 
                console.error('Planner inputs missing'); 
                return; 
            } 
 
            const rawBudget = parseFloat(budgetInput.value); 
 
            if (isNaN(rawBudget)) { 
                alert('Please enter a valid budget'); 
                return; 
            } 
 
            // Save logic: 
            // 1. Preserve raw input
            // 2. Convert to USD internally
            // 3. Keep track of the currency used at entry
            const budgetInUSD = parseFloat(store.convertToUSD(rawBudget)); 
 
            const formData = { 
                startLocation: startInput.value, 
                destination: locationInput.value, 
                travelDate: dateInput.value, 
                days: parseInt(daysInput.value), 
                rawBudgetInput: rawBudget,
                internalBudgetUSD: budgetInUSD,
                budgetCurrencyValue: state.currentCurrency,
                transportMode: transportInput.value, 
                comfortPreference: comfortInput.value 
            }; 

            store.setState({ 
                travelDetails: formData 
            }); 

            window.location.hash = '#/results'; 
        }); 

        return container;
    }

    window.App.Views.renderPlanner = renderPlanner;
})();
