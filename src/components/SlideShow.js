import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import "./slideShow.css"; 

const SlideShow = ({slides}) => {
    return ( 
        <div className="slide-show">
            <BsCaretLeftSquareFill className="arrow arrow-left" />
            {slides.map((item, idx) => {
            return <img src={item.url} alt={item.alt} key={idx} className="slide" />
        })}
            <BsCaretRightSquareFill className="arrow arrow-right" />
            <span className="indicators" >
                {slides.map((_, idx) => {
                    return <button key={idx} onClick={null} className="indicator" ></button>
                })}
            </span>
        </div>
    );
};

export default SlideShow;