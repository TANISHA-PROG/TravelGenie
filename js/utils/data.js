(function() {
    function json(url) {
        return fetch(url).then(r => r.ok ? r.json() : Promise.reject(new Error('Network error')));
    }

    async function geocode(name) {
        const q = encodeURIComponent(name);
        const data = await json(`https://geocoding-api.open-meteo.com/v1/search?name=${q}&count=1`);
        const r = data && data.results && data.results[0];
        if (!r) return null;
        return { lat: r.latitude, lon: r.longitude, name: r.name, country: r.country };
    }

    async function fetchWeather(lat, lon) {
        const params = [
            'current=temperature_2m,wind_speed_10m',
            'daily=temperature_2m_max,temperature_2m_min,precipitation_sum',
            'timezone=auto'
        ].join('&');
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&${params}`;
        const data = await json(url);
        const current = data.current || {};
        const daily = data.daily || {};

        // Derive simple extreme alerts
        const maxTemp = Math.max(...(daily.temperature_2m_max || []).map(Number).filter(x => !isNaN(x)), -Infinity);
        const minTemp = Math.min(...(daily.temperature_2m_min || []).map(Number).filter(x => !isNaN(x)), Infinity);
        const heavyRain = (daily.precipitation_sum || []).some(v => Number(v) >= 20);
        const alerts = [];
        if (maxTemp >= 40) alerts.push('Heatwave alert: very high temperatures expected');
        if (minTemp <= -5) alerts.push('Extreme cold alert: sub-zero temperatures');
        if (heavyRain) alerts.push('Heavy rain alert: precipitation expected');

        return {
            current: { temperature: current.temperature_2m, wind_speed: current.wind_speed_10m },
            daily: {
                dates: daily.time || [],
                max: daily.temperature_2m_max || [],
                min: daily.temperature_2m_min || [],
                precipitation: daily.precipitation_sum || []
            },
            alerts,
            fetchedAt: Date.now()
        };
    }

    async function fetchAQI(lat, lon) {
        const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=us_aqi&timezone=auto`;
        const data = await json(url);
        const hourly = data.hourly || {};
        const times = hourly.time || [];
        const values = hourly.us_aqi || [];
        let current = null;
        if (values && values.length) {
            current = values[values.length - 1];
        }
        const trend = values.slice(Math.max(0, values.length - 6)); // last 6 hours
        return { current, hourly: { time: times, values }, trend, fetchedAt: Date.now() };
    }

    async function fetchExchangeRates() {
        const url = 'https://api.exchangerate.host/latest?base=USD';
        const data = await json(url);
        const rates = data && data.rates ? data.rates : {};
        // Keep only currencies we care about to avoid bloating state
        const supported = ['USD', 'EUR', 'GBP', 'INR', 'JPY'];
        const pruned = {};
        supported.forEach(k => {
            pruned[k] = k === 'USD' ? 1 : (rates[k] || null);
        });
        return { rates: pruned, fetchedAt: Date.now() };
    }

    async function refreshForDestination(name) {
        if (!name) return;
        const geo = await geocode(name);
        if (!geo) return;
        const [weather, aqi] = await Promise.all([
            fetchWeather(geo.lat, geo.lon).catch(() => null),
            fetchAQI(geo.lat, geo.lon).catch(() => null)
        ]);
        if (weather) window.App.Store.setLiveWeather(name, { ...weather, lat: geo.lat, lon: geo.lon });
        if (aqi) window.App.Store.setLiveAQI(name, { ...aqi, lat: geo.lat, lon: geo.lon });
    }

    async function refreshExchangeRates() {
        const res = await fetchExchangeRates().catch(() => null);
        if (res) window.App.Store.setExchangeRates(res.rates, res.fetchedAt);
    }

    // Transport pricing stubs (to be integrated with providers like RedBus, etc.)
    async function fetchBusOptions(params) {
        // params: { from, to, date }
        return null;
    }

    async function fetchTrainFlightOptions(params) {
        // params: { mode: 'train'|'flight', from, to, date }
        return null;
    }


    async function fetchGooglePhoto(place, city) {
        const q = new URLSearchParams({ place, ...(city ? { city } : {}) });
        try {
            const res = await fetch(`/photo/google?${q.toString()}`);
            if (!res.ok) return null;
            const data = await res.json();
            return data && data.photo_url ? data.photo_url : null;
        } catch(e) {
            return null;
        }
    }
    

    window.App.Utils.DataService = {
        geocode,
        fetchWeather,
        fetchAQI,
        fetchExchangeRates,
        refreshForDestination,
        refreshExchangeRates,
        fetchBusOptions,
        fetchTrainFlightOptions,
        fetchGooglePhoto
    };
})(); 
