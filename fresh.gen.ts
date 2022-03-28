// DO NOT EDIT. This file is generated by `fresh`.
// This file SHOULD be checked into source version control.
// To update this file, run `fresh manifest`.

import * as $0 from "./routes/_app.tsx";
import * as $1 from "./routes/api/github/comments/issues/[repo_name].tsx";
import * as $2 from "./routes/api/github/comments/issues/[repo_name]/csv.ts";
import * as $3 from "./routes/api/github/comments/reviews/[repo_name].tsx";
import * as $4 from "./routes/api/github/comments/reviews/[repo_name]/csv.ts";
import * as $5 from "./routes/api/github/pulls/[repo_name].tsx";
import * as $6 from "./routes/api/github/repos.ts";
import * as $7 from "./routes/index.tsx";
import * as $8 from "./routes/login/github/auth.ts";
import * as $9 from "./routes/login/github/callback.ts";
import * as $10 from "./routes/mypage/github.tsx";
import * as $11 from "./routes/mypage/github/repo/[name]/issue_comments.tsx";
import * as $12 from "./routes/mypage/github/repo/[name]/issues.tsx";
import * as $13 from "./routes/mypage/github/repo/[name]/review_comments.tsx";
import * as $$0 from "./islands/IssueComments.tsx";
import * as $$1 from "./islands/Pulls.tsx";
import * as $$2 from "./islands/Repos.tsx";
import * as $$3 from "./islands/ReviewComments.tsx";

const manifest = {
  routes: {
    "./routes/_app.tsx": $0,
    "./routes/api/github/comments/issues/[repo_name].tsx": $1,
    "./routes/api/github/comments/issues/[repo_name]/csv.ts": $2,
    "./routes/api/github/comments/reviews/[repo_name].tsx": $3,
    "./routes/api/github/comments/reviews/[repo_name]/csv.ts": $4,
    "./routes/api/github/pulls/[repo_name].tsx": $5,
    "./routes/api/github/repos.ts": $6,
    "./routes/index.tsx": $7,
    "./routes/login/github/auth.ts": $8,
    "./routes/login/github/callback.ts": $9,
    "./routes/mypage/github.tsx": $10,
    "./routes/mypage/github/repo/[name]/issue_comments.tsx": $11,
    "./routes/mypage/github/repo/[name]/issues.tsx": $12,
    "./routes/mypage/github/repo/[name]/review_comments.tsx": $13,
  },
  islands: {
    "./islands/IssueComments.tsx": $$0,
    "./islands/Pulls.tsx": $$1,
    "./islands/Repos.tsx": $$2,
    "./islands/ReviewComments.tsx": $$3,
  },
  baseUrl: import.meta.url,
};

export default manifest;
