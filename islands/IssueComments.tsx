/** @jsx h */
import { h, useEffect, useState } from "../client_deps.ts";
import CommentTable from "../components/CommentTable.tsx";

export default function IssueComments(props: { name: string }) {
  const [issueComments, setIssueComments] = useState({ issueComments: [] });
  useEffect(() => {
    const call = async () => {
      const res = await fetch(
        `/api/github/comments/issues/${encodeURIComponent(props.name)}`,
      );
      const json = await res.json();
      console.log(json);
      setIssueComments(json);
    };
    call();
  }, [props.name]);
  return <CommentTable comments={issueComments.issueComments} />;
}
