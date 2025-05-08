import { useState } from "react";

const Modal = ({ onClose, onConfirm }) => {
  const [inputValue, setInputValue] = useState("Sample user data");

  const handleConfirm = () => {
    // When user clicks confirm, we pass the data to parent component
    onConfirm(inputValue);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Enter Information</h2>

        <div className="mb-4">
          <label className="block mb-2">Your data:</label>
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full border border-gray-300 p-2 rounded" />
        </div>

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleConfirm} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processedData, setProcessedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // This demonstrates the problematic approach
  const handleConfirm = (data) => {
    // Here's where the problem occurs:
    // We do the data processing before closing the modal

    setIsProcessing(true);

    // Simulate heavy data processing (500ms)
    const startProcess = async () => {
      console.log("Processing started...");

      // Simulate 500ms of processing time
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Process the data (in a real app, this might be more complex)
      const result = {
        originalData: data,
        processed: data.toUpperCase(),
        timestamp: new Date().toLocaleTimeString(),
      };

      // Update the state with processed data
      setProcessedData(result);
      setIsProcessing(false);

      // Only NOW do we close the modal - after the 500ms delay
      setIsModalOpen(false);
    };

    startProcess();
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modal Delay Demo</h1>

      <div className="mb-6">
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Open Modal
        </button>
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm} />}

      <div className="mt-8 border-t pt-4">
        <h2 className="text-xl font-bold mb-2">Results Area:</h2>

        {isProcessing ? (
          <div className="p-4 border border-yellow-300 bg-yellow-50 rounded">Processing data...</div>
        ) : processedData ? (
          <div className="p-4 border border-green-300 bg-green-50 rounded">
            <p>
              <strong>Original:</strong> {processedData.originalData}
            </p>
            <p>
              <strong>Processed:</strong> {processedData.processed}
            </p>
            <p>
              <strong>Time:</strong> {processedData.timestamp}
            </p>
          </div>
        ) : (
          <div className="p-4 border border-gray-300 bg-gray-50 rounded">No data processed yet. Open the modal and submit data.</div>
        )}
      </div>

      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded">
        <h3 className="font-bold text-red-700">The Problem:</h3>
        <p>When you click the Confirm button, there's a noticeable 500ms delay before the modal closes, creating a poor user experience.</p>
      </div>
    </div>
  );
}
