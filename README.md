# 🎵 Poketify : 나의 작고 소듕한 스포티파이

## 🎉 프로젝트 소개

Poketify는 음악 서비스를 제공해 앨범 타이틀, 아티스트 등의 키워드로 관련 곡을 검색할 수 있으며 취향이 담긴 플레이리스트를 만들고 링크를 공유할 수 있습니다. 또한 커뮤니티 사이트에서 해당 링크에 대한 댓글을 남기며 소통할 수 있는 음악 추천 사이트입니다!

## 🚀 배포 링크

- (배포 링크 추가 예정)

## 👥 팀 구성 및 역할

| 이름   | 역할     | 담당 업무                         |
| ------ | -------- | --------------------------------- |
| 이재호 | 마자용   | 로그인, 회원가입, 마이페이지 구현 |
| 강지우 | 지우     | 메인 페이지 구현                  |
| 박준호 | 피카츄   | 커뮤니티 페이지 구현              |
| 김하영 | 파이리   | 검색 페이지 구현                  |
| 정소현 | 이상해씨 | 음악 추천 페이지 구현             |

## ⏳ 프로젝트 수행 절차

- **개발 기간:** 2024.10.10 ~ 2024.10.16
- **프로젝트 시작:** 브랜치별 페이지 개발
- **필수 구현 완료:** 2024.10.11 ~ 2024.10.15
- **추가 구현 완료:** 2024.10.15 ~ 2024.10.16

## 🛠 STACK

![Next.js](https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E.svg?style=for-the-badge&logo=supabase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### 1️⃣ Main Page (지우)

- Home, Header, Footer
- 최신 발매, 애니메이션 발매, 플레이리스트 추천 → 한 번에 보여줄 항목 수 지정 → 화살표 아이콘 클릭 시 지정한 항목 수 만큼 넘어감
- 앨범 이미지, 타이틀, 아티스트 클릭 시 spotify 링크로 연결

### 2️⃣ Search Page (하영)

- 노래 제목, 아티스트를 검색 → 검색 결과로 트랙 정보 받아오기
- 앨범 ID를 가져온 후, **앨범 API**를 사용해 앨범에 포함된 전체 곡 리스트 보여주기 → 페이지네이션 고려!

### 3️⃣ Search Detail Page (하영)

- 곡 정보 (앨범 이미지, 노래 제목, 아티스트)를 화면에 표시

### 4️⃣ Join, Login (재호)

- spotify 소셜 로그인 연동 → supabase 사용

### 5️⃣ My Page (재호)

- supabase storage,table을 사용해 프로필 이미지 및 닉네임을 수정

### 6️⃣ Community Page (준호)

- 글 작성 폼에 맞춰 작성 → supabase table에 데이터 저장 → 데이터를 이용해 게시글 불러오기 → spotify 플레이리스트 아이디를 이용해 플레이리스트 불러오기 → 글 작성자와 로그인한 유저가 동일한 경우 수정, 삭제 가능

### 7️⃣ Comment Page (준호)

- 댓글 작성 시 해당 게시글의 아이디 값과 함께 supabase table에 데이터 저장 → 댓글 작성자와 로그인한 유저가 동일한 경우 수정, 삭제 가능 → 해당 게시글의 댓글 총 갯수 출력

### 8️⃣ Playlist Page (소현)

- 새 재생목록 생성
- 추천 재생 목록 표시 → 음악 검색 후 재생 목록에 추가 → 개인 플레이리스트 추가 (재생목록 트랙 삭제 가능)
- **도전** 트랙 재생 & 일시 정지
