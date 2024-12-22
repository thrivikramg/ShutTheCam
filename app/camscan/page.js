"use client";

import React, { useState } from "react";

const CamScan = () => {
  const [ipAddress, setIpAddress] = useState(""); // IP address input
  const [port, setPort] = useState(""); // Port number input
  const [status, setStatus] = useState(""); // Webcam status message

  // Handle input changes
  const handleIpChange = (e) => setIpAddress(e.target.value);
  const handlePortChange = (e) => setPort(e.target.value);

  // Check for webcam status and redirect to Shodan if found
  const handleCamScan = () => {
    if (!ipAddress || !port) {
      setStatus("Please provide both IP and port.");
      return;
    }

    // Simulate an external check or API call
    // You can replace this with actual logic to check the webcam
    const isWebcamFound = Math.random() > 0.5; // Randomly simulate success or failure

    if (isWebcamFound) {
      setStatus(`Webcam found at IP: ${ipAddress}:${port}. Redirecting to Shodan...`);
      
      // Redirect to Shodan
      const shodanUrl = `https://www.shodan.io/search?query=ip%3A${ipAddress}+port%3A${port}`;
      window.location.href = shodanUrl; // Redirect to Shodan
    } else {
      setStatus("The webcam is safe. No vulnerabilities detected.");
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white flex items-center justify-between shadow-md">
        <div className="text-2xl font-bold">ShutTheCam</div>
        <div className="space-x-6 text-lg">
          <a href="/" className="hover:text-blue-200 transition duration-200">
            Home
          </a>
          <a href="/camscan" className="hover:text-blue-200 transition duration-200">
            Cam Scan
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-4">
        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Webcam Scan</h2>

          {/* IP Address Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">IP Address</label>
            <input
              type="text"
              value={ipAddress}
              onChange={handleIpChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter IP address"
            />
          </div>

          {/* Port Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Port</label>
            <input
              type="text"
              value={port}
              onChange={handlePortChange}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter port"
            />
          </div>

          {/* Status Message */}
          {status && (
            <div className="bg-gray-100 p-4 rounded-md mb-6 text-gray-800">
              <p>{status}</p>
            </div>
          )}

          {/* Check Webcam Button */}
          <div className="flex justify-center">
            <button
              onClick={handleCamScan}
              className="w-1/2 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Check Webcam
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CamScan;
