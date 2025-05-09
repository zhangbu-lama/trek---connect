import React from 'react';
import UserSidebar from '../UserDashboard/UserSidebar'
const UserLayout = ({ children }) => (
  <div className="flex">
    <UserSidebar />
    <main className="ml-64 w-full bg-gray-50 min-h-screen p-8">{children}</main>
  </div>
);

export default UserLayout;
