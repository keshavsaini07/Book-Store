import { useEffect, useState } from "react";
import axios from "axios";
import SERVER_URL from "./ServerURL";
import { useParams, useNavigate } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchbook = async () => {
    try {
      setLoading(true);
      // console.log(id);
      const resp = await axios.get(`${SERVER_URL}/book/${id}`);
      // console.log(resp.data);
      setTitle(resp.data.data.title);
      setAuthor(resp.data.data.author);
      setYear(resp.data.data.year);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const data = { title, author, year };
      setLoading(true);
      // console.log(id);
      const resp = await axios.delete(`${SERVER_URL}/book/${id}`, data);
      console.log(resp.data);
      setLoading(false);
      navigate("/home");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleReturn = async () => {
    try {
      navigate("/home");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchbook();
  }, []);
  return (
    <>
      <h1 className=" text-white bg-green-500 text-2xl text-center p-4 shadow-lg">
        Delete Book
      </h1>
      {loading ? <h2>Loading...</h2> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-md w-[600px] p-4 mx-auto my-4">
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            className="border-2 border-gray-400 px-4 py-2 w-full"
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="py-4">
          <label className="text-xl mr-4 text-gray-500">Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border-2 border-gray-400 px-4 py-2 w-full"
          ></input>
        </div>
        <div className="py-4">
          <button className="bg-sky-800 px-4 py-2 w-full text-white pointer-events-none">
            Are you sure you want to DELETE the book?
          </button>
          <section className=" flex justify-center items-center gap-5 py-3">
            <button
              onClick={handleDelete}
              className=" bg-lime-700 px-4 py-2 w-[50%] text-white rounded-md hover:animate-pulse"
            >
              Yes
            </button>
            <button
              onClick={handleReturn}
              className="bg-red-700 px-4 py-2 w-[50%] text-white rounded-md hover:animate-pulse"
            >
              No
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default DeleteBook;
