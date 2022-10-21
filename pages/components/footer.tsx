import { NextComponentType } from "next";

const Footer: NextComponentType = () => {
  return (
    <footer className="flex flex-1 my-auto justify-center text-gray-600">
      <div>
        <p>Ally Rippley 2022</p>
        <p>Built using next.js, react, javascript and typescript</p>
      </div>
    </footer>
  );
};

export default Footer;
