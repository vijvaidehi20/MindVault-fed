// import { useState, useRef, useEffect } from 'react';
// import './getstarted.css';

// const tabs = ['PDF', 'PowerPoint', 'Image', 'Text'];

// export default function GetStartedPage() {
//   const [activeTab, setActiveTab] = useState('PDF');
//   const [activeTabWidth, setActiveTabWidth] = useState(0);
//   const [activeTabLeft, setActiveTabLeft] = useState(0);
  
//   // Explicitly define the ref type as HTMLDivElement
//   const sliderBarRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const activeTabButton = document.querySelector('.file-type.active') as HTMLElement;
//     const sliderBarElement = sliderBarRef.current;
    
//     if (activeTabButton && sliderBarElement) {
//       const parentLeft = sliderBarElement.getBoundingClientRect().left;
//       const buttonLeft = activeTabButton.getBoundingClientRect().left;

//       setActiveTabWidth(activeTabButton.offsetWidth);
//       setActiveTabLeft(buttonLeft - parentLeft);
//     }
//   }, [activeTab]);

//   return (
//     <div className="get-started-container">
//       {/* Top Nav */}
//       <div className="p-4 flex justify-between items-center border-b border-gray-700">
//         <div className="text-2xl font-bold text-white">MindVault</div>
//         <div className="flex gap-6 text-sm text-gray-300">
//           <button className="hover:text-white">Login</button>
//           <button className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-full">
//             Get Started
//           </button>
//         </div>
//       </div>

//       {/* Supported File Types */}
//       <h1 className="supported-types mt-10 text-3xl">Supported File Types</h1>

//       {/* Slider Tabs */}
//       <div className="slider-container">
//         <div
//           className="slider-bar-bg"
//           ref={sliderBarRef}
//           style={{ 
//             '--active-tab-width': `${activeTabWidth}px`,
//             '--active-tab-left': `${activeTabLeft}px`,
//           } as React.CSSProperties}
//         >
//           {tabs.map((tab) => (
//             <button
//               key={tab}
//               className={`file-type ${activeTab === tab ? 'active' : ''}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Description Box */}
//       <div className="description-box">
//         <h3 className="text-xl mb-2 funky-font">AI {activeTab} Summarizer</h3>
//         <p>
//           Upload any {activeTab} file and MindVault will instantly summarize the content,
//           extract key points, and help you study smarter.
//         </p>
//       </div>

//       {/* Upload Section with Mascot */}
//       <div className="upload-flex-container">
//         <div className="upload-box-large">
//           <div className="pin-emoji">📌</div>
//           <p className="text-lg font-medium mb-3">
//             Drag & drop a {activeTab} file to upload
//           </p>
//           <button className="select-files-btn">Select Files</button>
//           <p className="text-sm text-gray-400 mt-2">Or, upload from Google Drive</p>
//           <img src="/getStartedimg.png" alt="mascot" className="mascot-glow mascot-overlap" />
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from 'react';
import './getstarted.css';

const tabs = ['PDF', 'PowerPoint', 'Image', 'Text'];

export default function GetStartedPage() {
  const [activeTab, setActiveTab] = useState('PDF');
  const [activeTabWidth, setActiveTabWidth] = useState(0);
  const [activeTabLeft, setActiveTabLeft] = useState(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isMindMapPopupOpen, setIsMindMapPopupOpen] = useState(false);

  // Explicitly define the ref type
  const sliderBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeTabButton = document.querySelector('.file-type.active') as HTMLElement;
    const sliderBarElement = sliderBarRef.current;
    
    if (activeTabButton && sliderBarElement) {
      const parentLeft = sliderBarElement.getBoundingClientRect().left;
      const buttonLeft = activeTabButton.getBoundingClientRect().left;

      setActiveTabWidth(activeTabButton.offsetWidth);
      setActiveTabLeft(buttonLeft - parentLeft);
    }
  }, [activeTab]);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') { // Ensure file is a PDF for this example
      setUploadedFile(file);
      setIsFileUploaded(true);
      // The file is stored in memory in `uploadedFile` state
      // It will be lost on page refresh as requested
    } else {
      alert('Please upload a PDF file.');
    }
  };

  // Handle MindMap button click to show popup
  const handleMindMapClick = () => {
    setIsMindMapPopupOpen(true);
  };
  
  // Close the popup
  const closeMindMapPopup = () => {
    setIsMindMapPopupOpen(false);
  };
  
  // Handle Summary button click (for now, static as requested)
  const handleSummaryClick = () => {
    alert('Summary feature is coming soon!');
  };

  return (
    <div className="get-started-container">
      {/* Top Nav */}
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <div className="text-2xl font-bold text-white">MindVault</div>
        <div className="flex gap-6 text-sm text-gray-300">
          <button className="hover:text-white">Login</button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-full">
            Get Started
          </button>
        </div>
      </div>

      {/* Supported File Types */}
      <h1 className="supported-types mt-10 text-3xl">Supported File Types</h1>

      {/* Slider Tabs */}
      <div className="slider-container">
        <div
          className="slider-bar-bg"
          ref={sliderBarRef}
          style={{ 
            '--active-tab-width': `${activeTabWidth}px`,
            '--active-tab-left': `${activeTabLeft}px`,
          } as React.CSSProperties}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`file-type ${activeTab === tab ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab);
                setIsFileUploaded(false); // Reset state when switching tabs
                setUploadedFile(null);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Description Box */}
      <div className="description-box">
        <h3 className="text-xl mb-2 funky-font">AI {activeTab} Summarizer</h3>
        <p>
          Upload any {activeTab} file and MindVault will instantly summarize the content,
          extract key points, and help you study smarter.
        </p>
      </div>

      {/* Upload Section with Mascot */}
      <div className="upload-flex-container">
        <div className="upload-box-large">
          <div className="pin-emoji">📌</div>
          <p className="text-lg font-medium mb-3">
            Drag & drop a {activeTab} file to upload
          </p>

          {/* Conditional rendering based on file upload state */}
          {isFileUploaded ? (
            <>
              <p className="uploaded-file-name">Uploaded file: {uploadedFile?.name}</p>
              <div className="uploaded-buttons">
                <button 
                  className="select-files-btn"
                  onClick={handleSummaryClick}
                >
                  Summary
                </button>
                <button 
                  className="select-files-btn"
                  onClick={handleMindMapClick}
                >
                  MindMap
                </button>
              </div>
            </>
          ) : (
            <>
              <input 
                type="file" 
                id="file-upload" 
                className="hidden-file-input" 
                onChange={handleFileChange}
                accept=".pdf"
              />
              <label htmlFor="file-upload" className="select-files-btn">
                Select Files
              </label>
              <p className="text-sm text-gray-400 mt-2">Or, upload from Google Drive</p>
            </>
          )}

          <img src="/getStartedimg.png" alt="mascot" className="mascot-glow mascot-overlap" />
        </div>
      </div>

      {/* MindMap Pop-up */}
      {isMindMapPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={closeMindMapPopup} className="popup-close-btn">&times;</button>
            <h2 className="popup-title">Access MindMap and More</h2>
            <p className="popup-message">
              Please login or signup to unlock the MindMap feature and other powerful tools.
            </p>
            <div className="popup-actions">
              <button className="select-files-btn">Login</button>
              <button className="select-files-btn">Sign Up</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}