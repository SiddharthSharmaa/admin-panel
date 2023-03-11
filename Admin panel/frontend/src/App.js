import Layout from "./components/home/Layout";
import RegistrationForm from "./components/home/RegistrationForm"
import {Route, Routes} from 'react-router-dom'
import AdminView from "./components/admin/AdminView";
import EditForm from "./components/admin/EditForm";
import Header from "./components/home/Header";
import AddRoom from "./components/admin/AddRoom";

function App() {
   return(
    
    <div>
        <Header />
        <Routes>
            <Route path='/createRoom' element={<AddRoom />} />
            <Route path="/" element={<Layout />}/>
            <Route path="editForm" element={<EditForm />} />
            <Route path="/booking" element={<RegistrationForm />}/>
            <Route path="/admin" element={<AdminView />}/>
        </Routes>
    </div>
   )
}

export default App;
