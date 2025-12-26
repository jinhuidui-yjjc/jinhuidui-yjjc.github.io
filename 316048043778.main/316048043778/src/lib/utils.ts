import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 生成评语
export function generateComment(score: number): string {
  if (score >= 80) return "您展现卓越的综合检察素养，对各业务条线的职能定位理解精准。建议继续关注司法前沿动态，保持专业领先优势。";
  if (score >= 60) return "您具备扎实的检察业务基础，对四大检察和未成年人检察工作有较全面的把握。建议加强对新类型案件和新兴领域法律问题的研究。";
  if (score >= 40) return "您对检察基本职能有初步了解，但在具体法律监督程序的把握上仍需加强。建议系统学习'四大检察'职能体系和相关法律法规。";
  if (score >= 20) return "您对检察工作有一定认识，但法律专业知识和检察业务能力有待提高。建议多参与业务培训和案例研讨，提升专业水平。";
  return "检察工作专业性强、程序性要求高。建议您多关注检察机关公开发布的典型案例和职能介绍，系统学习法律知识，逐步提升认知水平。";
}

// 计算评级
export function calculateRank(score: number): {rank: string, title: string, desc: string} {
  if (score >= 90) {
    return {
      rank: "资深检察官",
      title: "法理精通，游刃有余",
      desc: "您展现了卓越的法律素养和检察业务能力！"
    };
  } else if (score >= 70) {
    return {
      rank: "骨干检察官",
      title: "业务扎实，独当一面",
      desc: "您具备了优秀检察官的核心能力！"
    };
  } else if (score >= 50) {
    return {
      rank: "合格检察官",
      title: "基本胜任，仍需精进",
      desc: "您已掌握基础检察职能，继续加油！"
    };
  } else if (score >= 30) {
    return {
      rank: "见习检察官",
      title: "初窥门径，继续学习",
      desc: "您对检察工作有初步认识，建议加强学习。"
    };
  } else {
    return {
      rank: "法治学员",
      title: "潜力可期，再接再厉",
      desc: "检察工作专业性强，期待您的进步！"
    };
  }
}
