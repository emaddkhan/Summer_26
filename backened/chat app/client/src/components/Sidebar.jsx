import React from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ selectedUser, setSelectedUser }) => {
    const navigate=useNavigate()
  return (
    <div className={`bg-[#818582]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser?"max-md:hidden":""}`}>
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-40" />
          <div className="relative py-2 group">
            <img src={assets.menu_icon} alt="Menu"  className="max-h-5"/>
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border-gray-600 text-gray-100 hidden group-hover:block">
                <p onClick={()=>navigate("/profile")} className="text-sm cursor-pointer">edit profile</p>
                <hr  className="my-2 border-t border-gray-500"/>
                <p onClick={()=>navigate("/logout")} className="text-sm cursor-pointer">logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
