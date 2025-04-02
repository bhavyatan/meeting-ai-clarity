
import React, { useState, useRef } from 'react';
import { Upload, X, FileUp } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from '@/utils/toast';

const FileUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = ['video/mp4', 'audio/mpeg', 'audio/wav'];
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type. Please upload an MP4, MP3, or WAV file.');
      return;
    }
    
    // 100MB limit
    if (file.size > 100 * 1024 * 1024) {
      toast.error('File is too large. Maximum size is 100MB.');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    
    // Simulate an upload and processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(`Successfully uploaded "${selectedFile.name}"`);
    setUploading(false);
    setSelectedFile(null);
    
    // Here you would typically upload the file and redirect to the meeting page
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".mp4,.mp3,.wav"
      />
      
      {!selectedFile ? (
        <div
          className={`file-drop-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="p-4 rounded-full bg-primary/10">
              <Upload className="h-10 w-10 text-primary" />
            </div>
            <div>
              <p className="text-lg font-medium">Drag & drop your meeting file here</p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to select a file (MP4, MP3, WAV)
              </p>
            </div>
            <Button variant="outline" type="button" className="mt-2">
              <FileUp className="h-4 w-4 mr-2" />
              Select File
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10">
                <FileUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium truncate max-w-[250px] sm:max-w-sm">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveFile}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleSubmit} 
              disabled={uploading}
              className="w-full sm:w-auto"
            >
              {uploading ? 'Processing...' : 'Process Meeting Recording'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
