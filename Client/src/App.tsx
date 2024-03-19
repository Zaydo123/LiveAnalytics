import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Embed from './pages/Embed';

const LandingPage = () => {
  return (
    <div className="text-center bg-gray-200 w-max m-auto p-20 mt-20">
      <h1>Welcome!</h1>
      <Link className="text-blue-500 underline" to="/admin">Admin Login</Link>
    </div>
  );
};

const AdminLogin = () => {
  return (
    <div className='m-auto mt-10'>
      <h1 className="text-4xl text-center">Admin Login Page</h1>
      {/* Add your admin login form here */}
      <form className="flex flex-col items-center" onSubmit={e => e.preventDefault()}>
        <input className="m-2 p-2" id='login-1' type="text" placeholder="Username" />
        <input className="m-2 p-2" id='login-2' type="password" placeholder="Password" />
        <button className="m-2 p-2 bg-blue-500 text-white rounded-lg" onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

function handleLogin() {
  //clear the form
  console.log('Logging in...');
  fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: (document.getElementById('login-1') as HTMLInputElement).value,
      password: (document.getElementById('login-2') as HTMLInputElement).value
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        //redirect to admin page
        window.location.href = '/admin/panel';
      }
    });
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/embed" element={<Embed />} />
      </Routes>
    </Router>
  );
};

export default App;