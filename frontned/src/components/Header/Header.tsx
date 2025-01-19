import * as React from "react";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = () => {
  return (
    <div className="bg-slate-900 ">
      <div className="container p-2 m-auto">
        <nav className="py-5">
          <div className="text-white text-base pl-5">URL Shortner</div>
        </nav>
      </div>
    </div>
  );
};
export default Header;
