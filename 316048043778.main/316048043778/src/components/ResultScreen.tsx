import { useState, useEffect } from "react";
import { generateComment, calculateRank } from "@/lib/utils";
import { motion } from "framer-motion";
import { Skill } from "@/lib/gameData";

interface ResultScreenProps {
    score: number;
    skills: Skill[];
    onRestart: () => void;
}

const ResultScreen = (
    {
        score,
        skills,
        onRestart
    }: ResultScreenProps
) => {
    const [animatedSkills, setAnimatedSkills] = useState<number[]>(Array(skills.length).fill(0));
    const rankInfo = calculateRank(score);
    const comment = generateComment(score);

    useEffect(() => {
        const timers = skills.map((skill, index) => {
            return setTimeout(() => {
                setAnimatedSkills(prev => {
                    const newSkills = [...prev];
                    newSkills[index] = skill.value;
                    return newSkills;
                });
            }, 500 + index * 100);
        });

        return () => {
            timers.forEach(timer => clearTimeout(timer));
        };
    }, [skills]);

    const shareResult = () => {
        const shareText = `我在《正义链：检察官的24小时》中获得${score}分，被评为"${rankInfo.rank}"！快来测试你的检察业务能力吧！`;

        if (navigator.share) {
            navigator.share({
                title: "检察官能力测试",
                text: shareText,
                url: window.location.href
            });
        } else {
            alert("请手动复制分享：\n\n" + shareText);
        }
    };

    return (
        <motion.div
            className="p-[30px] [20px] bg-white min-h-screen"
            initial={{
                opacity: 0,
                y: 20
            }}
            animate={{
                opacity: 1,
                y: 0
            }}
            transition={{
                duration: 0.5
            }}>
            <div
                className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-center p-[40px] [20px] -mx-[20px] mb-[30px] text-blue-900">
                <div
                    className="w-[150px] h-[150px] bg-white rounded-full mx-auto mb-[20px] flex flex-col items-center justify-center shadow-lg">
                    <div className="text-[48px] font-black font-serif">{score}</div>
                    <div className="text-[14px] opacity-80">正义值</div>
                </div>
                <div
                    className="bg-blue-900 text-white px-[30px] py-[12px] rounded-full text-[20px] font-bold inline-block mb-[20px]">
                    {rankInfo.rank}
                </div>
                <h3 className="text-[24px] font-black mb-[10px]">{rankInfo.title}</h3>
                <p className="text-[16px] opacity-90">{rankInfo.desc}</p>
            </div>
            <div className="bg-gray-50 p-[20px] rounded-[15px] mb-[30px]">
                <h4 className="text-[18px] font-bold mb-[20px] text-center">能力评估</h4>
                {skills.map((skill, index) => <div key={index} className="mb-[15px]">
                    <div className="text-[14px] mb-[5px] flex justify-between">
                        <span>{skill.name}</span>
                        <span>{animatedSkills[index]}%</span>
                    </div>
                    <div className="h-[8px] bg-gray-200 rounded-[4px] overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-900 to-blue-700 rounded-[4px]"
                            initial={{
                                width: 0
                            }}
                            animate={{
                                width: `${animatedSkills[index]}%`
                            }}
                            transition={{
                                duration: 1,
                                ease: "easeOut"
                            }} />
                    </div>
                </div>)}
            </div>
            <div
                className="bg-white border-[2px] border-blue-900 rounded-[15px] p-[20px] mb-[30px] text-[16px] italic text-center"
                style={{
                    textAlign: "left"
                }}>
                {comment}
            </div>
            <button
                className="bg-gradient-to-br from-green-500 to-green-700 text-white border-none px-[40px] py-[18px] text-[18px] font-bold rounded-full cursor-pointer w-full mb-[15px] hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
                onClick={shareResult}>分享结果
                      </button>
            <button
                className="bg-white text-blue-900 border-[2px] border-blue-900 px-[40px] py-[16px] text-[16px] font-bold rounded-full cursor-pointer w-full"
                onClick={onRestart}>重新开始
                      </button>
        </motion.div>
    );
};

export default ResultScreen;