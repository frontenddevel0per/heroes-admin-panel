const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'loading',
    activeFilter: "all"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETE':
            console.log('Wanna delete hero with id: ' + action.payload);
            let newArr = [];
            state.heroes.forEach(item => {
                if (item.id !== action.payload) {
                    newArr.push(item);
                }
            });
            console.log(newArr);
            return {
                ...state,
                heroes: newArr
            }
        case 'HEROES_ADD':
            console.log('Adding new hero');
            let newId = 1;
            if (state.heroes.length !== 0) {
                newId = state.heroes[state.heroes.length - 1].id + 1;
            }
            return {
                ...state,
                heroes: [...state.heroes, ...[{
                    id: newId,
                    name: action.payload.name,
                    description: action.payload.description,
                    element: action.payload.element
                }]]
            }
        case 'FILTERS_LOADING':
            return {
                ...state,
                filters: action.payload
            }
        case 'FILTERS_LOADED':
            return {
                ...state,
                filtersLoadingStatus: 'idle'
            }
        case 'SET_ACTIVE_FILTER':
            return {
                ...state,
                activeFilter: action.payload
            }
        default: return state
    }
}

export default reducer;