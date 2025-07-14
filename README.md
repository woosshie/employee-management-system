# Employee Management System

직원 관리 시스템 - Vue.js + Node.js로 구축된 풀스택 웹 애플리케이션

## 🚀 기술 스택

### Backend
- **Node.js** - 서버 런타임
- **Express.js** - 웹 프레임워크
- **MySQL** - 데이터베이스
- **JWT** - 인증 토큰
- **bcryptjs** - 비밀번호 암호화
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **Vue.js 3** - 프론트엔드 프레임워크
- **Quasar Framework** - Vue.js UI 라이브러리
- **Axios** - HTTP 클라이언트
- **Vue Router** - 라우팅
- **Pinia** - 상태 관리
- **ECharts** - 차트 라이브러리

## 📁 프로젝트 구조

```
employee-management-system/
├── backend/                 # Node.js 백엔드
│   ├── routes/             # API 라우트
│   ├── services/           # 비즈니스 로직
│   ├── middleware/         # 미들웨어 (인증 등)
│   ├── db.js              # 데이터베이스 연결
│   ├── index.js           # 서버 진입점
│   └── package.json       # 백엔드 의존성
└── quasar_admin/          # Quasar 프론트엔드
    ├── src/               # 소스 코드
    ├── quasar.config.js   # Quasar 설정
    └── package.json       # 프론트엔드 의존성
```

## 🔧 설치 및 실행

### 백엔드 설정

1. 백엔드 디렉토리로 이동:
```bash
cd backend
```

2. 의존성 설치:
```bash
npm install
```

3. MySQL 데이터베이스 설정:
- MySQL 서버 실행
- `device_mgr` 데이터베이스 생성
- `db.js` 파일에서 데이터베이스 연결 정보 확인/수정

4. 서버 실행:
```bash
node index.js
```

서버는 `http://localhost:5001`에서 실행됩니다.

### 프론트엔드 설정

1. 프론트엔드 디렉토리로 이동:
```bash
cd quasar_admin
```

2. 의존성 설치:
```bash
npm install
```

3. 개발 서버 실행:
```bash
quasar dev
```

프론트엔드는 `http://localhost:9000`에서 실행됩니다.

## 🔑 주요 기능

### 인증 시스템
- 사용자 등록 및 로그인
- JWT 토큰 기반 인증
- 비밀번호 암호화

### 직원 관리
- 직원 정보 조회
- 직원 등록 및 수정
- 직원 상태별 필터링
- 대량 직원 데이터 처리

### API 엔드포인트

#### 인증
- `POST /api/auth/register` - 사용자 등록
- `POST /api/auth/login` - 로그인

#### 직원 관리
- `GET /api/employees` - 모든 직원 조회
- `GET /api/employees/:id` - 특정 직원 조회
- `POST /api/employees` - 직원 생성
- `PUT /api/employees/:id` - 직원 정보 수정
- `POST /api/employees/bulk` - 대량 직원 생성

#### 사용자 관리
- `GET /api/users/:userId` - 사용자 정보 조회
- `PUT /api/users/:userId` - 사용자 정보 수정

## 🗄️ 데이터베이스 설정

### MySQL 연결 정보
```javascript
{
  host: 'localhost',
  user: 'root',
  password: 'TestGreen',
  database: 'device_mgr',
  connectionLimit: 10
}
```

## 🔒 보안

- JWT 토큰을 사용한 인증
- bcryptjs를 사용한 비밀번호 해싱
- CORS 설정으로 크로스 오리진 요청 제어
- 미들웨어를 통한 토큰 검증

## 📝 개발 노트

- 백엔드 포트: 5001
- 프론트엔드 개발 서버 포트: 9000
- 데이터베이스: MySQL (device_mgr)
- 인증 방식: JWT

## 🤝 기여

프로젝트에 기여하고 싶으시다면 Pull Request를 보내주세요.

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.

---

**개발자**: woosshie@gmail.com