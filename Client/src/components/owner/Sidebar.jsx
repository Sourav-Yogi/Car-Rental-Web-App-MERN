import { useLocation, NavLink } from "react-router-dom";
import { dummyUserData, assets, ownerMenuLinks } from "../../assets/assets";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const {user,axios, fetchUser} = useAppContext() ;
  const location = useLocation();
  const [image, setImage] = useState("");

  // ✅ KEPT: update image logic
  const updateImage = async () => {
    try {
      const formData =new FormData();
      formData.append('image', image)

      const {data}=await axios.post('/api/owner/update-image', formData)

      if(data.success){
        fetchUser()
        toast.success(data.message)
        setImage('')
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="relative min-h-screen w-60 flex flex-col items-center pt-8 border-r border-borderColor bg-white text-sm">
      
      {/* Profile */}
      <div className="group relative">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
            }
            className="w-20 h-20 rounded-full object-cover"
            alt=""
          />

          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="absolute inset-0 bg-black/10 rounded-full hidden group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="" />
          </div>
        </label>
      </div>

      {/* Save button */}
      {image && (
        <button
          className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded cursor-pointer"
          onClick={updateImage}
        >
          Save <img src={assets.check_icon} width={12} alt="" />
        </button>
      )}

      <p className="mt-3 text-base">{user?.name}</p>

      {/* Menu */}
      <div className="w-full mt-8">
        {ownerMenuLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/owner"} 
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-6 py-3 transition ${
                isActive
                  ? "bg-light text-primary"
                  : "text-gray-500 hover:bg-light"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? link.coloredIcon : link.icon}
                  className="w-5 h-5"
                  alt=""
                />

                <span>{link.name}</span>

                {/* Blue active bar */}
                <div
                  className={`absolute right-0 h-8 w-1 rounded-l ${
                    isActive ? "bg-primary" : "bg-transparent"
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
