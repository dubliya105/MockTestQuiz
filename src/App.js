import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginForm from './screen/LoginForm';
import Signup from './screen/Signup';
import OtpVerification from './screen/OtpVerification';
import Auth from './screen/Auth';
import ForgetPass from './screen/ForgetPass';
import OtpVerify from './screen/OtpVerify';
import NewPassword from './screen/NewPassword';
import Dashboard from './components/Dashboard';
import Users from './screen/Users';
import ShowUser from './screen/ShowUser';
import ShowUserDe from './screen/ShowUserDe';
import EmailData from './screen/EmailData';
import Coordinate from './screen/Coordinate';
import MockTest from './screen/MockTest';

function App() {
  return (
    
    <div className="App">
    <Routes>
      <Route path="/auth" element={<LoginForm />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otpverify" element={<OtpVerification />} />
      <Route path="/" element={<Auth />} />
      <Route path="/forget" element={<ForgetPass/>} />
      <Route path="/verification" element={<OtpVerify/>} />
      <Route path="/newpassword" element={<NewPassword/>} />
      <Route path="/Dashboard" element={<Dashboard/>} />
      <Route path="/users" element={<Users/>} />
      <Route path="/showUser" element={<ShowUser/>} />
      <Route path="/showUserDe" element={<ShowUserDe/>} />
      <Route path="/email" element={<EmailData/>} />
      <Route path="/coordinate" element={<Coordinate/>} />
      <Route path="/mocktest" element={<MockTest/>} />
    </Routes>

    </div>
  );
}
export default App;
