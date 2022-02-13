export default function Opening({ handleClick }) {
  return (
    <div className="intro--container">
      <h1>Quizzical</h1>
      <p>This is my Last Solo Project in React. This is sort of an exam</p>
      <p>This is the best that I can give</p>
      <p>Made with love by Gene Lorenz Sarmiento</p>
      <p>PS: This is not what you expected</p>
      REQUIREMENTS
      <form>
        <input type="checkbox" id="checkbox" checked />
        <label>Have 2 Parts</label>
        <br />
        <input type="checkbox" id="checkbox" checked />
        <label>Pull questions from OTDB API</label>
        <br />
        <input type="checkbox" id="checkbox" checked />
        <label>Count the number of correct (Partially)</label>
        <br />
        <input type="checkbox" id="checkbox" checked />
        <label>Styled & polished (not sure)</label>
        <br />
      </form>
      <button onClick={handleClick}>Start quiz</button>
    </div>
  );
}
