import React, { useState, useEffect, useRef } from 'react';

interface FilterBoxProps {
  options: string[];
  placeholder: string;
  onOptionSelect: (option: string) => void;
  selectedOption: string | null;
}

const FilterBox: React.FC<FilterBoxProps> = ({ options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const filterBoxRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  /* 클릭된 요소가 FilterBox 컴포넌트 외부에 있는지 확인하고, 외부 클릭이 감지되면 드롭다운을 닫는다 */
  const handleClickOutside = (event: MouseEvent) => {
    if (filterBoxRef.current && !filterBoxRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }
  
  /* 클릭이벤트 감지 */
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  return (
    // ref 속성을 설정하여 filterBoxRef가 div요소를 가리키도록 한다.
    <div className="filter-box z-40" ref={filterBoxRef}>
      <div 
        className={`selected-option ${selectedOption ? 'selected' : 'placeholder'}`} 
        onClick={toggleDropdown}
      >
        {selectedOption || placeholder}
      </div>
      {isOpen && (
        <ul className="options">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterBox; 