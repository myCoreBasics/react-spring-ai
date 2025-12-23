import { useState } from 'react';
import OpenAI from "openai";
import './OpenAIPractice.css';

export default function OpenAIPractice() {

  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  async function handleSubmit(e){
    e.preventDefault();

    if(!apiKey.trim()){
        setError('API 키를 입력해 주세요.');
        return;
    }
    if (!prompt.trim()) {
      setError('프롬프트를 입력해주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    setResponse('');
    try{
        const result = await callOpenAI(apiKey, prompt);
        setResponse(result);
    }catch(err){
        setError(err.message || 'API 호출이 실패 했습니다.')
    }finally{
        setLoading(false);
    }
  }

  async function callOpenAI(apiKey, prompt){
    const client = new OpenAI({
            apiKey: apiKey,
            dangerouslyAllowBrowser: true, // 브라우저에서 실행을 위해 필요
        }
    );

    const response = await client.chat.completions.create({
        model: "gpt-4o",
        //reasoning: { effort: "low" },
        messages: [
            {
                role: "developer",
                content: "You are a helpful assistant."
            },
            {
                role: "user",
                content: prompt,
            },
        ],
    });
    console.log(response);
    return response.choices[0].message.content || '응답을 받을 수 없습니다.';
  }

  function handleCancel(){
    setPrompt('');
    setResponse('');
    setError(null);
  }

  return (
    <div className="openai-practice">
    <div className="practice-header">
      <h1>OpenAI API 실습</h1>
      <p>OpenAI API를 사용하여 프롬프트에 대한 응답을 받아보세요.</p>
    </div>
    <div className="practice-container">
      <form onSubmit={handleSubmit} id="practice-form" className="practice-form">
        <div className="form-group">
          <label htmlFor="api-key">OpenAI API Key *</label>
          <input
            id="api-key"
            type="password"
            placeholder="sk-..."
            className="form-input"
            onChange={(e) => setApiKey(e.target.value)}
            value={apiKey}
            disabled={loading}
          />
          <small className="form-hint">
            API 키는 브라우저에 저장되지 않습니다. 매번 입력해주세요.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="prompt">프롬프트 *</label>
          <textarea
            id="prompt"
            placeholder="예: 'React에서 useState를 사용하는 방법을 설명해주세요.'"
            className="form-textarea"
            rows="5"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled = {loading}
          ></textarea>
        </div>

        <div id="error-message" className="error-message hidden">
        </div>

        <div className="form-actions">
          <button
            type="submit"
            id="submit-btn"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? '응답 생성 중..' : '전송' }
          </button>
          <button
            type="button"
            id="clear-btn"
            className="btn-secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            초기화
          </button>
        </div>
      </form>
     {response && (
      <div className="response-container">
        <div className="response-header">
          <h2>응답</h2>
        </div>
        <div className="response-content">
            {response.split('\n').map((line, index) => (
                <p key={index}>{line}</p> 
            ))}
        </div>
      </div>
     )}
    {loading && (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>AI가 응답을 생성하고 있습니다...</p>
      </div>
    )}
    </div>
  </div>
  );
}
