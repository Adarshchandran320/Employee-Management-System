import { useState } from "react";
import { addDepartment, updatedDepartment } from "../services/departmentService";

function DepartmentForm({ loadDepartments, departmentToEdit, setDepartmentToEdit }) {
    // starts with the selected department's name when editing (the key in the parent resets this)
    const [departmentName, setDepartmentName] = useState(
        departmentToEdit?.DepartmentName ?? ""
    );
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const isEditing = departmentToEdit !== null;

    

    const saveDepartment = async () => {
        if (departmentName.trim() === "") {
            setError("Department name is required");
            return;
        }
        try {
            setError("");
            setSaving(true);

            const data = { DepartmentName: departmentName.trim() };

            if (isEditing) {
                await updatedDepartment(departmentToEdit.DepartmentId, data);
                setDepartmentToEdit(null); // leave edit mode
            } else {
                await addDepartment(data);
            }

            setDepartmentName("");
            await loadDepartments(); // refresh the list
        } catch (err) {
            console.error("Error saving department:", err);
            setError(
                err.response?.data?.DepartmentName?.[0] ||
                "Unable to save department, please try again"
            );
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="mt-4">
            <h3>{isEditing ? "Edit Department" : "Add Department"}</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
                className="form-control"
                placeholder="Department Name"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
            />
            <button
                className="btn btn-primary mt-3"
                onClick={saveDepartment}
                disabled={saving}
            >
                {saving ? "Saving..." : isEditing ? "Update" : "Save"}
            </button>
            {isEditing && (
                <button
                    className="btn btn-secondary mt-3 ms-2"
                    onClick={() => setDepartmentToEdit(null)}
                >
                    Cancel
                </button>
            )}
        </div>
    );
}

export default DepartmentForm;