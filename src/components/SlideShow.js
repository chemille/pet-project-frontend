import {useState} from "react";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import "./slideShow.css"; 

const SlideShow = ({slides}) => {
    const [slide, setSlide] = useState(0);
    
    return ( 
        <div className="slide-show">
            <BsCaretLeftSquareFill className="arrow arrow-left" />
            {slides.map((item, idx) => {
                return <img src={item.url} 
                    alt={item.alt} 
                    key={idx} 
                    //Conditional className of slide, if the slide variable is the same as the index of this image, pass it a className of slide. Otherwise, pass it a className of slide and slide-hidden.//  
                    className={slide === idx ? "slide" : "slide slide-hidden"} />
        })}
            <BsCaretRightSquareFill className="arrow arrow-right" />
            <span className="indicators" >
                {slides.map((_, idx) => {
                    return <button key={idx} onClick={null} className={slide === idx ? "indicator" : "indicator indicator-inactive"} ></button>
                })}
            </span>
        </div>
    );
};

export default SlideShow;