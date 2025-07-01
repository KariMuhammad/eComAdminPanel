export default function AddColor() {
  return (
    <div className="h-full container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Color</h1>

      <form className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Color Name
          </label>
          <input
            name="color-name"
            type="text"
            className="mt-1 p-2 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 outline-none"
            placeholder="Enter color name"
          />
        </div>
        {/* ./color name input */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Color Code
          </label>
          <input
            name="color-code"
            type="text"
            className="mt-1 p-2 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-blue-500 outline-none"
            placeholder="Enter color code (e.g., #FF5733)"
          />
        </div>
        {/* ./color code input */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Color
        </button>
      </form>
    </div>
  );
}
