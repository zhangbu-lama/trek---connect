import React from 'react';
import Sidebar from '../AdminPanel/Sidebar.jsx';

const Layout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <main className="ml-64 w-full bg-gray-50 min-h-screen p-8">{children}</main>
  </div>
);

export default Layout;
