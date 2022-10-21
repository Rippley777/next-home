import { NextComponentType } from "next";

const Footer: NextComponentType = () => {
  return (
    <footer className="flex flex-1 flex-col fl my-auto items-center text-gray-600">
      <p>Ally Rippley 2022</p>
      <p>Built using next.js, react, javascript and typescript</p>
    </footer>
  );
};

export default Footer;
