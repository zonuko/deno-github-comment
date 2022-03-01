/** @jsx h */
import { Layout } from "../../../../components/Layout.tsx";
import Pulls from "../../../../components/Pulls.tsx";
import {
  h,
  PageConfig,
  PageProps,
  useData,
  useState,
} from "../../../../deps.ts";

export default function Repo(props: PageProps) {
  const name = useData("repoId", () => {
    return decodeURIComponent(props.params["name"]);
  });
  const [tab, setTab] = useState("pulls");
  const onTabChange = (tabName: string) => {
    setTab(tabName);
  };
  return (
    <Layout title={`${name} - GitHub Comments`}>
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
    </Layout>
  );
}

export const config: PageConfig = { runtimeJS: true };
