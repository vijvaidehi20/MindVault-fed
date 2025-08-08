import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import './uploadNotes.css';
import './Home.css';

const GetStarted = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('PDF');
    const [activeTabWidth, setActiveTabWidth] = useState(0);
    const [activeTabLeft, setActiveTabLeft] = useState(0);
    const sliderBarRef = useRef<HTMLDivElement>(null);
    const tabs = ['PDF', 'PowerPoint', 'Image', 'Text'];

    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [summary, setSummary] = useState('');
    const [error, setError] = useState('');
    const [isMindMapPopupOpen, setIsMindMapPopupOpen] = useState(false);

    const uploadFileToBackend = async (file: File) => {
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
            return data.fileId;
        } catch (err: unknown) {
            let errorMessage = 'An unknown error occurred during file upload.';
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            setIsFileUploaded(true);
            setSummary('');
            setError('');
        }
    };

    const handleSummaryClick = async () => {
        if (!uploadedFile) {
            setError('Please upload a file first.');
            return;
        }

        setIsLoading(true);
        setError('');
        setSummary('');

        try {
            const fileId = await uploadFileToBackend(uploadedFile);

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

    const handleMindMapClick = () => {
        setIsMindMapPopupOpen(true);
    };

    const closeMindMapPopup = () => {
        setIsMindMapPopupOpen(false);
    };

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
            {/* Top Nav - Replaced with the Home page's navbar */}
            <nav className="nav-bar fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-3">
                    <RouterLink
                        to="/"
                        className="nav-logo cursor-pointer transition whitespace-nowrap"
                    >
                        MindVault
                    </RouterLink>

                    {/* All navigation tabs from Home page are now included */}
                    <div className="hidden md:flex space-x-8 text-lg font-medium">
                        {['home', 'explore', 'dashboard', 'about'].map((section) => {
                            if (section === 'home') {
                                return (
                                    <RouterLink
                                        key={section}
                                        to="/"
                                        className="nav-link cursor-pointer transition-colors capitalize"
                                    >
                                        Home
                                    </RouterLink>
                                );
                            }
                            if (section === 'dashboard') {
                                return (
                                    <RouterLink
                                        key={section}
                                        to="/dashboard"
                                        className="nav-link cursor-pointer transition-colors capitalize"
                                    >
                                        Dashboard
                                    </RouterLink>
                                );
                            }
                            return (
                                <ScrollLink
                                    key={section}
                                    to={section}
                                    smooth={true}
                                    duration={500}
                                    offset={-70}
                                    className="nav-link cursor-pointer transition-colors capitalize"
                                >
                                    {section.replace(/([A-Z])/g, ' $1')}
                                </ScrollLink>
                            );
                        })}
                    </div>

                    <div className="flex space-x-4">
                        <button className="glow-btn" onClick={() => navigate('/login')}>
                            Login
                        </button>
                        <button className="primary-btn" onClick={() => navigate('/signup')}>
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* Content starts below the fixed navbar */}
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