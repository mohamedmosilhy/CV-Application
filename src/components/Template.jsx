import React from "react";
import {
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ✅ Helper: Format date gracefully
const formatDate = (value) => {
  if (!value) return "";
  if (/^\d{4}$/.test(value)) return value; // only year
  const d = new Date(value);
  if (isNaN(d)) return value;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// ✅ Reusable Section wrapper
const Section = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold mb-3 border-b pb-1">{title}</h2>
    {children}
  </div>
);

// ✅ Reusable contact block
const ContactBlock = ({ info, textColor, layout }) => (
  <div
    className={`text-sm flex flex-col gap-2 ${textColor} ${
      layout === "top" ? "md:flex-row md:gap-4 md:justify-center" : ""
    }`}
  >
    <p>
      <FontAwesomeIcon icon={faEnvelope} /> {info.email || "Email"}
    </p>
    <p>
      <FontAwesomeIcon icon={faPhone} /> {info.phoneNumber || "Phone"}
    </p>
    <p>
      <FontAwesomeIcon icon={faLocationDot} /> {info.address || "Address"}
    </p>
  </div>
);

// ✅ Default sample data
const defaultData = {
  personalInfo: {
    fullName: "John Doe",
    email: "johndoe@email.com",
    phoneNumber: "+123456789",
    address: "123 Main St, Anytown",
  },
  education: [],
  experience: [],
};

const Template = React.forwardRef(
  ({ layout = "top", color = "#000000", personData }, ref) => {
    const data = personData || defaultData;

    const isLight = (hex) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return r * 0.299 + g * 0.587 + b * 0.114 > 186;
    };

    const textColor = isLight(color) ? "text-black" : "text-white";

    // ✅ EXPERIENCE section
    const renderExperience = () => (
      <Section title="EXPERIENCE">
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">
                  {exp.positionTitle || "Job Title"}
                </h3>
                <p className="text-gray-700">{exp.companyName || "Company"}</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </p>
                <p>{exp.location}</p>
              </div>
            </div>
            {exp.description && (
              <p className="text-sm text-gray-700 mt-1">{exp.description}</p>
            )}
          </div>
        ))}
      </Section>
    );

    // ✅ EDUCATION section
    const renderEducation = () => (
      <Section title="EDUCATION">
        {data.education.map((edu, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{edu.degree || "Degree"}</h3>
                <p className="text-gray-700">{edu.school || "School"}</p>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p>
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
                <p>{edu.location}</p>
              </div>
            </div>
          </div>
        ))}
      </Section>
    );

    // ✅ Layout: TOP
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
              <ContactBlock
                info={data.personalInfo}
                textColor={textColor}
                layout={layout}
              />
            </div>
          </div>

          <div className="p-6 text-black">
            {renderExperience()}
            {renderEducation()}
          </div>
        </div>
      );
    }

    // ✅ Layout: LEFT
    if (layout === "left") {
      return (
        <div ref={ref} className="flex bg-white rounded shadow-lg max-w-4xl">
          <div
            className={`w-1/3 p-6 ${textColor}`}
            style={{ backgroundColor: color }}
          >
            <h1 className="text-xl font-bold mb-4">
              {data.personalInfo.fullName}
            </h1>
            <ContactBlock
              info={data.personalInfo}
              textColor={textColor}
              layout={layout}
            />
          </div>

          <div className="w-2/3 p-6 text-black">
            {renderExperience()}
            {renderEducation()}
          </div>
        </div>
      );
    }

    // ✅ Layout: RIGHT
    if (layout === "right") {
      return (
        <div ref={ref} className="flex bg-white rounded shadow-lg max-w-4xl">
          <div className="w-2/3 p-6 text-black">
            {renderExperience()}
            {renderEducation()}
          </div>

          <div
            className={`w-1/3 p-6 ${textColor}`}
            style={{ backgroundColor: color }}
          >
            <h1 className="text-xl font-bold mb-4">
              {data.personalInfo.fullName}
            </h1>
            <ContactBlock
              info={data.personalInfo}
              textColor={textColor}
              layout={layout}
            />
          </div>
        </div>
      );
    }

    return null;
  }
);

Template.displayName = "Template";

export default Template;
