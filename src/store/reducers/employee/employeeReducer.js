import {employeeActionsTypes} from "./types";

const initialState = {
    employees: [],
    checkedEmployees: [],
    IsAllEmployeesChecked: false
}

export const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case employeeActionsTypes.SET_EMPLOYEE: {
            return {...state, employees: action.employees}
        }
        case employeeActionsTypes.ADD_CHECKED_EMPLOYEE: {
            return {...state, checkedEmployees: [...state.checkedEmployees, action.id]}
        }
        case employeeActionsTypes.REMOVE_CHECKED_EMPLOYEE: {
            let newEmployees = state.checkedEmployees.filter(epmId => epmId !== action.id)
            return {...state, checkedEmployees: newEmployees}
        }
        case employeeActionsTypes.CLEAR_EMPLOYEES: {
            return {...state, employees: []}
        }
        case employeeActionsTypes.SET_IS_ALL_CHECKED: {
            return {...state, IsAllEmployeesChecked: action.IsAllEmployeesChecked}
        }
        default:
            return state
    }
}