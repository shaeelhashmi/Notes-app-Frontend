import { useState } from 'react';
import Expand from './SVG/Expand';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const convertDate = (date: Date) => {
  return date.toISOString().split('T')[0]
}

export default function Box(props: any) {

  let length = props.notes.length;
  return (
    <>
      {props.notes.map((note: any, index: number) => {
        return <Note key={index} note={note} isFirst={length>1} lastEle={index===length-1}/>;
      })}
    </>
  );
}

function Note({ note ,isFirst,lastEle}: { note: any ,isFirst: boolean,lastEle:boolean}) {
  const mode = useSelector((state: any) => state.Mode.Mode);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`  ${mode?"bg-[rgb(196_212_255)] border-[rgb(178_183_255)] text-black":"bg-[rgb(0_25_90)] border-[#0000ff71] text-white"} 
    }  ${ expanded ? ' duration-700 ' : ' duration-1000 '
        }} transition-all ${isFirst ? 'border-t-4' : 'border-y-4'} ${lastEle ? 'border-b-4' : ''} border-solid  `}
    style={{ height: expanded ? `${67 + (note.Notes.length * 67)}px` : '67px' }}>
      <div className=" h-[60px] grid grid-cols-3 items-center">
        <div className="col-start-2 col-end-3 text-xl text-center xs:text-2xl">{note.category} </div>  
        <div
          className={`mr-5 cursor-pointer justify-self-end ${expanded? 'rotate-180' : 'rotate-0'} h-fit duration-1000 transition-all float-right`}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <Expand></Expand>
        </div>
      </div>
      <div
        className={` ${
          expanded ? 'scale-y-100 duration-1000 ' : 'scale-y-0 duration-500 '
        } origin-top transition-all w-full border-t-0  `}
      >
        {note.Notes.map((subNote: any, subIndex: number) => {
          return (
            <div
              key={subIndex}
              className={`grid grid-cols-1 p-[10px] border-t-4 border-solid ${mode?"border-[rgb(178_183_255)]":"border-[#0000ff71]"}  items-center place-content-center h-[60px]`}
            >
              <div className='grid grid-cols-[1fr_1fr_1fr] p-2'>
                <div>
              <p className='xs:text-sm sm:text-lg text-[0.7rem]'>Last updated:<i className='font-light xs:text-[0.6rem] sm:text-base text-[0.5rem]'>{convertDate(new Date(subNote.SubmissionDate))}</i></p>
              </div><div>
              <p className='text-sm text-center xs:text-base sm:text-xl '>{subNote.title}</p>
              </div><div>
              <Link   className="float-right text-[0.7rem] sm:text-base" to={`/notes/${subNote._id}`}>Viewnote</Link>
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}