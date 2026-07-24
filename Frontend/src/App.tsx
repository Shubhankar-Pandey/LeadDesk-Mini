import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomeScreen from './screens/Home'
import SignupForm from './screens/SignupForm'
import ProtectedRoute from './ProtectedRoute'
import AdminDashoboard from './screens/AdminDashboard'
import SigninForm from './screens/SignInForm'


function App(){
  return (
    <div>
        <Routes>
          <Route path='/' element={<HomeScreen/>}/>
          <Route path='/admin/signup' element={<SignupForm/>}/>
          <Route path='/admin/signin' element = {<SigninForm/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='/admin/dashboard' element={<AdminDashoboard/>}/>
          </Route>
        </Routes>
    </div>
  )
}

export default App
