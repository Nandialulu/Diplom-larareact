import '../Search/Search.css';
import { FaBed } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaPerson } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { DateRange } from 'react-date-range';   // on sar oruulah belen npm date-range
import {Children, useState} from 'react' 
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"

export const Search = () =>{
    // onclick hiih heseg buyu date neeh heseg
    const [openDate, setOpenDate]= useState(false)
    // asuuh sudlah
    const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
//   songolt hiih heseg uruu, tom hun, huuhed geh met State
      const [openOptions, setOpenOptions]= useState(false)
      const [options, setOptions] =useState ({
        adult:1,
        Children:0,
        Room:1,
      })
    //   onclick heseg  margaash harah sh
    const handleOption =(name, operation)=>{
        // prev ashiglsan condition bas
        setOptions(prev=>{return {
            // i-increace (usuh), ene name ni options useStete[] holbootoi 
            ...prev, [name]: operation === "i" ? options[name] + 1 :options[name] - 1,
        }})

    }
    return(
       <div className="headerSearch">
    <div className="headerSearchItem">
        <FaBed className="headerIcon" />
        <input
        type="text"
        placeholder="Та хаашаа аялах вэ?"
        className="headerSearchInput"
        />
    </div>
    <div className="headerSearchItem">
        <CiCalendarDate className="headerIcon" />
        {/* span deer hednees hednoo hooron aylal ehleh duusah hugatsaag oruulj uguw */}
        <span onClick={()=>setOpenDate(!openDate)} //
            className="headerSearchText">
            {`${format(date[0].startDate, "MM/dd/yyyy")} to  ${format(date[0].endDate, "MM/dd/yyyy")}`}
        </span>
        {/* date neeh heseg */}
        { openDate && <DateRange
        editableDateInputs={true}
        onChange={item => setDate([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={date}
        className="date"
        />}
    </div>
    <div className="headerSearchItem">
        <FaPerson className="headerIcon" />
       {/* options neeh heseg  !openOptions nuhtsul tawij ugsun */}
        <span className="headerSearchText" onClick={()=>setOpenOptions(!openOptions)}>
            
            {`${options.adult} Том хүн ~ ${options.Children} Хүүхэд ~ ${options.Room} Өрөө`}
            </span>
        { openOptions && < div className="options">
            <div className="optionItem">
                <span className='optionText'>Том хүн</span>
                <div className="optionCounter">
                    {/*  */}
                <button className="optionCounterButton" 
                onClick={()=>handleOption("adult", "d")}
                disabled={options.adult <= 1 }>-</button>
                <span className="optionCounterNumber">{options.adult}</span>
                <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
            </div>
            </div>
                <div className="optionItem">
                <span className='optionText'>Хүүхэд</span>
                <div className="optionCounter">
                <button className="optionCounterButton" 
                onClick={()=>handleOption("Children", "d")}
                disabled={options.Children <= 0 }>-</button>
                <span className="optionCounterNumber">{options.Children}</span>
                <button className="optionCounterButton" onClick={()=>handleOption("Children", "i")}>+</button>
            </div>
            </div>
                <div className="optionItem">
                <span className='optionText'>Өрөө</span>
                <div className="optionCounter">
                    {/* d- decrease buurah*/}
                <button className="optionCounterButton"
                    onClick={()=>handleOption("Room", "d")}
                    disabled={options.Room <= 1 }>-</button>
                <span className="optionCounterNumber">{options.Room}</span>
                <button className="optionCounterButton" onClick={()=>handleOption("Room", "i")}>+</button>
            </div>
            </div>
        </div>}
    </div>
    <div className="headerSearchItem">
        <button className="headerbtn"><IoSearchOutline /></button>
    </div>
    </div>
    )
}

export default Search