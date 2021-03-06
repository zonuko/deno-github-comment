/** @jsx h */
/** @jsxFrag Fragment */
import Pulls from "../../../../../islands/Pulls.tsx";
import { Fragment, h, Head, PageProps } from "../../../../../client_deps.ts";

export default function Repo(props: PageProps) {
  const name = decodeURIComponent(props.params["name"]);
  const paramName = props.params["name"];
  const initUrl = props.url.toString();

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
          <span
            class="nav-link active"
            aria-current="page"
          >
            Pulls
          </span>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            aria-current="page"
            href={`/mypage/github/repo/${paramName}/issue_comments`}
          >
            Issue Comments
          </a>
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
      <Pulls name={name} initUrl={initUrl} />
    </>
  );
}
