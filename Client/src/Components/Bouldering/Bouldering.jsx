import React from "react";
import MapComponent from "./MapComponent";
import ProductShowcase from "./Productpage";

function Bouldering() {   
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}



      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Map Section */}
        <section id="map" className="mb-16">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Climbing Locations</h2>
              <p className="text-slate-600 mb-6">
                Explore the beautiful stone markers and landmarks across the stunning Langtang region. 
                Find the perfect climbing spot for your skill level.
              </p>
              <div className="bg-white p-4 rounded-lg shadow-md border border-slate-200">
                <h3 className="font-semibold text-slate-700 mb-2">How to Use the Map</h3>
                <ul className="text-sm text-slate-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">•</span>
                    Zoom in/out using the controls or scrolling
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">•</span>
                    Click on any marker to view location details
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-500 mr-2">•</span>
                    Drag to explore different areas
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
                <MapComponent />
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="gear">
          <ProductShowcase />
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Langtang Bouldering</h3>
              <p className="text-slate-300">
                Your premier destination for climbing adventures in the Langtang region.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-300 hover:text-teal-400">Home</a></li>
                <li><a href="#map" className="text-slate-300 hover:text-teal-400">Map</a></li>
                <li><a href="#gear" className="text-slate-300 hover:text-teal-400">Gear</a></li>
                <li><a href="#" className="text-slate-300 hover:text-teal-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-slate-300 mb-2">Email: info@langtangbouldering.com</p>
              <p className="text-slate-300">Phone: +977 1234567890</p>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-400">
            <p>© {new Date().getFullYear()} Langtang Bouldering. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Bouldering;
