export const TOGGLE_LOADER = '[SITE_DATA] TOGGLE_LOADER';
export const FORCE_HIDE_LOADER = '[SITE_DATA] FORCE_HIDE_LOADER';
export const LOAD_CAR_MODELS = '[SITE_DATA] LOAD_CAR_MODELS';
export const LOAD_CAR_CATEGORIES = '[SITE_DATA] LOAD_CAR_CATEGORIES';

export function showLoader() {

    return {
        type: TOGGLE_LOADER,
        loader: true
    };
}

export function forceHideLoader() {
    return {
        type: TOGGLE_LOADER
    };
}

export function hideLoader() {
    return {
        type: TOGGLE_LOADER,
        loader: false
    };
}

export function loadCarCategories(carCategories) {
    return {
        type: LOAD_CAR_CATEGORIES,
        carCategories: carCategories
    };
}

export function loadCarModels(carModels) {
    return {
        type: LOAD_CAR_MODELS,
        carModels: carModels
    };
}