import React from "react";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const personData = {
  personalInfo: {
    fullName: "John Doe",
    email: "mohamed@gmail.com",
    phoneNumber: "+1234567890",
    address: "123 Main St, Anytown, USA",
  },
  education: [
    {
      school: "University of Example",
      degree: "Bachelor of Science in Computer Science",
      startDate: "2015",
      endDate: "2019",
      location: "Example City",
    },
    {
      school: "Tech Institute",
      degree: "Certificate in Web Development",
      startDate: "2014",
      endDate: "2015",
      location: "Tech Valley",
    },
  ],
  experience: [
    {
      companyName: "Tech Solutions Inc.",
      positionTitle: "Senior Software Engineer",
      startDate: "2022",
      endDate: "Present",
      location: "Example City",
      description:
        "Lead development of scalable web applications using React and Node.js.",
    },
    {
      companyName: "Digital Innovations LLC",
      positionTitle: "Software Engineer",
      startDate: "2019",
      endDate: "2022",
      location: "Tech Valley",
      description: "Developed web applications using React and Node.js.",
    },
  ],
};

const Template = React.forwardRef(
  ({ layout = "top", color = "#000000", personData: propPersonData }, ref) => {
    const data = propPersonData || personData;

    const isLight = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return r * 0.299 + g * 0.587 + b * 0.114 > 186;
    };

    const textColor = isLight(color) ? "text-black" : "text-white";

    if (layout === "top") {
      return (
        <div ref={ref} className="bg-white rounded shadow-lg max-w-2xl">
          <div
            className={`p-6 text-center ${textColor}`}
            style={{ backgroundColor: color }}
          >
            <h1 className="text-2xl font-bold mb-3">
              {data.personalInfo.fullName}
            </h1>
            <div className="flex justify-center gap-4 text-sm">
              <span>
                <FontAwesomeIcon icon={faEnvelope} /> {data.personalInfo.email}
              </span>
              <span>
                <FontAwesomeIcon icon={faPhone} />{" "}
                {data.personalInfo.phoneNumber}
              </span>
              <span>
                <FontAwesomeIcon icon={faLocationDot} />{" "}
                {data.personalInfo.address}
              </span>
            </div>
          </div>

          <div className="p-6 text-black">
            <h2 className="text-lg font-bold mb-3 border-b pb-1">EXPERIENCE</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{exp.positionTitle}</h3>
                    <p className="text-gray-700">{exp.companyName}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}

            <h2 className="text-lg font-bold mb-3 border-b pb-1 mt-6">
              EDUCATION
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.school}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>
                      {edu.startDate} - {edu.endDate}
                    </p>
                    <p>{edu.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (layout === "left") {
      return (
        <div ref={ref} className="flex bg-white rounded shadow-lg max-w-4xl">
          <div
            className={`w-fit p-6 ${textColor}`}
            style={{ backgroundColor: color }}
          >
            <h1 className="text-xl font-bold mb-4">
              {data.personalInfo.fullName}
            </h1>
            <div className="text-sm flex flex-col gap-2">
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> {data.personalInfo.email}
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} />{" "}
                {data.personalInfo.phoneNumber}
              </p>
              <p>
                <FontAwesomeIcon icon={faLocationDot} />{" "}
                {data.personalInfo.address}
              </p>
            </div>
          </div>

          <div className="w-2/3 p-6 text-black">
            <h2 className="text-lg font-bold mb-3 border-b pb-1">EXPERIENCE</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold">{exp.positionTitle}</h3>
                <p className="text-gray-700">
                  {exp.companyName} | {exp.startDate} - {exp.endDate} |{" "}
                  {exp.location}
                </p>
                <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}

            <h2 className="text-lg font-bold mb-3 border-b pb-1 mt-6">
              EDUCATION
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-gray-700">
                  {edu.school} | {edu.startDate} - {edu.endDate} |{" "}
                  {edu.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (layout === "right") {
      return (
        <div ref={ref} className="flex bg-white rounded shadow-lg max-w-4xl">
          <div className="w-2/3 p-6 text-black">
            <h2 className="text-lg font-bold mb-3 border-b pb-1">EXPERIENCE</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-semibold">{exp.positionTitle}</h3>
                <p className="text-gray-700">
                  {exp.companyName} | {exp.startDate} - {exp.endDate}
                </p>
                <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
              </div>
            ))}

            <h2 className="text-lg font-bold mb-3 border-b pb-1 mt-6">
              EDUCATION
            </h2>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-3">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-gray-700">
                  {edu.school} | {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>

          <div
            className={`w-fit p-6 ${textColor}`}
            style={{ backgroundColor: color }}
          >
            <h1 className="text-xl font-bold mb-4">
              {data.personalInfo.fullName}
            </h1>
            <div className="space-y-2 text-sm">
              <p>
                <FontAwesomeIcon icon={faEnvelope} /> {data.personalInfo.email}
              </p>
              <p>
                <FontAwesomeIcon icon={faPhone} />{" "}
                {data.personalInfo.phoneNumber}
              </p>
              <p>
                <FontAwesomeIcon icon={faLocationDot} />{" "}
                {data.personalInfo.address}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
);

Template.displayName = "Template";

export default Template;
