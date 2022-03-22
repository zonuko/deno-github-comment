/** @jsx h */
import { h, useEffect, useState } from "../client_deps.ts";
import CommentTable from "../components/CommentTable.tsx";

export default function IssueComments(props: { name: string }) {
  const [reviewComments, setReviewComments] = useState({ reviewComments: [] });
  useEffect(() => {
    const call = async () => {
      const res = await fetch(
        `/api/github/comments/reviews/${encodeURIComponent(props.name)}`,
      );
      const json = await res.json();
      console.log(json);
      setReviewComments(json);
    };
    call();
  }, [props.name]);
  return <CommentTable comments={reviewComments.reviewComments} />;
}
