import { FaCircleChevronDown, FaCircleChevronUp } from "react-icons/fa6";

const FixedBtn = () => {
  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  const handleGoToBottom = () => {
    window.scrollTo({
      top: document.getElementById("root")!.scrollHeight,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed gap-1 bottom-[3%] right-[3%] z-50 flex flex-col items-center gap-3">
      <FaCircleChevronUp size={42} onClick={() => handleGoToTop()} className="cursor-pointer fill-custom-green" />
      <FaCircleChevronDown size={42} onClick={() => handleGoToBottom()} className="cursor-pointer fill-custom-pink" />
    </div>
  );
};

export default FixedBtn;
