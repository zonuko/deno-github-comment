/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, Head, PageProps } from "../../../../../client_deps.ts";
import IssueComments from "../../../../../islands/IssueComments.tsx";

export default function Repo(props: PageProps) {
  const paramName = props.params["name"];
  const name = decodeURIComponent(paramName);
  const initUrl = props.url;
  let p = parseInt(props.url.searchParams.get("page") || "1");
  if (p <= 0) {
    p = 1;
  }

  return (
    <>
      <Head>
        <title>
          {`${name} - GitHub Comments`}
        </title>
      </Head>

      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">{name}</span>
        </div>
      </nav>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link"
            aria-current="page"
            href={`/mypage/github/repo/${paramName}/issues`}
          >
            Pulls
          </a>
        </li>
        <li class="nav-item">
          <span
            class="nav-link active"
            aria-current="page"
          >
            Issue Comments
          </span>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            aria-current="page"
            href={`/mypage/github/repo/${paramName}/review_comments`}
          >
            Review Comments
          </a>
        </li>
      </ul>
      <IssueComments name={name} page={p} initUrl={initUrl} />
    </>
  );
}
