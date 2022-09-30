import type { NextPage } from "next";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

import { FormEventHandler, useState } from "react";

const Login: NextPage = () => {
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    comparePasswords: "",
  });
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    if (userInfo.password !== userInfo.comparePasswords) {
      toast.error("Passwords do not match!");
      return;
    }

    // validate your userinfo
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        comparePasswords: userInfo.comparePasswords,
      }),
    });

    const data = await res.json();
    toast.success(data.message);

    // if (data.message) {
    //   setMessage(data.message);
    // }

    // if (data.message === "User registered successfully") {
    //   const options = { redirect: false };

    //   const res = await signIn("credentials", options);
    //   return router.push("/");
    // }
  };

  return (
    <>
      <div className="flex h-screen justify-center">
        <div className=" flex flex-col justify-center  px-28 text-dark-text ">
          <h2 className="text-2xl font-bold">Hello!</h2>
          <p className="mt-2 mb-8">Welcome</p>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              placeholder="First Name"
              className="rounded-full border border-slate-100 py-3 px-6 pl-14 mb-4 w-80	relative ... outline-neutral-200"
              value={userInfo.first_name}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, first_name: target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              className="rounded-full border border-slate-100 py-3 px-6 pl-14 mb-4 w-80	relative ... outline-neutral-200"
              value={userInfo.last_name}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, last_name: target.value })
              }
            />

            <input
              type="text"
              placeholder="Username"
              className="rounded-full border border-slate-100 py-3 px-6 pl-14 mb-4 w-80	relative ... outline-neutral-200"
              value={userInfo.username}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, username: target.value })
              }
            />

            <input
              type="email"
              placeholder="Email Address"
              className="rounded-full border border-slate-100 py-3 px-6 pl-14 mb-4 w-80	relative ... outline-neutral-200"
              value={userInfo.email}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, email: target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className=" rounded-full border border-slate-100 py-3 px-6 pl-14 mb-4 w-80 outline-neutral-200"
              value={userInfo.password}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, password: target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className=" rounded-full border border-slate-100 py-3 px-6 pl-14 mb-4 w-80 outline-neutral-200"
              value={userInfo.comparePasswords}
              onChange={({ target }) =>
                setUserInfo({ ...userInfo, comparePasswords: target.value })
              }
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-8 rounded-full mb-6 w-80"
              value="Register"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
