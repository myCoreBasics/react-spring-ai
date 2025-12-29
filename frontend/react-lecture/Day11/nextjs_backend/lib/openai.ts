import OpenAI from 'openai';

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 영수증 분석 결과 타입
export interface ReceiptAnalysisResult {
  merchant: string;
  date: string;
  totalAmount: number;
  category: string;
  description: string;
  items: Array<{
    name: string;
    amount: number;
  }>;
}

// 영수증 이미지 분석
export async function analyzeReceiptImage(
  base64Image: string,
  mimeType: string
): Promise<ReceiptAnalysisResult> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `다음 영수증 이미지를 분석하여 다음 정보를 JSON 형식으로 추출해주세요:
- merchant: 상호명
- date: 날짜 (YYYY-MM-DD 형식)
- totalAmount: 총 금액 (숫자만)
- category: 분류 (식음료, 쇼핑, 교통, 의료, 교육, 기타 중 하나)
- description: 간단한 설명
- items: 상세 항목 배열 (각 항목은 name과 amount 포함)

JSON 형식 예시:
{
  "merchant": "스타벅스",
  "date": "2024-01-15",
  "totalAmount": 15000,
  "category": "식음료",
  "description": "카페 음료 구매",
  "items": [
    {"name": "아메리카노", "amount": 5000},
    {"name": "라떼", "amount": 6000}
  ]
}

날짜를 추출할 수 없으면 오늘 날짜를 사용하고, 금액을 추출할 수 없으면 0을 사용하세요.
JSON만 반환하세요.`,
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:${mimeType};base64,${base64Image}`,
            },
          },
        ],
      },
    ],
    max_tokens: 2000,
  });

  const content = response.choices[0].message.content || '';
  
  // JSON 추출
  let jsonStr = content;
  
  // ```json ... ``` 블록 추출
  const jsonBlockMatch = content.match(/```json\n?([\s\S]*?)\n?```/);
  if (jsonBlockMatch) {
    jsonStr = jsonBlockMatch[1];
  } else {
    // ``` ... ``` 블록 추출
    const codeBlockMatch = content.match(/```\n?([\s\S]*?)\n?```/);
    if (codeBlockMatch) {
      jsonStr = codeBlockMatch[1];
    } else {
      // JSON 객체 추출
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonStr = jsonMatch[0];
      }
    }
  }

  try {
    const result = JSON.parse(jsonStr.trim());
    return {
      merchant: result.merchant || '알 수 없음',
      date: result.date || new Date().toISOString().split('T')[0],
      totalAmount: result.totalAmount || 0,
      category: result.category || '기타',
      description: result.description || '',
      items: result.items || [],
    };
  } catch {
    // 파싱 실패 시 기본값 반환
    return {
      merchant: '알 수 없음',
      date: new Date().toISOString().split('T')[0],
      totalAmount: 0,
      category: '기타',
      description: '영수증 분석 실패',
      items: [],
    };
  }
}

export default openai;

