/** @jsx h */
/** @jsxFrag Fragment */
import Pulls from "../../../../islands/Pulls.tsx";
import {
  Fragment,
  h,
  Head,
  PageProps,
  useState,
} from "../../../../client_deps.ts";

export default function Repo(props: PageProps) {
  const name = decodeURIComponent(props.params["name"]);
  const [tab, setTab] = useState("pulls");
  const onTabChange = (tabName: string) => {
    setTab(tabName);
  };
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
            className={tab === "pulls" ? "nav-link active" : "nav-link"}
            aria-current="page"
            onClick={() => onTabChange("pulls")}
          >
            Pulls
          </span>
        </li>
        <li class="nav-item">
          <span
            className={tab === "comments" ? "nav-link active" : "nav-link"}
            aria-current="page"
            onClick={() => onTabChange("comments")}
          >
            Comments
          </span>
        </li>
      </ul>
      {tab === "pulls" ? <Pulls name={name} /> : <div>comments: {name}</div>}
    </>
  );
}
