(function() {
    class Store {
        constructor() {
            // Load state from localStorage if available (mock persistence)
            const savedUser = localStorage.getItem('travelGenie_user');
            const savedCurrency = localStorage.getItem('travelGenie_currency');
            const savedTravelDetails = localStorage.getItem('travelGenie_travelDetails');
            const savedTravelers = localStorage.getItem('travelGenie_travelers');
            
            this.state = {
                auth: {
                    isAuthenticated: !!savedUser,
                    user: savedUser ? JSON.parse(savedUser) : null,
                },
                travelDetails: savedTravelDetails ? JSON.parse(savedTravelDetails) : {
                    startLocation: '',
                    destination: '',
                    travelDate: new Date().toISOString().split('T')[0],
                    days: 3,
                    rawBudgetInput: 0,
                    internalBudgetUSD: 0,
                    budgetCurrencyValue: savedCurrency || 'USD',
                    transportMode: 'flight',
                    comfortPreference: 'balanced'
                },
                travelers: savedTravelers ? JSON.parse(savedTravelers) : [
                    {
                        id: 1,
                        ageGroup: 'adult',
                        medicalConditions: [],
                        otherMedicalNotes: ''
                    }
                ],
                currentCurrency: savedCurrency || 'USD',
                currencies: {
                    'USD': 1,
                    'EUR': 0.92,
                    'GBP': 0.79,
                    'INR': 83.5,
                    'JPY': 150
                },
                reviews: [] // App reviews
            };
            this.listeners = [];
        }

        // Live caches
        initLive() {
            if (!this.state.live) {
                this.state.live = {
                    weather: {}, // name -> {current, daily, alerts, fetchedAt, lat, lon}
                    aqi: {},     // name -> {current, hourly, trend, fetchedAt, lat, lon}
                    exchangeFetchedAt: null
                };
            }
        }

        getState() {
            return this.state;
        }

        setState(newState) {
            this.state = { ...this.state, ...newState };
            
            // Persist travel state
            if (newState.travelDetails) {
                localStorage.setItem('travelGenie_travelDetails', JSON.stringify(this.state.travelDetails));
            }
            if (newState.travelers) {
                localStorage.setItem('travelGenie_travelers', JSON.stringify(this.state.travelers));
            }
            if (newState.currentCurrency) {
                localStorage.setItem('travelGenie_currency', this.state.currentCurrency);
                
                // If currency changes, we may want to update internalBudgetUSD for existing rawBudgetInput
                if (this.state.travelDetails && this.state.travelDetails.rawBudgetInput) {
                    const updatedBudgetUSD = parseFloat(this.convertToUSD(this.state.travelDetails.rawBudgetInput));
                    this.state.travelDetails.internalBudgetUSD = updatedBudgetUSD;
                    this.state.travelDetails.budgetCurrencyValue = this.state.currentCurrency;
                    localStorage.setItem('travelGenie_travelDetails', JSON.stringify(this.state.travelDetails));
                }
            }
            
            this.notify();
        }

        // Live data setters/getters
        setLiveWeather(name, data) {
            this.initLive();
            const key = (name || '').toLowerCase();
            this.state.live.weather[key] = data;
            this.notify();
        }

        getLiveWeather(name) {
            this.initLive();
            const key = (name || '').toLowerCase();
            return this.state.live.weather[key] || null;
        }

        setLiveAQI(name, data) {
            this.initLive();
            const key = (name || '').toLowerCase();
            this.state.live.aqi[key] = data;
            this.notify();
        }

        getLiveAQI(name) {
            this.initLive();
            const key = (name || '').toLowerCase();
            return this.state.live.aqi[key] || null;
        }

        setExchangeRates(rates, fetchedAt) {
            // Merge known rates into currencies
            this.state.currencies = { ...this.state.currencies, ...rates };
            this.initLive();
            this.state.live.exchangeFetchedAt = fetchedAt || Date.now();
            localStorage.setItem('travelGenie_currency_rates_fetched', String(this.state.live.exchangeFetchedAt));
            this.notify();
        }

        // Auth Actions
        login(email, password) {
            // Mock Login
            if (email && password) {
                // In a real app, validate credentials
                const mockUser = {
                    name: 'John Doe',
                    email: email,
                    age: 30,
                    gender: 'Male',
                    phone: '1234567890',
                    idProofType: 'Passport',
                    idProofNumber: 'A1234567',
                    country: 'USA',
                    preferredCurrency: 'USD',
                    emergencyContact: '9876543210'
                };
                this.setUser(mockUser);
                return true;
            }
            return false;
        }

        signup(userData) {
            this.setUser(userData);
            return true;
        }

        logout() {
            this.state.auth = { isAuthenticated: false, user: null };
            localStorage.removeItem('travelGenie_user');
            this.notify();
        }

        setUser(user) {
            this.state.auth = { isAuthenticated: true, user: user };
            this.state.currentCurrency = user.preferredCurrency || 'USD';
            localStorage.setItem('travelGenie_user', JSON.stringify(user));
            this.notify();
        }

        // Traveler Actions
        addTraveler() {
            const newId = this.state.travelers.length > 0 ? Math.max(...this.state.travelers.map(t => t.id)) + 1 : 1;
            const newTraveler = {
                id: newId,
                ageGroup: 'adult',
                medicalConditions: [],
                otherMedicalNotes: ''
            };
            this.setState({
                travelers: [...this.state.travelers, newTraveler]
            });
        }

        removeTraveler(id) {
            if (this.state.travelers.length <= 1) return;
            this.setState({
                travelers: this.state.travelers.filter(t => t.id !== id)
            });
        }

        updateTraveler(id, data) {
            const updatedTravelers = this.state.travelers.map(t => 
                t.id === id ? { ...t, ...data } : t
            );
            this.setState({ travelers: updatedTravelers });
        }

        // Currency
        convertPrice(amountInUSD) {
            const currency = this.state.currentCurrency || 'USD';
            const rate = this.state.currencies[currency] || 1;
            return (amountInUSD * rate).toFixed(2);
        }

        convertToUSD(amountInCurrentCurrency) {
            const currency = this.state.currentCurrency || 'USD';
            const rate = this.state.currencies[currency] || 1;
            return (amountInCurrentCurrency / rate).toFixed(2);
        }

        formatPrice(amountInUSD, customCurrency = null) {
            const currency = customCurrency || this.state.currentCurrency;
            const rate = this.state.currencies[currency] || 1;
            const converted = (amountInUSD * rate).toFixed(0); // Use toFixed(0) to avoid forced decimals
            const symbols = {
                'USD': '$',
                'EUR': '€',
                'GBP': '£',
                'INR': '₹',
                'JPY': '¥'
            };
            const symbol = symbols[currency] || currency;
            return `${symbol}${converted}`;
        }

        formatPriceLocal(amount, currencyCode) {
            const symbols = {
                'USD': '$',
                'EUR': '€',
                'GBP': '£',
                'INR': '₹',
                'JPY': '¥'
            };
            const symbol = symbols[currencyCode] || currencyCode;
            return `${symbol}${Math.round(amount)}`;
        }

        subscribe(listener) {
            this.listeners.push(listener);
            return () => {
                this.listeners = this.listeners.filter(l => l !== listener);
            };
        }

        notify() {
            this.listeners.forEach(listener => listener(this.state));
        }
    }

    window.App.Store = new Store();
})();
