import {combineReducers} from "redux";
import {companiesReducer} from "./companies/companiesReducer";
import {employeeReducer} from "./employee/employeeReducer";

export const rootReducer = combineReducers({companiesReducer, employeeReducer})
