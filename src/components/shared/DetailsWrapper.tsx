import { ReactElement } from "react";

type Props = {
  summary: string;
  children: ReactElement;
};
export default function DetailsWrapper(props: Props) {
  const { summary, children } = props;
  return (
    <details className="mt-4 mx-auto">
      <summary className="bg-primary w-[97vw] lg:w-[800px] md:w-[700px] py-2 pl-2 rounded-lg cursor-pointer">
        {summary}
      </summary>
      <div className="flex flex-col w-[95vw] lg:w-[800px] md:w-[700px] px-1">
        {children}
      </div>
    </details>
  );
}
