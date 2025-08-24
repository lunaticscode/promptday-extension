import { ExtractResult } from "@/types/extract.type";
import { FC } from "react";

interface PrompotResultProps {
  isLoading: boolean;
  data: ExtractResult | null;
  extraLoadingMessage: string | null;
}

const PrompotResult: FC<PrompotResultProps> = (props) => {
  const { data, extraLoadingMessage } = props;

  return (
    <div className={"prompt-result-container"}>
      {/* {data && <div>{JSON.stringify(data)}</div>} */}
      {extraLoadingMessage && <div>{extraLoadingMessage}</div>}
      {data && (
        <article className="prompt-result-card">
          <div className="prompt-result-banner" />
          <div className="prompt-result-body">{JSON.stringify(data)}</div>
          <div className="prompt-result-footer">
            <p className="prompt-result-footer-text">
              Updated automatically from event data
            </p>
            <button type="button" className="prompt-result-button">
              Add to Calendar
            </button>
          </div>
        </article>
      )}
    </div>
  );
};
export default PrompotResult;
