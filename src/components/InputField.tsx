import React from 'react';

interface InputFieldProps {
    type: string;
    placeholder: string;
    value: string;
    setValue: (str: string) => void;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onRightIconClick?: () => void;
    error: string | undefined;
}

const InputField: React.FC<InputFieldProps> = ({ 
  type, 
  placeholder, 
  value, 
  setValue,
  leftIcon, 
  rightIcon, 
  onRightIconClick 
}) => {
    return (
      <div className="relative w-full mb-2">
        {leftIcon && <div className="absolute left-4 bottom-1 transform -translate-y-1/2">{leftIcon}</div>}
        <input
        type={type}
        className="w-full h-12 pl-11 px-3 py-2 font-sf-pro border text-sm border-brown-semilight rounded focus:outline-none focus:ring-1 focus:ring-orange-300 "
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {rightIcon && (
        <div className="absolute right-4 bottom-1 transform -translate-y-1/2" onClick={onRightIconClick}>
          {rightIcon}
      </div>
      )}
    </div>
  );
};

export default InputField;