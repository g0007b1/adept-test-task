import {companiesActionsTypes} from "./types";
import {companiesApi} from "../../../api/companies-api";
import {employeeActions} from "../employee/actions";

export const companiesActions = {
    setCompanies: (companies) => ({type: companiesActionsTypes.GET_COMPANIES, companies}),
    addCheckedCompany: (company) => ({type: companiesActionsTypes.ADD_CHECKED_COMPANY, company}),
    removeCheckedCompany: (company) => ({type: companiesActionsTypes.REMOVE_CHECKED_COMPANY, company}),
    clearCompanies: () => ({type: companiesActionsTypes.CLEAR_COMPANIES}),
    addCompany: (amount) => {
        return async (dispatch) => {
            const response = await companiesApi.addCompany()
            dispatch(companiesActions.getCompanies(amount))
        }
    },
    getCompanies: (amount) => {
        return async (dispatch) => {
            const companies = await companiesApi.getCompanies(amount)
            dispatch(companiesActions.setCompanies(companies))
        }
    },
    patchCompanyCell: (companyId, cell, value, amount) => {
        return async (dispatch) => {
            const response = await companiesApi.patchCompanyCell(companyId, cell, value)
            dispatch(companiesActions.getCompanies(amount))
        }
    },
    setIsAllCompaniesChecked: (isAllCompaniesChecked) => ({
        type: companiesActionsTypes.SET_IS_ALL_CHECKED,
        isAllCompaniesChecked
    }),
    deleteCompany: (companyIds, amount) => {
        return async (dispatch) => {
            companyIds.forEach(id => {
                companiesApi.deleteCompany(id)
                dispatch(companiesActions.removeCheckedCompany(id))
            })
            dispatch(companiesActions.clearCompanies())
            dispatch(companiesActions.getCompanies(amount))
            dispatch(employeeActions.clearEmployees())
        }
    }
}