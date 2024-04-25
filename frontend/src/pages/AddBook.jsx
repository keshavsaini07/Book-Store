import axios from "axios";
import SERVER_URL from './ServerURL';
import { useState } from "react"; 
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const [loading, setLoading] = useState(false);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      const data = { title, author, year };
      setLoading(true);
      const resp = await axios.post(`${SERVER_URL}/book/:id`, data);
      setLoading(false);
      console.log(resp.data);
      navigate('/home');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className=" text-white bg-green-500 text-2xl text-center p-4 shadow-lg">
        Add New Book
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
          <button
            onClick={submitHandler}
            className="bg-sky-800 px-4 py-2 w-full text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBook;