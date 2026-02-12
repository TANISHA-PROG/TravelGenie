(function() {
    // Mock data for location attributes
    const locationDatabase = {
        'paris': { altitude: 'low', climate: 'moderate', terrain: 'flat', type: 'city' },
        'tokyo': { altitude: 'low', climate: 'moderate', terrain: 'flat', type: 'city' },
        'ladakh': { altitude: 'high', climate: 'cold', terrain: 'hilly', type: 'mountain' },
        'manali': { altitude: 'medium', climate: 'cold', terrain: 'hilly', type: 'mountain' },
        'goa': { altitude: 'low', climate: 'humid', terrain: 'flat', type: 'beach' },
        'dubai': { altitude: 'low', climate: 'hot', terrain: 'flat', type: 'desert' },
        'swiss alps': { altitude: 'high', climate: 'cold', terrain: 'hilly', type: 'mountain' },
        'singapore': { altitude: 'low', climate: 'humid', terrain: 'flat', type: 'city' }
    };

    function checkMedicalSafety(location, conditions) {
        const warnings = [];
        const locKey = location.toLowerCase();
        const locData = locationDatabase[locKey];

        if (!locData) {
            return warnings; 
        }

        conditions.forEach(condition => {
            switch (condition) {
                case 'asthma':
                    if (locData.climate === 'cold' || locData.climate === 'humid') {
                        warnings.push({
                            level: 'warning',
                            msg: `Weather in ${location} might trigger Asthma (Cold/Humid). Carry inhalers.`
                        });
                    }
                    if (locData.altitude === 'high') {
                        warnings.push({
                            level: 'danger',
                            msg: `High altitude in ${location} is risky for Asthma patients.`
                        });
                    }
                    break;
                case 'heart':
                    if (locData.altitude === 'high' || locData.terrain === 'hilly') {
                        warnings.push({
                            level: 'danger',
                            msg: `High altitude or steep terrain in ${location} is NOT recommended for Heart Conditions.`
                        });
                    }
                    break;
                case 'mobility':
                    if (locData.terrain === 'hilly' || locData.type === 'mountain') {
                        warnings.push({
                            level: 'warning',
                            msg: `${location} has hilly terrain which may be difficult for mobility.`
                        });
                    }
                    break;
                case 'pregnancy':
                    if (locData.type === 'adventure' || locData.terrain === 'hilly') {
                        warnings.push({
                            level: 'warning',
                            msg: `Avoid strenuous activities in ${location}.`
                        });
                    }
                    break;
                case 'altitude':
                    if (locData.altitude === 'high' || locData.altitude === 'medium') {
                        warnings.push({
                            level: 'danger',
                            msg: `High altitude alert for ${location}.`
                        });
                    }
                    break;
            }
        });

        return warnings;
    }

    function suggestAlternative(conditions) {
        const safePlaces = ['Paris', 'Dubai', 'Goa', 'Singapore'];
        if (conditions.includes('asthma')) {
            return safePlaces.filter(p => p !== 'Goa' && p !== 'Singapore'); // Remove humid
        }
        return safePlaces;
    }

    window.App.Utils.checkMedicalSafety = checkMedicalSafety;
    window.App.Utils.suggestAlternative = suggestAlternative;
})();
