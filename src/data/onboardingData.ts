export interface OnboardingSlideData {
  id: number;
  title: string;
  subTitle?: string;
  description: string;
  command?: string;
  icon?: string;
  image?: string;
}

export const onboardingConcepts: OnboardingSlideData[] = [
  {
    id: 1,
    title: '버전 관리',
    subTitle: 'Git이 뭔가요?',
    description: '보고서를 쓸 때 "최종.hwp", "진짜최종.hwp", "진짜진짜최종.hwp" 처럼 파일을 계속 복사해본 적 있나요?\n\nGit은 이런 번거로움 없이 파일의 모든 변경 순간을 "사진 찍듯이" 기록해주는 프로그램입니다. 실수해도 언제든 과거 시점으로 되돌릴 수 있는 "타임머신"과 같죠!',
    icon: '⏳'
  },
  {
    id: 2,
    title: '전체 지도',
    subTitle: 'Git의 4가지 작업 공간',
    description: 'Git은 파일을 한 번에 저장하지 않고, 4단계를 거쳐 신중하게 이동시킵니다.\n\n• [작업 공간] : 내 방\n• [임시 저장] : 현관 앞 박스\n• [로컬 저장소] : 집 앞 창고\n• [원격 저장소] : 구름 위 물류센터\n\n이 흐름만 알면 Git의 90%를 이해한 것입니다!',
    icon: '🗺️'
  },
  {
    id: 3,
    title: '작업 공간',
    subTitle: 'Working Directory',
    description: '여러분이 VS Code와 같은 에디터에서 실제로 파일을 생성하고 수정하는 공간입니다.\n\n이곳에서의 변경사항은 아직 Git이 추적하지 않거나, 저장될 준비가 되지 않은 "날 것"의 상태입니다. (Unstaged status)',
    icon: '🏠'
  },
  {
    id: 4,
    title: '임시 저장',
    subTitle: 'Staging Area',
    description: '작업한 파일 중, 버전으로 남길 파일만 선별하여 올려두는 "가상의 준비 공간, staging area"입니다.\n\n"이 파일과 저 파일만 묶어서 저장해야지!" 라고 결정하는 단계로, 커밋(Commit) 직전의 대기 상태입니다.',
    icon: '📦'
  },
  {
    id: 5,
    title: '로컬 저장소',
    subTitle: 'Local Repository',
    description: 'Staging Area에 있던 파일들이 하나의 "버전(Commit)"으로 기록되어 영구적으로 저장된 곳입니다.\n\n내 컴퓨터(로컬)에 저장된 기록이므로, 인터넷이 없어도 과거 내역을 조회하거나 되돌릴 수 있습니다.',
    icon: '🗄️'
  },
  {
    id: 6,
    title: '원격 저장소',
    subTitle: 'Remote Repository',
    description: 'GitHub이나 GitLab 같은 인터넷 상의 서버 저장소입니다.\n\n내 컴퓨터(로컬)에 있는 버전을 이곳으로 업로드(Push)하면, 팀원들과 코드를 공유하고 백업할 수 있습니다.',
    icon: '☁️'
  },
  {
    id: 7,
    title: '평행 우주',
    subTitle: 'Branch',
    description: 'Git은 여러 개의 "평행 우주(Branch)"를 만들 수 있습니다.\n\n원본(Main)을 건드리지 않고 새로운 실험을 마음껏 해볼 수 있는 안전한 격리 공간입니다. 실패하면 그냥 우주를 삭제하면 되니까요!',
    image: '/github-branch.png'
  }
];

export const onboardingCommands: OnboardingSlideData[] = [
  {
    id: 7.5, // Intermediate ID to keep order
    title: 'Git 명령어 배우기',
    subTitle: 'Command',
    description: 'Git 명령어는 마법 주문과 같습니다. 명령어를 입력하면 파일이 다른 공간으로 이동하거나 상태가 변하게 되죠.\n\n각 명령어가 어떤 영향을 주는지 하나씩 알아봅시다!',
    image: '/github-command.png'
  },
  {
    id: 7.8,
    title: '시작하기',
    subTitle: 'git init',
    description: '이 폴더를 Git이 관리하도록 초기화(Initialize)합니다.\n이 명령어를 입력해야 비로소 "작업 공간"이 되고, Git의 감시가 시작됩니다.',
    command: 'git init',
    image: '/git init.jpg'
  },
  {
    id: 8,
    title: '박스에 담기',
    subTitle: 'git add',
    description: '내 방(Working Directory)에 있는 파일 중, 저장하고 싶은 것만 골라 박스(Staging Area)에 담습니다.',
    command: 'git add',
    image: '/git add.jpg'
  },
  {
    id: 9,
    title: '포장하고 보관하기',
    subTitle: 'git commit',
    description: '박스(Staging Area)를 테이프로 포장하고 라벨을 붙여 창고(Local Repository)에 넣습니다.',
    command: 'git commit',
    image: '/git commit.jpg'
  },
  {
    id: 10,
    title: '트럭 보내기',
    subTitle: 'git push',
    description: '창고(Local Repository)에 있는 박스들을 트럭에 실어 물류센터(Remote Repository)로 보냅니다.',
    command: 'git push',
    image: '/git push.jpg'
  },
  {
    id: 11,
    title: '짐 가져오기',
    subTitle: 'git pull',
    description: '물류센터(Remote Repository)에 있는 다른 사람의 박스를 내 집(Working Directory)으로 가져옵니다.',
    command: 'git pull',
    image: '/git pull.jpg'
  }
];
