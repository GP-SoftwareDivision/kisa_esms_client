
# 📊 KISA_DashBoard

브라우저에서 동작하는 대시보드 애플리케이션입니다.

## 🛠 기술 스택

- **개발 툴**: Vite
- **스타일링**: Emotion
- **데이터 상태 관리**: TanStack Query
- **패키지 매니저**: Yarn (v1.22.22)
- **Node.js 버전**: v22.13.1
- **웹 서버**: Nginx
- **컨테이너 환경**: Docker

---

### 🧭 프로젝트 구조

```bash
1. 프로젝트 클론
 git clone git@gitlab.com:kisa_dev/kisa_dahsboard.git

2.패키지 설치
yarn install


3.개발 서버 실행 (⚠️ 프록시 서버가 실행 중이어야 합니다)
yarn dev


4.브라우저 접속
http://localhost:5173/

```

### ⚙️ 커밋 메시지 컨벤션

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 변경
- chore : 설정 파일, 빌드 설정 등 구조 변경 및 추가
- style : 코드 스타일 변경 (기능 변경 없음)
- test : 테스트 코드 추가/수정/삭제
- refactor : 리팩토링 (성능 향상 X, 기능 변경 없음)
- perf : 성능 최적화 관련 수정
- build : 빌드 관련 설정 변경
- ci : CI/CD 설정 변경 및 스크립트 수정



### 🚧 브랜치 전략

브랜치 용도
main 운영(배포) 브랜치
develop 개발 통합 브랜치
