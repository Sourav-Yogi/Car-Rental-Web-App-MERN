import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {

  const {setShowLogin, axios, setToken,navigate,fetchUser}=useAppContext();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const {data} = await axios.post(`/api/user/${state}`, {name, email, password})

      if(data.success){
        setToken(data.token);
  localStorage.setItem("token", data.token);
  axios.defaults.headers.common["Authorization"] = data.token;

  await fetchUser(); // 🔥 UPDATE USER STATE IMMEDIATELY

  setShowLogin(false);
  navigate("/");
      }else{
        toast.error(data.message)
      }
    }catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }

  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    >
      {/* Modal */}
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 w-80 sm:w-96 p-8 rounded-xl bg-white shadow-xl text-gray-600"
      >
        {/* Title */}
        <p className="text-2xl font-semibold text-center">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {/* Name (register only) */}
        {state === "register" && (
          <div>
            <label className="text-sm">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full mt-1 px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-primary/40"
              required
            />
          </div>
        )}

        {/* Email */}
        <div>
          <label className="text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full mt-1 px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-primary/40"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full mt-1 px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-primary/40"
            required
          />
        </div>

        {/* Switch */}
        {state === "login" ? (
          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer font-medium hover:underline"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer font-medium hover:underline"
            >
              Login
            </span>
          </p>
        )}

        {/* Button */}
        <button className="bg-primary hover:bg-primary-dull transition text-white py-2 rounded-md font-medium">
          {state === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default Login;
