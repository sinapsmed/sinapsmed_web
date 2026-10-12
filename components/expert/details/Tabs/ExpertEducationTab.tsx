import React from 'react';
import { Education } from '@/types/expert';



const ExpertEducationTab = ({ educations }: { educations: Education[] }) => {

  return (
    <div className=" w-full   space-y-6">
      {educations.map((edu, index) => (
        <div
          key={index}
          className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
            <div className="text-left">
              <h3 className="text-sm md:text-lg lg:text-xl font-semibold text-slate-800">
                {edu.field}
              </h3>
              <p className="text-xs md:text-base text-slate-600 italic">
                {edu.degree}
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs md:text-base text-slate-700">
                {edu.university}
              </p>
              <p className="text-[11px] md:text-sm text-slate-500">
                {edu.startYear} - {edu.endYear}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpertEducationTab;
