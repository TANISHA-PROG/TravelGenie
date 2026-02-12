(function() {
    // 1. CURATED LOCAL HOTEL DATABASE
    const localHotelDatabase = {
        'paris': [
            { id: 'p1', name: 'Hotel Le Meurice', type: 'luxury', price_usd: 800, rating: 4.8, safety_score: 5, amenities: ['lift', 'doctor_on_call', 'wheelchair_access', 'wifi', 'ac'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', distance_km: 0.5 },
            { id: 'p2', name: 'Ibis Paris Tour Eiffel', type: 'mid-range', price_usd: 150, rating: 4.2, safety_score: 4, amenities: ['lift', 'wifi', 'breakfast'], image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80', distance_km: 2.0 },
            { id: 'p3', name: 'St Christopher\'s Inn', type: 'budget', price_usd: 40, rating: 3.8, safety_score: 3, amenities: ['wifi', 'laundry'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80', distance_km: 3.5 }
        ],
        'tokyo': [
            { id: 't1', name: 'Aman Tokyo', type: 'luxury', price_usd: 900, rating: 4.9, safety_score: 5, amenities: ['lift', 'doctor_on_call', 'wheelchair_access', 'spa'], image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80', distance_km: 0.2 },
            { id: 't2', name: 'Hotel Gracery Shinjuku', type: 'mid-range', price_usd: 180, rating: 4.4, safety_score: 5, amenities: ['lift', 'wifi', 'ac'], image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=400&q=80', distance_km: 1.0 }
        ],
        'amritsar': [
            { id: 'a1', name: 'Taj Swarna', type: 'luxury', price_usd: 120, rating: 4.7, safety_score: 5, amenities: ['lift', 'doctor_on_call', 'wheelchair_access', 'pool'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', distance_km: 4.0 },
            { id: 'a2', name: 'Hotel City Park', type: 'mid-range', price_usd: 50, rating: 4.0, safety_score: 4, amenities: ['lift', 'wifi', 'restaurant'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', distance_km: 1.5 },
            { id: 'a3', name: 'Backpackers Nest', type: 'budget', price_usd: 15, rating: 4.1, safety_score: 4, amenities: ['wifi', 'lockers'], image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80', distance_km: 0.8 }
        ],
         'rishikesh': [
            { id: 'r1', name: 'Aloha on the Ganges', type: 'luxury', price_usd: 150, rating: 4.6, safety_score: 5, amenities: ['lift', 'doctor_on_call', 'wheelchair_access', 'yoga'], image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=400&q=80', distance_km: 2.0 },
            { id: 'r2', name: 'Zostel Rishikesh', type: 'budget', price_usd: 20, rating: 4.5, safety_score: 4, amenities: ['wifi', 'social_area'], image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80', distance_km: 1.5 }
        ],
        'badrinath': [
            { id: 'b1', name: 'Sarovar Portico', type: 'luxury', price_usd: 180, rating: 4.3, safety_score: 5, amenities: ['heating', 'doctor_on_call', 'restaurant'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', distance_km: 0.5 },
            { id: 'b2', name: 'Narayan Palace', type: 'mid-range', price_usd: 80, rating: 3.9, safety_score: 4, amenities: ['heating', 'hot_water'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', distance_km: 0.8 }
        ],
        'manali': [
             { id: 'm1', name: 'Span Resort & Spa', type: 'luxury', price_usd: 200, rating: 4.8, safety_score: 5, amenities: ['heating', 'doctor_on_call', 'wheelchair_access'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', distance_km: 10.0 },
             { id: 'm2', name: 'Hotel Mountain Top', type: 'mid-range', price_usd: 60, rating: 4.1, safety_score: 4, amenities: ['wifi', 'parking'], image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', distance_km: 1.5 }
        ]
    };

    // Helper to generate random hotels if not in database (Simulated API)
    function generateMockHotels(destinationName) {
        return [
            { 
                id: 'gen1', 
                name: `Grand Hotel ${destinationName}`, 
                type: 'luxury', 
                price_usd: 250, 
                rating: 4.5, 
                safety_score: 5, 
                amenities: ['lift', 'doctor_on_call', 'wifi', 'gym'], 
                image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
                distance_km: 1.2
            },
            { 
                id: 'gen2', 
                name: `${destinationName} City Stay`, 
                type: 'mid-range', 
                price_usd: 90, 
                rating: 4.0, 
                safety_score: 4, 
                amenities: ['wifi', 'ac', 'breakfast'], 
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80',
                distance_km: 2.5
            },
            { 
                id: 'gen3', 
                name: `${destinationName} Backpackers`, 
                type: 'budget', 
                price_usd: 30, 
                rating: 3.8, 
                safety_score: 3, 
                amenities: ['wifi', 'laundry'], 
                image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80',
                distance_km: 4.0
            }
        ];
    }

    // 2. FETCH HOTELS FUNCTION
    function fetchHotels(destination) {
        return new Promise((resolve) => {
            // Simulate network delay
            setTimeout(() => {
                const key = destination.toLowerCase();
                let data = localHotelDatabase[key];
                let source = 'Curated Database';

                // If not in local DB, generate mock data (Simulating Real-time API fetch)
                if (!data) {
                    data = generateMockHotels(destination);
                    source = 'Live Partner API (Simulated)';
                }

                resolve({
                    hotels: data,
                    source: source,
                    timestamp: new Date().toLocaleTimeString()
                });
            }, 800);
        });
    }

    // 3. FILTER & RANK LOGIC
    function processHotels(hotels, travelDetails, travelers) {
        const { internalBudgetUSD, rawBudgetInput, days } = travelDetails;
        const budgetUSD = internalBudgetUSD || 0;
        const budgetPerNight = budgetUSD / days;

        // Medical Needs
        const hasWheelchairNeed = travelers.some(t => t.medicalConditions.includes('walking_difficulty'));
        const hasHeartBP = travelers.some(t => t.medicalConditions.includes('heart_disease') || t.medicalConditions.includes('bp'));
        const hasSeniors = travelers.some(t => t.ageGroup === 'senior');

        return hotels.map(hotel => {
            // 1. Suitability Scoring
            let medicalScore = 0;
            let tags = [];

            if (hotel.amenities.includes('doctor_on_call')) {
                medicalScore += 20;
                tags.push('Doctor on Call');
            }
            if (hotel.amenities.includes('wheelchair_access') || hotel.amenities.includes('lift')) {
                medicalScore += 20;
                tags.push('Accessible');
            }
            if (hotel.amenities.includes('heating') || hotel.amenities.includes('ac')) {
                medicalScore += 10; // Climate control good for health
            }

            // Penalty if critical need missing
            if (hasWheelchairNeed && !hotel.amenities.includes('wheelchair_access') && !hotel.amenities.includes('lift')) {
                medicalScore -= 50;
            }
            if ((hasHeartBP || hasSeniors) && !hotel.amenities.includes('lift') && !hotel.amenities.includes('ground_floor')) {
                 // Assuming luxury/mid-range usually have lifts, but budget might not
            }

            // 2. Categorization
            let category = hotel.type; // already set
            if (medicalScore >= 30) category = 'medical-friendly';

            // 3. Feasibility
            const costForTrip = hotel.price_usd * days;
            const isWithinBudget = hotel.price_usd <= (budgetPerNight * 1.2); // Allow 20% flex

            return {
                ...hotel,
                medicalScore,
                finalScore: (hotel.rating * 10) + (hotel.safety_score * 10) + medicalScore - (hotel.price_usd / 10), // Weighted score
                tags,
                isWithinBudget,
                totalCost: costForTrip
            };
        })
        .filter(h => h.isWithinBudget || h.type === 'luxury') // Show luxury even if over budget as upsell, or filter strictly? Let's keep strict if 'budget' preference, but let's be lenient
        .sort((a, b) => b.finalScore - a.finalScore); // Rank by score
    }

    window.App.Utils.Hotels = {
        fetchHotels,
        processHotels
    };
})();