import { useEffect, useState } from "react";
import { getDepartments } from "../services/departmentService";
import { addEmployee, updateEmployee } from "../services/employeeService";


function EmployeeForm({ loadEmployees,employeeToEdit,onCancelEdit }){
    const [ employeename, setEmployeeName] = useState(employeeToEdit?.EmployeeName||"");
    const [ designation,setDesignation ] = useState(employeeToEdit?.Designation||"");
    const [ dateofjoining,setDateOfJoining ]= useState(employeeToEdit?.DateOfJoining||"");
    const [ contact,setContact ] = useState(employeeToEdit?.Contact||"");
    const [ departmentid,setDepartmentID ]= useState(
        employeeToEdit?.DepartmentId!=null?String(employeeToEdit.DepartmentId):""
    );
    const [ isActive,setIsActive ]= useState(employeeToEdit?employeeToEdit.IsActive:true);

    const [ departments,setDepartments ] = useState([]);
    const [ loadingdepartments,setLoadingDepartments ] = useState(true);
    const [ error,setError ]= useState("");
    const [ saving,setSaving ]= useState(false);


    //load departments for the dropdown
    useEffect(()=>{
        const loadDepartments=async() =>{
            try{
                const response=await getDepartments();
                setDepartments(response.data);
            }catch(err){
                console.error("error loading departments: ",err);
                setError("unable to load departments");
            }finally{
                setLoadingDepartments(false);
            }
        };
        loadDepartments();
    },[]);

    //add a new employee
    const handleSubmit=async(event)=>{
        event.preventDefault();

        setError("");
        setSaving(true);

        const employeeData={
            EmployeeName:employeename.trim(),
            Designation:designation,
            DateOfJoining:dateofjoining,
            Contact:contact.trim(),
            DepartmentId:Number(departmentid),
            IsActive:isActive
        };

        try{
            if(employeeToEdit){
                await updateEmployee(employeeToEdit.EmployeeId,employeeData);
                alert("employee updated successfully");
                if(onCancelEdit){
                    onCancelEdit();
                }
            }else{
                await addEmployee(employeeData);
                alert("employee added successfully");
            }

            setEmployeeName("");
            setDesignation("");
            setDateOfJoining("");
            setContact("");
            setDepartmentID("");
            setIsActive(true);

            await loadEmployees();

        }catch(err){
            console.error("error adding employeee :",err);
            const responseData=err.response?.data;
            setError(
                typeof responseData==="object" && responseData!=null
                ?JSON.stringify(responseData)
                : "unable to add employee.please check the entered details"
            );
        }finally{
            setSaving(false);
        }
    };

    return(
        <div className="card mb-4">
            <div className="card-header">
                <h4 className="mb-0">{employeeToEdit?"Edit Employee":"Add Employee"}</h4>
            </div>

            <div className="card-body">
                {error&&(
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {loadingdepartments?(
                    <p>Loading Departments....</p>
                ):(
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                Employee Name
                            </label>
                            <input type="text" className="form-control" value={employeename}
                            onChange={(event)=>
                                setEmployeeName(event.target.value)
                            }required/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Designation
                            </label>
                            <select className="form-select" value={designation}
                            onChange={(event)=>
                                setDesignation(event.target.value)
                            }required>
                                <option value="">Select designation</option>
                                <option value="Manager">Manager</option>
                                <option value="Senior Engineer">Senior Engineer</option>
                                <option value="Engineer">Engineer</option>
                                <option value="Intern">Intern</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Date of Joining
                            </label>
                            <input type="date" className="form-control" value={dateofjoining}
                            onChange={(event)=>
                                setDateOfJoining(event.target.value)
                            }required/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Contact
                            </label>
                            <input type="text" className="form-control" placeholder="10 digit contact number" value={contact}
                            onChange={(event)=>
                                setContact(event.target.value)
                            }required/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Department
                            </label>
                            <select className="form-select" value={departmentid}
                            onChange={(event)=>
                                setDepartmentID(event.target.value)
                            }required>
                                <option value="">Select department</option>
                                {departments.map((department)=>(
                                    <option key={department.DepartmentId} value={department.DepartmentId}>
                                        {department.DepartmentName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-check mb-3">
                            <input type="checkbox" className="form-check-input" id="isActive" checked={isActive}
                            onChange={(event)=>
                                setIsActive(event.target.checked)
                            }/>
                            <label className="form-check-label" htmlFor="isActive">
                                Active
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={saving}>
                            {saving?"Saving...":employeeToEdit?"Update":"Save"}
                        </button>
                        {employeeToEdit&&(
                            <button type="button" className="btn btn-secondary ms-2" onClick={onCancelEdit} disabled={saving}>
                                Cancel
                            </button>
                        )}
                    </form>
                )}
            </div>
        </div>
    )
}

export default EmployeeForm;