import { motion } from "framer-motion";

interface CoverScreenProps {
    onStart: () => void;
}

const CoverScreen = (
    {
        onStart
    }: CoverScreenProps
) => {
    return (
        <motion.div
            className="text-center p-[60px] bg-gradient-to-br from-blue-900 to-blue-700 text-white min-h-screen"
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                duration: 0.5
            }}>
            <motion.div
                className="w-[120px] h-[120px] bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mx-auto mb-[30px] flex items-center justify-center text-[60px] shadow-lg"
                animate={{
                    scale: [1, 1.05, 1]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2
                }}>⚖️
                                                      </motion.div>
            <h1
                className="font-bold text-[28px] font-serif mb-[20px] text-shadow-md"
                style={{
                    fontSize: "26px"
                }}>正义链：检察官的24小时</h1>
            <p className="text-[16px] opacity-90 mb-[20px] px-[20px]">恭喜您成为A市检察院见习检察官！今天是你入职第一天，24小时内你将面临10个紧急任务。每个选择都会影响你的"正义值"和最终评级。</p>
            <p className="text-[16px] opacity-90 mb-[40px] px-[20px]">准备好了吗？开始你的检察官之旅！
                                                      </p>
            <motion.button
                className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-blue-900 border-none px-[60px] py-[18px] text-[18px] font-bold rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{
                    y: -2
                }}
                whileTap={{
                    scale: 0.98
                }}
                onClick={onStart}>开始挑战 →
                                                      </motion.button>
        </motion.div>
    );
};

export default CoverScreen;