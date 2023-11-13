```mermaid
erDiagram
  USER ||--o{ BLOG : "One-to-Many"
  USER ||--o{ COMMENT : "One-to-Many"
  USER ||--o{ LIKE : "One-to-Many"
  BLOG ||--o{ COMMENT : "One-to-Many"
  BLOG ||--o{ LIKE : "One-to-Many"

  USER {
    string  UserID PK
    string Username
    string Password
    string Email
    string FirstName
    string LastName
  }

  BLOG {
    string BlogID PK
    string UserID
    string Title
    string Content
    string Image
    string CreationDate
  }

  COMMENT {
    string CommentID PK
    string UserID
    string BlogID
    string Content
    string CreationDate
  }

  LIKE {
    string LikeID PK
    string UserID
    string[] BlogID
    string CreationDate
  }

```