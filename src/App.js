import { Route, Routes } from 'react-router-dom';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
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
import MockTestQuiz from './screen/MockTestQuiz';
import Blog from './screen/Blog';
import Packeges from './screen/Packeges';
import ShowBlog from './screen/ShowBlog';
import ShowBlogDetail from './screen/ShowBlogDetail';
import PackageDetail from './screen/PackageDetail';
import CreateExam from './screen/CreateExam';
import BharatSATExam from './screen/BharatSATExam';
import BharatSatExamView from './screen/BharatSatExamView';
import { usersContext } from './components/context/UserContext.js';
import { useState } from 'react';
import QuestionReview from './screen/QuestionReview.jsx';
function App() {
  const [userData,setUserData]=useState({});
  const [token,setToken] = useState('')
  return (
    <usersContext.Provider value={{userData,setUserData,token,setToken}}>
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
      <Route path="/mockTestQuiz" element={<MockTestQuiz/>} />
      <Route path="/blog" element={<Blog/>} />
      <Route path="/package" element={<Packeges/>} />
      <Route path="/showblogs" element={<ShowBlog/>} />
      <Route path="/showBlogDetail/:blog_id" element={<ShowBlogDetail/>} />
      <Route path="/showPackageDetail/:id" element={<PackageDetail/>} />
      <Route path="/createExam" element={<CreateExam/>} />
      <Route path="/bharatSATexam" element={<BharatSATExam/>} />
      <Route path="/QuestionReview" element={<QuestionReview/>} />
      <Route path="/bharatSatExamView/:id" element={<BharatSatExamView/>} />
    </Routes>

    </div>
    </usersContext.Provider>
  );
}
export default App;
