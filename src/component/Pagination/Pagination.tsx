import { useEffect, useState } from "react";
import './Pagination.css';

interface PaginationProps {
  pages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({ pages = 10, setCurrentPage }: PaginationProps) {
  const numberOfPages: number[] = [];
  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  const [currentButton, setCurrentButton] = useState(1);
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState<(number | string)[]>([]);

  useEffect(() => {
    let tempNumberOfPages: (number | string)[] = [...arrOfCurrButtons];

    const dotsInitial = '...';
    const dotsLeft = '... ';
    const dotsRight = ' ...';

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
      tempNumberOfPages = [1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length];
    } else if (currentButton >= numberOfPages.length - 2) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    }

    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentPage(currentButton);
  }, [currentButton, pages]);

  return (
    <div className="pagination-container">
      <a
        className={`${currentButton === 1 ? 'disabled' : ''}`}
        onClick={() => setCurrentButton(prev => (prev <= 1 ? prev : prev - 1))}>
        <i className="fa-solid fa-angle-left lk-pagination-icon"></i>
      </a>

      {arrOfCurrButtons.map((item, index) => (
        <a
          key={index}
          className={`${currentButton === item ? 'active' : ''}`}
          onClick={() => typeof item === 'number' && setCurrentButton(item)}>
          {item}
        </a>
      ))}

      <a className={`${currentButton === numberOfPages.length ? 'disabled' : ''}`}
        onClick={() => setCurrentButton(prev => (prev >= numberOfPages.length ? prev : prev + 1))}>
        <i className="fa-solid fa-angle-right lk-pagination-icon"></i>
      </a>
    </div>
  );
}