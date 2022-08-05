export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDelete = (id) => {
    return {
        type: 'HEROES_DELETE',
        payload: id
    }
}

export const heroesAdd = (props) => {
    return {
        type: 'HEROES_ADD',
        payload: props
    }
}

export const filtersLoading = (props) => {
    return {
        type: 'FILTERS_LOADING',
        payload: props
    }
}

export const filtersLoaded = () => {
    return {
        type: 'FILTERS_LOADED'
    }
}

export const setActiveFilter = (filter) => {
    return {
        type: 'SET_ACTIVE_FILTER',
        payload: filter
    }
}