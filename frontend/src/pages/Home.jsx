import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SERVER_URL from "./ServerURL";
import { FaInfo } from "react-icons/fa6";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchBook = async () => { 
        try {
            setLoading(true);
            const resp = await axios.get(`${SERVER_URL}/book`);
            // console.log(resp.data);
            setBooks(resp.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(() => {
      fetchBook()
    },[]);
  return (
    <>
      <h1 className=" text-white bg-green-500 text-2xl text-center p-4 shadow-lg">
        Book Store
      </h1>
      <div className=" p-4 flex justify-center items-center">
        {loading ? (
          <h3>loading...</h3>
        ) : (
          <table className=" w-full border-separate border-spacing-3">
            <thead>
              <tr>
                <th className=" border border-slate-500 rounded-md">SNo</th>
                <th className=" border border-slate-500 rounded-md">Title</th>
                <th className=" border border-slate-500 rounded-md">Author</th>
                <th className=" border border-slate-500 rounded-md">Year</th>
                <th className=" border border-slate-500 rounded-md">Options</th>
              </tr>
            </thead>
            <tbody className="">
              {books.map((book, index) => {
                return (
                  <tr key={book._id}>
                    <td className=" text-center border border-slate-300 rounded-md">
                      {index + 1}
                    </td>
                    <td className=" text-center border border-slate-300 rounded-md">
                      {book.title}
                    </td>
                    <td className=" text-center border border-slate-300 rounded-md">
                      {book.author}
                    </td>
                    <td className=" text-center border border-slate-300 rounded-md">
                      {book.year}
                    </td>
                    <td className=" text-center border border-slate-300 rounded-md flex justify-evenly items-center p-2">
                      <Link to={`/book/${book._id}`}>
                        <FaInfo className=" hover:rounded-full hover:scale-[150%] hover:transition-all" />
                      </Link>
                      <Link to={`/book/edit/${book._id}`}>
                        <MdOutlineModeEditOutline className=" hover:rounded-full hover:scale-[150%] hover:transition-all" />
                      </Link>
                      <Link to={`/book/delete/${book._id}`}>
                        <MdOutlineDelete className=" hover:rounded-full hover:scale-[150%] hover:transition-all" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <div className="m-5 p-4 flex justify-center items-center gap-5">
        <span className=" bg-lime-700 px-4 py-2 w-[10%] text-white rounded-md text-center ">Add A Book</span>
        <Link to={"/book/create"}>
          <FaPlus className=" hover:rounded-full hover:scale-[150%] hover:transition-all" />
        </Link>
      </div>
    </>
  );
}
export default Home