import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import SectionTitle from './SectionTitle';

const FAQ = () => {
    const accordionItems = [
        { value: 'item-1', title: 'XXXXXXXXXXX', content: 'XXXXXXXXXXXXXXXXXXX' },
        { value: 'item-2', title: 'XXXXXXXXXXX', content: 'XXXXXXXXXXXXXXXXXXX' },
        { value: 'item-3', title: 'XXXXXXXXXXX', content: 'XXXXXXXXXXXXXXXXXXX' },
        { value: 'item-4', title: 'XXXXXXXXXXX', content: 'XXXXXXXXXXXXXXXXXXX' },
    ];

    const [openItem, setOpenItem] = useState(null);

    const toggleItem = (value) => {
        setOpenItem(openItem === value ? null : value);
    };

    return (
        <div className='w-full flex flex-col justify-center items-center mt-40' id='faq'>
            <SectionTitle subtitle="faq" title="réponses à vos questions" />
            <div className="w-[90%] max-w-[900px] text-start mt-10 flex flex-col gap-2">
                {accordionItems.map(item => {
                    const isOpen = openItem === item.value;
                    const animationProps = useSpring({
                        overflow: 'hidden',
                        height: isOpen ? 'auto' : 0,
                        opacity: isOpen ? 1 : 0,
                    });

                    return (
                        <div key={item.value} className="bg-white rounded-xl p-5 border border-lightborder cursor-pointer" onClick={() => toggleItem(item.value)}> 
                            <button
                                className="accordion-trigger w-full flex justify-between items-center hover:no-underline text-start"
                            >
                                <h3 className='font-semibold text-sm'>{item.title}</h3>
                                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                            </button>
                            <animated.div style={animationProps} className="accordion-content">
                                <p className={`text-xs ${isOpen ? 'mt-2' : ''}`}>{item.content}</p>
                            </animated.div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FAQ;