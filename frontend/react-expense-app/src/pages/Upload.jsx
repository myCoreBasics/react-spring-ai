import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeExpense } from '../utils/api'
import './Upload.css';

function Upload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzedExpense, setAnalyzedExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setError(null);
        setPreview(null);
        setAnalyzedExpense(null);
      } else {
        setError('이미지 파일만 업로드 가능합니다.');
        setFile(null);
        return;
      }
      const maxSize = 10 * 1024 * 1024; //10MB
      if(selectedFile.size > maxSize){
        setError('파일 크기는 10MB 이하로')
        setFile(null);
        setPreview(null);
        setAnalyzedExpense(null);
        return;
      }

      setFile(selectedFile);
      setError(null);
      
      //Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(selectedFile);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!file) {
      setError('파일을 선택해주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try{
      const expense = await analyzeExpense(file);

      setAnalyzedExpense(expense);
      setSuccess(true);

      setTimeout(() => {
        navigate(`/expenses/${expense.id}`);
      }, 3000);
    }catch(err){
      setError(err.message || '영수증 이미지 분석 실패');
    }finally{
      setLoading(false);
    }
  }

  function handleCancel(){
    setFile(null);
    setPreview(null);
    setError(null);
    setSuccess(false);
    setAnalyzedExpense(null);

    const fileInput = document.getElementById('file-upload');
    if(fileInput){
      fileInput.value = '';
    }
  }

  return (
    <div className="upload">
      <h1>영수증 업로드</h1>
      
      <div className="upload-container">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="file-input-wrapper">
              <label htmlFor="file-upload" className="file-label">
                {file ? file.name : '이미지 파일 선택'}
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
                disabled={loading}
              />
            {file && (
              <button type='button' onClick={handleCancel} className="btn-remove" disabled={loading} >X</button>
            )}
          </div>

          {preview && (
            <div className="preview-container">
              <img
                src={URL.createObjectURL(file)}
                alt="미리보기"
                className="preview-image"
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
          
          {success && (
            <div className="success-message">
              업로드 성공! 대시보드로 이동합니다...
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={!file || loading}
          >
            {loading ? '분석 중...' : 'AI 분석 및 등록'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;

