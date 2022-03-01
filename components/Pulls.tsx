/** @jsx h */
import {
  h,
  PageConfig,
  PageProps,
  useData,
  useEffect,
  useState,
} from "../deps.ts";

export default function Repo(props: { name: string }) {
  const [pulls, setPulls] = useState({ pulls: [] });
  useEffect(() => {
    const call = async () => {
      const res = await fetch(
        `/api/github/pulls/${encodeURIComponent(props.name)}`,
      );
      const json = await res.json();
      setPulls(json);
    };
    call();
  }, [props.name]);
  return (
    <div class="list-group list-group">
      {pulls.pulls.map((val, idx) => (
        <a
          href={val["html_url"]}
          class="list-group-item list-group-item-action"
          key={idx}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <i class="me-3 bi bi-box-arrow-up-right"></i>
          {val["title"]}
        </a>
      ))}
    </div>
  );
}
