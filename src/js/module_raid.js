const initialize_modules = () => {
    MODULES = {
        WEB_MENU_BAR: require(WA_MODULES.WEB_MENU_BAR),
    };
    console.log('Modules have been loaded successfully!');
};
