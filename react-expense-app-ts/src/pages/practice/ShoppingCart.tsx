/**
 * ShoppingCart 실습용 컴포넌트
 * useReducer를 사용한 복잡한 상태 관리 실습
 */

import { useReducer } from 'react';
import './ShoppingCart.css';

interface Product {
  id: number;
  name: string;
  price: number;
  emoji: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'UPDATE_QUANTITY'; id: number; quantity: number }
  | { type: 'CLEAR_CART' };

// 상품 목록
const PRODUCTS: Product[] = [
  { id: 1, name: '노트북', price: 1200000, emoji: '💻' },
  { id: 2, name: '키보드', price: 150000, emoji: '⌨️' },
  { id: 3, name: '마우스', price: 80000, emoji: '🖱️' },
  { id: 4, name: '모니터', price: 350000, emoji: '🖥️' },
  { id: 5, name: '헤드셋', price: 120000, emoji: '🎧' },
];

// ============================================
// TODO 1: 초기 상태 정의
// ============================================
// items: 장바구니 아이템 배열 (각 아이템은 { id, name, price, quantity, emoji })
// total: 총 금액
const initialState: CartState = {
  items: [],
  total: 0,
};

// ============================================
// TODO 2: 리듀서 함수 구현
// ============================================
// 액션 타입:
// - ADD_ITEM: 상품을 장바구니에 추가 (이미 있으면 수량 +1)
// - REMOVE_ITEM: 장바구니에서 상품 제거
// - UPDATE_QUANTITY: 상품 수량 변경 (0 이하면 제거)
// - CLEAR_CART: 장바구니 비우기
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) => item.id === action.product.id
      );
      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          total: state.total + action.product.price,
        };
      } else {
        return {
          items: [...state.items, { ...action.product, quantity: 1 }],
          total: state.total + action.product.price,
        };
      }
    }

    case 'REMOVE_ITEM': {
      const item = state.items.find((i) => i.id === action.id);
      if (!item) return state;
      return {
        items: state.items.filter((i) => i.id !== action.id),
        total: state.total - item.price * item.quantity,
      };
    }

    case 'UPDATE_QUANTITY': {
      const item = state.items.find((i) => i.id === action.id);
      if (!item) return state;

      const diff = action.quantity - item.quantity;

      if (action.quantity <= 0) {
        return {
          items: state.items.filter((i) => i.id !== action.id),
          total: state.total - item.price * item.quantity,
        };
      }
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
        total: state.total + item.price * diff,
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

function ShoppingCart() {
  // ============================================
  // TODO 3: useReducer 훅 사용
  // ============================================

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // 장바구니 총 수량 계산
  const itemCount =
    state.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="shopping-cart">
      <div className="cart-container">
        <h1>🛒 장바구니</h1>
        <p className="cart-subtitle">useReducer 실습: 복잡한 상태 관리</p>

        <div className="cart-layout">
          {/* 상품 목록 */}
          <div className="products-section">
            <h2>상품 목록</h2>
            <div className="products-grid">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="product-card">
                  <span className="product-emoji">{product.emoji}</span>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">
                    ₩{product.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => dispatch({ type: 'ADD_ITEM', product })}
                    className="btn-add"
                  >
                    담기
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 장바구니 */}
          <div className="cart-section">
            <div className="cart-header">
              <h2>장바구니 ({itemCount})</h2>
              {state.items?.length > 0 && (
                <button
                  onClick={() => dispatch({ type: 'CLEAR_CART' })}
                  className="btn-clear"
                >
                  비우기
                </button>
              )}
            </div>

            {!state.items || state.items.length === 0 ? (
              <div className="cart-empty">
                <span className="empty-icon">🛒</span>
                <p>장바구니가 비어있습니다.</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {state.items.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="item-info">
                        <span className="item-emoji">{item.emoji}</span>
                        <span className="item-name">{item.name}</span>
                      </div>
                      <div className="item-controls">
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              id: item.id,
                              quantity: item.quantity - 1,
                            })
                          }
                          className="btn-quantity"
                        >
                          -
                        </button>
                        <span className="item-quantity">{item.quantity}</span>
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'UPDATE_QUANTITY',
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          }
                          className="btn-quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="item-price">
                        ₩{(item.price * item.quantity).toLocaleString()}
                      </div>
                      <button
                        onClick={() =>
                          dispatch({ type: 'REMOVE_ITEM', id: item.id })
                        }
                        className="btn-remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <span>총 금액</span>
                  <span className="total-price">
                    ₩{(state.total || 0).toLocaleString()}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 실습 가이드 */}
        <div className="cart-info">
          <h4>📝 실습 가이드</h4>
          <ul>
            <li>
              <strong>Step 1</strong>: initialState에 items(배열)와
              total(숫자) 정의
            </li>
            <li>
              <strong>Step 2</strong>: cartReducer의 각 case 구현
            </li>
            <li>
              <strong>Step 3</strong>: 버튼의 onClick에서 dispatch 호출
            </li>
            <li>
              <strong>Step 4</strong>: 동작 테스트 (콘솔에서 확인)
            </li>
          </ul>
        </div>

        <div
          className="cart-info"
          style={{ marginTop: '1rem', background: '#fff3cd' }}
        >
          <h4>💡 힌트: reducer 패턴</h4>
          <pre style={{ fontSize: '0.85rem', overflow: 'auto' }}>
            {`case 'ADD_ITEM': {
  const existing = state.items.find(i => i.id === action.product.id);
  if (existing) {
    return {
      items: state.items.map(i => 
        i.id === action.product.id 
          ? { ...i, quantity: i.quantity + 1 } 
          : i
      ),
      total: state.total + action.product.price,
    };
  }
  return {
    items: [...state.items, { ...action.product, quantity: 1 }],
    total: state.total + action.product.price,
  };
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;

