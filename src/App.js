import { useState } from 'react';

const images = [
  'https://i.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
  'https://i.picsum.photos/id/2/200/300.jpg?hmac=HiDjvfge5yCzj935PIMj1qOf4KtvrfqWX3j4z1huDaU',
  'https://i.picsum.photos/id/3/200/300.jpg?hmac=o1-38H2y96Nm7qbRf8Aua54lF97OFQSHR41ATNErqFc',
];

function App() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((i) => (i + 1) % images.length);
  };

  const prev = () => {
    setIndex((i) => (i - 1) % images.length);
  };

  return (
    <div className="App">
      <button onClick={prev}>&lt;</button>
      <img src={images[index]} alt="" />
      <button onClick={next}>&gt;</button>
    </div>
  );
}

export default App;
