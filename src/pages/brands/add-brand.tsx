export default function AddBrand() {
  return (
    <div className="h-full container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Brand</h1>

      <form className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Brand Name
          </label>

          <input
            name="brand-name"
            type="text"
            className="mt-1 p-2 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 outline-none"
            placeholder="Enter category name"
          />
        </div>
        {/* ./category name input */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Brand
        </button>
      </form>
    </div>
  );
}
