(function() {
    function renderResults() {
        console.log('[Debug] renderResults entered');
        const store = window.App.Store;
        const state = store.getState();
        const { travelDetails, travelers } = state;
        
        // 1. DEFENSIVE CHECKS & REDIRECTS
        if (!travelDetails || !travelDetails.destination || !travelDetails.days || (!travelDetails.internalBudgetUSD && !travelDetails.rawBudgetInput)) {
            console.warn('[Debug] Missing critical travelDetails. Redirecting to planner.');
            window.location.hash = '#/planner';
            return document.createElement('div'); // Silent return to allow hash change
        }

        const container = document.createElement('div');
        container.className = 'results-view fade-in';
        
        // 2. INITIAL BASE UI (Skeleton/Loading state for dynamic parts)
        container.innerHTML = `
            <div class="results-layout">
                <div class="grid grid-2">
                    <div id="trip-summary-card" class="card">
                        <p><i class="fa-solid fa-spinner fa-spin"></i> Loading Trip Summary...</p>
                    </div>
                    <div id="safety-analysis-card" class="card">
                        <p><i class="fa-solid fa-spinner fa-spin"></i> Analyzing Safety...</p>
                    </div>
                </div>
                <div id="alternatives-container"></div>
                <div id="destination-details-container"></div>
                <div id="transport-container"></div>
                <div id="hotel-recommendations-container"></div>
                <div id="itinerary-container"></div>
            </div>
        `;

        // 3. EXECUTION FLOW
        try {
            const destination = travelDetails.destination;
            console.log(`[Debug] destination evaluated: ${destination}`);
            
            // Trigger background data refresh
            window.App.Utils.DataService.refreshForDestination(destination);

            // 4. EVALUATE & RENDER SYNC CONTENT
            const evaluation = window.App.Utils.Rules.evaluateLocation(destination, travelDetails, travelers);
            
            if (!evaluation) {
                console.error('[Debug] Evaluation failed for', destination);
                container.innerHTML = `
                    <div class="card text-center">
                        <h2><i class="fa-solid fa-triangle-exclamation text-danger"></i> Data Unavailable</h2>
                        <p>We couldn't process data for "${destination}". Please try a different location.</p>
                        <a href="#/planner" class="btn-primary mt-1">Back to Planner</a>
                    </div>
                `;
                return container;
            }

            renderSyncCards(container, evaluation, travelDetails, travelers, store);
            
            // 5. ITINERARY GENERATION (Guaranteed if days > 0)
            renderItinerary(container, evaluation.location, travelDetails.days);

            // 6. ASYNC MODULES (Transport & Hotels)
            loadDynamicModules(container, evaluation, travelDetails, travelers, store);

        } catch (error) {
            console.error('[Debug] Fatal error in renderResults:', error);
            container.innerHTML = `
                <div class="card text-center">
                    <h2><i class="fa-solid fa-circle-xmark text-danger"></i> Something went wrong</h2>
                    <p>Data temporarily unavailable – please refresh.</p>
                    <button onclick="window.location.reload()" class="btn-primary mt-1">Refresh Page</button>
                </div>
            `;
        }

        return container;
    }

    function renderSyncCards(container, evaluation, travelDetails, travelers, store) {
        const isSafe = evaluation.status !== '❌ NOT RECOMMENDED';
        const summaryCard = container.querySelector('#trip-summary-card');
        const safetyCard = container.querySelector('#safety-analysis-card');

        summaryCard.innerHTML = `
            <h2><i class="fa-solid fa-suitcase"></i> Trip Summary</h2>
            <div style="font-size: 1.2rem; margin: 1rem 0; font-weight: bold;">
                Status: <span class="${evaluation.status === '✅ SAFE' ? 'text-success' : evaluation.status === '❌ NOT RECOMMENDED' ? 'text-danger' : 'text-warning'}">
                    ${evaluation.status}
                </span>
            </div>
            <p><strong>Destination:</strong> ${evaluation.location.name}</p>
            <p><strong>Duration:</strong> ${travelDetails.days} Days</p>
            <p><strong>Travelers:</strong> ${travelers.length}</p>
            <p><strong>Total Cost:</strong> ${store.formatPrice(evaluation.costEstimate)}</p>
            ${!isSafe ? `<button id="force-proceed-btn" class="btn-warning mt-1 w-100">⚠️ Show Details Anyway</button>` : ''}
        `;

        const warningsHtml = evaluation.warnings.length > 0 
            ? `<div class="warnings-list">
                ${evaluation.warnings.map(w => `
                    <div class="warning-item ${w.status}" style="padding: 0.5rem; margin-bottom: 0.5rem; border-radius: 4px; background: ${w.status === 'not_recommended' ? '#fee2e2' : '#fef3c7'}; color: ${w.status === 'not_recommended' ? '#991b1b' : '#92400e'};">
                        <strong>${w.status === 'not_recommended' ? '⛔' : '⚠️'} [${w.type.toUpperCase()}]</strong> ${w.message}
                    </div>
                `).join('')}
               </div>`
            : '<p class="text-success"><i class="fa-solid fa-check-circle"></i> No warnings. This trip looks great!</p>';

        safetyCard.innerHTML = `
            <h2><i class="fa-solid fa-shield-virus"></i> Safety Analysis</h2>
            ${warningsHtml}
        `;

        // Destination Details Base
        const detailsContainer = container.querySelector('#destination-details-container');
        const loc = evaluation.location;
        detailsContainer.innerHTML = `
            <div id="destination-details" style="${!isSafe ? 'display:none;' : ''}">
                <div class="card" style="margin-top: 2rem; padding: 0; overflow: hidden;">
                    <div style="height: 300px; background: url('${loc.image || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop'}') center/cover; position: relative;">
                        <div style="position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 2rem; color: white;">
                            <h1>${loc.name || 'Destination'}</h1>
                            <p><i class="fa-solid fa-location-dot"></i> ${(loc.category || 'Travel').toUpperCase()}</p>
                        </div>
                    </div>
                    <div class="grid grid-3" style="padding: 2rem; background: var(--card-bg);">
                        <div id="weather-info">
                            <h3><i class="fa-solid fa-temperature-half"></i> Weather</h3>
                            <p>Climate: ${loc.climate || 'N/A'}</p>
                            <p id="live-weather-text">Loading live weather...</p>
                            <p id="live-aqi-text">Loading live AQI...</p>
                        </div>
                        <div>
                            <h3><i class="fa-solid fa-notes-medical"></i> Safety</h3>
                            <p>Rating: ${loc.safety_rating || 'N/A'} / 5</p>
                            <p>Hospitals: ${(loc.hospitals || []).length} Nearby</p>
                        </div>
                        <div>
                            <h3><i class="fa-solid fa-star"></i> Reviews</h3>
                            <p>Rating: ${loc.reviews || 'N/A'} / 5</p>
                        </div>
                    </div>
                    <div class="grid grid-2" style="padding: 0 2rem 2rem;">
                         <div style="background: #dcfce7; padding: 1rem; border-radius: 8px;">
                            <h3 class="text-success">✅ Do's</h3>
                            <ul>${(loc.dos || ['Enjoy your trip', 'Stay safe']).map(d => `<li>${d}</li>`).join('')}</ul>
                        </div>
                        <div style="background: #fee2e2; padding: 1rem; border-radius: 8px;">
                            <h3 class="text-danger">❌ Don'ts</h3>
                            <ul>${(loc.donts || ['Don\'t litter', 'Respect locals']).map(d => `<li>${d}</li>`).join('')}</ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        if (!isSafe) {
            container.querySelector('#force-proceed-btn')?.addEventListener('click', () => {
                container.querySelector('#destination-details').style.display = 'block';
                container.querySelector('#force-proceed-btn').style.display = 'none';
            });
        }
    }

    function renderItinerary(container, location, days) {
        console.log(`[Debug] itinerary generated for ${days} days`);
        const itineraryContainer = container.querySelector('#itinerary-container');
        const attractions = location.attractions || ['Local Market', 'City Center', 'Main Square', 'Local Cafe', 'Public Park'];
        
        itineraryContainer.innerHTML = `
            <div class="card" style="margin-top: 2rem;">
                <h2><i class="fa-solid fa-map"></i> Your Itinerary</h2>
                <div style="text-align: left; margin-top: 1rem;">
                    ${Array.from({length: days}).map((_, i) => `
                        <div style="border-left: 3px solid var(--primary-color); padding-left: 1rem; margin-bottom: 1rem;">
                            <h4>Day ${i+1}</h4>
                            <p>Morning: Visit ${attractions[i % attractions.length]}</p>
                            <p>Afternoon: Rest & Lunch at Local Cafe</p>
                            <p>Evening: ${i === 0 ? 'Relax' : 'City Walk / Sunset View'}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    async function loadDynamicModules(container, evaluation, travelDetails, travelers, store) {
        const locName = evaluation.location.name;

        // 1. Weather/AQI (Background update)
        setTimeout(() => {
            const liveWeather = store.getLiveWeather(locName);
            const liveAQI = store.getLiveAQI(locName);
            const weatherText = container.querySelector('#live-weather-text');
            const aqiText = container.querySelector('#live-aqi-text');

            if (weatherText) weatherText.innerHTML = liveWeather?.current ? `Current: ${Math.round(liveWeather.current.temperature)}°C` : 'Weather data updated.';
            if (aqiText) aqiText.innerHTML = `<i class="fa-solid fa-wind"></i> AQI: ${liveAQI?.current || evaluation.location.avg_aqi}`;
        }, 1000);

        // 2. Transport
        console.log('[Debug] transport fetch triggered');
        const transportContainer = container.querySelector('#transport-container');
        try {
            const transportData = await window.App.Utils.Transport.fetchTransportData(
                travelDetails.startLocation || 'New Delhi',
                locName,
                travelDetails.travelDate,
                travelDetails.transportMode || 'all'
            );
            const processed = window.App.Utils.Transport.processTransport(transportData.options, {
                comfortPreference: travelDetails.comfortPreference,
                currentCurrency: store.getState().currentCurrency
            }, travelers);

            transportContainer.innerHTML = `
                <div class="card" style="margin-top: 2rem;">
                    <h2><i class="fa-solid fa-plane-departure"></i> Transport Options</h2>
                    <div class="grid grid-3 mt-1">
                        ${processed.map(t => `
                            <div class="card" style="border: 1px solid #eee; border-left: 4px solid ${t.finalScore < 50 ? 'var(--danger-color)' : 'var(--success-color)'}">
                                <h3>${t.provider}</h3>
                                <p class="text-primary" style="font-weight:bold">${store.formatPrice(t.price_usd)}</p>
                                <p style="font-size:0.8rem">${t.departure} - ${t.arrival}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } catch (e) {
            console.error('[Debug] Transport fetch failed', e);
            transportContainer.innerHTML = '<div class="card text-center"><p class="text-danger">Transport data temporarily unavailable – please refresh.</p></div>';
        }

        // 3. Hotels
        console.log('[Debug] hotels fetch triggered');
        const hotelContainer = container.querySelector('#hotel-recommendations-container');
        try {
            const hotelData = await window.App.Utils.Hotels.fetchHotels(locName);
            const processed = window.App.Utils.Hotels.processHotels(hotelData.hotels, travelDetails, travelers);
            hotelContainer.innerHTML = `
                <div class="card" style="margin-top: 2rem;">
                    <h2><i class="fa-solid fa-hotel"></i> Recommended Stays</h2>
                    <div class="grid grid-3 mt-1">
                        ${processed.map(h => `
                            <div class="card" style="padding:0; overflow:hidden">
                                <div style="height:120px; background:url('${h.image}') center/cover"></div>
                                <div style="padding:1rem">
                                    <h4>${h.name}</h4>
                                    <p class="text-primary">${store.formatPrice(h.price_usd)}/nt</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        } catch (e) {
            console.error('[Debug] Hotels fetch failed', e);
            hotelContainer.innerHTML = '<div class="card text-center"><p class="text-danger">Hotel data temporarily unavailable – please refresh.</p></div>';
        }
    }

    window.App.Views.renderResults = renderResults;
})();
