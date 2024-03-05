import Layout from "./components/Layout";
import Login from "./components/LogIn";
import SignUp from "./components/SignUp"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./components/Userprofile";
import PersonalizedFeed from "./components/PersonalizedFeed";
import Dashboard from "./components/Dashboard";
import MemoryDetails from "./components/memoryDetails";

function App() {
  return (
   <Layout>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/users/:userId" element={<UserProfile />} />
      <Route path="/user/feed" element={<PersonalizedFeed/>} />
      <Route path="/user/dashboard" element={<Dashboard/>} />
      <Route path="/memory" component={MemoryDetails} />
    </Routes>
    </BrowserRouter>
   </Layout>
  )
}

export default App
