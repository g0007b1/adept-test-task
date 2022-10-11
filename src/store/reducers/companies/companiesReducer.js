import {companiesActionsTypes} from "./types";

const initialState = {
    companies: [],
    checkedCompanies: [],
    isAllCompaniesChecked: false
}
export const companiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case companiesActionsTypes.GET_COMPANIES: {
            return {...state, companies: action.companies}
        }
        case companiesActionsTypes.ADD_CHECKED_COMPANY: {
            return {...state, checkedCompanies: [...state.checkedCompanies, action.company]}
        }
        case companiesActionsTypes.REMOVE_CHECKED_COMPANY: {
            let newCompanies = state.checkedCompanies.filter(company => company !== action.company)
            return {...state, checkedCompanies: newCompanies}
        }
        case companiesActionsTypes.CLEAR_COMPANIES: {
            return {...state, companies: []}
        }
        case companiesActionsTypes.SET_IS_ALL_CHECKED: {
            return {...state, isAllCompaniesChecked: action.isAllCompaniesChecked}
        }
        default:
            return state
    }
}