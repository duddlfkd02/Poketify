import { FaGithub } from "react-icons/fa";
import { TeamInfo, TeamMember } from "@/utils/teamInfo";

const Footer = () => {
  return (
    <footer className="px-6 py-5 md:px-3 md:py-5 mt-auto bg-slate-300">
      <div className="flex items-center justify-center mx-auto text-xs sm:text-sm md:px-2">
        <p>© Copyright 2024 poketify. All rights reserved</p>
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center gap-2 mx-auto mt-6 text-xs sm:text-sm md:px-2">
        {TeamInfo.map((info: TeamMember, index: number) => {
          return (
            <div key={index} className="flex items-center mx-0 space-x-2 xs:ms-4 ">
              <a
                href={info.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 no-underline md:space-x-2 md:space-y-0 hover:no-underline sm:flex-wrap"
              >
                <FaGithub size={20} />
                <span className="block font-semibold w-[50px] text-[14px]">{info.name}</span>
              </a>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;
