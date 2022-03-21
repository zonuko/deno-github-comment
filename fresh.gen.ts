// DO NOT EDIT. This file is generated by `fresh`.
// This file SHOULD be checked into source version control.
// To update this file, run `fresh manifest`.

import * as $0 from "./routes/_app.tsx";
import * as $1 from "./routes/api/github/comments/issues/[repo_name].tsx";
import * as $2 from "./routes/api/github/comments/pulls/[repo_name].tsx";
import * as $3 from "./routes/api/github/pulls/[repo_name].tsx";
import * as $4 from "./routes/api/github/repos.ts";
import * as $5 from "./routes/index.tsx";
import * as $6 from "./routes/login/github/auth.ts";
import * as $7 from "./routes/login/github/callback.ts";
import * as $8 from "./routes/mypage/github.tsx";
import * as $9 from "./routes/mypage/github/repo/[name]/issue_comments.tsx";
import * as $10 from "./routes/mypage/github/repo/[name]/issues.tsx";
import * as $11 from "./routes/mypage/github/repo/[name]/review_comments.tsx";
import * as $$0 from "./islands/Pulls.tsx";
import * as $$1 from "./islands/Repos.tsx";

const manifest = {
  routes: {
    "./routes/_app.tsx": $0,
    "./routes/api/github/comments/issues/[repo_name].tsx": $1,
    "./routes/api/github/comments/pulls/[repo_name].tsx": $2,
    "./routes/api/github/pulls/[repo_name].tsx": $3,
    "./routes/api/github/repos.ts": $4,
    "./routes/index.tsx": $5,
    "./routes/login/github/auth.ts": $6,
    "./routes/login/github/callback.ts": $7,
    "./routes/mypage/github.tsx": $8,
    "./routes/mypage/github/repo/[name]/issue_comments.tsx": $9,
    "./routes/mypage/github/repo/[name]/issues.tsx": $10,
    "./routes/mypage/github/repo/[name]/review_comments.tsx": $11,
  },
  islands: {
    "./islands/Pulls.tsx": $$0,
    "./islands/Repos.tsx": $$1,
  },
  baseUrl: import.meta.url,
};

export default manifest;
