import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [heroData, setHeroData] = useState({
    title: "",
    subTitle: "",
    description: "",
    buttonText: "",
    image: "",
  });

  useEffect(() => {
    fetch("/api/hero")
      .then((res) => res.json())
      .then((data) => setHeroData(data));
  }, []);

  const handleChange = (e) => {
    setHeroData({ ...heroData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(heroData),
    });
    alert("Hero section updated!");
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h2 className="text-2xl font-bold">Edit Hero Section</h2>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input type="text" name="title" value={heroData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border" />
        <input type="text" name="subTitle" value={heroData.subTitle} onChange={handleChange} placeholder="Subtitle" className="w-full p-2 border" />
        <textarea name="description" value={heroData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border"></textarea>
        <input type="text" name="buttonText" value={heroData.buttonText} onChange={handleChange} placeholder="Button Text" className="w-full p-2 border" />
        <input type="text" name="image" value={heroData.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
