/** @jsx h */
import { h } from "../client_deps.ts";

interface CommentProps {
  body: string;
  user: { login: string };
  html_url: string;
  created_at: string;
}

export default function CommentTable(
  { comments }: { comments: CommentProps[] },
) {
  const preStyle = {
    fontFamily: "var(--bs-font-sans-serif)",
    fontSize: "1rem",
  };
  return (
    <div class="w-100">
      {comments.map((val, idx) => (
        <div key={idx} class="card w-100 mb-2">
          <div class="card-body">
            <pre style={preStyle} class="card-text">
              {val["body"]}
            </pre>
            <footer class="text-end">
              <p class="card-text mb-0">
                <small class="text-muted">by {val["user"]["login"]}</small>
              </p>
              <p class="card-text">
                <small class="text-muted">{val["created_at"]}</small>
              </p>
            </footer>
            <a
              class="stretched-link"
              target="_blank"
              rel="nofollow noopener noreferrer"
              href={val["html_url"]}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
