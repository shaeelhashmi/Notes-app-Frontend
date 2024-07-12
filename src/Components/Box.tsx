import { useState } from 'react';
import Expand from './SVG/Expand';
import { Link } from 'react-router-dom';
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
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`text-black  bg-[rgb(51_108_255)] 
    }  ${ expanded ? ' duration-700 ' : ' duration-1000 '
        }} transition-all ${isFirst ? 'border-t-4' : 'border-y-4'} ${lastEle ? 'border-b-4' : ''} border-solid border-[#2a2aff71] `}
    style={{ height: expanded ? `${67 + (note.Notes.length * 67)}px` : '67px' }}>
      <div className=" h-[60px] grid grid-cols-3 items-center">
        <div className="col-start-2 col-end-3 text-2xl text-center">{note.category} </div>  
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
              className={`grid grid-cols-1 p-[10px] border-t-4 border-solid border-[#2a2aff71]  items-center place-content-center h-[60px]`}
            >
              <div className='grid grid-cols-[1fr_1fr_1fr] p-2'>
                <div>
              <p>Date submitted:<i className='font-light'>{convertDate(new Date(subNote.SubmissionDate))}</i></p>
              </div><div>
              <p className='text-xl text-center'>{subNote.title}</p>
              </div><div>
              <Link   className="float-right" to={`/notes/${subNote._id}`}>Viewnote</Link>
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}