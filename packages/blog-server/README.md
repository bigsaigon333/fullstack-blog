# blog-server

## DDL

### 1. Posts 테이블 생성

```sql
  CREATE TABLE Posts (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL UNIQUE,
    "createdAt" INTEGER NOT NULL,
    "lastUpdatedAt" INTEGER NOT NULL
  );
```

### 2. PostContents 테이블 생성: Posts 와 1:1 관계

```sql
  CREATE TABLE PostContents (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "postId" INTEGER NOT NULL UNIQUE,
    "content" TEXT NOT NULL,
    FOREIGN KEY("postId") REFERENCES Posts("id")
  );
```
