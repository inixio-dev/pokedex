import { useState } from 'react';

const FilterAccordion = ({ title, children, disabled }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <button
                disabled={disabled}
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full px-4 py-2 font-medium text-gray-700 hover:bg-gray-100 disabled:bg-gray-100"
            >
                <span>{title}</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div className={`p-4 ${isOpen ? 'block' : 'hidden'}`}>
                {children}
            </div>
        </div>
    );
};

export default FilterAccordion;