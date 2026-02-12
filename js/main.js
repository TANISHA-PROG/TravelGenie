(function() { 
    console.log('TravelGenie App Initialized'); 

    // Currency Selector Logic
    const currencySelector = document.getElementById('currency-selector');
    if (currencySelector) {
        // Set initial value from store
        currencySelector.value = window.App.Store.getState().currentCurrency;

        currencySelector.addEventListener('change', (e) => {
            const newCurrency = e.target.value;
            console.log('[Main] Currency changing to:', newCurrency);
            
            window.App.Store.setState({ currentCurrency: newCurrency });
            
            // Re-render active view via router
            if (window.App.Router?.refresh) {
                window.App.Router.refresh();
            }
        });
    }
 
    if (window.App?.Router?.init) { 
        window.App.Router.init(); 
    } else { 
        console.error('Router not found'); 
    } 
})(); 
