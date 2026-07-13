import type { SVGProps } from "react";

function ChevronUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pt-neutral-t1-fg2" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9996 9.1001C12.2383 9.1001 12.4672 9.19492 12.636 9.3637L16.636 13.3637C16.9875 13.7152 16.9875 14.285 16.636 14.6365C16.2845 14.988 15.7147 14.988 15.3632 14.6365L11.9996 11.2729L8.63601 14.6365C8.28453 14.988 7.71469 14.988 7.36321 14.6365C7.01174 14.285 7.01174 13.7152 7.36321 13.3637L11.3632 9.3637C11.532 9.19492 11.7609 9.1001 11.9996 9.1001Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { ChevronUpIcon };
