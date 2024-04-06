"use client";
import { useState, useEffect } from "react";
import { ref, onValue, push, set } from "firebase/database";
import database from "../firebase";
import Navbar from "@/component/Header";
import Table from "@/component/Table";
import Form from "@/component/Form";

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
    // const defaultHotListData = [
    //   {
    //     productName: "iPhone 13",
    //     price: "$799",
    //     rating: 4.8,
    //     likes: 1200,
    //   },
    //   {
    //     productName: "Samsung Galaxy S22",
    //     price: "$899",
    //     rating: 4.7,
    //     likes: 950,
    //   },
    //   {
    //     productName: "MacBook Pro 2022",
    //     price: "$1999",
    //     rating: 4.9,
    //     likes: 1800,
    //   },
    //   {
    //     productName: "Sony PlayStation 5",
    //     price: "$499",
    //     rating: 4.9,
    //     likes: 2200,
    //   },
    // ];

    // const defaultNewListData = [
    //   {
    //     productName: "Tesla Model Y",
    //     price: "$47990",
    //     rating: 4.9,
    //     likes: 2500,
    //   },
    //   {
    //     productName: "AirPods Pro",
    //     price: "$249",
    //     rating: 4.7,
    //     likes: 1600,
    //   },
    //   {
    //     productName: "Nintendo Switch OLED",
    //     price: "$349",
    //     rating: 4.8,
    //     likes: 1300,
    //   },
    //   {
    //     productName: "Dyson V15 Detect",
    //     price: "$699",
    //     rating: 4.6,
    //     likes: 800,
    //   },
    // ];

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
        <Form
          title="Add to Hot List"
          handleSubmit={() => handleSubmit("hotList")}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
        />
      )}
      {activeTab === "newList" && (
        <Form
          title="Add to New List"
          handleSubmit={() => handleSubmit("newList")}
          inputValue={inputValue}
          handleInputChange={handleInputChange}
        />
      )}
       {activeTab === "hotList" && <Table data={hotList} />}
      {activeTab === "newList" && <Table data={newList} />}
    </div>
  );
};

export default Dashboard;
