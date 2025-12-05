import '../styles/Square.css';

export default function Square({number, handleClick, value }) {
    return (
        <div>
            <button className='square' onClick={handleClick}>
                {value !== null ? value : number}
            </button>
        </div>
    );
}
