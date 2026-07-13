import type { SVGProps } from "react";

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.36321 9.3637C7.71469 9.01223 8.28453 9.01223 8.63601 9.3637L11.9996 12.7273L15.3632 9.3637C15.7147 9.01223 16.2845 9.01223 16.636 9.3637C16.9875 9.71517 16.9875 10.285 16.636 10.6365L12.636 14.6365C12.4672 14.8053 12.2383 14.9001 11.9996 14.9001C11.7609 14.9001 11.532 14.8053 11.3632 14.6365L7.36321 10.6365C7.01174 10.285 7.01174 9.71517 7.36321 9.3637Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { ChevronDownIcon };
