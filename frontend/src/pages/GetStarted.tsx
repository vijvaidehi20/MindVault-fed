import { useState, useRef, useEffect } from 'react';
import './getstarted.css';
import AuthModal from './AuthModal';

const tabs = ['PDF', 'PowerPoint', 'Image', 'Text'];

export default function GetStartedPage() {
  const [activeTab, setActiveTab] = useState('PDF');
  const [activeTabWidth, setActiveTabWidth] = useState(0);
  const [activeTabLeft, setActiveTabLeft] = useState(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isMindMapPopupOpen, setIsMindMapPopupOpen] = useState(false);
  
  // New state to control the visibility and initial view of the auth modal
  const [authModalView, setAuthModalView] = useState<'login' | 'signup' | null>(null);
  
  // State for summary feature
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsFileUploaded(true);
      setSummary('');
      setError('');
    }
  };

  

  const handleMindMapClick = () => {
    setIsMindMapPopupOpen(true);
  };
  
  const closeMindMapPopup = () => {
    setIsMindMapPopupOpen(false);
  };
  
  // const handleSummaryClick = async () => {
  //   if (!uploadedFile) {
  //     setError('No file uploaded to summarize.');
  //     return;
  //   }

  //   setIsLoading(true);
  //   setError('');
  //   setSummary('');

  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 2000));
      
  //     const mockSummary = "This is a generated summary of your document. It highlights the key points, main arguments, and conclusions. The summary is created by a powerful AI model that analyzes the content and extracts the most important information for you to review quickly.";
  //     setSummary(mockSummary);

  //   } catch (err: unknown) {
  //     let errorMessage = 'An unknown error occurred.';
  //     if (err instanceof Error) {
  //       errorMessage = err.message;
  //     } else if (typeof err === 'string') {
  //       errorMessage = err;
  //     }
  //     setError(errorMessage);
  //     console.error('Error during summarization:', err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  // ... (rest of the imports and state variables)

// const handleSummaryClick = async () => {
//     // New conditional logic for the Image tab
//     if (activeTab === 'Image') {
//         openAuthModal('signup'); // Or 'login', either is fine
//         return;
//     }

//     if (!uploadedFile) {
//         setError('No file uploaded to summarize.');
//         return;
//     }

//     setIsLoading(true);
//     setError('');
//     setSummary('');

//     // --- Backend Integration (Conceptual) ---
//     // For this example, we will simulate an API call for PDF, PowerPoint, and Text files.
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Simulate a summary response based on the file type
//       let mockSummary = '';
//       if (activeTab === 'PDF') {
//           mockSummary = `Summary of the PDF file: The document outlines key findings from a research study on AI's impact on education, focusing on student engagement and learning outcomes.`;
//       } else if (activeTab === 'PowerPoint') {
//           mockSummary = `Summary of the PowerPoint: This presentation covers quarterly sales performance, highlighting a 15% growth in Q3. It includes slides on market analysis, key opportunities, and a forecast for the next year.`;
//       } else if (activeTab === 'Text') {
//           mockSummary = `Summary of the Text file: The text discusses the historical evolution of programming languages, from machine code and assembly languages to modern high-level languages like Python and JavaScript.`;
//       } else {
//           mockSummary = 'Summary generation for this file type is not yet supported.';
//       }
      
//       setSummary(mockSummary);

//     } catch (err: unknown) {
//       let errorMessage = 'An unknown error occurred.';
//       if (err instanceof Error) {
//         errorMessage = err.message;
//       } else if (typeof err === 'string') {
//         errorMessage = err;
//       }
//       setError(errorMessage);
//       console.error('Error during summarization:', err);
//     } finally {
//       setIsLoading(false);
//     }
// };

// // ... (rest of the component's code)

// ... (imports and state variables)

const handleSummaryClick = async () => {
    // New conditional logic for the Image tab
    if (activeTab === 'Image') {
        openAuthModal('signup'); // Or 'login', either is fine
        return;
    }

    if (!uploadedFile) {
        setError('No file uploaded to summarize.');
        return;
    }

    setIsLoading(true);
    setError('');
    setSummary('');

    // --- Real Backend Integration ---
    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
        const response = await fetch('http://localhost:5000/api/summarize', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Error: ${response.statusText}`);
        }

        const data = await response.json();
        setSummary(data.summary); // Assuming the API returns an object with a 'summary' key

    } catch (err: unknown) {
        let errorMessage = 'An unknown error occurred.';
        if (err instanceof Error) {
            errorMessage = err.message;
        } else if (typeof err === 'string') {
            errorMessage = err;
        }
        setError(errorMessage);
        console.error('Error during summarization:', err);
    } finally {
        setIsLoading(false);
    }
};

// ... (rest of the component's code)

  // New function to open the auth modal with a specific view
  const openAuthModal = (view: 'login' | 'signup') => {
    setAuthModalView(view);
  };
  const closeAuthModal = () => {
    setAuthModalView(null);
  };

  return (
    <div className="get-started-container">
      {/* Top Nav */}
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <div className="text-2xl font-bold text-white">MindVault</div>
        <div className="flex gap-6 text-sm text-gray-300">
          <button className="hover:text-white" onClick={() => openAuthModal('login')}>Login</button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-full">
            Get Started
          </button>
        </div>
      </div>

      {/* ... (rest of your existing JSX) ... */}
      <h1 className="supported-types mt-10 text-3xl">Supported File Types</h1>
      <div className="slider-container">
        <div className="slider-bar-bg" ref={sliderBarRef} style={{'--active-tab-width': `${activeTabWidth}px`, '--active-tab-left': `${activeTabLeft}px`,} as React.CSSProperties}>
          {tabs.map((tab) => (
            <button key={tab} className={`file-type ${activeTab === tab ? 'active' : ''}`} onClick={() => { setActiveTab(tab); setIsFileUploaded(false); setUploadedFile(null); setSummary(''); setError(''); }}>
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="description-box">
        <h3 className="text-xl mb-2 funky-font">AI {activeTab} Summarizer</h3>
        <p>
          Upload any {activeTab} file and MindVault will instantly summarize the content,
          extract key points, and help you study smarter.
        </p>
      </div>
      <div className="upload-flex-container">
        {isFileUploaded ? (
          <div className="uploaded-file-info">
            <p className="uploaded-file-name">Uploaded file: {uploadedFile?.name}</p>
            <div className="uploaded-buttons">
              <button className="select-files-btn" onClick={handleSummaryClick}>
                Summary
              </button>
              <button className="select-files-btn" onClick={handleMindMapClick}>
                MindMap
              </button>
            </div>
            {isLoading && <p className="loading-message">Generating summary...</p>}
            {error && <p className="error-message">{error}</p>}
            {summary && (
              <div className="summary-container">
                <h3>Summary</h3>
                <p>{summary}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="upload-box-large">
            <div className="pin-emoji">📌</div>
            <p className="text-lg font-medium mb-3">
              Drag & drop a {activeTab} file to upload
            </p>
            <input type="file" id="file-upload" className="hidden-file-input" onChange={handleFileChange} accept={activeTab === 'PDF' ? '.pdf' : activeTab === 'PowerPoint' ? '.pptx,.ppt' : activeTab === 'Image' ? 'image/*' : '.txt'} />
            <label htmlFor="file-upload" className="select-files-btn">
              Select Files
            </label>
            <p className="text-sm text-gray-400 mt-2">Or, upload from Google Drive</p>
            <img src="/getStartedimg.png" alt="mascot" className="mascot-glow mascot-overlap" />
          </div>
        )}
      </div>

      {/* MindMap Pop-up - Updated button handlers */}
      {isMindMapPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button onClick={closeMindMapPopup} className="popup-close-btn">&times;</button>
            <h2 className="popup-title">Access MindMap and More</h2>
            <p className="popup-message">
              Please login or signup to unlock the MindMap feature and other powerful tools.
            </p>
            <div className="popup-actions">
              <button className="select-files-btn" onClick={() => { closeMindMapPopup(); openAuthModal('login'); }}>Login</button>
              <button className="select-files-btn" onClick={() => { closeMindMapPopup(); openAuthModal('signup'); }}>Sign Up</button>
            </div>
          </div>
        </div>
      )}
      
      {/* The new Auth Modal is now conditionally rendered based on authModalView */}
      {authModalView && <AuthModal onClose={closeAuthModal} initialView={authModalView} />}
    </div>
  );
}