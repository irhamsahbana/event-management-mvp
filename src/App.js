import EventCreation from './pages/EventCreation';
import EventDiscovery from './pages/EventDiscovery';
import EventDetail from './pages/EventDetail';

import { Routes, Route } from 'react-router-dom';
import UserSeeder from './pages/UserSeeder';
import LoginAsAdmin from './pages/LoginAsAdmin';
import LoginAsUser from './pages/LoginAsUser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EventDiscovery />}/>
      <Route path="/event-creation" element={<EventCreation />} />
      <Route path="/event/:id" element={<EventDetail />} />

      <Route path="/seeding" element={<UserSeeder />} />
      <Route path="/admin-login" element={<LoginAsAdmin />} />
      <Route path="/user-login" element={<LoginAsUser />} />
    </Routes>
  );
}

export default App;
