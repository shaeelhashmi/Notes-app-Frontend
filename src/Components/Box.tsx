import { useState } from 'react';
import Expand from './SVG/Expand';
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
    <div className={`text-black w-[100vw] bg-[rgb(51_108_255)] 
    } p-3 ${ expanded ? ' duration-700 ' : ' duration-1000 '
        }} transition-all ${isFirst ? 'border-t-4' : 'border-y-4'} ${lastEle ? 'border-b-4' : ''} border-solid border-[#2a2aff71] `}
    style={{ height: expanded ? `${67 + (note.Notes.length * 67)}px` : '67px' }}>
      <div className=" h-[60px] flex justify-center">
        <div className="flex-grow text-2xl text-center ">{note.category} <div
          className={`mr-5 cursor-pointer justify-self-end ${expanded? 'rotate-180' : 'rotate-0'} h-fit duration-1000 transition-all float-right`}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <Expand></Expand>
        </div></div>
        
      </div>
      <div
        className={`mr-2 ${
          expanded ? 'scale-y-100 duration-1000 ' : 'scale-y-0 duration-500 '
        } origin-top transition-all w-full border-t-0  `}
      >
        {note.Notes.map((subNote: any, subIndex: number) => {
          return (
            <div
              key={subIndex}
              className={`grid grid-cols-2 p-3 border-t-2 border-solid border-[#2a2aff71]  items-center place-content-center h-[67px]`}
            >
              <a>{subNote.title}</a>
              <a className="p-2 justify-self-end">fafafaf</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}