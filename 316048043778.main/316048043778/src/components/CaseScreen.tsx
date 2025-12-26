import { useState, useEffect } from 'react';
import { cases, shuffleArray } from '@/lib/gameData';
import { motion } from 'framer-motion';

interface CaseScreenProps {
  caseNum: number;
  onComplete: (caseNum: number, answerScore: number, hint: string) => void;
}

const CaseScreen = ({ caseNum, onComplete }: CaseScreenProps) => {
  const gameCase = cases.find(c => c.number === caseNum);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState(gameCase?.options || []);

  useEffect(() => {
    if (gameCase) {
      // 打乱选项顺序
      setShuffledOptions(shuffleArray(gameCase.options));
    }
  }, [gameCase]);

  if (!gameCase) {
    return <div className="flex items-center justify-center h-full">案件不存在</div>;
  }

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowNextButton(true);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const selected = shuffledOptions[selectedOption];
      onComplete(caseNum, selected.score, selected.hint);
    }
  };

  return (
    <motion.div 
      className="p-[20px] bg-white min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-blue-900 text-white p-[16px] -mx-[20px] mb-[20px] rounded-b-[16px]">
        <div className="text-[14px] opacity-80 mb-[3px]">案件 #{gameCase.number}/10</div>
        <h2 className="text-[22px] font-bold font-serif">{gameCase.title}</h2>
      </div>

      <div className="bg-gray-50 p-[16px] rounded-[12px] border-l-[4px] border-blue-900 mb-[16px] text-[15px] leading-[1.6]">
        {gameCase.content}
      </div>

      <div className="flex flex-col gap-[10px]">
        {shuffledOptions.map((option, index) => (
          <motion.div
            key={index}
            className={`bg-white border-[2px] rounded-[12px] p-[14px] cursor-pointer relative overflow-hidden transition-all duration-300
              ${selectedOption === index ? 'border-blue-900 bg-blue-50' : 'border-gray-200 hover:border-blue-900'}`}
            whileHover={selectedOption === null ? { x: 5 } : {}}
            onClick={() => selectedOption === null && handleOptionSelect(index)}
          >
            <div className="text-[15px] mb-[5px] pr-[30px]">{option.text}</div>
            
            {selectedOption === index && (
              <div className="text-[12px] opacity-70 mt-[5px] pt-[5px] border-t border-dashed border-gray-300">
                {option.hint}
              </div>
            )}
            
            {selectedOption === index && option.score === 10 && (
              <div className="absolute right-[12px] top-1/2 -translate-y-1/2 text-green-500 text-[20px] font-bold">
                ✓
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {showNextButton && (
        <motion.button
          className="bg-gradient-to-br from-blue-900 to-blue-700 text-white border-none px-[40px] py-[14px] text-[16px] font-bold rounded-full cursor-pointer mt-[20px] w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleNext}
        >
          下一个案件 →
        </motion.button>
      )}
    </motion.div>
  );
};

export default CaseScreen;