import type { QuizStep } from '../types/game';

export const quizSteps: QuizStep[] = [
  {
    id: 1,
    scenario: "방금 'feature.txt' 파일을 수정했어! 이 변경사항을 다음 단계로 넘기려면 어떤 상자에 담아야 하지? (Working Directory -> Staging Area)",
    currentVisualState: 'modified',
    correctCommand: 'git add',
    options: ['git add', 'git commit', 'git push', 'git pull'],
    feedback: {
      success: "좋아! 파일이 현관 앞 박스(Staging Area)에 담겼어.",
      error: "아직 박스에 담지도 않았어. 'git add'를 먼저 해야 해."
    }
  },
  {
    id: 2,
    scenario: "이제 박스에 담긴 변경사항을 확정하고 싶어. 포장하고 라벨을 붙여볼까? (Staging Area -> Local Repo)",
    currentVisualState: 'staged',
    correctCommand: 'git commit',
    options: ['git add', 'git commit', 'git push', 'git status'],
    feedback: {
      success: "완벽해! 박스가 포장되어 창고(Local Repo)에 보관됐어.",
      error: "박스에 담긴 짐을 포장해야지. 'git commit'을 사용해봐."
    }
  },
  {
    id: 3,
    scenario: "창고에 있는 이 버전을 동료들도 볼 수 있게 공유하고 싶어. 어떻게 해야 할까? (Local Repo -> Remote Repo)",
    currentVisualState: 'committed',
    correctCommand: 'git push',
    options: ['git commit', 'git push', 'git pull', 'git checkout'],
    feedback: {
      success: "슈웅! 트럭이 박스를 싣고 구름 위 물류센터(Remote Repo)로 떠났어.",
      error: "다른 곳으로 보내려면 'git push'가 필요해."
    }
  }
];
