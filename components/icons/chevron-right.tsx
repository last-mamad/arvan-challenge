import type { SVGProps } from "react";

function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.36321 7.3637C9.71469 7.01223 10.2845 7.01223 10.636 7.3637L14.636 11.3637C14.8048 11.5325 14.8996 11.7614 14.8996 12.0001C14.8996 12.2388 14.8048 12.4677 14.636 12.6365L10.636 16.6365C10.2845 16.988 9.71469 16.988 9.36321 16.6365C9.01174 16.285 9.01174 15.7152 9.36321 15.3637L12.7268 12.0001L9.36321 8.63649C9.01174 8.28502 9.01174 7.71517 9.36321 7.3637Z"
        fill="currentColor"
      />
    </svg>
  );
}

export { ChevronRightIcon };
