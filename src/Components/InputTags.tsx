

interface InputTagsProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}

export default function InputTags(props: InputTagsProps) {
  const handleChange = (e:React.FormEvent<HTMLInputElement>) => {
   e.currentTarget.value = e.currentTarget.value.toLowerCase();
   e.currentTarget.value = e.currentTarget.value.split(" ").join("");
  }
  return (
    <div className="flex items-center mt-8">
      <label htmlFor={props.name} className='w-1/3 text-lg'>{props.label}</label>
      <input 
        type={props.type} 
        name={props.name} 
        placeholder={props.placeholder} 
        className='w-[63%] p-3 text-sm bg-[#171617] border-l-0 border-r-0 border-t-0 border-b'
        onChange={props.name === 'username' ? handleChange : (e:React.FormEvent<HTMLInputElement>) => e.currentTarget.value}
        required={props.required ? true : false}
      />
    </div>
  );
}