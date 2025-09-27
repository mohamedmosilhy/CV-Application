import React from "react";
import logo from "../assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faPalette } from "@fortawesome/free-solid-svg-icons";

const menuItems = [
  { id: "resume", label: "Resume Info", icon: faFileAlt },
  { id: "appearance", label: "Appearance", icon: faPalette },
];

const Controllers = ({ active, onChangeActive }) => {
  return (
    <div className="flex flex-col h-fit gap-3 rounded bg-white p-4 shadow-lg">
      {/* Header */}
      <div className="flex w-full items-center gap-3 border-b-2 border-black pb-3 mb-2">
        <img src={logo} alt="CV Crafter Logo" className="w-10 rounded" />
        <h1 className="font-heading text-base">CV Crafter</h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => onChangeActive(id)}
            className={`flex items-center gap-3 rounded p-2 text-left transition-colors duration-200
              hover:bg-background ${
                active === id ? "bg-background font-medium" : ""
              }`}
          >
            <FontAwesomeIcon icon={icon} className="text-gray-700" />
            <span className="font-body text-sm">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Controllers;
