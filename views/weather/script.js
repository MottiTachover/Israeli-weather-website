const options = {
    key: 'fJ6of8mgNaZcmRtcqkshzJVCAGcQZ8Mj', // REPLACE WITH YOUR KEY !!!
};

windyInit(options, windyAPI => {
    // All the params are stored in windyAPI.store
    const { overlays} = windyAPI;

    
    

    overlays.wind.listMetrics();
    // ['kt', 'bft', 'm/s', 'km/h', 'mph'] .. available metrics

    overlays.wind.setMetric('km/h');
    // Metric for wind was changed to bft

   
});