"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link"; 
// Fix for default Leaflet marker icons
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

// Map Component
const Map = ({ onSelectLocation }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onSelectLocation({ lat, lng });
    },
  });

  return null;
};

const App = () => {
  const [location, setLocation] = useState(null); // Selected location
  const [radius, setRadius] = useState(""); // Input radius

  const handleSelectLocation = (coords) => {
    setLocation(coords);
  };

  const handleRadiusChange = (e) => {
    setRadius(e.target.value);
  };

  const handleShodanSearch = () => {
    if (!location || !radius) {
      alert("Please select a location and enter a radius.");
      return;
    }

    // Build the Shodan query URL
    const shodanUrl = `https://www.shodan.io/search?query=has_screenshot%3Atrue+geo%3A${location.lat}%2C${location.lng}%2C${radius}+-desktop`;
    window.open(shodanUrl, "_blank");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white flex items-center justify-between shadow-md">
        <div className="text-2xl font-bold">ShutTheCam</div>
        <div className="space-x-6 text-lg">
          <a href="#" className="hover:text-blue-200 transition duration-200">
            Home
          </a>
          <a href="/camscan" className="hover:text-blue-200 transition duration-200">
            Cam Scan
          </a>
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex-grow flex">
        {/* Map Section */}
        <div className="w-full md:w-1/2 p-4">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Map onSelectLocation={handleSelectLocation} />
            {location && <Marker position={[location.lat, location.lng]} />}
          </MapContainer>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/2 p-6 flex flex-col space-y-6">
          {/* Latitude and Longitude Card */}
          {location && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Location Details</h3>
              <p className="text-sm text-gray-600">Latitude: {location.lat.toFixed(4)}</p>
              <p className="text-sm text-gray-600">Longitude: {location.lng.toFixed(4)}</p>
            </div>
          )}

          {/* Radius Input Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Radius (km)</h3>
            <input
              type="number"
              value={radius}
              onChange={handleRadiusChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter radius"
            />
          </div>

          {/* Shodan Search Button */}
          <div className="flex justify-center">
            <button
              onClick={handleShodanSearch}
              className="w-1/4 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
