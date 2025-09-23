import React from "react";
import logo from "../assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faPalette } from "@fortawesome/free-solid-svg-icons";

const Controllers = ({ active, onChangeActive }) => {
  return (
    <div className="flex flex-col h-fit gap-3 rounded bg-white p-4 shadow-lg">
      {/* Header */}
      <div className="flex w-full items-center gap-3 border-b-2 border-black pb-3 mb-2">
        <img src={logo} alt="CV Crafter Logo" className="w-10 rounded" />
        <h1 className="font-heading text-base">CV Crafter</h1>
      </div>

      {/* Menu Items */}
      <div
        className={`flex gap-3 items-center cursor-pointer hover:bg-background rounded p-2 transition-colors duration-200 ${
          active === "resume" ? "bg-background" : ""
        }`}
        onClick={() => onChangeActive("resume")}
      >
        <FontAwesomeIcon icon={faFileAlt} className="text-gray-700" />
        <span className="font-body text-sm">Resume Info</span>
      </div>

      <div
        className={`flex gap-3 items-center cursor-pointer hover:bg-background rounded p-2 transition-colors duration-200 ${
          active === "appearance" ? "bg-background" : ""
        }`}
        onClick={() => onChangeActive("appearance")}
      >
        <FontAwesomeIcon icon={faPalette} className="text-gray-700" />
        <span className="font-body text-sm">Appearance</span>
      </div>
    </div>
  );
};

export default Controllers;
