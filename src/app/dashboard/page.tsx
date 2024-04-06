"use client";
import { useState, useEffect } from "react";
import { ref, onValue, push, set } from "firebase/database";
import database from "../../firebase";
import Navbar from "@/component/Header";

const Dashboard = () => {
  const [hotList, setHotList] = useState<any[]>([]);
  const [newList, setNewList] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<any>({
    productName: "",
    price: "",
    rating: "",
    likes: "",
  });
  const [activeTab, setActiveTab] = useState<string>("hotList");

  useEffect(() => {
    // Function to add default data upon application load
    addDefaultData();

    const hotListRef = ref(database, "hotList");
    const newListRef = ref(database, "newList");

    onValue(hotListRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const hotListData = Object.keys(data).map((key) => data[key]);
        setHotList(hotListData);
      } else {
        setHotList([]);
      }
    });

    onValue(newListRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newListData = Object.keys(data).map((key) => data[key]);
        setNewList(newListData);
      } else {
        setNewList([]);
      }
    });
  }, []);

  const addDefaultData = () => {
    const hotListRef = ref(database, "hotList");
    const newListRef = ref(database, "newList");
    const defaultHotListData = [
      {
        productName: "iPhone 13",
        price: "$799",
        rating: 4.8,
        likes: 1200,
      },
      {
        productName: "Samsung Galaxy S22",
        price: "$899",
        rating: 4.7,
        likes: 950,
      },
      {
        productName: "MacBook Pro 2022",
        price: "$1999",
        rating: 4.9,
        likes: 1800,
      },
      {
        productName: "Sony PlayStation 5",
        price: "$499",
        rating: 4.9,
        likes: 2200,
      },
    ];

    const defaultNewListData = [
      {
        productName: "Tesla Model Y",
        price: "$47990",
        rating: 4.9,
        likes: 2500,
      },
      {
        productName: "AirPods Pro",
        price: "$249",
        rating: 4.7,
        likes: 1600,
      },
      {
        productName: "Nintendo Switch OLED",
        price: "$349",
        rating: 4.8,
        likes: 1300,
      },
      {
        productName: "Dyson V15 Detect",
        price: "$699",
        rating: 4.6,
        likes: 800,
      },
    ];

    // set(hotListRef, defaultHotListData);
    // set(newListRef, defaultNewListData);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setInputValue((prevState: any) => ({
      ...prevState,
      [field]:
        field === "rating" || field === "likes"
          ? parseFloat(event.target.value)
          : event.target.value,
    }));
  };

  const handleSubmit = (list: string) => {
    if (
      inputValue.productName.trim() !== "" &&
      inputValue.price.trim() !== "" &&
      inputValue.rating !== "" &&
      inputValue.likes !== ""
    ) {
      const listRef = ref(database, list);
      console.log(inputValue, "in");
      push(listRef, inputValue);
      setInputValue({
        productName: "",
        price: "",
        rating: "",
        likes: "",
      });
    }
  };
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-w-full w-full overflow-hidden">
      <Navbar />
      <div className="tabs flex mx-4 my-4">
        <button
          className={`${
            activeTab === "hotList"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-neutral-700"
          } px-4 py-2 rounded-l focus:outline-none w-1/2`}
          onClick={() => handleTabChange("hotList")}
        >
          Hot List
        </button>
        <button
          className={`${
            activeTab === "newList"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-neutral-700"
          } px-4 py-2 rounded-r focus:outline-none w-1/2`}
          onClick={() => handleTabChange("newList")}
        >
          New List
        </button>
      </div>
      {activeTab === "hotList" && (
        <div className="bg-white shadow-lg rounded px-8 py-6 mb-4 mt-8 border-2 border-gray-600 flex flex-col mx-10">
          <div className=" contents ">
            <h2 className="text-lg font-semibold text-neutral-800 mb-2 text-center">
              Add to Hot List
            </h2>
            <div className="mb-4 inline-flex items-start sm:flex max-sm:flex-col ">
              <label className="mr-2 text-base text-slate-900">
                ProductName:
              </label>
              <input
                type="text"
                value={inputValue.productName}
                onChange={(e) => handleInputChange(e, "productName")}
                placeholder="Product Name"
                className="input-field border-b-2 border-gray-600 "
              />
            </div>
            <div className="mb-4 inline-flex items-start  sm:flex max-sm:flex-col ">
              <label className="mr-2 text-base text-slate-900">Price:</label>
              <input
                type="text"
                value={inputValue.price}
                onChange={(e) => handleInputChange(e, "price")}
                placeholder="Price"
                className="input-field border-b-2 border-gray-600 "
              />
            </div>
            <div className="mb-4 inline-flex items-start  sm:flex max-sm:flex-col ">
              <label className="mr-2 text-base text-slate-900">Rating:</label>

              <input
                type="number"
                value={inputValue.rating}
                onChange={(e) => handleInputChange(e, "rating")}
                placeholder="Rating"
                className="input-field border-b-2 border-gray-600 "
              />
            </div>
            <div className="mb-4 inline-flex items-start  sm:flex max-sm:flex-col ">
              <label className="mr-2 text-base text-slate-900">Likes:</label>

              <input
                type="number"
                value={inputValue.likes}
                onChange={(e) => handleInputChange(e, "likes")}
                placeholder="Likes"
                className="input-field border-b-2 border-gray-600 "
              />
            </div>
            <button
              onClick={() => handleSubmit("hotList")}
              className="w-1/3 flex justify-center items-center h-10  text-center text-base text-white bg-green-500 p-4"
            >
              Add
            </button>
          </div>
        </div>
      )}
      {activeTab === "newList" && (
        <div className="bg-white shadow-lg rounded px-8 py-6 mb-4 mt-8 border-2 border-gray-600 flex flex-col mx-10">
          <div className=" contents ">
            <h2 className="text-lg font-semibold mb-2 text-center">
              Add to New List
            </h2>
            <div className="mb-4 inline-flex items-start  sm:flex max-sm:flex-col ">
              <label className="mr-2 text-base text-slate-900">
                ProductName:
              </label>
              <input
                type="text"
                value={inputValue.productName}
                onChange={(e) => handleInputChange(e, "productName")}
                placeholder="Product Name"
                className="input-field border-b-2 border-gray-600 "
              />
            </div>
            <div className="mb-4 inline-flex items-start  sm:flex max-sm:flex-col ">
              <label className="mr-2 text-base text-slate-900">Price:</label>
              <input
                type="text"
                value={inputValue.price}
                onChange={(e) => handleInputChange(e, "price")}
                placeholder="Price"
                className="input-field border-b-2 border-gray-600 "
              />
            </div>
            <div className="mb-4 inline-flex items-start  sm:flex max-sm:flex-col ">
              <label className="mr-2 text-base text-slate-900">Rating:</label>

              <input
                type="number"
                value={inputValue.rating}
                onChange={(e) => handleInputChange(e, "rating")}
                placeholder="Rating"
                className="input-field border-b-2 border-gray-600 "
              />
            </div>
            <div className="mb-4 inline-flex items-start  sm:flex max-sm:flex-col ">
              <label className="mr-2 text-base text-slate-900">Likes:</label>

              <input
                type="number"
                value={inputValue.likes}
                onChange={(e) => handleInputChange(e, "likes")}
                placeholder="Likes"
                className="input-field border-b-2 border-gray-600 "
              />
            </div>
            <button
              onClick={() => handleSubmit("newList")}
              className="w-1/3 flex justify-center items-center h-10  text-center text-base text-white bg-green-500 p-4"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {activeTab === "hotList" && (
        <div className="overflow-x-scroll mx-4 mb-4">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Likes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hotList.map((item: any, index: number) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.rating}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.likes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "newList" && (
        <div className="overflow-x-scroll mx-4 mb-4">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Likes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {newList.map((item: any, index: number) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.rating}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.likes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
