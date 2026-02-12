(function() { 
    function initRouter() { 

        const routes = { 
            '/': window.App.Views.renderHome, 
            '/auth': window.App.Views.renderAuth, 
            '/destinations': window.App.Views.renderDestinationList, 
            '/planner': window.App.Views.renderPlanner, 
            '/results': window.App.Views.renderResults, 
            '/support': window.App.Views.renderSupport,
            '/saved': () => '<h1>Saved Trips (Coming Soon)</h1>' 
        }; 

        function router() { 
            const path = window.location.hash.slice(1) || '/'; 
            const store = window.App.Store.getState(); 
            const app = document.getElementById('main-content'); 

            if (!app) { 
                console.error('Main content container missing'); 
                return; 
            } 

            // Auth Guard 
            if (path !== '/auth' && !store.auth.isAuthenticated) { 
                window.location.hash = '#/auth'; 
                return; 
            } 

            if (path === '/auth' && store.auth.isAuthenticated) { 
                window.location.hash = '#/'; 
                return; 
            } 

            const view = routes[path] || routes['/']; 

            app.innerHTML = ''; 

            const content = view(); 

            if (typeof content === 'string') { 
                app.innerHTML = content; 
            } else if (content instanceof HTMLElement) { 
                app.appendChild(content); 
            } 
        } 

        window.addEventListener('hashchange', () => {
            console.log('[Router] Hash changed to:', window.location.hash);
            router();
        });
        window.addEventListener('load', router);
        
        // Manual trigger for refresh cases
        window.App.Router.refresh = router;
    } 

    window.App.Router.init = initRouter; 
})(); 
