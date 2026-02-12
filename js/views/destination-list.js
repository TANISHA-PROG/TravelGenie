(function() {
    function renderDestinationList() {
        const store = window.App.Store.getState();
        const locations = window.App.Utils.Rules.locationDatabase;
        
        const container = document.createElement('div');
        
        // Header & Filters
        let html = `
            <div class="page-header">
                <h1>Explore Destinations</h1>
                <p>Find safe and budget-friendly locations for your trip.</p>
            </div>
            
            <div class="filters-bar card">
                <div class="grid grid-4">
                    <div class="form-group">
                        <label>Filter by Type</label>
                        <select id="filter-type">
                            <option value="all">All Types</option>
                            <option value="hill_station">Hill Station</option>
                            <option value="beach">Beach</option>
                            <option value="city">City</option>
                            <option value="religious">Religious</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Max Budget (per day)</label>
                        <input type="number" id="filter-budget" placeholder="Max $">
                    </div>
                    <div class="form-group">
                        <label>Min Safety Rating</label>
                        <select id="filter-safety">
                            <option value="0">Any</option>
                            <option value="4">4+ Stars (Safe)</option>
                            <option value="5">5 Stars (Very Safe)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Search</label>
                        <input type="text" id="filter-search" placeholder="Search name...">
                    </div>
                </div>
            </div>

            <div id="destinations-grid" class="grid grid-3" style="margin-top: 2rem;">
                <!-- Destinations will be injected here -->
            </div>
        `;
        
        container.innerHTML = html;

        const grid = container.querySelector('#destinations-grid');
        const filterType = container.querySelector('#filter-type');
        const filterBudget = container.querySelector('#filter-budget');
        const filterSafety = container.querySelector('#filter-safety');
        const filterSearch = container.querySelector('#filter-search');

        function renderGrid() {
            grid.innerHTML = '';
            
            const type = filterType.value;
            const budget = parseFloat(filterBudget.value) || Infinity;
            const safety = parseInt(filterSafety.value);
            const search = filterSearch.value.toLowerCase();

            Object.values(locations).forEach(loc => {
                // Apply filters
                if (type !== 'all' && loc.category !== type) return;
                if (loc.avg_daily_cost > budget) return;
                if (loc.safety_rating < safety) return;
                if (!loc.name.toLowerCase().includes(search)) return;

                // Create Card
                const card = document.createElement('div');
                card.className = 'card destination-card';
                card.style.padding = '0';
                card.style.overflow = 'hidden';
                
                // Color code AQI (prefer live)
                const liveAQI = window.App.Store.getLiveAQI(loc.name);
                const aqiValue = (liveAQI && typeof liveAQI.current === 'number') ? liveAQI.current : loc.avg_aqi;
                let aqiColor = 'green';
                if (aqiValue > 50) aqiColor = 'orange';
                if (aqiValue > 100) aqiColor = 'red';

                card.innerHTML = `
                    <div style="height: 200px; background: url('${loc.image}') center/cover;">
                        <span style="position: absolute; top: 10px; right: 10px; background: white; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 0.8rem;">
                            ⭐ ${loc.reviews}
                        </span>
                    </div>
                    <div style="padding: 1.5rem;">
                        <h3>${loc.name}</h3>
                        <p class="text-muted" style="text-transform: capitalize;">${loc.category.replace('_', ' ')}</p>
                        
                        <div style="display: flex; justify-content: space-between; margin: 1rem 0; font-size: 0.9rem;">
                            <span style="color: ${aqiColor}"><i class="fa-solid fa-wind"></i> AQI ${aqiValue}</span>
                            <span><i class="fa-solid fa-shield-halved"></i> Safety ${loc.safety_rating}/5</span>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: bold; color: var(--primary-color);">${window.App.Store.formatPrice(loc.avg_daily_cost)} / day</span>
                            <button class="button btn-select" data-name="${loc.name}">Plan Trip</button>
                        </div>
                    </div>
                `;
                
                card.querySelector('.btn-select').addEventListener('click', () => {
                    // Update store with selected destination
                    window.App.Store.setState({
                        travelDetails: {
                            ...store.travelDetails,
                            destination: loc.name
                        }
                    });
                    // Navigate to Planner
                    window.location.hash = '#/planner';
                });

                grid.appendChild(card);

                (async () => {
                    const firstDiv = card.querySelector('div');
                    const attraction = (loc.attractions && loc.attractions[0]) || loc.name;
                    const url = await window.App.Utils.DataService.fetchGooglePhoto(attraction, loc.name);
                    if (url && firstDiv) {
                        firstDiv.style.background = `url('${url}') center/cover`;
                    }
                })();

            });

            if (grid.children.length === 0) {
                grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No destinations match your filters.</p>';
            }
        }

        // Event Listeners
        [filterType, filterBudget, filterSafety, filterSearch].forEach(el => {
            el.addEventListener('input', renderGrid);
        });

        renderGrid(); // Initial render

        return container;
    }

    window.App.Views.renderDestinationList = renderDestinationList;
})();
