import type { QuizStep } from '../types/game';

export const quizSteps: QuizStep[] = [
  {
    id: 1,
    scenario: "새로운 프로젝트를 시작하려고 해! 이 폴더를 Git이 관리하도록 설정해줄래?",
    currentVisualState: 'initial', // Special state: all dark
    correctCommand: 'git init',
    options: ['git init', 'git start', 'git open', 'git help'],
    feedback: {
      success: "좋아! 이제 이 공간은 Git 감시 하에 있어. 관리자가 배치됐어!",
      error: "Git이 이 폴더를 관리하게 만드려면 '초기화(init)'가 필요해!"
    }
  },
  {
    id: 2,
    scenario: "코드를 다 짰어!. 이걸 기록으로 남기려면, 우선 어떻게 해야 좋지..?",
    currentVisualState: 'modified',
    correctCommand: 'git add',
    options: ['git commit', 'git push', 'git add', 'git move'],
    feedback: {
      success: "나이스 샷! 이제 포장할 물건을 다 골랐어.",
      error: "📦 박스(Staging Area)에 먼저 담아야(add) 포장(commit)을 할 수 있어!"
    }
  },
  {
    id: 3,
    scenario: "기록을 남겼다. 이제 버전에 라벨을 붙여 저장해야겠어.",
    currentVisualState: 'staged',
    correctCommand: 'git commit',
    options: ['git save', 'git commit', 'git status', 'git add'],
    feedback: {
      success: "기록 완료! 언제든 이 상태로 시간을 되돌릴 수 있게 됐어.",
      error: "단순한 저장이 아니야. '의미 있는 단위'로 버전을 확정(commit)해야 해."
    }
  },
  {
    id: 4,
    scenario: "팀원한테 연락 왔네. 이제 협업할 수 있게 준비해야겠어.",
    currentVisualState: 'committed',
    correctCommand: 'git push',
    options: ['git upload', 'git pull', 'git push', 'git send'],
    feedback: {
      success: "발송 성공! 이제 민수도 이 코드를 볼 수 있어.",
      error: "내 코드를 원격 저장소로 '밀어올려야(push)' 협업이 가능해!"
    }
  },
  {
    id: 5,
    scenario: "어? 민수가 새 기능을 만들어서 올렸대! 최신 내용을 내 방으로 가져와서 합쳐야 해.",
    currentVisualState: 'remote-update', // Special state: new update in remote
    correctCommand: 'git pull',
    options: ['git clone', 'git push', 'git fetch', 'git pull'],
    feedback: {
      success: "동기화 완료! 이제 친구가 만든 코드 위에서 계속 작업할 수 있어.",
      error: "이미 작업 중인 프로젝트야. 원격의 '변경사항만' 당겨와야(pull) 해!"
    }
  }
];
