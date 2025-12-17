import './OpenAIPractice.css';

export default function OpenAIPractice() {
  return (
    <div class="openai-practice">
    <div class="practice-header">
      <h1>OpenAI API 실습</h1>
      <p>OpenAI API를 사용하여 프롬프트에 대한 응답을 받아보세요.</p>
    </div>
    <div class="practice-container">
      <form id="practice-form" class="practice-form">
        <div class="form-group">
          <label for="api-key">OpenAI API Key *</label>
          <input
            id="api-key"
            type="password"
            placeholder="sk-..."
            class="form-input"
          />
          <small class="form-hint">
            API 키는 브라우저에 저장되지 않습니다. 매번 입력해주세요.
          </small>
        </div>

        <div class="form-group">
          <label for="prompt">프롬프트 *</label>
          <textarea
            id="prompt"
            placeholder="예: 'React에서 useState를 사용하는 방법을 설명해주세요.'"
            class="form-textarea"
            rows="5"
          ></textarea>
        </div>

        <div id="error-message" class="error-message hidden">
        </div>

        <div class="form-actions">
          <button
            type="submit"
            id="submit-btn"
            class="btn-primary"
          >
            전송
          </button>
          <button
            type="button"
            id="clear-btn"
            class="btn-secondary"
          >
            초기화
          </button>
        </div>
      </form>

      <div id="response-container" class="response-container hidden">
        <div class="response-header">
          <h2>응답</h2>
        </div>
        <div id="response-content" class="response-content">
        </div>
      </div>

      <div id="loading-container" class="loading-container hidden">
        <div class="loading-spinner"></div>
        <p>AI가 응답을 생성하고 있습니다...</p>
      </div>
    </div>
  </div>
  );
}
