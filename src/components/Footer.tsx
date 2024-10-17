import { FaGithub } from "react-icons/fa";
import { TeamInfo, TeamMember } from "@/utils/teamInfo";
import FixedBtn from "./FixedBtn";

const Footer = () => {
  return (
    <>
      <FixedBtn />
      <footer className="px-6 py-5 md:px-3 md:py-5 bg-custom-blue min-h-[150px] flex flex-col justify-center">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm text-white">© Copyright 2024 poketify. All rights reserved</p>
        </div>
        <div className="container flex flex-row flex-wrap justify-start gap-1 mx-auto mt-3 text-xs sm:text-sm">
          {TeamInfo.map((info: TeamMember, index: number) => {
            return (
              <div key={index} className="flex items-center mx-0 space-x-2 xs:ms-4">
                <a
                  href={info.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 no-underline md:space-x-2 hover:no-underline text-white"
                >
                  <FaGithub size={20} />
                  <span className="block font-normal w-[50px] text-[14px]">{info.name}</span>
                </a>
              </div>
            );
          })}
        </div>
      </footer>
    </>
  );
};

export default Footer;
