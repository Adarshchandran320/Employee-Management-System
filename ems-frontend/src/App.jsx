import { BrowserRouter,Routes,Route} from "react-router-dom";
// import Login from "./pages/Login";
import EmployeeList from "./pages/EmployeeList";
import Dashboard from "./pages/Dashboard";
import DepartmentList from "./pages/DepartmentList";
import ProjectList from "./pages/ProjectList";
import UserDetailsList from "./pages/UserDetailsList";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {/* Define application routes */}
        <Routes>
          {/* default page */}
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employee" element={<EmployeeList />} />
          <Route path="/project" element={<ProjectList />} />
          <Route path="/userdetails" element={<UserDetailsList />} />
          <Route path="/departments" element={<DepartmentList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;