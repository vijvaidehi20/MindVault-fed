import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './uploadNotes.css';

const GetStarted = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('PDF');
    const [activeTabWidth, setActiveTabWidth] = useState(0);
    const [activeTabLeft, setActiveTabLeft] = useState(0);
    const sliderBarRef = useRef<HTMLDivElement>(null);
    const tabs = ['PDF', 'PowerPoint', 'Image', 'Text'];

    // State for file uploads and processing
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    // const [uploadedFileId, setUploadedFileId] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState('');
    const [error, setError] = useState('');
    const [isMindMapPopupOpen, setIsMindMapPopupOpen] = useState(false);

    /**
     * Handles the file upload to the backend.
     * This function is now called by handleSummaryClick.
     */
    const uploadFileToBackend = async (file: File) => {
        // Clear previous state before starting the upload
        setError('');
        setSummary('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error: ${response.statusText}`);
            }

            const data = await response.json();
            // setUploadedFileId(data.fileId); // Set the file ID upon successful upload
            return data.fileId; // Return the fileId for immediate use
        } catch (err: unknown) {
            let errorMessage = 'An unknown error occurred during file upload.';
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage);
            // Re-throw the error to stop the subsequent summary process
            throw new Error(errorMessage);
        }
    };

    /**
     * Handles a user selecting a file from the file input.
     */
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            setIsFileUploaded(true);
            setSummary('');
            setError('');
        }
    };

    /**
     * This function now handles both uploading the file and requesting the summary.
     */
    const handleSummaryClick = async () => {
        if (!uploadedFile) {
            setError('Please upload a file first.');
            return;
        }

        setIsLoading(true);
        setError('');
        setSummary('');

        try {
            // Step 1: Upload the file and get the file ID
            const fileId = await uploadFileToBackend(uploadedFile);

            // Step 2: Use the returned file ID to get the summary
            const response = await fetch(`http://localhost:5000/api/summarize/${fileId}`, {
                method: 'GET',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error: ${response.statusText}`);
            }

            const data = await response.json();
            setSummary(data.summary);
        } catch (err: unknown) {
            let errorMessage = 'An unknown error occurred while summarizing.';
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage);
            console.error('Error during summarization:', err);
        } finally {
            setIsLoading(false);
        }
    };
    
    // ... (rest of your component functions)

    const handleMindMapClick = () => {
        setIsMindMapPopupOpen(true);
    };

    const closeMindMapPopup = () => {
        setIsMindMapPopupOpen(false);
    };

    // useEffect hook for managing the slider bar position
    useEffect(() => {
        if (sliderBarRef.current) {
            const activeTabElement = sliderBarRef.current.querySelector('.file-type.active');
            if (activeTabElement) {
                const htmlElement = activeTabElement as HTMLElement;
                setActiveTabWidth(htmlElement.clientWidth);
                setActiveTabLeft(htmlElement.offsetLeft);
            }
        }
    }, [activeTab]);


    return (
        <div className="get-started-container">
            {/* Top Nav */}
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
                <div className="text-2xl font-bold text-white">MindVault</div>
                <div className="flex gap-6 text-sm text-gray-300">
                    <button className="text-white text-lg hover:text-white" onClick={() => navigate('/login')}>
                        Login
                    </button>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded-full" onClick={() => navigate('/signup')}>
                        Get Started
                    </button>
                </div>
            </div>

            <h1 className="supported-types mt-10 text-3xl">Supported File Types</h1>
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
                                setIsFileUploaded(false);
                                setUploadedFile(null);
                                setSummary('');
                                setError('');
                            }}
                        >
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
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden-file-input"
                            onChange={handleFileChange}
                            accept={
                                activeTab === 'PDF'
                                    ? '.pdf'
                                    : activeTab === 'PowerPoint'
                                    ? '.pptx,.ppt'
                                    : activeTab === 'Image'
                                    ? 'image/*'
                                    : '.txt'
                            }
                        />
                        <br></br>
                        <label htmlFor="file-upload" className="select-files-btn">
                            Select Files
                        </label>
                        {/* <p className="text-sm text-gray-400 mt-2">Or, upload from Google Drive</p> */}
                        <img src="/getStartedimg.png" alt="mascot" className="mascot-glow mascot-overlap" />
                    </div>
                )}
            </div>
            {isMindMapPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button onClick={closeMindMapPopup} className="popup-close-btn">&times;</button>
                        <h2 className="popup-title">Access MindMap and More</h2>
                        <p className="popup-message">
                            Please login or signup to unlock the MindMap feature and other powerful tools.
                        </p>
                        <div className="popup-actions">
                            <button className="select-files-btn" onClick={() => { closeMindMapPopup(); navigate('/login'); }}>Login</button>
                            <button className="select-files-btn" onClick={() => { closeMindMapPopup(); navigate('/signup'); }}>Sign Up</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GetStarted;