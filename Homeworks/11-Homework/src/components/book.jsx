import { Component } from "react";

class Book extends Component {
  render() {
    const { title, author, year, source, about, characters, showinfo } = this.props;
    return (
      <div className="book">
        <img src={source} alt={title} id="book_img" />
        <h2>{title}</h2>
        <p>ავტორი: {author}</p>
        <p>გამოცემის წელი: {year}</p>
        <p>პერსონაჟები: </p>
        <ul>
          {characters.map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
        <p>წიგნის შესახებ:  {about}</p>
        <button onClick={() => showinfo(title,characters)}>clck me</button>
      </div>
    );
  }
}
export default Book;