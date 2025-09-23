import React from "react";
import logo from "../assets/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faPalette } from "@fortawesome/free-solid-svg-icons";

const Controllers = () => {
  return (
    <>
      <div className="flex flex-col h-fit gap-3 rounded bg-white p-4 shadow-lg ">
        <div className="flex w-full items-center gap-3 border-b-2 border-black pb-3">
          <img src={logo} alt="CV Crafter Logo" className="w-14 rounded" />
          <h1 className="font-heading text-2xl">CV Crafter</h1>
        </div>

        <div className="flex gap-3 justify-center items-center hover:cursor-pointer hover:bg-gray-200 rounded p-2 transition-colors duration-200">
          <FontAwesomeIcon icon={faFileAlt} className="text-gray-700" />
          <span className="font-body">Resume Info</span>
        </div>
        <div className="flex gap-3 justify-center items-center hover:cursor-pointer hover:bg-gray-200 rounded p-2 transition-colors duration-200">
          <FontAwesomeIcon icon={faPalette} className="text-gray-700" />
          <span className="font-body">Appearance</span>
        </div>
      </div>
    </>
  );
};

export default Controllers;
