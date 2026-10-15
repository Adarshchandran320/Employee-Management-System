// Import reusable axios instance
import api from "./api";

//Get all departments
export const getDepartments=()=>{
    return api.get("departments/");
};

//create a new department
export const addDepartment =(department)=>{
    return api.post(
        "departments/",department
    );
};

//delete department
export const deleteDepartment=(id)=>{
    return api.delete(`departments/${id}/`);
}


//edit department
export const updatedDepartment=(id,department)=>{
    return api.patch(`departments/${id}/`,department);
}