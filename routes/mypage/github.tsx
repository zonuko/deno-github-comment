/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h, Head, PageProps } from "../../client_deps.ts";
import Repos from "../../islands/Repos.tsx";

export default function Github(props: PageProps) {
  const initUrl = props.url;
  let p = parseInt(props.url.searchParams.get("page") || "1");
  if (p <= 0) {
    p = 1;
  }

  return (
    <>
      <Head>
        <title>Repos - GitHub Comments</title>
      </Head>
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">Your Github Repos</span>
        </div>
      </nav>
      <Repos initUrl={initUrl} page={p}></Repos>
    </>
  );
}
