import { Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import EventCreation from './pages/EventCreation';
import EventDiscovery from './pages/EventDiscovery';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import UserSeeder from './dev/UserSeeder';
import LoginAsAdmin from './dev/LoginAsAdmin';
import LoginAsUser from './dev/LoginAsUser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EventDiscovery />}/>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/event-creation" element={<EventCreation />} />
      <Route path="/event/:id" element={<EventDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/seeding" element={<UserSeeder />} />
      <Route path="/admin-login" element={<LoginAsAdmin />} />
      <Route path="/user-login" element={<LoginAsUser />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
