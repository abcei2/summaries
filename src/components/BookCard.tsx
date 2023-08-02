// BEGIN: 7f8d4c3b8d9c
import React from "react";
import {
  HiBookmark,
  HiOutlineArrowDownTray,
  HiOutlineEllipsisVertical,
  HiOutlineShare,
} from "react-icons/hi2";

type BookCardProps = {
  title: string;
  author: string;
  date: string;
  coverImage: string;
};

const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  date,
  coverImage,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden lg:h-96  lg:w-full">
      <div className="flex lg:flex-row flex-col h-full items-center">
        <div className="bg-blue-300 p-2 rounded-lg overflow-hidden w-[200px] lg:w-fit  h-fit">
          <img
            src="/card-img.jpg"
            alt="Book cover"
            className="overflow-hidden rounded-lg"
          />
        </div>

        <div className="p-4 lg:w-2/3 flex flex-col justify-evenly gap-2 h-full ">
          <label className="text-[#505258] tracking-wider font-bold text-sm">
            COMUNICATION
          </label>
          <div>
            <h2 className="text-4xl pb-2 font-bold capitalize w-fit flex items-center">
              {title}
            </h2>
            <p className="text-[#505258] text-base capitalize">By {author}</p>
          </div>
          <div className="flex gap-4 text-[#999ba4] ">
            <div className="details-icons-div ">
              <HiBookmark className="details-icons" />
            </div>
            <span className="border opacity-50 " />
            <div className="details-icons-div">
              <HiOutlineArrowDownTray className="details-icons" />
            </div>
            <div className="details-icons-div">
              <HiOutlineShare className="details-icons" />
            </div>
            <div className="details-icons-div">
              <HiOutlineEllipsisVertical className="details-icons" />
            </div>
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-2xl w-fit self-center lg:self-start ">
            Buy Now
          </button>
        </div>
        
        <span className="border opacity-50 lg:block hidden" />
        <div className="lg:w-1/3 flex flex-col justify-evenly items-center">
          <p className="text-[#505258] text-base capitalize">Install the app</p>
          <div className="w-[50%] bg-[#f5f5f5] rounded-full flex justify-center items-center">
            <img src="/qrcode.png" alt="Book cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
