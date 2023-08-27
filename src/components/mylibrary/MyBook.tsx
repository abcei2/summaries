
import { useRouter } from "next/router";
import { HiCog } from "react-icons/hi";
import { Book } from "../../types";


const MyBook = ({ book }: { book: Book }) => {
    const router = useRouter();
    return (
      <div
        onClick={() => {
          book.status == "extracted"
            ? router.push(`/books/details/${book.global_id}`)
            : alert("El libro no esta disponible");
        }}
        className={`w-[150px] sm:w-[200px] rounded-lg shadow-lg border border-2 flex flex-col 
        ${
          book?.status != "extracted"
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:scale-105 hover:shadow-xl"
        }
        justify-between max-h-[300px] duration-500  bg-white`}
      >
        <div className=" relative">
          <div className="absolute rounded-full w-fit p-2 m-1 border shadow-md">
            {HeadsetIcon}
          </div>
          <div className="flex justify-center mb-2">
            <img className="ounded-lg mt-8 h-20 sm:h-32" src="/card-img.jpg" />
          </div>
        </div>
  
        <div className="p-1 text-center overflow-auto">
          <div className="flex flex-col ">
            {book.status == "downloading" ? (
              <span className="font-bold text-gray-600 mb-2">
                Descargando {book?.progress + "%"}
              </span>
            ) : book.status == "downloaded" ? (
              <span className="font-bold text-gray-600 mb-2">
                Extrayendo texto
              </span>
            ) : book.status == "extracted" ? (
              <span className="font-bold text-gray-600 mb-2">
                Texto disponible
              </span>
            ) : book.status == "queue" ? (
              <span className="font-bold text-gray-600 mb-2">
                En cola para descarga
              </span>
            ) : (
              <span className="font-bold text-gray-600 mb-2">{book?.status}</span>
            )}
  
            <span className="font-bold text-gray-600 mb-2">
              {book?.title_2 ? book?.title_2.slice(0, 20) : ""}....
            </span>
          </div>
          <div className="p-1">
            <span className="  text-gray-600 mb-2">
              By {book?.author ? book?.author?.slice(0, 20) : ""}...
            </span>
          </div>
        </div>
      </div>
    );
  };
  

export default MyBook;