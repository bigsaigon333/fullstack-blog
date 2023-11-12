# api-server

## DDL

### 1. Posts 테이블 생성

```sql
  CREATE TABLE Posts (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL UNIQUE,
    "createdAt" INTEGER NOT NULL,
    "lastUpdatedAt" INTEGER NOT NULL,
    "content" TEXT NOT NULL
  );
```
