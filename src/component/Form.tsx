const Form = ({
  title,
  handleSubmit,
  inputValue,
  handleInputChange,
  validationErrors,
}: any) => (
  <div className="bg-white shadow-lg rounded px-8 py-6 mb-4 mt-8 border-2 border-gray-600 flex flex-col mx-10">
    <div className="contents">
      <h2 className="text-lg font-semibold mb-2 text-center">{title}</h2>
      <div className="mb-4 inline-flex items-start sm:flex max-sm:flex-col">
        <label className="mr-2 text-base text-slate-900">ProductName:</label>
        <input
          type="text"
          value={inputValue.productName}
          onChange={(e) => handleInputChange(e, "productName")}
          placeholder="Product Name"
          className="input-field border-b-2 border-gray-600"
        />
        {validationErrors?.productName && (
          <div className="text-red-600">{validationErrors.productName}</div>
        )}
      </div>
      <div className="mb-4 inline-flex items-start sm:flex max-sm:flex-col">
        <label className="mr-2 text-base text-slate-900">Price:</label>
        <input
          type="text"
          value={inputValue.price}
          onChange={(e) => handleInputChange(e, "price")}
          placeholder="Price"
          className="input-field border-b-2 border-gray-600"
        />
        {validationErrors?.price && <div className="text-red-600">{validationErrors.price}</div>}
      </div>
      <div className="mb-4 inline-flex items-start sm:flex max-sm:flex-col">
        <label className="mr-2 text-base text-slate-900">Rating:</label>
        <input
          type="number"
          value={inputValue.rating}
          onChange={(e) => handleInputChange(e, "rating")}
          placeholder="Rating"
          className="input-field border-b-2 border-gray-600"
        />
        {validationErrors?.rating && <div className="text-red-600">{validationErrors.rating}</div>}
      </div>
      <div className="mb-4 inline-flex items-start sm:flex max-sm:flex-col">
        <label className="mr-2 text-base text-slate-900">Likes:</label>
        <input
          type="number"
          value={inputValue.likes}
          onChange={(e) => handleInputChange(e, "likes")}
          placeholder="Likes"
          className="input-field border-b-2 border-gray-600"
        />
        {validationErrors?.likes && <div className="text-red-600">{validationErrors.likes}</div>}
      </div>
      <button
        onClick={handleSubmit}
        className="w-1/3 flex justify-center items-center h-10 text-center text-base text-white bg-green-500 p-4"
      >
        Add
      </button>
    </div>
  </div>
);

export default Form;
