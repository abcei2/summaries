import BookCard from "../../../components/BookCard";

const page = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[90%] lg:w-[60%] flex flex-col gap-2 mt-10">
        <BookCard
          title="The 48 Laws Of Power"
          author="author"
          date="date"
          coverImage="coverImage"
        />
        <div className="w-full flex-col flex gap-2">
          <h2 className="text-2xl font-bold mb-2 capitalize">About the book</h2>
          <p className="text-xl text-justify text-[#6b6d76] font-light">
            In The 48 Laws of Power, Robert Greene asserts that whether you like
            it or not, you’re part of a never-ending game of power. You’re
            either striving for and wielding power, or you’re a pawn being
            played by someone more powerful than you. You choose your role. This
            book is for those who prefer to be players rather than pawns.
          </p>
          <p className="text-xl text-justify text-[#6b6d76] font-light">
            To turn you from an amateur into a master player, Greene has
            codified 48 laws of power based on historical examples of people
            who’ve excelled or failed at wielding power, with glorious or bloody
            results (or both). Some key principles you’ll learn: use your
            enemies, keep others dependent on you, say as little as possible,
            take credit for others’ work, and don’t get your hands dirty. You
            can choose to apply or dismiss these rules - but you can’t escape
            them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
