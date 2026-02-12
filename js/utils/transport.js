(function() {
    // 1. MOCK TRANSPORT DATABASE
    const transportDatabase = {
        'flights': [
            { id: 'f1', provider: 'Air India', number: 'AI-101', type: 'flight', base_price_usd: 120, duration_mins: 150, safety_rating: 5, departure: '08:00', arrival: '10:30' },
            { id: 'f2', provider: 'IndiGo', number: '6E-453', type: 'flight', base_price_usd: 90, duration_mins: 160, safety_rating: 4, departure: '14:00', arrival: '16:40' },
            { id: 'f3', provider: 'Vistara', number: 'UK-888', type: 'flight', base_price_usd: 140, duration_mins: 145, safety_rating: 5, departure: '18:00', arrival: '20:25' }
        ],
        'trains': [
            { id: 't1', provider: 'Indian Railways', number: '12050', type: 'train', base_price_usd: 20, duration_mins: 480, safety_rating: 4, departure: '06:00', arrival: '14:00' },
            { id: 't2', provider: 'Indian Railways', number: '22439', type: 'train', base_price_usd: 15, duration_mins: 540, safety_rating: 3, departure: '22:00', arrival: '07:00' }
        ],
        'buses': [
            { id: 'b1', provider: 'ZingBus', number: 'ZB-Lux', type: 'bus', base_price_usd: 25, duration_mins: 600, safety_rating: 4, departure: '21:00', arrival: '07:00' },
            { id: 'b2', provider: 'IntrCity', number: 'SmartBus', type: 'bus', base_price_usd: 18, duration_mins: 660, safety_rating: 3, departure: '20:00', arrival: '07:00' }
        ]
    };

    // 2. MOCK API FUNCTIONS
    function fetchTransportData(start, end, date, mode) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let options = [];
                const source = 'Live API (Simulated)';
                const timestamp = new Date().toLocaleTimeString();

                // Generate mock options based on mode
                if (mode === 'flight' || mode === 'all') {
                    options = [...options, ...transportDatabase.flights.map(f => ({...f, id: f.id + Math.random()}))];
                }
                if (mode === 'train' || mode === 'all') {
                    options = [...options, ...transportDatabase.trains.map(t => ({...t, id: t.id + Math.random()}))];
                }
                if (mode === 'bus' || mode === 'all') {
                    options = [...options, ...transportDatabase.buses.map(b => ({...b, id: b.id + Math.random()}))];
                }
                
                // Add distance/price variations based on location names hash
                const distFactor = (start.length + end.length) * 10; 
                options = options.map(opt => {
                    const price = opt.base_price_usd + (distFactor / 10);
                    return {
                        ...opt,
                        price_usd: parseFloat(price.toFixed(2)),
                        origin: start,
                        destination: end,
                        date: date,
                        isRealTime: Math.random() > 0.2 // 80% chance of real-time
                    };
                });

                // Mock Route Details for Road Travel
                let routeDetails = null;
                if (mode === 'bus' || mode === 'car') {
                    routeDetails = getRouteDetails(start, end);
                }

                resolve({
                    options,
                    source,
                    timestamp,
                    routeDetails
                });
            }, 1000);
        });
    }

    // 3. RANKING & FILTERING LOGIC
    function processTransport(options, preferences, travelers) {
        const { comfortPreference, currentCurrency } = preferences;
        const store = window.App.Store;

        // Medical/Safety Checks
        const hasMedicalConditions = travelers.some(t => t.medicalConditions.length > 0);
        const hasSeniors = travelers.some(t => t.ageGroup === 'senior');
        const hasPregnancy = travelers.some(t => t.medicalConditions.includes('pregnancy'));

        return options.map(opt => {
            let score = 100;
            let warnings = [];

            // Price Score (Lower is better)
            score -= (opt.price_usd / 10);

            // Duration Score (Lower is better)
            score -= (opt.duration_mins / 60);

            // Safety Checks
            if (hasPregnancy && opt.type === 'bus') {
                score -= 50;
                warnings.push('Bus travel not recommended for pregnancy');
            }
            if (hasSeniors && opt.type === 'bus' && opt.duration_mins > 240) {
                score -= 30;
                warnings.push('Long bus journey may be uncomfortable for seniors');
            }
            if (opt.safety_rating < 4 && hasMedicalConditions) {
                score -= 20;
                warnings.push('Low safety rating transport');
            }

            // Real-time confidence
            if (!opt.isRealTime) {
                score -= 5;
                warnings.push('Using cached data (Low Confidence)');
            }

            return {
                ...opt,
                finalScore: score,
                warnings,
                formattedPrice: store.formatPrice(opt.price_usd),
                formattedDuration: `${Math.floor(opt.duration_mins/60)}h ${opt.duration_mins%60}m`
            };
        })
        .sort((a, b) => {
            if (preferences.sortBy === 'cheapest') return a.price_usd - b.price_usd;
            if (preferences.sortBy === 'safest') return b.safety_rating - a.safety_rating;
            if (preferences.sortBy === 'fastest') return a.duration_mins - b.duration_mins;
            return b.finalScore - a.finalScore; // Default smart ranking
        });
    }

    // 4. GOOGLE MAPS HELPERS (Mock)
    function getDistanceMatrix(start, end) {
        // Mock distance calculation
        return Math.floor(Math.random() * 500) + 100; // km
    }

    function getRouteDetails(start, end) {
        // Mock Google Maps Directions API response
        return {
            summary: `Route via NH-44`,
            distance_km: Math.floor(Math.random() * 500) + 200,
            duration_hours: Math.floor(Math.random() * 5) + 5,
            traffic_condition: Math.random() > 0.7 ? 'Heavy' : 'Normal',
            safety_score: Math.random() > 0.8 ? 3 : 5, // Random risky route
            warnings: Math.random() > 0.8 ? ['Night travel risky on this route', 'Landslide prone area'] : [],
            steps: [
                `Start at ${start}`,
                `Take Highway 1`,
                `Cross River Bridge`,
                `Arrive at ${end}`
            ]
        };
    }

    window.App.Utils.Transport = {
        fetchTransportData,
        processTransport,
        getDistanceMatrix,
        getRouteDetails
    };
})();