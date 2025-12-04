const pages = [1, 2, 3, 4, 5];
const Pagination = () => {
  return (
    <div className="flex items-center justify-center mt-8 mb-10">
      <div className="border border-gray-700 px-4 font-bold text-xl cursor-pointer hover:bg-gray-200 transition py-1 text-gray-700">
        Prev
      </div>
      {pages.map((page) => (
        <div className="border border-gray-700 px-4 font-bold text-xl cursor-pointer hover:bg-gray-200 transition py-1 text-gray-700">
          {page}
        </div>
      ))}
      <div className="border border-gray-700 px-4 font-bold text-xl cursor-pointer hover:bg-gray-200 transition py-1 text-gray-700">
        Next
      </div>
    </div>
  );
};

export default Pagination;
