
interface InputTagsProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  function?: any;
  required?: boolean;
  initialVal?: string;
}

export default function InputTags(props: InputTagsProps) {
  return (
    <div className="flex items-center mt-8">
      <label htmlFor={props.name} className='w-1/3 text-lg '>{props.label}</label>
      <input 
        type={props.type} 
        name={props.name} 
        placeholder={props.placeholder} 
        className='w-[63%] p-3 text-sm bg-[rgb(255,255,255)] border-l-0 border-r-0 border-t-0 border-b text-black placeholder-black placeholder-opacity-70'
        onChange={props.function?props.function:(e)=>e.currentTarget.value}
        required={props.required ? true : false}
        defaultValue={props.initialVal||""}
      />
    </div>
  );
}