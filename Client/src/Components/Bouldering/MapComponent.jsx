import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useLocationStore from "../Store/useLocationStore";
import rock from '../../assets/rock.png';

const MapComponent = () => {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const locations = useLocationStore((state) => state.locations);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!leafletMap.current && mapRef.current) {
      leafletMap.current = L.map(mapRef.current).setView([28.17, 85.63], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(leafletMap.current);
    }

    if (locations && Array.isArray(locations)) {
      // Clear existing markers
      leafletMap.current?.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          leafletMap.current.removeLayer(layer);
        }
      });

      // Add markers for each location
      locations.forEach((location) => {
        const markerIcon = L.icon({
          iconUrl: rock,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        const marker = L.marker([location.lat, location.lng], {
          icon: markerIcon,
        }).addTo(leafletMap.current);
        
        // Create a custom popup
        const popupContent = `
          <div class="custom-popup">
            <h3 class="font-bold text-teal-700">${location.name}</h3>
            ${location.difficulty ? 
              `<p class="text-sm mt-1">Difficulty: 
                <span class="font-medium ${getDifficultyColor(location.difficulty)}">
                  ${location.difficulty}
                </span>
              </p>` : ''}
            ${location.description ? 
              `<p class="text-sm mt-1">${location.description}</p>` : ''}
          </div>
        `;
        
        marker.bindPopup(popupContent);
      });

      // If no locations, show a message
      if (locations.length === 0 && mapContainerRef.current) {
        const noLocationsEl = document.createElement('div');
        noLocationsEl.className = 'absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10';
        noLocationsEl.innerHTML = '<p class="text-slate-600 font-medium">No climbing locations available</p>';
        mapContainerRef.current.appendChild(noLocationsEl);
      }
    }

    // Resize handler to make the map responsive
    const handleResize = () => {
      if (leafletMap.current) {
        leafletMap.current.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      leafletMap.current?.off();
      leafletMap.current?.remove();
      leafletMap.current = null;
    };
  }, [locations]);

  // Helper function to get color class based on difficulty
  function getDifficultyColor(difficulty) {
    const level = difficulty.toLowerCase();
    if (level.includes('easy')) return 'text-green-600';
    if (level.includes('medium') || level.includes('moderate')) return 'text-amber-600';
    if (level.includes('hard') || level.includes('difficult')) return 'text-red-600';
    return 'text-slate-600';
  }

  return (
    <div 
      ref={mapContainerRef}
      className="relative"
    >
      <div
        ref={mapRef}
        className="h-[500px] w-full"
      />
      
      {/* Map Controls Overlay */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-3 z-[1000] flex flex-col space-y-2">
        <button 
          className="p-2 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          onClick={() => leafletMap.current?.setView([28.17, 85.63], 12)}
          title="Reset view"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button 
          className="p-2 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          onClick={() => leafletMap.current?.locate({setView: true, maxZoom: 16})}
          title="Find my location"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
