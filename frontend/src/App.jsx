import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import ShowBook from "./pages/showBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";


const App = () => {
  return (
    <>

      <Routes>
        <Route path="/home" element={<Home />}></Route>
        
        <Route path="/books" element={<ShowBook />}></Route>
  
        <Route path="/book/create" element={ <AddBook /> }></Route>
      
        <Route path="/book/delete/:id" element={<DeleteBook />}></Route>
      
        <Route path="/book/edit/:id" element={<EditBook />}></Route>
      </Routes>
    </>
  );
}
export default App;
