import { useState } from 'react';
import { cn } from '@/lib/utils';
import CoverScreen from '@/components/CoverScreen';
import CaseScreen from '@/components/CaseScreen';
import ResultScreen from '@/components/ResultScreen';
import { cases, initialSkills, ProcuratorialType } from '@/lib/gameData';

interface SkillScores {
  [key: ProcuratorialType]: {
    total: number;
    max: number;
  };
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('cover');
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Array<{score: number, hint: string}>>([]);
  const [currentCase, setCurrentCase] = useState(1);
  const [skillScores, setSkillScores] = useState<SkillScores>({
    criminal: { total: 0, max: 0 },
    civil: { total: 0, max: 0 },
    administrative: { total: 0, max: 0 },
    publicInterest: { total: 0, max: 0 },
    juvenile: { total: 0, max: 0 }
  });

  const startGame = () => {
    setScore(0);
    setCurrentCase(1);
    setAnswers([]);
    setSkillScores({
      criminal: { total: 0, max: 0 },
      civil: { total: 0, max: 0 },
      administrative: { total: 0, max: 0 },
      publicInterest: { total: 0, max: 0 },
      juvenile: { total: 0, max: 0 }
    });
    setCurrentScreen('case1');
  };

  const handleCaseComplete = (caseNum: number, answerScore: number, hint: string) => {
    setScore(prevScore => prevScore + answerScore);
    setAnswers(prevAnswers => [...prevAnswers, {score: answerScore, hint}]);
    
    // 更新技能得分
    const currentCaseData = cases.find(c => c.number === caseNum);
    if (currentCaseData) {
      setSkillScores(prev => ({
        ...prev,
        [currentCaseData.type]: {
          total: prev[currentCaseData.type].total + answerScore,
          max: prev[currentCaseData.type].max + 10 // 每题满分10分
        }
      }));
    }
    
    if (caseNum < cases.length) {
      setCurrentCase(caseNum + 1);
      setCurrentScreen(`case${caseNum + 1}`);
    } else {
      setCurrentScreen('result');
    }
  };

  const restartGame = () => {
    setCurrentScreen('cover');
  };

  // 计算能力评估数据
  const calculateSkills = () => {
    return initialSkills.map(skill => {
      const scores = skillScores[skill.type];
      const percentage = scores.max > 0 ? Math.round((scores.total / scores.max) * 100) : 0;
      return {
        ...skill,
        value: Math.max(percentage, 10) // 确保最低显示10%
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex justify-center items-start p-4">
      <div className="w-full max-w-[420px] bg-white min-h-screen relative shadow-2xl overflow-hidden">
        {currentScreen === 'cover' && (
          <CoverScreen onStart={startGame} />
        )}
        
        {currentScreen.startsWith('case') && (
          <CaseScreen 
            key={currentCase} // 添加key属性，确保切换案件时组件完全重置
            caseNum={currentCase}
            onComplete={handleCaseComplete}
          />
        )}
        
        {currentScreen === 'result' && (
          <ResultScreen 
            score={score}
            skills={calculateSkills()}
            onRestart={restartGame}
          />
        )}
      </div>
    </div>
  );
}