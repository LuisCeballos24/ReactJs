import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiCalendar,
  FiPhone,
  FiEdit2,
  FiCheck,
} from "react-icons/fi";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-400 via-yellow-300 to-orange-200 rounded-xl">
      <div className="container flex justify-between items-center py-6 px-4 mx-auto">
        <div className="flex items-center">
          <img
            className="object-cover w-10 h-10 rounded-full border-2 border-white"
            src="user-profile-image.jpg"
            alt="User Profile"
          />
          <div className="ml-4">
            <h1 className="text-3xl font-bold text-white">User</h1>
            <p className="text-sm text-gray-200">UI/UX Designer</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="py-2 px-4 text-sm font-medium text-blue-500 bg-white rounded-full hover:text-white hover:bg-blue-500 focus:outline-none">
            Edit Profile
          </button>
          <button className="py-2 px-4 text-sm font-medium text-blue-500 bg-white rounded-full hover:text-white hover:bg-blue-500 focus:outline-none">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

const App = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [location, setLocation] = useState("New York, USA");
  const [website, setWebsite] = useState("www.johndoe.com");

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleUpdateProfile = () => {
    // Aquí puedes implementar la lógica para actualizar el perfil en la base de datos
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <div className="container px-4 mx-auto mt-8">
        <Header />
        <div className="mt-8">
          <div className="flex justify-center items-center h-full bg-gray-100">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="overflow-hidden relative w-52 h-52 rounded-full">
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                  <div className="absolute inset-1/4 w-3/4 h-3/4 bg-white rounded-full"></div>
                  <img
                    className="object-cover w-full h-full"
                    src="../../../../public/Store.svg"
                    alt="User Profile"
                  />
                  {isEditing ? (
                    <div className="flex absolute inset-0 justify-center items-center">
                      <label
                        htmlFor="profile-image"
                        className="p-2 bg-blue-500 rounded-tl cursor-pointer"
                      >
                        <FiEdit2 className="w-6 h-6 text-white" />
                      </label>
                      <input
                        id="profile-image"
                        type="file"
                        className="hidden"
                        onChange={(e) => console.log(e.target.files[0])}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="absolute top-0 right-0 p-1 bg-white rounded-full">
                  <svg
                    className="w-6 h-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-gray-800">{name}</h2>
              <p className="text-gray-600">UI/UX Designer</p>
            </div>

            <div className="flex flex-col p-6 ml-6 bg-white rounded-lg shadow-lg">
              {isEditing ? (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="py-2 px-4 mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="py-2 px-4 mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location
                    </label>
                    <input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="py-2 px-4 mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Website
                    </label>
                    <input
                      id="website"
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="py-2 px-4 mt-1 w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <p className="mb-4 text-gray-600">
                    User since <span className="font-bold">2019</span>
                  </p>
                  <p className="text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Duis mauris lorem, efficitur eget cursus a, semper ac mi.
                  </p>
                  <div className="mt-4">
                    <p className="flex items-center text-sm text-gray-500">
                      <FiMail className="mr-2" /> johndoe@example.com
                    </p>
                    <p className="flex items-center text-sm text-gray-500">
                      <FiMapPin className="mr-2" /> New York, USA
                    </p>
                    <p className="flex items-center text-sm text-gray-500">
                      <FiGlobe className="mr-2" /> www.johndoe.com
                    </p>
                    <p className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="mr-2" /> Date of Birth: January 1,
                      1990
                    </p>
                    <p className="flex items-center text-sm text-gray-500">
                      <FiPhone className="mr-2" /> Phone: +1 123-456-7890
                    </p>
                    <p className="flex items-center text-sm text-gray-500">
                      <FiUser className="mr-2" /> Gender: Male
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end mt-4">
                {isEditing ? (
                  <button
                    className="py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    onClick={handleUpdateProfile}
                  >
                    <FiCheck className="mr-2" />
                    Update
                  </button>
                ) : (
                  <button
                    className="py-2 px-4 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    onClick={handleEditProfile}
                  >
                    <FiEdit2 className="mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <header className="mb-8 bg-gradient-to-r from-blue-200 via-yellow-300 to-orange-400 rounded-xl">
            <div className="container flex justify-between items-center py-6 px-4 mx-auto">
              <img
                className="object-cover w-9 h-9 rounded-full border-2 border-white"
                src="user-profile-image.jpg"
                alt="User Profile"
              />
              <h1 className="text-3xl font-bold text-white">User</h1>
            </div>
          </header>
          <div className="mt-8">
            <div className="flex items-center">
              <div className="flex overflow-hidden w-full max-w-xl rounded shadow-lg">
                <img
                  className="w-1/3"
                  src="../../../../public/dish.png"
                  alt="Store"
                />
                <div className="py-4 px-6">
                  <div className="mb-2 text-xl font-bold">My Store</div>
                  <p className="mb-4 text-base text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec pharetra velit at eros efficitur tincidunt. Vestibulum
                    ante ipsum primis in faucibus orci luctus et ultrices
                    posuere cubilia Curae; Etiam fringilla urna ut purus auctor
                    sollicitudin.
                  </p>
                  <p className="text-base text-gray-700">
                    Sed condimentum ullamcorper justo, vel dapibus nunc porta
                    id. Fusce ultrices rhoncus nisi non mattis. Integer semper
                    tellus et neque efficitur, sit amet interdum neque varius.
                    Donec ultricies dolor dolor, eget pulvinar ex semper non.
                    Curabitur feugiat odio et metus facilisis posuere.
                  </p>
                </div>
                <div className="py-4 px-6">
                  <span className="inline-block py-1 px-3 mr-2 text-sm font-semibold text-green-800 bg-green-200 rounded-full">
                    Active
                  </span>
                  <span className="inline-block py-1 px-3 text-sm font-semibold text-gray-800 bg-gray-200 rounded-full">
                    5 Products
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

//
// <div className="flex p-6 ml-6 bg-white rounded-lg shadow-lg">
//        <div>
//          <p className="mb-4 text-gray-600">
//            User since <span className="font-bold">2019</span>
//          </p>
//          <p className="text-gray-600">
//            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mauris
//            lorem, efficitur eget cursus a, semper ac mi.
//          </p>
//          <div className="mt-4">
//            <p className="text-sm text-gray-500">Email: johndoe@example.com</p>
//            <p className="text-sm text-gray-500">Location: New York, USA</p>
//            <p className="text-sm text-gray-500">Website: www.johndoe.com</p>
//          </div>
//        </div>
//      </div>
