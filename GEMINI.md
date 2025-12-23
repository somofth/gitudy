# Git-Vis: Interactive Git Learning Platform
**Date:** 2025-12-23
**Version:** 1.0.0 (MVP)
**Target:** Git 입문자 (모바일 중심)

## 1. 프로젝트 개요
Git의 추상적인 개념(Add, Commit, Push, Pull)을 '이삿짐 센터' 비유를 통해 시각적으로 학습하는 인터랙티브 웹. 모바일 환경에서의 경험을 최우선으로 고려하며, 사전 학습(Onboarding) 후 퀴즈(Quiz)를 푸는 흐름을 가진다.

## 2. 핵심 비유 (The Metaphor)
사용자의 이해를 돕기 위해 4단계 공간 개념을 시각화한다.

1. **Working Directory (작업 공간)** ➡️ **내 방 (My Room)**
   - 상태: 파일이 어지러져 있음 (Unstaged/Untracked)
   - 색상: 🔴 Red
2. **Staging Area (임시 저장)** ➡️ **현관 앞 박스 (Box in Hallway)**
   - 상태: 파일이 박스에 담김 (Staged)
   - 색상: 🟢 Green
3. **Local Repository (로컬 저장소)** ➡️ **집 앞 창고 (Storage)**
   - 상태: 박스가 밀봉되어 보관됨 (Committed)
   - 색상: 🔵 Blue
4. **Remote Repository (원격 저장소)** ➡️ **구름 위 물류센터 (Cloud Center)**
   - 상태: 트럭이 박스를 싣고 떠남 (Pushed)
   - 색상: 🟣 Purple

## 3. 기술 스택 (Tech Stack)
- **Core:** React 19, TypeScript, Vite
- **State Management:** Zustand (가벼운 전역 상태 관리)
- **Styling:** Tailwind CSS (모바일 반응형 레이아웃)
- **Animation:** Framer Motion (파일 이동, 트럭 애니메이션)
- **Icons:** Lucide React or React Icons

## 4. 상세 기능 명세 (Feature Specs)

### 4.1. Phase 1: 온보딩 (Static Tutorial)
- 퀴즈 시작 전, 핵심 명령어 4개에 대한 개념을 카드 뉴스 형태로 설명. 명령어와 상세 설명이 포함되어 있다.
- **UI:** 좌우 스와이프 가능한 Carousel 형태.
- **Content:**
  - Slide 1: Intro (Git이 뭔가요?)
  - Slide 2: `git add` (박스에 담기)
  - Slide 3: `git commit` (포장하고 라벨 붙이기)
  - Slide 4: `git push` (트럭 보내기)
  - Slide 5: `git pull` (짐 가져오기)
  - **Action:** 마지막 슬라이드에 [퀴즈 시작하기] 버튼 배치.

### 4.2. Phase 2: 인터랙티브 퀴즈 (Main Game)
화면을 상/하(모바일) 또는 좌/우(데스크탑)로 분할하여 구성.

#### A. View Area (시각화 영역 - 상단/좌측)
- 4개의 공간(작업 디렉토리, 스테이징 영역, 로컬 저장소, 원격 저장소)을 배치. 각 공간에는 서로 다른 색상 배경과 함께 opacity가 낮은 텍스트 라벨.
- 현재 파일(객체)의 위치를 표시.
- 명령어를 통해 현재 객체의 위치 혹은 상태가 바뀌면 적절한 애니메이션이 발생.

#### B. Control Area (조작 영역 - 하단/우측)
- **Scenario Text:** 현재 상황을 설명하는 지문 (예: "방금 코드를 다 짰어! 이제 저장 준비를 해볼까?")
- **Command Pad:** 4~6개의 명령어 버튼 그리드 (`add`, `commit`, `push`, `pull`, `status`, `init` 등).
- **Feedback Toast:** 정답/오답 시 상세한 피드백 메시지 모달 출력.

## 5. 데이터 구조 (Data Structure & State)

### 5.1. 퀴즈 데이터셋 (Quiz Interface)
```typescript
interface QuizStep {
  id: number;
  scenario: string; // "이제 이 버전을 확정하고 싶어."
  currentVisualState: 'modified' | 'staged' | 'committed' | 'pushed';
  correctCommand: string; // 'git commit'
  options: string[]; // ['git add', 'git commit', 'git push', 'git status']
  feedback: {
    success: string; // "좋아! 박스가 포장됐어."
    error: string; // "아직 박스에 담지도 않았는데 포장할 순 없어."
  };
}