(function() {
    // 1. ENHANCED LOCATION METADATA DATABASE
    const locationDatabase = {
        'paris': { 
            name: 'Paris', category: 'city', altitude_m: 35, avg_aqi: 40, safety_rating: 4, 
            avg_daily_cost: 200, climate: 'moderate', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre Dame'],
            hospitals: ['Hôpital Necker', 'American Hospital of Paris'],
            dos: ['Learn basic French', 'Use Metro'], donts: ['Don\'t talk loudly', 'Watch for pickpockets']
        },
        'tokyo': { 
            name: 'Tokyo', category: 'city', altitude_m: 40, avg_aqi: 45, safety_rating: 5, 
            avg_daily_cost: 250, climate: 'moderate', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.9, attractions: ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Tower'],
            hospitals: ['St. Luke\'s International', 'University of Tokyo Hospital'],
            dos: ['Bow when greeting', 'Be quiet on trains'], donts: ['Don\'t tip', 'Don\'t eat while walking']
        },
        'ladakh': { 
            name: 'Ladakh', category: 'hill_station', altitude_m: 3500, avg_aqi: 20, safety_rating: 4, 
            avg_daily_cost: 100, climate: 'cold', crowd_level: 'low',
            image: 'https://images.unsplash.com/photo-1597047084897-51e81819a499?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.7, attractions: ['Pangong Lake', 'Nubra Valley', 'Leh Palace'],
            hospitals: ['SNM Hospital Leh'],
            dos: ['Acclimatize for 24h', 'Drink water'], donts: ['Don\'t run', 'Avoid alcohol initially']
        },
        'manali': { 
            name: 'Manali', category: 'hill_station', altitude_m: 2050, avg_aqi: 30, safety_rating: 4, 
            avg_daily_cost: 80, climate: 'cold', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.5, attractions: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple'],
            hospitals: ['Mission Hospital'],
            dos: ['Wear woolens', 'Carry cash'], donts: ['Don\'t litter', 'Drive carefully']
        },
        'goa': { 
            name: 'Goa', category: 'beach', altitude_m: 10, avg_aqi: 35, safety_rating: 4, 
            avg_daily_cost: 120, climate: 'humid', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.6, attractions: ['Baga Beach', 'Fort Aguada', 'Dudhsagar Falls'],
            hospitals: ['Manipal Hospital'],
            dos: ['Rent a scooter', 'Try seafood'], donts: ['Don\'t swim in monsoon', 'Drugs are illegal']
        },
        'dubai': { 
            name: 'Dubai', category: 'city', altitude_m: 10, avg_aqi: 60, safety_rating: 5, 
            avg_daily_cost: 300, climate: 'hot', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['Burj Khalifa', 'Dubai Mall', 'Desert Safari'],
            hospitals: ['Rashid Hospital', 'American Hospital'],
            dos: ['Dress modestly', 'Respect customs'], donts: ['PDA is restricted', 'No alcohol in public']
        },
        'delhi': { 
            name: 'Delhi', category: 'city', altitude_m: 216, avg_aqi: 250, safety_rating: 3, 
            avg_daily_cost: 100, climate: 'hot', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop',
            reviews: 3.9, attractions: ['India Gate', 'Red Fort', 'Qutub Minar'],
            hospitals: ['AIIMS', 'Max Hospital'],
            dos: ['Use Metro', 'Negotiate prices'], donts: ['Avoid dark alleys', 'Don\'t drink tap water']
        },
        'rishikesh': { 
            name: 'Rishikesh', category: 'religious', altitude_m: 340, avg_aqi: 50, safety_rating: 4, 
            avg_daily_cost: 60, climate: 'moderate', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.7, attractions: ['Laxman Jhula', 'Triveni Ghat', 'Beatles Ashram'],
            hospitals: ['AIIMS Rishikesh'],
            dos: ['Attend Ganga Aarti', 'Try Yoga'], donts: ['No alcohol/meat', 'Respect sadhus']
        },
        'kedarnath': {
            name: 'Kedarnath', category: 'religious', altitude_m: 3583, avg_aqi: 10, safety_rating: 4,
            avg_daily_cost: 90, climate: 'cold', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.9, attractions: ['Kedarnath Temple', 'Bhairavnath Temple'],
            hospitals: ['Six Sigma High Altitude Medical Service'],
            dos: ['Register for Yatra', 'Wear warm clothes'], donts: ['Don\'t trek at night', 'Don\'t pollute']
        },
        'amritsar': {
            name: 'Amritsar', category: 'religious', altitude_m: 230, avg_aqi: 120, safety_rating: 4,
            avg_daily_cost: 70, climate: 'moderate', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['Golden Temple', 'Wagah Border', 'Jallianwala Bagh'],
            hospitals: ['Fortis Escorts', 'Amandeep Hospital'],
            dos: ['Cover head in temple', 'Try Langar food'], donts: ['No tobacco near temple', 'Don\'t carry leather inside']
        },
        'jaipur': {
            name: 'Jaipur', category: 'city', altitude_m: 430, avg_aqi: 130, safety_rating: 4,
            avg_daily_cost: 90, climate: 'hot', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.6, attractions: ['Hawa Mahal', 'Amber Fort', 'City Palace'],
            hospitals: ['SDMH', 'Fortis Jaipur'],
            dos: ['Wear comfortable shoes', 'Hydrate'], donts: ['Don\'t encourage touts', 'Respect heritage sites']
        },
        'kerala': {
            name: 'Kerala', category: 'nature', altitude_m: 10, avg_aqi: 30, safety_rating: 5,
            avg_daily_cost: 110, climate: 'humid', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.9, attractions: ['Munnar Tea Gardens', 'Alleppey Backwaters', 'Varkala Beach'],
            hospitals: ['Aster Medcity', 'KIMS'],
            dos: ['Try Ayurveda', 'Enjoy houseboat'], donts: ['Don\'t litter beaches', 'Respect local dress code']
        },
        'mumbai': {
            name: 'Mumbai', category: 'city', altitude_m: 14, avg_aqi: 110, safety_rating: 4,
            avg_daily_cost: 150, climate: 'humid', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.5, attractions: ['Gateway of India', 'Marine Drive', 'Elephanta Caves'],
            hospitals: ['Lilavati Hospital', 'Breach Candy'],
            dos: ['Use local trains', 'Try street food'], donts: ['Don\'t travel peak hours', 'Avoid monsoon wading']
        },
        // --- NORTH INDIA ---
        'srinagar': {
            name: 'Srinagar', category: 'hill_station', altitude_m: 1585, avg_aqi: 40, safety_rating: 4,
            avg_daily_cost: 120, climate: 'cold', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.7, attractions: ['Dal Lake', 'Mughal Gardens', 'Shankaracharya Temple'],
            hospitals: ['SKIMS', 'SMHS Hospital'],
            dos: ['Enjoy Shikara ride', 'Buy saffron'], donts: ['Don\'t take photos of military', 'Carry ID everywhere']
        },
        'shimla': {
            name: 'Shimla', category: 'hill_station', altitude_m: 2276, avg_aqi: 30, safety_rating: 5,
            avg_daily_cost: 100, climate: 'cold', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1622308644420-b20142dc993c?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.6, attractions: ['The Ridge', 'Mall Road', 'Jakhu Temple'],
            hospitals: ['IGMC', 'Indus Hospital'],
            dos: ['Walk on Mall Road', 'Ride Toy Train'], donts: ['Don\'t litter', 'Don\'t feed monkeys']
        },
        'varanasi': {
            name: 'Varanasi', category: 'religious', altitude_m: 80, avg_aqi: 150, safety_rating: 4,
            avg_daily_cost: 60, climate: 'hot', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['Kashi Vishwanath', 'Ganga Ghats', 'Sarnath'],
            hospitals: ['BHU Trauma Centre', 'Heritage Hospital'],
            dos: ['Attend Ganga Aarti', 'Try Lassi'], donts: ['Don\'t take photos of cremations', 'Beware of bulls']
        },
        'agra': {
            name: 'Agra', category: 'city', altitude_m: 170, avg_aqi: 180, safety_rating: 3,
            avg_daily_cost: 80, climate: 'hot', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.7, attractions: ['Taj Mahal', 'Agra Fort', 'Fatehpur Sikri'],
            hospitals: ['S.N. Medical College', 'Pushpanjali Hospital'],
            dos: ['Visit Taj at sunrise', 'Buy Petha'], donts: ['Don\'t scratch monuments', 'Avoid touts']
        },
        // --- WEST INDIA ---
        'udaipur': {
            name: 'Udaipur', category: 'city', altitude_m: 600, avg_aqi: 80, safety_rating: 5,
            avg_daily_cost: 130, climate: 'moderate', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['City Palace', 'Lake Pichola', 'Jag Mandir'],
            hospitals: ['Geetanjali Hospital', 'Paras Health'],
            dos: ['Boat ride at sunset', 'Watch puppet show'], donts: ['Don\'t waste water', 'Dress conservatively']
        },
        'jaisalmer': {
            name: 'Jaisalmer', category: 'adventure', altitude_m: 225, avg_aqi: 60, safety_rating: 4,
            avg_daily_cost: 110, climate: 'hot', crowd_level: 'medium',
            image: 'https://www.bing.com/th/id/OIP.sMWzBl1j58LQET4q4AVeiAHaEK?w=204&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
            reviews: 4.7, attractions: ['Jaisalmer Fort', 'Sam Sand Dunes', 'Patwon Ki Haveli'],
            hospitals: ['Jawahar Hospital'],
            dos: ['Desert safari', 'Camp under stars'], donts: ['Don\'t go out in noon heat', 'Respect locals']
        },
        'pune': {
            name: 'Pune', category: 'city', altitude_m: 560, avg_aqi: 90, safety_rating: 4,
            avg_daily_cost: 100, climate: 'moderate', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.4, attractions: ['Shaniwar Wada', 'Aga Khan Palace', 'Sinhagad Fort'],
            hospitals: ['Ruby Hall Clinic', 'Jehangir Hospital'],
            dos: ['Try Misal Pav', 'Visit Osho Garden'], donts: ['Traffic is heavy', 'Don\'t litter']
        },
        // --- SOUTH INDIA ---
        'bangalore': {
            name: 'Bangalore', category: 'city', altitude_m: 920, avg_aqi: 70, safety_rating: 4,
            avg_daily_cost: 140, climate: 'moderate', crowd_level: 'high',
            image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAMwAzgMBIgACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAAAAQIDBAX/2gAIAQEAAAAAz6OvBPN8cG2WB6HoXnnhnljlHc+zlO7mXOoZjPV685kZLLHn7h6Y9m2GGUZxW0qV7GBWXNze5z5inr6uTmygXYYT09I55csfd3xWGfX2cPDzwLTXm217HmRxnR09HRVaRXD5eCC+qpuxPGMjXt16XUcvBzp16EzOfSxQuEd69Onclnw81Ydm+HKvSrN6R5mmlrTTU0g5+Nd2+eV2Ap5JKp6aqq5zzL06tjNJa2uWXQ3oXhy9czmt90h6EclphZRzQMM+rtEKc1z5tMETeeFLSOzJkjFtmDGlOsZj0jowoHZHKUXJo5JqLTiGFVWWNC157WjzuCN1jarSJ25ufoHcc9Lvic138yuOKuyKqMdZ1VVhpq7WNCIxvSbT50qi8+taRayMbN+fTOhvoGxDYIAGkDAhMKBUIGIAQAgTBDJtiTBilyNlJAAADExCAAGDGmgKECCBlANCeiGKgJbzlsG0MTAAYwP/xAAZAQEBAQEBAQAAAAAAAAAAAAAAAQIDBAX/2gAKAgIQAxAAAAD1cMbss3gQ4d9TedZ6cuHcMa6Y1lM71nG5dTrx8vplTOtZ7c7JZZZbOmMWa56xo6Z3nl01nUzSzUiXGomuXTl09fm1AEqJTyenGsb7cvV50qz53tqCpd4iaAPRxlslzouSrCDrzmpazqW5QoizWSBoEARd5IBQABBQAICgACAA/8QANRAAAgICAQEGAwgBAwUAAAAAAQIAEQMSITEEEyJBUWEQMnEUICNCUoGRoTMkU3IwQ2Jjgv/aAAgBAQABPwC6PMxBgwKx3A6xzxYiNzCBfMZF9ZwBfUHgxoAeYpi0fOhGjdeIOTU7P4EIPnEQzpGMMKm4ePOFbjpCK+A5gdkPBgdcqChzH2UlTEcijHWwCJyDzMqm7hWAam4YDCwjDn4ISaq4ci4wATRMLr+qDJjclVYEzkCGFJUaMK5r4FdTCQZj8PMy05FcQHWwZgyA+Bj9IyRl4hEaXxzCT8Fi4bPMIIYVD3jEbXHZ14uYCVyqQIrWOY710ilqmpjCozAg/B8FdeRHwkTVloiM1m580CkEVMOQ95o8bHRorMigHrCIRDKHlAPSYH1NNMiKCSOs2PmY5DtxMKKogUUYMYPWUqxmj3xHmsxZg4owoCOBO6U8GHso6iP2exskVNmCOD9ZmXudG0uq5i6vjBXkGZMPWOhEMMqCxFcgxsoIFDmEFjMWM3cG23A4isSIeFgaz0jLfnHXiMCTUGLbz+CZyBRgdcnnzE44ndIeRBjXiwOIaIqYlZbuj7iOOOAJmGA/WZFAPxqaxUJipjQWZsvQCMSTQinw9YOgsz6CC/SN06RlB61cCzYzaI5BEGcxe1c1BlsQOD1iuDGyst8X6TIMbrZNNMmMwrNYFszGceQ0HExpiA95lx88Cd3S8wKBdmJRahAB0J5gCixGKwkE0R+8CE81xChnT4C5bQWSIp1i5GmPUjmHJiqjO5U8gx8QY0TM2Ag8dJpUROZ2fRsj63ZuC+eOkUFVDkzLnbQAKJeUgNMWwcEAmLhYm2M7v3joaAiBlPSW1c0IZVwYx6wKvSoQCKgFG5YiNryBN2aAAiriNQI35gQh72uZGPqZrZj5VclQaHpAyoR4uR+YGJlGbw14qsmB1A1bmZEVjwIcYqKiLN6neTvBA9xiPWX6GHGAZWsswTaAwNL4lmCEgC7qLkLu/iJF+G5ky48GpytV3UxtjCEAM3vU3x3ZRpiyYlys3egArVTI2joNudufpNoTcszYyzBFmomglNNTNfeASvgJddTAw8jAL5sTtQy6oihCGN2Sb4jIQoNDbazTEChO0suXBjvUHYHXqRNADpd+p2og/SeD18/Ux8SPwVLE1VTTKxYlQLJNbnidn31dWSgp4O13cqVNZqZofSDicnmXMeZX2sBaFzbH+sdLgbGSBuIGxnXxjkXA+M6045m2Pj8ReTQgbF/uDrU3x8+NetTfFR8S8HnmbYxsTkXw9Z2hCc7EbuAo8O5AnfuVv7OAP+c73Wh9l5P/AJw5zdfZzt1+aDOxJA7Mb8/FO/NX9mNezzs7DMCRmyij0Lzs4KZTvnJvgIYSnNkcGoXxrtyPD1hYDayo1FnnoJfNbC6vr5S7KgEcixz1E3sLTKdukJB52HJrr5yrvkcGjMuNy2LVqFjb3EGHNX+Qf5LP/H0hw5zdZBzk/hfSHBm8dOBb8eyw4sx7ynAsjXjoIcWa3phyBrxDiz21OPlocec7nP8AqHyV0/NO6zivEOAQeOpnd5xqNhxd8QbYezHeyebIEzbdy5s1WKZkJbs572qxpHRvtobvK/G6TErd5nO/VMk7KrhEXe/Fl/oRHVCtBh0/LdzMQVIHzFLUGIubwWFrQ39YqZvwtgvnvEx56xbBB4jvAmfUcLZfn2WFc9PSpe/H0jLmHeaqnFBJrntqCcKK92hTOaoJ05+syjGc3ZtmIINqPUxMWGsNO3+YsPrBixaqN2/z7fv6Q4sRV7yNzn2P19Jkx4iM95CNsgLTJjxn7TeQjYrt7COmPbMe9IJRQfYcQpjtqyG+6r/5mmMVWU8Yjr9JqgOOsx4Q6zGo+y0DsJmKnE4H/rmVcZfo1jCl/S5mGL7XhL7WclrUwhKJG1Hedm0U0L4yZbuBCSvTkirNTMLDeLXwHxekRWBxf6jpjYfU+sxow7i+0XqG8/mMRHAwX2kGnN8/NAj6Lfaf+7ZN/wBQo9Zb7TV5LJvoOeI6MWzfj1tr5/KJq5LEZ+DjocxkNJ/qKAShz1hzqXxs97JyKiZcQXFQa1YsPYxc2FCgAcauW6eZgzYeg2NOWqurQ5cSkps5p19+ai5lZMzcin2PpYhzKS5tuWFwsCCxZgDxNxZPrVXCbQn8038KqDxcYg2Gvmif2neW7t1JUKT7dY+TdsbsOcd6wZdMQA6K4/ljC+oYr+bZv5neanpdAEEiZMxdGBFWCIrKpssfDiKxcuMHDWTopA94mbGDgC5fk/u4uXEFT8QUuT+TN1KMbNb7EkHmZM2Id5eQWWUmO+LUEMo3U8+gEfNh4p06QP2cWLyDmzxzMvZwcLugY9Ddwp2c/nbrfzRk7Oo2DHYDjmKuItzex3Jo+axABiIN8lbFUbgx9mYKC2QHqeRxcdMGq6nJZPnXlBh7K3Nv681Ps/Zv1E/xMaYzjWy45ryncYGS+8f+ovZsBZxuaBEOHsyVeVqN88Re5ZCiOaLpZMy9l7MiW2byhw4su2RshXgRMOLJYXO/7rF7Mux/H6EeQ5l4cTNeUkAgDi4wxvTK6Ell8oUsGsuMC74SNi4P+oFX5Cdwjgg5FAVzBjQJjAfHwCOQZlwCt90Nn0MKMAWNVMWbMh1VxCMbOVC1x6w4eCKbyq+BzHxi2ya3ZNV7CHY4y7Jzpd1MaubXUn++kffRTYorfT1mF0U03FjiDA3h8PX26fWPie0GnBbrXBoXxGUpkOyELr0Ij6PrwvUGiQLAmPCMmU2Pw75Fw4cSHEq415Y2PoJn7OcmYuqjWgKEPZXAW1B24FwYGDMO5TiMjAJsiAlwNeLilsOQlQDyREyL5oNRO5B0IRND+YEVGwnRiUApCRyOfcQ9lBoBeT9OL9YcCMii1pQx6z7OKvUD2NXHxBUchRwqnr6w4R01HzL+YwYRydVoo3HPlO7G3yr8yQ4bFcAeMzu+eaPK0TAg3ul/OJj7MuXHjawDrPsiVQAE7hQK0T+J3KnThaU3VTu0JvUX61O6xgEaj+IiJtlBUUMnSoyKSrUARflNAPyr/EpCR8vF/llDrS/XWd0pIND5r6RsCbgEnlCZ9nSuDExBEAGpG3QizDbA2qfLQlG71W7HNShrWqdG8oFBPKYzwPKZLKEA5WuhykU5WstuOnRYwyCtDlPBu1ibEEscgN/pjPkBpNyOgNQWQNnyg+yz8YE0uTgnyiEIAo740OBUXPmJF4HjZiAaw5CfKJlzFvFgcCPkyADTA5MTJlN74HHpUfvQbTC/Js3E7zXxY8m1+UyY8zNwuUgdLmPDpRKZYT2n/ZNQixxhywJmLqWxNVUajq1eFMt+VxVzFrdMle0yIQBoma/eYw5vcZR9BMpYa92mTobsTEeCXXKD9Jf3Lm83abPNm9ZuZufUzY+ss+sszYy5bS2ltLM2Msy2lmWZZl+izn0nPpOfSc+k59Jz6Sz6S4D7CWfQSz+kTn0E/YTn0Es/pE29AJfsJZlt6Q/SdZZ9JZ9JZ9JZ9BLlzYyz8bl/ctrgly/u3Ll89YZZlw38alSpxKE4+NSpUqVKlSpXxqVCJXwqV/0Kms4Hw4nHx/f4cQfDn7ms1le8r4VKlSoVua+8094F95s3qP4E2b1H8CbN6/0JbHz/AKEtvX+hORLMswkwkzkN5c+0/iWfb+Ph+avu+f3h5/A9PivP3qsQdB8P/8QAJxEAAgIBAwMEAgMAAAAAAAAAAAECERIQIVEDEzEiYXGRIEFQgaH/2gAIAQIBAT8AYkPZ/giXg30TExMUkfsasuhPW99JOyxCHHgtozLsjMvXIelmWjSY4oaoTFMsjJzQm9LWmRerQy0mk2daTxpM6Nqa3dMTVtJ7rSitFOL/AGjJcoyXKLXJaOo/XexNuTEpJnTtTd0WWWITdLf/AAt8r6LfK+i37fRb9vovf+xPdfDHLZjl4G/dF/Bl8GXwYR4ZhHlnbjbH00dv3O2uTtrkfTiduJhF/swhyYR5O3HlmSG48lx5HJV5G4Pyy4cilFLYyjyejlicV4G4s9HLPRyYoxRijFGETCJijFFIxRijFcGK/iP/xAAlEQACAgIBBAICAwAAAAAAAAAAAQIRElEQAyExQRMgImFQcaH/2gAIAQMBAT8ATGxd+UMj2fLQ4lUU+F2PI1xRXbiCaRQyXkTKTMShxGiuFEXFGPCdCfLiUSji/rX2ptNo6SV20dRJxGn7XF8uLXoxeinoplMgvxIrFDaaJ94FFcMaVvt/vFFIpFduEu6K8lLTKRX9lGb2jOS0fJIU2Z/ozejN6FNmbMmvRnLRnLR8ktGD0KMtGM9CjJPwKPUiqSK6hKE21aRhLQozXgcZ+zGaMZ6RjPSLe2WX+2J17ZnLbM5bZlLbG2/bLa8NjbftlvbLd+WW9v8AiP/Z',
            reviews: 4.5, attractions: ['Lalbagh', 'Bangalore Palace', 'Cubbon Park'],
            hospitals: ['Manipal Hospital', 'Narayana Health'],
            dos: ['Enjoy craft beer', 'Morning walk in parks'], donts: ['Traffic is terrible', 'Don\'t rely on buses only']
        },
        'coorg': {
            name: 'Coorg', category: 'hill_station', altitude_m: 1150, avg_aqi: 25, safety_rating: 5,
            avg_daily_cost: 100, climate: 'moderate', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.7, attractions: ['Abbey Falls', 'Raja\'s Seat', 'Dubare Elephant Camp'],
            hospitals: ['District Hospital Madikeri'],
            dos: ['Buy coffee/spices', 'Homestay experience'], donts: ['Don\'t disturb wildlife', 'Leeches in monsoon']
        },
        'ooty': {
            name: 'Ooty', category: 'hill_station', altitude_m: 2240, avg_aqi: 30, safety_rating: 5,
            avg_daily_cost: 90, climate: 'cold', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1622308644420-b20142dc993c?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.6, attractions: ['Ooty Lake', 'Botanical Garden', 'Doddabetta Peak'],
            hospitals: ['Government Headquarters Hospital'],
            dos: ['Ride Nilgiri Mountain Railway', 'Buy chocolates'], donts: ['Don\'t use plastic', 'Nights are cold']
        },
        'chennai': {
            name: 'Chennai', category: 'city', altitude_m: 6, avg_aqi: 80, safety_rating: 4,
            avg_daily_cost: 90, climate: 'humid', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.3, attractions: ['Marina Beach', 'Kapaleeshwarar Temple', 'Mahabalipuram'],
            hospitals: ['Apollo Main', 'MIOT'],
            dos: ['Eat Idli/Dosa', 'Visit temples'], donts: ['Don\'t swim in rough sea', 'Humid weather warning']
        },
        'hyderabad': {
            name: 'Hyderabad', category: 'city', altitude_m: 542, avg_aqi: 90, safety_rating: 4,
            avg_daily_cost: 110, climate: 'hot', crowd_level: 'high',
            image: 'https://www.bing.com/th/id/OIP.DwqiEY0yZuKaxhoIkCsZbAAAAA?w=200&h=200&c=8&rs=1&o=6&dpr=1.3&pid=3.1&rm=2',
            reviews: 4.6, attractions: ['Charminar', 'Golconda Fort', 'Ramoji Film City'],
            hospitals: ['Apollo Health City', 'Yashoda Hospital'],
            dos: ['Eat Hyderabadi Biryani', 'Shop for pearls'], donts: ['Don\'t go out in summer noon', 'Traffic congestion']
        },
        // --- EAST INDIA ---
        'kolkata': {
            name: 'Kolkata', category: 'city', altitude_m: 9, avg_aqi: 140, safety_rating: 4,
            avg_daily_cost: 80, climate: 'humid', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.5, attractions: ['Victoria Memorial', 'Howrah Bridge', 'Dakshineswar Temple'],
            hospitals: ['Apollo Gleneagles', 'AMRI'],
            dos: ['Try Rosogolla', 'Ride tram'], donts: ['Don\'t argue politics', 'Street food caution']
        },
        'darjeeling': {
            name: 'Darjeeling', category: 'hill_station', altitude_m: 2042, avg_aqi: 35, safety_rating: 4,
            avg_daily_cost: 90, climate: 'cold', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.7, attractions: ['Tiger Hill', 'Batasia Loop', 'Tea Gardens'],
            hospitals: ['Planters Hospital'],
            dos: ['Watch sunrise', 'Drink Darjeeling tea'], donts: ['Don\'t ignore landslides', 'Carry warm clothes']
        },
        'gangtok': {
            name: 'Gangtok', category: 'hill_station', altitude_m: 1650, avg_aqi: 20, safety_rating: 5,
            avg_daily_cost: 100, climate: 'cold', crowd_level: 'low',
            image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['MG Marg', 'Tsomgo Lake', 'Rumtek Monastery'],
            hospitals: ['STNM Hospital'],
            dos: ['Visit monasteries', 'Try Momos'], donts: ['Don\'t smoke in public', 'Respect culture']
        },
        'puri': {
            name: 'Puri', category: 'religious', altitude_m: 0, avg_aqi: 50, safety_rating: 4,
            avg_daily_cost: 70, climate: 'humid', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.6, attractions: ['Jagannath Temple', 'Puri Beach', 'Konark Sun Temple'],
            hospitals: ['District Hospital Puri'],
            dos: ['See Rath Yatra', 'Eat Khaja'], donts: ['Don\'t swim deep', 'Beware of pandas (priests)']
        },
        // --- CENTRAL & ISLANDS ---
        'bhopal': {
            name: 'Bhopal', category: 'city', altitude_m: 527, avg_aqi: 80, safety_rating: 4,
            avg_daily_cost: 70, climate: 'hot', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.2, attractions: ['Upper Lake', 'Sanchi Stupa', 'Van Vihar'],
            hospitals: ['AIIMS Bhopal', 'Bansal Hospital'],
            dos: ['Boat ride', 'Visit tribal museum'], donts: ['Summer is very hot', 'Don\'t litter lakes']
        },
        'andaman': {
            name: 'Andaman', category: 'beach', altitude_m: 0, avg_aqi: 20, safety_rating: 5,
            avg_daily_cost: 150, climate: 'humid', crowd_level: 'low',
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.9, attractions: ['Radhanagar Beach', 'Cellular Jail', 'Scuba Diving'],
            hospitals: ['G.B. Pant Hospital'],
            dos: ['Scuba dive', 'Visit Havelock'], donts: ['Don\'t collect corals', 'Respect tribes']
        },
        'haridwar': {
            name: 'Haridwar', category: 'religious', altitude_m: 314, avg_aqi: 70, safety_rating: 4,
            avg_daily_cost: 60, climate: 'moderate', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1571679654681-ba01b9e1e117?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.7, attractions: ['Har Ki Pauri', 'Ganga Aarti', 'Mansa Devi'],
            hospitals: ['District Hospital Haridwar'],
            dos: ['Attend evening aarti', 'Respect local customs'], donts: ['Don\'t litter near ghats', 'Avoid risky dips in monsoon']
        },
        'badrinath': {
            name: 'Badrinath', category: 'religious', altitude_m: 3133, avg_aqi: 20, safety_rating: 4,
            avg_daily_cost: 80, climate: 'cold', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['Badrinath Temple', 'Tapt Kund', 'Neelkanth Peak'],
            hospitals: ['Primary Health Center Badrinath'],
            dos: ['Acclimatize well', 'Carry warm clothes'], donts: ['Don\'t trek at night', 'Avoid alcohol']
        },
        'gangotri': {
            name: 'Gangotri', category: 'religious', altitude_m: 3415, avg_aqi: 20, safety_rating: 4,
            avg_daily_cost: 70, climate: 'cold', crowd_level: 'medium',
            image: 'https://www.bing.com/th/id/OIP.MJm-D7Md0zlduymUz4mj8wHaFj?w=214&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
            reviews: 4.7, attractions: ['Gangotri Temple', 'Bhagirathi Shila', 'Gaumukh Trek'],
            hospitals: ['Primary Health Center Gangotri'],
            dos: ['Start early', 'Hydrate'], donts: ['Don\'t ignore altitude sickness', 'Avoid plastic']
        },
        'yamunotri': {
            name: 'Yamunotri', category: 'religious', altitude_m: 3293, avg_aqi: 20, safety_rating: 4,
            avg_daily_cost: 70, climate: 'cold', crowd_level: 'medium',
            image: 'data:image/jpeg;base64,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',
            reviews: 4.6, attractions: ['Yamunotri Temple', 'Janki Chatti', 'Surya Kund'],
            hospitals: ['Primary Health Center Janki Chatti'],
            dos: ['Hire local guide', 'Carry woolens'], donts: ['Don\'t trek in dark', 'Don\'t disturb wildlife']
        },
        'vaishno_devi': {
            name: 'Vaishno Devi', category: 'religious', altitude_m: 1580, avg_aqi: 30, safety_rating: 5,
            avg_daily_cost: 70, climate: 'moderate', crowd_level: 'high',
            image: 'data:image/webp;base64,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',
            reviews: 4.9, attractions: ['Bhavan', 'Ardhkuwari', 'Bhairo Nath'],
            hospitals: ['Shrine Board Hospital'],
            dos: ['Book yatra slip', 'Wear comfortable shoes'], donts: ['Don\'t attempt rush hours', 'Avoid littering']
        },
        'tirupati': {
            name: 'Tirupati', category: 'religious', altitude_m: 853, avg_aqi: 60, safety_rating: 5,
            avg_daily_cost: 90, climate: 'hot', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.9, attractions: ['Venkateswara Temple', 'Silathoranam', 'Akasa Ganga'],
            hospitals: ['Tirumala Health Center'],
            dos: ['Follow dress code', 'Respect queue rules'], donts: ['Don\'t carry prohibited items', 'No photography inside']
        },
        'somnath': {
            name: 'Somnath', category: 'religious', altitude_m: 0, avg_aqi: 60, safety_rating: 4,
            avg_daily_cost: 70, climate: 'hot', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.7, attractions: ['Somnath Temple', 'Prabhas Patan', 'Triveni Sangam'],
            hospitals: ['Somnath Trust Hospital'],
            dos: ['Attend evening aarti', 'Stay near temple'], donts: ['Don\'t swim in rough sea', 'Avoid crowd pushing']
        },
        'mathura': {
            name: 'Mathura', category: 'religious', altitude_m: 174, avg_aqi: 160, safety_rating: 4,
            avg_daily_cost: 70, climate: 'hot', crowd_level: 'high',
            image: 'https://th.bing.com/th/id/OIP.NNK6j_Yi_SzA-wFOiLRJJQHaEK?w=164&h=108&c=7&qlt=90&bgcl=f9d164&r=0&o=6&dpr=1.3&pid=13.1',
            reviews: 4.6, attractions: ['Krishna Janmabhumi', 'Dwarkadhish Temple', 'Yamuna Ghats'],
            hospitals: ['Braj Health Care'],
            dos: ['Respect local rituals', 'Stay hydrated'], donts: ['Avoid peak Holi crowd if sensitive', 'Beware of touts']
        },
        'vrindavan': {
            name: 'Vrindavan', category: 'religious', altitude_m: 170, avg_aqi: 150, safety_rating: 4,
            avg_daily_cost: 70, climate: 'hot', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.7, attractions: ['Banke Bihari', 'ISKCON Temple', 'Prem Mandir'],
            hospitals: ['Ravi Hospital'],
            dos: ['Wear modest clothes', 'Remove shoes in temples'], donts: ['No photography in some shrines', 'Beware of monkeys']
        },
        'bodh_gaya': {
            name: 'Bodh Gaya', category: 'religious', altitude_m: 110, avg_aqi: 120, safety_rating: 4,
            avg_daily_cost: 60, climate: 'hot', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['Mahabodhi Temple', 'Bodhi Tree', 'Great Buddha Statue'],
            hospitals: ['Anugrah Narayan Magadh Hospital'],
            dos: ['Maintain silence', 'Respect monks'], donts: ['Don\'t litter', 'Avoid scams']
        },
        'ajmer_sharif': {
            name: 'Ajmer Sharif', category: 'religious', altitude_m: 480, avg_aqi: 100, safety_rating: 4,
            avg_daily_cost: 70, climate: 'hot', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.7, attractions: ['Dargah Sharif', 'Ana Sagar', 'Ajmer Fort'],
            hospitals: ['Jawahar Lal Nehru Hospital'],
            dos: ['Cover head', 'Offer chadar respectfully'], donts: ['No pushing in crowd', 'Avoid touts']
        },
        'lotus_temple': {
            name: 'Lotus Temple', category: 'religious', altitude_m: 216, avg_aqi: 250, safety_rating: 4,
            avg_daily_cost: 80, climate: 'hot', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.7, attractions: ['Bahai House of Worship', 'Gardens'],
            hospitals: ['Apollo Delhi'],
            dos: ['Maintain silence', 'Respect interfaith nature'], donts: ['No loud chatter', 'Don\'t litter']
        },
        'jama_masjid': {
            name: 'Jama Masjid', category: 'religious', altitude_m: 216, avg_aqi: 250, safety_rating: 4,
            avg_daily_cost: 60, climate: 'hot', crowd_level: 'high',
            image: 'data:image/webp;base64,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',
            reviews: 4.6, attractions: ['Main Prayer Hall', 'Minarets', 'Old Delhi Walks'],
            hospitals: ['LNJP Hospital'],
            dos: ['Dress modestly', 'Remove shoes'], donts: ['No photography in prayer areas without permission', 'Avoid peak hours']
        },
        'palitana': {
            name: 'Palitana', category: 'religious', altitude_m: 600, avg_aqi: 80, safety_rating: 4,
            avg_daily_cost: 80, climate: 'hot', crowd_level: 'medium',
            image: 'https://th.bing.com/th/id/OIP.uI1vnRmRUc3WV6wEfnKZ3QHaE6?w=205&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
            reviews: 4.7, attractions: ['Shatrunjaya Hills', 'Jain Temples'],
            hospitals: ['Civil Hospital Palitana'],
            dos: ['Start climb early', 'Carry water'], donts: ['Don\'t disturb pilgrims', 'Avoid plastic']
        },
        'namchi': {
            name: 'Namchi', category: 'religious', altitude_m: 1315, avg_aqi: 20, safety_rating: 5,
            avg_daily_cost: 80, climate: 'cold', crowd_level: 'low',
            image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['Char Dham Complex', 'Samdruptse', 'Shirdi Sai Temple'],
            hospitals: ['District Hospital Namchi'],
            dos: ['Respect local culture', 'Carry warm clothes'], donts: ['Don\'t litter', 'Avoid risky treks']
        },
        'hemkund_sahib': {
            name: 'Hemkund Sahib', category: 'religious', altitude_m: 4329, avg_aqi: 20, safety_rating: 4,
            avg_daily_cost: 80, climate: 'cold', crowd_level: 'medium',
            image: 'https://th.bing.com/th/id/OIP.To4csr_LBbD4sWg4FoUVaAHaEc?w=271&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
            reviews: 4.9, attractions: ['Hemkund Lake', 'Gurudwara'],
            hospitals: ['Govindghat Medical Aid'],
            dos: ['Acclimatize', 'Carry woolens'], donts: ['Don\'t rush climbs', 'Avoid monsoon treks']
        },
        'mahakaleshwar': {
            name: 'Mahakaleshwar', category: 'religious', altitude_m: 492, avg_aqi: 120, safety_rating: 4,
            avg_daily_cost: 70, climate: 'hot', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['Mahakaleshwar Temple', 'Ram Ghat'],
            hospitals: ['Ujjain Civil Hospital'],
            dos: ['Attend bhasma aarti', 'Respect temple rules'], donts: ['No photography inside', 'Avoid crowd pushing']
        },
        'omkareshwar': {
            name: 'Omkareshwar', category: 'religious', altitude_m: 160, avg_aqi: 100, safety_rating: 4,
            avg_daily_cost: 70, climate: 'hot', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.7, attractions: ['Omkareshwar Temple', 'Narmada River'],
            hospitals: ['District Hospital Khandwa'],
            dos: ['Boat ride', 'Respect rituals'], donts: ['Don\'t pollute river', 'Avoid risky swims']
        },
        'shirdi': {
            name: 'Shirdi', category: 'religious', altitude_m: 504, avg_aqi: 90, safety_rating: 4,
            avg_daily_cost: 70, climate: 'moderate', crowd_level: 'high',
            image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['Sai Baba Temple', 'Dwarkamai', 'Chavadi'],
            hospitals: ['Shirdi Rural Hospital'],
            dos: ['Book darshan', 'Donate responsibly'], donts: ['Avoid touts', 'No littering']
        },
        'munnar': {
            name: 'Munnar', category: 'hill_station', altitude_m: 1600, avg_aqi: 30, safety_rating: 5,
            avg_daily_cost: 100, climate: 'moderate', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['Tea Gardens', 'Top Station', 'Eravikulam Park'],
            hospitals: ['Tata Tea Hospital'],
            dos: ['Stay in plantations', 'Carry raincoat'], donts: ['Don\'t pluck tea leaves', 'Avoid leeches in monsoon']
        },
        'coonoor': {
            name: 'Coonoor', category: 'hill_station', altitude_m: 1850, avg_aqi: 30, safety_rating: 5,
            avg_daily_cost: 90, climate: 'moderate', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.7, attractions: ['Sim\'s Park', 'Dolphin\'s Nose', 'Tea Estates'],
            hospitals: ['Coonoor Government Hospital'],
            dos: ['Ride toy train', 'Enjoy viewpoints'], donts: ['Don\'t litter', 'Respect wildlife']
        },
        'nainital': {
            name: 'Nainital', category: 'hill_station', altitude_m: 2084, avg_aqi: 40, safety_rating: 5,
            avg_daily_cost: 100, climate: 'cold', crowd_level: 'high',
            image: 'https://imgs.search.brave.com/R9nlSWymFPiR0gsQ1-bnut89oedFo8f7r5hLhgmxfBQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuY250cmF2ZWxs/ZXIuaW4vcGhvdG9z/LzYxOWUxOTZjOWE4/MDdkNzA1NDkzMzAx/Ni9tYXN0ZXIvd18x/NjAwLGNfbGltaXQv/TmFpbml0YWwlMjBs/YWtlJTIwdmlldy5q/cGc',
            reviews: 4.7, attractions: ['Naini Lake', 'Snow View', 'Naina Devi Temple'],
            hospitals: ['B.D. Pandey Hospital'],
            dos: ['Boating', 'Walk on Mall Road'], donts: ['Don\'t feed animals', 'Avoid peak traffic']
        },
        'mussoorie': {
            name: 'Mussoorie', category: 'hill_station', altitude_m: 2005, avg_aqi: 35, safety_rating: 5,
            avg_daily_cost: 100, climate: 'cold', crowd_level: 'high',
            image: 'https://imgs.search.brave.com/wuxZBhAwVDLd7UEzBpwlBEhBux-ksE5ofqec2icBAjM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQw/Mzc4MTIxNy9waG90/by9yYWluLWluLW11/c3Nvb3JpZS1pbmRp/YS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9QkJIdXUxYnJD/Vk1ONHpHTzRpZ0xE/MlpzU1FQR1JiUEV4/WDRLNllreVpKMD0',
            reviews: 4.6, attractions: ['Kempty Falls', 'Gun Hill', 'Camel\'s Back Road'],
            hospitals: ['Mussoorie Civil Hospital'],
            dos: ['Wear woolens', 'Walk trails'], donts: ['Don\'t litter', 'Avoid risky cliff edges']
        },
        'mount_abu': {
            name: 'Mount Abu', category: 'hill_station', altitude_m: 1220, avg_aqi: 50, safety_rating: 4,
            avg_daily_cost: 90, climate: 'moderate', crowd_level: 'medium',
            image: 'https://imgs.search.brave.com/a8Svz_m5o0FrNJsJoDZ_-IUYtkEU6rWjIqlGFzoFnSI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9hcGku/dGhlaW5kaWEuY28u/aW4vc3RvcmFnZS9p/bWFnZS9wbGFjZXMv/TURrd01USXdNVEV3/TlRneE1qRTRPVFV6/T0RJei5qcGc',
            reviews: 4.6, attractions: ['Dilwara Temples', 'Nakki Lake', 'Sunset Point'],
            hospitals: ['Mount Abu Civil Hospital'],
            dos: ['Visit temples', 'Boat on Nakki Lake'], donts: ['Don\'t waste water', 'Respect heritage']
        },
        'mahabaleshwar': {
            name: 'Mahabaleshwar', category: 'hill_station', altitude_m: 1353, avg_aqi: 40, safety_rating: 5,
            avg_daily_cost: 110, climate: 'moderate', crowd_level: 'medium',
            image: 'https://imgs.search.brave.com/NH-MFcsl55RRChKmQTOj8yYTg4NnFwH9hfPdOqaeajE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zN2Fw/MS5zY2VuZTcuY29t/L2lzL2ltYWdlL2lu/Y3JlZGlibGVpbmRp/YS9sb3JkLW1haGFi/YWxlc2h3YXItdGVt/cGxlLW1haGFyYXNo/dHJhLTEtYXR0ci1o/ZXJvP3FsdD04MiZ0/cz0xNzI2NjY4OTg3/MjQx',
            reviews: 4.7, attractions: ['Venna Lake', 'Mapro Garden', 'Arthur Seat'],
            hospitals: ['Mahabaleshwar Civil Hospital'],
            dos: ['Try strawberries', 'Carry light jacket'], donts: ['Don\'t litter', 'Avoid peak noon hikes']
        },
        'pachmarhi': {
            name: 'Pachmarhi', category: 'hill_station', altitude_m: 1067, avg_aqi: 40, safety_rating: 5,
            avg_daily_cost: 90, climate: 'moderate', crowd_level: 'medium',
            image:'https://www.bing.com/th/id/OIP.Z7Kk3Y-LHsfD0BRt379UDAHaFj?w=196&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
            reviews: 4.6, attractions: ['Bee Falls', 'Dhoopgarh', 'Pandava Caves'],
            hospitals: ['Pachmarhi Civil Hospital'],
            dos: ['Hire local guide', 'Respect wildlife'], donts: ['No plastic', 'Avoid off-trail walks']
        },
        'rajgir': {
            name: 'Rajgir Hills', category: 'hill_station', altitude_m: 300, avg_aqi: 120, safety_rating: 4,
            avg_daily_cost: 70, climate: 'hot', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1617251137884-f135eccf6942?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.4, attractions: ['Vulture Peak', 'Jain Temples', 'Glass Bridge'],
            hospitals: ['Rajgir Sub-Divisional Hospital'],
            dos: ['Visit hot springs', 'Hydrate'], donts: ['Avoid noon treks', 'Don\'t litter']
        },
        'chopta': {
            name: 'Chopta', category: 'hill_station', altitude_m: 2680, avg_aqi: 20, safety_rating: 4,
            avg_daily_cost: 90, climate: 'cold', crowd_level: 'low',
            image: 'https://www.bing.com/th/id/OIP.MixiLXfSi4aBRnWL347jGwHaE6?w=312&h=424&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
            reviews: 4.7, attractions: ['Tungnath Trek', 'Meadows', 'Deoria Tal'],
            hospitals: ['Ukhimath PHC'],
            dos: ['Carry woolens', 'Start trek early'], donts: ['Don\'t disturb wildlife', 'Avoid monsoon landslides']
        },
        'jageshwar': {
            name: 'Jageshwar', category: 'hill_station', altitude_m: 1870, avg_aqi: 30, safety_rating: 4,
            avg_daily_cost: 80, climate: 'cold', crowd_level: 'low',
            image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.6, attractions: ['Jageshwar Temple Complex', 'Cedar Forests'],
            hospitals: ['Almora District Hospital'],
            dos: ['Respect temples', 'Walk gently'], donts: ['Don\'t litter', 'Avoid night treks']
        },
        'ajanta_ellora': {
            name: 'Ajanta & Ellora', category: 'city', altitude_m: 500, avg_aqi: 120, safety_rating: 4,
            avg_daily_cost: 100, climate: 'hot', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['Ajanta Caves', 'Ellora Caves', 'Kailasa Temple'],
            hospitals: ['Government Hospital Aurangabad'],
            dos: ['Hire guide', 'Carry water'], donts: ['Don\'t touch carvings', 'Avoid peak heat']
        },
        'hampi': {
            name: 'Hampi', category: 'city', altitude_m: 467, avg_aqi: 80, safety_rating: 5,
            avg_daily_cost: 100, climate: 'hot', crowd_level: 'medium',
            image: 'https://th.bing.com/th/id/OIP.0CylvRGKskK6K88VjJOeiQHaFb?w=217&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
            reviews: 4.9, attractions: ['Vittala Temple', 'Stone Chariot', 'Matanga Hill'],
            hospitals: ['Hospet Civil Hospital'],
            dos: ['Sunrise climb', 'Respect ruins'], donts: ['Don\'t carve on stones', 'Avoid noon heat']
        },
        'alleppey': {
            name: 'Alleppey', category: 'nature', altitude_m: 1, avg_aqi: 30, safety_rating: 5,
            avg_daily_cost: 110, climate: 'humid', crowd_level: 'medium',
            image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1200&auto=format&fit=crop',
            reviews: 4.8, attractions: ['Backwaters', 'Houseboats', 'Beaches'],
            hospitals: ['Alappuzha Medical College'],
            dos: ['Stay on houseboat', 'Try local cuisine'], donts: ['Don\'t litter water', 'Respect locals']
        }
    };

    // 3. AQI RULE ENGINE
    function checkAQIRules(locationData, travelers) {
        const warnings = [];
        // Prefer live AQI if available
        let aqi = locationData.avg_aqi;
        try {
            const live = window.App.Store.getLiveAQI(locationData.name);
            if (live && typeof live.current === 'number') {
                aqi = live.current;
            }
        } catch(e) {}

        if (aqi <= 50) {
            // Safe
        } else if (aqi > 50 && aqi <= 100) {
            warnings.push({ type: 'aqi', status: 'caution', message: "Moderate air quality. Sensitive travelers should take care." });
        } else if (aqi > 100) {
            const hasRespiratory = travelers.some(t => t.medicalConditions.includes('asthma') || t.medicalConditions.includes('allergy'));
            if (hasRespiratory) {
                warnings.push({ type: 'aqi', status: 'not_recommended', message: "Poor air quality is unsafe for respiratory patients." });
            }
            if (aqi > 150) {
                warnings.push({ type: 'aqi', status: 'not_recommended', message: "Very poor air quality. Travel blocked." });
            }
        }
        return warnings;
    }

    // Weather Alerts Rules (derived from live weather data)
    function checkWeatherRules(locationData, travelers) {
        const warnings = [];
        try {
            const liveW = window.App.Store.getLiveWeather(locationData.name);
            const alerts = (liveW && liveW.alerts) || [];
            alerts.forEach(a => {
                if (String(a).toLowerCase().includes('heatwave')) {
                    warnings.push({ type: 'weather', status: 'caution', message: 'Heatwave alert: plan with hydration and rest.' });
                }
                if (String(a).toLowerCase().includes('extreme cold')) {
                    // Extra caution for asthma and seniors
                    const hasSensitive = travelers.some(t => t.medicalConditions.includes('asthma') || t.ageGroup === 'senior');
                    warnings.push({ type: 'weather', status: hasSensitive ? 'not_recommended' : 'caution', message: 'Extreme cold alert: risky for asthma or seniors.' });
                }
                if (String(a).toLowerCase().includes('heavy rain')) {
                    warnings.push({ type: 'weather', status: 'caution', message: 'Heavy rain alert: outdoor activities may be unsafe.' });
                }
            });
        } catch(e) {}
        return warnings;
    }

    // 4. MEDICAL RULE ENGINE
    function checkMedicalRules(locationData, travelers, travelDetails) {
        const warnings = [];
        
        travelers.forEach((traveler, index) => {
            const conditions = traveler.medicalConditions;
            const name = `Traveler ${index + 1} (${traveler.ageGroup})`;

            if (locationData.altitude_m > 2500 && (conditions.includes('heart_disease') || conditions.includes('bp'))) {
                warnings.push({ type: 'medical', status: 'not_recommended', message: `${name}: High altitude is unsafe for heart or BP patients.` });
            }
            if (locationData.climate === 'cold' && conditions.includes('asthma')) {
                warnings.push({ type: 'medical', status: 'caution', message: `${name}: Cold weather may trigger asthma.` });
            }
            if (locationData.crowd_level === 'high' && conditions.includes('anxiety')) {
                warnings.push({ type: 'medical', status: 'caution', message: `${name}: Crowded locations may cause anxiety issues.` });
            }
            if (conditions.includes('walking_difficulty') && locationData.category === 'adventure') {
                warnings.push({ type: 'medical', status: 'not_recommended', message: `${name}: Adventure locations require physical mobility.` });
            }
            if (conditions.includes('pregnancy') && travelDetails.transportMode === 'bus') {
                warnings.push({ type: 'medical', status: 'caution', message: `${name}: Long bus journeys may be uncomfortable during pregnancy.` });
            }
        });

        return warnings;
    }

    // 5. AGE-BASED SAFETY RULES
    function checkAgeRules(locationData, travelers, travelDetails) {
        const warnings = [];
        travelers.forEach((traveler, index) => {
            const name = `Traveler ${index + 1}`;
            if (traveler.ageGroup === 'senior' && travelDetails.days > 7) {
                warnings.push({ type: 'age', status: 'caution', message: `${name}: Long trips may cause fatigue for seniors.` });
            }
            if (traveler.ageGroup === 'child' && locationData.climate === 'hot' && locationData.avg_aqi > 100) { 
                 warnings.push({ type: 'age', status: 'caution', message: `${name}: Heat and pollution is unsafe for children.` });
            }
            if (traveler.ageGroup === 'senior' && locationData.altitude_m > 3000) {
                warnings.push({ type: 'age', status: 'caution', message: `${name}: Very high altitude may be risky for seniors.` });
            }
        });
        return warnings;
    }

    // 6. SAFETY & REVIEW RULES
    function checkSafetyRules(locationData) {
        const warnings = [];
        if (locationData.safety_rating < 3) {
            warnings.push({ type: 'safety', status: 'caution', message: "Safety concerns reported by travelers." });
        }
        if (locationData.safety_rating < 2) {
            warnings.push({ type: 'safety', status: 'not_recommended', message: "Location is unsafe for travel." });
        }
        return warnings;
    }

    // 7. BUDGET RULE ENGINE
    function checkBudgetRules(locationData, travelDetails, travelersCount) {
        const warnings = [];
        // totalBudget in state might be rawBudgetInput or internalBudgetUSD depending on context
        // But for internal calculation, we MUST use internalBudgetUSD
        const budgetUSD = travelDetails.internalBudgetUSD || travelDetails.totalBudget || 0;
        
        const estimatedStayCost = locationData.avg_daily_cost * travelDetails.days * travelersCount;
        
        // Add transport cost estimate
        let transportCost = 0;
        
        if (travelDetails.selectedTransportPrice) {
            transportCost = travelDetails.selectedTransportPrice * travelersCount;
        } else {
            switch(travelDetails.transportMode) {
                case 'flight': transportCost = 200 * travelersCount; break;
                case 'train': transportCost = 50 * travelersCount; break;
                case 'bus': transportCost = 30 * travelersCount; break;
                case 'car': transportCost = 100 * travelersCount; break;
                default: transportCost = 100 * travelersCount;
            }
        }

        const baseTotalUSD = estimatedStayCost + transportCost;
        const emergencyBufferUSD = baseTotalUSD * 0.1;
        const totalEstimatedUSD = baseTotalUSD + emergencyBufferUSD;

        if (budgetUSD < totalEstimatedUSD) {
            const store = window.App.Store;
            const formattedRequired = store.formatPrice(totalEstimatedUSD);
            const formattedBudget = store.formatPrice(budgetUSD);
            
            warnings.push({ 
                type: 'budget', 
                status: 'not_recommended', 
                message: `Budget is insufficient. Required: ${formattedRequired}, Available: ${formattedBudget}` 
            });
        }
        
        return { warnings, totalEstimated: totalEstimatedUSD };
    }

    // 8. FINAL DECISION AGGREGATOR
    function evaluateLocation(locationName, travelDetails, travelers) {
        const locationData = locationDatabase[locationName.toLowerCase()];
        if (!locationData) return null;

        const allWarnings = [
            ...checkMedicalRules(locationData, travelers, travelDetails),
            ...checkAQIRules(locationData, travelers),
            ...checkWeatherRules(locationData, travelers),
            ...checkSafetyRules(locationData),
            ...checkAgeRules(locationData, travelers, travelDetails),
        ];

        const budgetResult = checkBudgetRules(locationData, travelDetails, travelers.length);
        allWarnings.push(...budgetResult.warnings);

        // Determine Final Status
        let finalStatus = '✅ SAFE';
        if (allWarnings.some(w => w.status === 'not_recommended')) {
            finalStatus = '❌ NOT RECOMMENDED';
        } else if (allWarnings.some(w => w.status === 'caution')) {
            finalStatus = '⚠️ CAUTION';
        }

        return {
            location: locationData,
            status: finalStatus,
            warnings: allWarnings,
            costEstimate: budgetResult.totalEstimated
        };
    }

    // 9. ALTERNATIVE SUGGESTION
    function getAlternatives(failedLocationName, travelDetails, travelers) {
        const failedLoc = locationDatabase[failedLocationName.toLowerCase()];
        
        const suggestions = Object.keys(locationDatabase)
            .filter(key => key !== failedLocationName.toLowerCase())
            .map(key => evaluateLocation(key, travelDetails, travelers))
            .filter(res => res.status === '✅ SAFE' || res.status === '⚠️ CAUTION')
            .sort((a, b) => {
                if (a.status === '✅ SAFE' && b.status !== '✅ SAFE') return -1;
                if (b.status === '✅ SAFE' && a.status !== '✅ SAFE') return 1;
                return a.costEstimate - b.costEstimate; 
            })
            .slice(0, 3); 

        return suggestions;
    }

    // Expose Global Object
    window.App.Utils.Rules = {
        locationDatabase,
        evaluateLocation,
        getAlternatives,
        buildImagePrompt: function(placeName) { return `Realistic travel photograph of ${placeName} showing its famous landmarks, terrain, architecture, culture, and climate typical to that location. Must match real geography. No generic scenery. Ultra realistic, 4k tourism photography.`; }
    };
})();
